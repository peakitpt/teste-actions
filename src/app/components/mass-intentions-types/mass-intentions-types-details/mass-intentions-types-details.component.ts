import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';

import { MassIntentionsType } from '../mass-intentions-type.model';
import * as actions from '../reducers/mass-intentions-types.actions';
import { getMassIntentionsType } from '../reducers/mass-intentions-types.selectors';

@Component({
  selector: 'kyr-mass-intentions-types-details',
  templateUrl: './mass-intentions-types-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class MassIntentionsTypesDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<MassIntentionsType>;
  model: MassIntentionsType;
  returnUrl = '/mass-intentions-types';
  modulePath = 'mass-intentions-types';
  viewName = 'MassIntentionsType';

  // Selectors & actions
  selectorGetModel = getMassIntentionsType;
  actionRequestFail = actions.MassIntentionsTypesActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
  actionClearGet = actions.ClearGet;
  actionRequestGetAll = actions.RequestGetAll;
  // Selectors & actions END
}
