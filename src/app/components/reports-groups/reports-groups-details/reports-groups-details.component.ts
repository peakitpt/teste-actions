import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/reports-groups.actions';
import { getReportsGroup } from '../reducers/reports-groups.selectors';
import { Observable } from 'rxjs';
import { ReportsGroup } from '../reports-group.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';

@Component({
  selector: 'kyr-reports-groups-details',
  templateUrl: './reports-groups-details.component.html',
  styleUrls: ['./reports-groups-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReportsGroupsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit {
  model$: Observable<ReportsGroup>;
  returnUrl = '/reports-groups';
  modulePath = 'reports-groups';
  viewName = 'ReportsGroup';

  selectorGetModel = getReportsGroup;
  actionRequestFail = actions.ReportsGroupsActionTypes.RequestFailReportsGroups;
  actionRequestGetOne = actions.RequestGetReportsGroup;
}
