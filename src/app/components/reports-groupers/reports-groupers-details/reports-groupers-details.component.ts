import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/reports-groupers.actions';
import { getReportsGrouper } from '../reducers/reports-groupers.selectors';
import { Observable } from 'rxjs';
import { ReportsGrouper } from '../reports-grouper.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';

@Component({
  selector: 'kyr-reports-groupers-details',
  templateUrl: './reports-groupers-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ReportsGroupersDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<ReportsGrouper>;
  returnUrl = '/reports-groupers';
  modulePath = 'reports-groupers';
  viewName = 'ReportsGrouper';

  selectorGetModel = getReportsGrouper;
  actionRequestFail =
    actions.ReportsGroupersActionTypes.RequestFailReportsGroupers;
  actionRequestGetOne = actions.RequestGetReportsGrouper;
}
