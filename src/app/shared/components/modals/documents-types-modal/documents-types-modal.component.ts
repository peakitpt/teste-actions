import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  TemplateRef,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { BaseModalListComponent } from '../base-modal-list-component';

import {
  getError,
  getDocumentsTypes,
} from './reducers/documents-types-modal.selectors';
import * as actions from './reducers/documents-types-modal.actions';
import { DocumentsTypesResponse } from './documents-types-modal.model';

@Component({
  selector: 'kyr-documents-types-modal',
  templateUrl: './documents-types-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DocumentsTypesModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'documents-types';
  modelList$: Observable<DocumentsTypesResponse>;

  selectorGetList = getDocumentsTypes;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionRequestSetSelected = actions.RequestSetSelected;

  movementTypeOptions: any[];
  movementTypeTranslator: any;
  @ViewChild('movementTypeTemplate') movementTypeTemplate: TemplateRef<any>;
  @ViewChild('activeTemplate') activeTemplate: TemplateRef<any>;
  @ViewChild('selfAssessmentTemplate') selfAssessmentTemplate: TemplateRef<any>;
  @ViewChild('affectsLegalTaxReportsTemplate')
  affectsLegalTaxReportsTemplate: TemplateRef<any>;

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.movementTypeOptions = [
      {
        label: this.i18nextPipe.transform(`translation:all`),
        value: null,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.movement_type_option.c`
        ),
        value: 'c',
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.movement_type_option.d`
        ),
        value: 'd',
      },
    ];

    this.movementTypeTranslator = {
      c: this.i18nextPipe.transform(
        `${this.modulePath}:model.movement_type_option.c`
      ),
      d: this.i18nextPipe.transform(
        `${this.modulePath}:model.movement_type_option.d`
      ),
    };
  }

  refreshTable() {
    this.isLoading = true;
    const modalParams = {
      modal: true,
      format: 'json',
    };
    this.store.dispatch(
      new this.actionRequestGetAll({
        query: this.filters,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        order: this.order,
        params: modalParams,
      })
    );
  }

  setTableColumns(): any[] {
    return [
      {
        id: 'name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.code`),
      },
      {
        id: 'description',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.description`
        ),
      },
      {
        id: 'movement_type',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.movement_type`
        ),
        template: this.movementTypeTemplate,
      },
      {
        id: 'active',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.active`),
        template: this.activeTemplate,
      },
      {
        id: 'self_assessment',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.self_assessment`
        ),
        template: this.selfAssessmentTemplate,
      },
      {
        id: 'affects_legal_tax_reports',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.affects_legal_tax_reports`
        ),
        template: this.affectsLegalTaxReportsTemplate,
      },
    ];
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        name: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.name`
          ),
          value: null,
        }),
        description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.description`
          ),
          value: null,
        }),
        movement_type: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.movement_type`
          ),
          value: null,
        }),
      }),
    });
  }
}
