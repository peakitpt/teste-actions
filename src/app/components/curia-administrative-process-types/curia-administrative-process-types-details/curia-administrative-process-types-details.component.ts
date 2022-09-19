import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';

import { CuriaAdministrativeProcessType } from '../curia-administrative-process-type.model';
import * as actions from '../reducers/curia-administrative-process-types.actions';
import { getCuriaAdministrativeProcessType } from '../reducers/curia-administrative-process-types.selectors';

@Component({
  selector: 'kyr-curia-administrative-process-types-details',
  templateUrl: './curia-administrative-process-types-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CuriaAdministrativeProcessTypesDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<CuriaAdministrativeProcessType>;
  model: CuriaAdministrativeProcessType;
  returnUrl = '/curia-administrative-process-types';
  modulePath = 'curia-administrative-process-types';
  viewName = 'CuriaAdministrativeProcessType';

  // Selectors & actions
  selectorGetModel = getCuriaAdministrativeProcessType;
  actionRequestFail =
    actions.CuriaAdministrativeProcessTypesActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
  actionClearGet = actions.ClearGet;
  actionRequestGetAll = actions.RequestGetAll;
  // Selectors & actions END
}
