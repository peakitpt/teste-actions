import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getSubscriptionUser,
  getSelectedSubscriptionUsers,
} from '../reducers/subscription-users.selectors';
import * as actions from '../reducers/subscription-users.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { SubscriptionUser } from '../subscription-user.model';

@Component({
  selector: 'kyr-subscription-users-delete',
  templateUrl: './subscription-users-delete.component.html',
})
export class SubscriptionUsersDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<SubscriptionUser[]>;
  modelList: SubscriptionUser[] = [];
  returnUrl = ['/subscription-users'];
  modulePath = 'subscription-users';

  selectorGetModel = getSubscriptionUser;
  selectorGetSelected = getSelectedSubscriptionUsers;
  actionRequestFail =
    actions.SubscriptionUsersActionTypes.RequestFailSubscriptionUsers;
  actionRequestGetAll = actions.RequestGetAllSubscriptionUsers;
  actionRequestGetOne = actions.RequestGetSubscriptionUser;
  actionRequestDelete = actions.RequestDeleteSubscriptionUser;
  actionSuccessDelete =
    actions.SubscriptionUsersActionTypes.SuccessDeleteSubscriptionUser;
  actionSetSelected = actions.SetSelectedSubscriptionUsers;
}
