import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getAccountingExercise,
  getSelectedAccountingExercises,
} from '../reducers/accounting-exercises.selectors';
import * as actions from '../reducers/accounting-exercises.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { AccountingExercise } from '../accounting-exercise.model';

@Component({
  selector: 'kyr-accounting-exercises-delete',
  templateUrl: './accounting-exercises-delete.component.html',
})
export class AccountingExercisesDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<AccountingExercise[]>;
  modelList: AccountingExercise[] = [];
  returnUrl = ['/accounting-exercises'];
  modulePath = 'accounting-exercises';

  selectorGetModel = getAccountingExercise;
  selectorGetSelected = getSelectedAccountingExercises;
  actionRequestFail = actions.AccountingExercisesActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.AccountingExercisesActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
