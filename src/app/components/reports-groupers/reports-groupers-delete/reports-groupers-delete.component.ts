import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getReportsGrouper,
  getSelectedReportsGroupers,
} from '../reducers/reports-groupers.selectors';
import * as actions from '../reducers/reports-groupers.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { ReportsGrouper } from '../reports-grouper.model';

@Component({
  selector: 'kyr-reports-groupers-delete',
  templateUrl: './reports-groupers-delete.component.html',
})
export class ReportsGroupersDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<ReportsGrouper[]>;
  modelList: ReportsGrouper[] = [];
  returnUrl = ['/reports-groupers'];
  modulePath = 'reports-groupers';

  selectorGetModel = getReportsGrouper;
  selectorGetSelected = getSelectedReportsGroupers;
  actionRequestFail =
    actions.ReportsGroupersActionTypes.RequestFailReportsGroupers;
  actionRequestGetAll = actions.RequestGetAllReportsGroupers;
  actionRequestGetOne = actions.RequestGetReportsGrouper;
  actionRequestDelete = actions.RequestDeleteReportsGrouper;
  actionSuccessDelete =
    actions.ReportsGroupersActionTypes.SuccessDeleteReportsGrouper;
  actionSetSelected = actions.SetSelectedReportsGroupers;
}
