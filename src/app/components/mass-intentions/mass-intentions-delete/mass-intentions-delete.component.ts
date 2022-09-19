import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { MassIntention } from '../mass-intention.model';
import {
  getSelectedMassIntentions,
  getMassIntention,
} from '../reducers/mass-intentions.selectors';
import * as actions from '../reducers/mass-intentions.actions';

@Component({
  selector: 'kyr-mass-intentions-delete',
  templateUrl: './mass-intentions-delete.component.html',
})
export class MassIntentionsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<MassIntention[]>;
  modelList: MassIntention[] = [];
  modulePath = 'mass-intentions';
  returnUrl = ['/mass-intentions'];

  selectorGetModel = getMassIntention;
  selectorGetSelected = getSelectedMassIntentions;
  actionRequestFail = actions.MassIntentionsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.MassIntentionsActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
