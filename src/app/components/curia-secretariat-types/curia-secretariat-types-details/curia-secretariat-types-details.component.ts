import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';

import { CuriaSecretariatType } from '../curia-secretariat-type.model';
import * as actions from '../reducers/curia-secretariat-types.actions';
import { getCuriaSecretariatType } from '../reducers/curia-secretariat-types.selectors';

@Component({
  selector: 'kyr-curia-secretariat-types-details',
  templateUrl: './curia-secretariat-types-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CuriaSecretariatTypesDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<CuriaSecretariatType>;
  model: CuriaSecretariatType;
  returnUrl = '/curia-secretariat-types';
  modulePath = 'curia-secretariat-types';
  viewName = 'CuriaSecretariatType';

  // Selectors & actions
  selectorGetModel = getCuriaSecretariatType;
  actionRequestFail = actions.CuriaSecretariatTypesActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
  actionClearGet = actions.ClearGet;
  actionRequestGetAll = actions.RequestGetAll;
  // Selectors & actions END
}
