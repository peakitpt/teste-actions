import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getReportsGroup,
  getSelectedReportsGroups,
} from '../reducers/reports-groups.selectors';
import * as actions from '../reducers/reports-groups.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { ReportsGroup } from '../reports-group.model';

@Component({
  selector: 'kyr-reports-groups-delete',
  templateUrl: './reports-groups-delete.component.html',
})
export class ReportsGroupsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<ReportsGroup[]>;
  modelList: ReportsGroup[] = [];
  returnUrl = ['/reports-groups'];
  modulePath = 'reports-groups';

  selectorGetModel = getReportsGroup;
  selectorGetSelected = getSelectedReportsGroups;
  actionRequestFail = actions.ReportsGroupsActionTypes.RequestFailReportsGroups;
  actionRequestGetAll = actions.RequestGetAllReportsGroups;
  actionRequestGetOne = actions.RequestGetReportsGroup;
  actionRequestDelete = actions.RequestDeleteReportsGroup;
  actionSuccessDelete =
    actions.ReportsGroupsActionTypes.SuccessDeleteReportsGroup;
  actionSetSelected = actions.SetSelectedReportsGroups;
}
