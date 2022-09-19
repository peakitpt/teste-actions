import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { getGroup, getSelectedGroups } from '../reducers/groups.selectors';
import * as actions from '../reducers/groups.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Group } from '../group.model';

@Component({
  selector: 'kyr-groups-delete',
  templateUrl: './groups-delete.component.html',
})
export class GroupsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<Group[]>;
  modelList: Group[] = [];
  returnUrl = ['/groups'];
  modulePath = 'groups';

  selectorGetModel = getGroup;
  selectorGetSelected = getSelectedGroups;
  actionRequestFail = actions.GroupsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.GroupsActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
