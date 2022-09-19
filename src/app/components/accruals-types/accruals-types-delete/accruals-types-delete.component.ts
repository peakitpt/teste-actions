import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getAccrualType,
  getSelectedAccrualTypes,
} from '../reducers/accruals-types.selectors';
import * as actions from '../reducers/accruals-types.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { AccrualsType } from '../accruals-type.model';

@Component({
  selector: 'kyr-accruals-types-delete',
  templateUrl: './accruals-types-delete.component.html',
})
export class AccrualsTypesDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<AccrualsType[]>;
  modelList: AccrualsType[] = [];
  returnUrl = ['/accruals-types'];
  modulePath = 'accruals-types';

  selectorGetModel = getAccrualType;
  selectorGetSelected = getSelectedAccrualTypes;
  actionRequestFail = actions.AccrualTypesActionTypes.RequestFailAccrualTypes;
  actionRequestGetAll = actions.RequestGetAllAccrualTypes;
  actionRequestGetOne = actions.RequestGetAccrualType;
  actionRequestDelete = actions.RequestDeleteAccrualType;
  actionSuccessDelete =
    actions.AccrualTypesActionTypes.SuccessDeleteAccrualType;
  actionSetSelected = actions.SetSelectedAccrualTypes;
}
