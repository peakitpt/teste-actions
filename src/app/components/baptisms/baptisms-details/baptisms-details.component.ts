import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { Observable } from 'rxjs';

import { Baptism } from '../baptism.model';
import * as actions from '../reducers/baptisms.actions';
import { getBaptism } from '../reducers/baptisms.selectors';

@Component({
  selector: 'kyr-baptisms-details',
  templateUrl: './baptisms-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class BaptismsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Baptism>;
  model: Baptism;
  returnUrl = '/baptisms';
  modulePath = 'baptisms';
  viewName = 'Baptism';

  // Selectors & actions
  selectorGetModel = getBaptism;
  actionRequestFail = actions.BaptismsActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
  actionClearGet = actions.ClearGet;
  actionRequestGetAll = actions.RequestGetAll;

  actionRequestSaveAndGenerateDocument = actions.RequestSaveAndGenerateDocument;
  actionRequestFailSaveAndGenerateDocument =
    actions.BaptismsActionTypes.RequestFailSaveAndGenerateDocument;
  actionSuccessSaveAndGenerateDocument =
    actions.BaptismsActionTypes.SuccessSaveAndGenerateDocument;
  // Selectors & actions END

  @ViewChild('mainTabTemplate') mainTabTemplate: TemplateRef<any>;
  @ViewChild('parentsTabTemplate') parentsTabTemplate: TemplateRef<any>;
  @ViewChild('godparentsTabTemplate') godparentsTabTemplate: TemplateRef<any>;
  @ViewChild('attachmentsTabTemplate') attachmentsTabTemplate: TemplateRef<any>;

  afterGetModel() {
    super.afterGetModel();
    this.addTabs();
  }

  menuClick(event: any, data: any) {
    switch (event) {
      case 'view_doc':
        this.openDetails('documents', this.model.document_id);
        break;
      default:
        super.menuClick(event, data);
        break;
    }
  }

  private addTabs() {
    this.detailsTabs = [
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.main_tab`
        ),
        templateContent: this.mainTabTemplate,
      },
    ];

    if (
      this.model.entity.entity_person.entity_father_description ||
      this.model.entity.entity_person.entity_mother_description ||
      this.model.entity.entity_person.entity_father?.entity_person.entity_father
        ?.name ||
      this.model.entity.entity_person.entity_father?.entity_person.entity_mother
        ?.name ||
      this.model.entity.entity_person.entity_mother?.entity_person.entity_father
        ?.name ||
      this.model.entity.entity_person.entity_mother?.entity_person.entity_mother
        ?.name
    ) {
      this.detailsTabs.push({
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.parents_grandparents`
        ),
        templateContent: this.parentsTabTemplate,
      });
    }

    if (
      this.model.entity_godfather_description ||
      this.model.entity_godmother_description
    ) {
      this.detailsTabs.push({
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.godparents`
        ),
        templateContent: this.godparentsTabTemplate,
      });
    }

    if (this.model.baptisms_attachments.length) {
      this.detailsTabs.push({
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.attachments`
        ),
        templateContent: this.attachmentsTabTemplate,
      });
    }
  }
}
