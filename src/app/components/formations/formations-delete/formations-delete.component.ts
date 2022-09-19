import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getFormation,
  getSelectedFormations,
} from '../reducers/formations.selectors';
import * as actions from '../reducers/formations.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Formation } from '../formation.model';

@Component({
  selector: 'kyr-formations-delete',
  templateUrl: './formations-delete.component.html',
})
export class FormationsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<Formation[]>;
  modelList: Formation[] = [];
  returnUrl = ['/formations'];
  modulePath = 'formations';

  selectorGetModel = getFormation;
  selectorGetSelected = getSelectedFormations;
  actionRequestFail = actions.FormationsActionTypes.RequestFailFormations;
  actionRequestGetAll = actions.RequestGetAllFormations;
  actionRequestGetOne = actions.RequestGetFormation;
  actionRequestDelete = actions.RequestDeleteFormation;
  actionSuccessDelete = actions.FormationsActionTypes.SuccessDeleteFormation;
  actionSetSelected = actions.SetSelectedFormations;
}
