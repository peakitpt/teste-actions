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
import { environment } from 'src/environments/environment';

import { Family } from '../family.model';
import * as actions from '../reducers/families.actions';
import { getFamily } from '../reducers/families.selectors';

@Component({
  selector: 'kyr-families-details',
  templateUrl: './families-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class FamiliesDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Family>;
  model: Family;
  returnUrl = '/families';
  modulePath = 'families';
  viewName = 'Family';

  selectorGetModel = getFamily;
  actionRequestFail = actions.FamiliesActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
  actionClearGet = actions.ClearGet;

  @ViewChild('familyTabTemplate') familyTabTemplate: TemplateRef<any>;
  @ViewChild('documentsTabTemplate') documentsTabTemplate: TemplateRef<any>;
  @ViewChild('statisticDataTabTemplate')
  statisticDataTabTemplate: TemplateRef<any>;

  ngAfterViewInit() {
    this.detailsTabs = [
      {
        textLabel: this.i18nextPipe.transform(`${this.modulePath}:tabs.family`),
        templateContent: this.familyTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.documents`
        ),
        templateContent: this.documentsTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.statistic_data`
        ),
        templateContent: this.statisticDataTabTemplate,
      },
    ];

    super.ngAfterViewInit();
  }

  openDetailsReport(file: any) {
    const url = `${environment.railsAppUrl}/families/${this.model.id}/printpdf?format=pdf&file=${file.filePath}`;
    window.open(url);
  }

  // THIS FORM SPECIFIC FUNCTIONS [START]
  getRelationWithLabel(relationWith: number): string {
    switch (relationWith) {
      case 1: {
        return this.i18nextPipe.transform(
          `${this.modulePath}:model.father_description`
        );
      }
      case 2: {
        return this.i18nextPipe.transform(
          `${this.modulePath}:model.mother_description`
        );
      }
      case 3: {
        return this.i18nextPipe.transform(
          `${this.modulePath}:relations_with_both`
        );
      }
      default: {
        break;
      }
    }
  }
  // THIS FORM SPECIFIC FUNCTIONS [END]
}
