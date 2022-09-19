import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getAccrual,
  getSelectedAccruals,
} from '../reducers/accruals.selectors';
import * as actions from '../reducers/accruals.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Accrual } from '../accrual.model';

@Component({
  selector: 'kyr-accruals-delete',
  templateUrl: './accruals-delete.component.html',
})
export class AccrualsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<Accrual[]>;
  modelList: Accrual[] = [];
  returnUrl = ['/accruals'];
  modulePath = 'accruals';

  selectorGetModel = getAccrual;
  selectorGetSelected = getSelectedAccruals;
  actionRequestFail = actions.AccrualsActionTypes.RequestFailAccruals;
  actionRequestGetAll = actions.RequestGetAllAccruals;
  actionRequestGetOne = actions.RequestGetAccrual;
  actionRequestDelete = actions.RequestDeleteAccrual;
  actionSuccessDelete = actions.AccrualsActionTypes.SuccessDeleteAccrual;
  actionSetSelected = actions.SetSelectedAccruals;
}
