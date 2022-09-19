import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getPastoralAgentsType,
  getSelectedPastoralAgentsTypes,
} from '../reducers/pastoral-agents-types.selectors';
import * as actions from '../reducers/pastoral-agents-types.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { PastoralAgentsType } from '../pastoral-agents-type.model';

@Component({
  selector: 'kyr-pastoral-agents-types-delete',
  templateUrl: './pastoral-agents-types-delete.component.html',
})
export class PastoralAgentsTypesDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<PastoralAgentsType[]>;
  modelList: PastoralAgentsType[] = [];
  returnUrl = ['/pastoral-agents-types'];
  modulePath = 'pastoral-agents-types';

  selectorGetModel = getPastoralAgentsType;
  selectorGetSelected = getSelectedPastoralAgentsTypes;
  actionRequestFail =
    actions.PastoralAgentsTypesActionTypes.RequestFailPastoralAgentsTypes;
  actionRequestGetAll = actions.RequestGetAllPastoralAgentsTypes;
  actionRequestGetOne = actions.RequestGetPastoralAgentsType;
  actionRequestDelete = actions.RequestDeletePastoralAgentsType;
  actionSuccessDelete =
    actions.PastoralAgentsTypesActionTypes.SuccessDeletePastoralAgentsType;
  actionSetSelected = actions.SetSelectedPastoralAgentsTypes;
}
