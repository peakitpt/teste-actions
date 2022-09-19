import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';

import { CuriaProvisionType } from '../curia-provision-type.model';
import * as actions from '../reducers/curia-provision-types.actions';
import { getCuriaProvisionType } from '../reducers/curia-provision-types.selectors';

@Component({
  selector: 'kyr-curia-provision-types-details',
  templateUrl: './curia-provision-types-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CuriaProvisionTypesDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<CuriaProvisionType>;
  model: CuriaProvisionType;
  returnUrl = '/curia-provision-types';
  modulePath = 'curia-provision-types';
  viewName = 'CuriaProvisionType';

  // Selectors & actions
  selectorGetModel = getCuriaProvisionType;
  actionRequestFail = actions.CuriaProvisionTypesActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
  actionClearGet = actions.ClearGet;
  actionRequestGetAll = actions.RequestGetAll;
  // Selectors & actions END
}
