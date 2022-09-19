import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';

import { Death } from '../death.model';
import * as actions from '../reducers/deaths.actions';
import { getDeath } from '../reducers/deaths.selectors';

@Component({
  selector: 'kyr-deaths-details',
  templateUrl: './deaths-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DeathsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Death>;
  model: Death;
  returnUrl = '/deaths';
  modulePath = 'deaths';
  viewName = 'Death';

  // Selectors & actions
  selectorGetModel = getDeath;
  actionRequestFail = actions.DeathsActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
  actionClearGet = actions.ClearGet;
  actionRequestGetAll = actions.RequestGetAll;

  actionRequestSaveAndGenerateDocument = actions.RequestSaveAndGenerateDocument;
  actionRequestFailSaveAndGenerateDocument =
    actions.DeathsActionTypes.RequestFailSaveAndGenerateDocument;
  actionSuccessSaveAndGenerateDocument =
    actions.DeathsActionTypes.SuccessSaveAndGenerateDocument;
  // Selectors & actions END

  /* This specific's component fields */
  buryProcessOptions: Array<{ label: string; value: number }> = [
    {
      label: this.i18nextPipe.transform(
        `${this.modulePath}:bury_process_options.buried`
      ),
      value: 2,
    },
    {
      label: this.i18nextPipe.transform(
        `${this.modulePath}:bury_process_options.cremated`
      ),
      value: 1,
    },
  ];

  get_bury_process_name(bury_process_id: number): string {
    return this.buryProcessOptions.find((o) => o.value == bury_process_id)
      .label;
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
}
