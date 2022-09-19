import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/accounting-exercises.actions';
import { getAccountingExercise } from '../reducers/accounting-exercises.selectors';
import { Observable } from 'rxjs';
import { AccountingExercise } from '../accounting-exercise.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'kyr-accounting-exercises-details',
  templateUrl: './accounting-exercises-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccountingExercisesDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<AccountingExercise>;
  returnUrl = '/accounting-exercises';
  modulePath = 'accounting-exercises';
  viewName = 'AccountingExercise';

  selectorGetModel = getAccountingExercise;
  actionRequestFail = actions.AccountingExercisesActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;

  openDetailsReport(file: any) {
    const url = `${environment.railsAppUrl}/accounting_exercises/${
      this.model?.id ? this.model.id : 'report'
    }/printpdf?format=pdf&file=${file.filePath}`;
    window.open(url);
  }
}
