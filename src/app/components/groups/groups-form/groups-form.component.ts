import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as actions from '../reducers/groups.actions';
import { getGroup } from '../reducers/groups.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { Group } from '../group.model';

@Component({
  selector: 'kyr-groups-form',
  templateUrl: './groups-form.component.html',
})
export class GroupsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Group>;
  modulePath = 'groups';

  selectorGetModel = getGroup;
  actionRequestFail = actions.GroupsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.GroupsActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.GroupsActionTypes.SuccessPost;

  initializeForm() {
    this.form = this.fb.group({
      id: [],
      name: [null, Validators.required],
      active: [true, Validators.required],
      block_remove: [false],
      created_at: [],
      created_by_user_id: [],
      deleted: [false],
      deleted_by_user_id: [],
      entity_ekklesia_location_id: [],
      sync_at: [],
      updated_at: [],
      updated_by_user_id: [],
      user_group_attributes: [[]],
    });
  }
}
