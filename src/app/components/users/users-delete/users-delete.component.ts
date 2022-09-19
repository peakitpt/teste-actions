import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { getUser, getSelectedUsers } from '../reducers/users.selectors';
import * as actions from '../reducers/users.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { User } from '../user.model';

@Component({
  selector: 'kyr-users-delete',
  templateUrl: './users-delete.component.html',
})
export class UsersDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<User[]>;
  modelList: User[] = [];
  returnUrl = ['/users'];
  modulePath = 'users';

  selectorGetModel = getUser;
  selectorGetSelected = getSelectedUsers;
  actionRequestFail = actions.UsersActionTypes.RequestFailUsers;
  actionRequestGetAll = actions.RequestGetAllUsers;
  actionRequestGetOne = actions.RequestGetUser;
  actionRequestDelete = actions.RequestDeleteUser;
  actionSuccessDelete = actions.UsersActionTypes.SuccessDeleteUser;
  actionSetSelected = actions.SetSelectedUsers;
}
