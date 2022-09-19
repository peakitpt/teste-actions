import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getValence,
  getSelectedValences,
} from '../reducers/valences.selectors';
import * as actions from '../reducers/valences.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Valence } from '../valence.model';

@Component({
  selector: 'kyr-valences-delete',
  templateUrl: './valences-delete.component.html',
})
export class ValencesDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<Valence[]>;
  modelList: Valence[] = [];
  returnUrl = ['/valences'];
  modulePath = 'valences';

  selectorGetModel = getValence;
  selectorGetSelected = getSelectedValences;
  actionRequestFail = actions.ValencesActionTypes.RequestFailValences;
  actionRequestGetAll = actions.RequestGetAllValences;
  actionRequestGetOne = actions.RequestGetValence;
  actionRequestDelete = actions.RequestDeleteValence;
  actionSuccessDelete = actions.ValencesActionTypes.SuccessDeleteValence;
  actionSetSelected = actions.SetSelectedValences;
}
