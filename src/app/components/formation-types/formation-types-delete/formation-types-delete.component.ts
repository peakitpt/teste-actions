import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getFormationType,
  getSelectedFormationTypes,
} from '../reducers/formation-types.selectors';
import * as actions from '../reducers/formation-types.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { FormationType } from '../formation-type.model';

@Component({
  selector: 'kyr-formation-types-delete',
  templateUrl: './formation-types-delete.component.html',
})
export class FormationTypesDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<FormationType[]>;
  modelList: FormationType[] = [];
  returnUrl = ['/formation-types'];
  modulePath = 'formation-types';

  selectorGetModel = getFormationType;
  selectorGetSelected = getSelectedFormationTypes;
  actionRequestFail =
    actions.FormationTypesActionTypes.RequestFailFormationTypes;
  actionRequestGetAll = actions.RequestGetAllFormationTypes;
  actionRequestGetOne = actions.RequestGetFormationType;
  actionRequestDelete = actions.RequestDeleteFormationType;
  actionSuccessDelete =
    actions.FormationTypesActionTypes.SuccessDeleteFormationType;
  actionSetSelected = actions.SetSelectedFormationTypes;
}
