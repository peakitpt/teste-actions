import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { getReport, getSelectedReports } from '../reducers/reports.selectors';
import * as actions from '../reducers/reports.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Report } from '../report.model';

@Component({
  selector: 'kyr-reports-delete',
  templateUrl: './reports-delete.component.html',
})
export class ReportsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<Report[]>;
  modelList: Report[] = [];
  returnUrl = ['/reports'];
  modulePath = 'reports';

  selectorGetModel = getReport;
  selectorGetSelected = getSelectedReports;
  actionRequestFail = actions.ReportsActionTypes.RequestFailReports;
  actionRequestGetAll = actions.RequestGetAllReports;
  actionRequestGetOne = actions.RequestGetReport;
  actionRequestDelete = actions.RequestDeleteReport;
  actionSuccessDelete = actions.ReportsActionTypes.SuccessDeleteReport;
  actionSetSelected = actions.SetSelectedReports;
}
