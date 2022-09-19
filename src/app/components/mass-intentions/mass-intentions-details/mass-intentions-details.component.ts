import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';

import { MassIntention } from '../mass-intention.model';
import * as actions from '../reducers/mass-intentions.actions';
import { getMassIntention } from '../reducers/mass-intentions.selectors';

@Component({
  selector: 'kyr-mass-intentions-details',
  templateUrl: './mass-intentions-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class MassIntentionsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<MassIntention>;
  model: MassIntention;
  returnUrl = '/mass-intentions';
  modulePath = 'mass-intentions';
  viewName = 'MassIntention';

  // Selectors & actions
  selectorGetModel = getMassIntention;
  actionRequestFail = actions.MassIntentionsActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
  actionClearGet = actions.ClearGet;
  actionRequestGetAll = actions.RequestGetAll;

  actionRequestSaveAndGenerateDocument = actions.RequestSaveAndGenerateDocument;
  actionRequestFailSaveAndGenerateDocument =
    actions.MassIntentionsActionTypes.RequestFailSaveAndGenerateDocument;
  actionSuccessSaveAndGenerateDocument =
    actions.MassIntentionsActionTypes.SuccessSaveAndGenerateDocument;
  // Selectors & actions END
}
