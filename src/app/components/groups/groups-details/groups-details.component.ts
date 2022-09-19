import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/groups.actions';
import { getGroup } from '../reducers/groups.selectors';
import { Observable } from 'rxjs';
import { Group } from '../group.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';

@Component({
  selector: 'kyr-groups-details',
  templateUrl: './groups-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class GroupsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<Group>;
  returnUrl = '/groups';
  modulePath = 'groups';
  viewName = 'Group';

  selectorGetModel = getGroup;
  actionRequestFail = actions.GroupsActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
}
