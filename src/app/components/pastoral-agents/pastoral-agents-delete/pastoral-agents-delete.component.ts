import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getPastoralAgent,
  getSelectedPastoralAgents,
} from '../reducers/pastoral-agents.selectors';
import * as actions from '../reducers/pastoral-agents.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';

@Component({
  selector: 'kyr-pastoral-agents-delete',
  templateUrl: './pastoral-agents-delete.component.html',
})
export class PastoralAgentsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<any[]>;
  modelList: any[] = [];
  returnUrl = ['pastoral-agents'];
  modulePath = 'pastoral-agents';

  selectorGetModel = getPastoralAgent;
  selectorGetSelected = getSelectedPastoralAgents;
  actionRequestFail = actions.PastoralAgentsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.PastoralAgentsActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
