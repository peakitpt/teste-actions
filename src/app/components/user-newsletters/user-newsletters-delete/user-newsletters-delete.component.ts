import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getUserNewsletter,
  getSelectedUserNewsletters,
} from '../reducers/user-newsletters.selectors';
import * as actions from '../reducers/user-newsletters.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { UserNewsletter } from '../user-newsletter.model';

@Component({
  selector: 'kyr-user-newsletters-delete',
  templateUrl: './user-newsletters-delete.component.html',
})
export class UserNewslettersDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<UserNewsletter[]>;
  modelList: UserNewsletter[] = [];
  returnUrl = ['/user-newsletters'];
  modulePath = 'user-newsletters';

  selectorGetModel = getUserNewsletter;
  selectorGetSelected = getSelectedUserNewsletters;
  actionRequestFail =
    actions.UserNewslettersActionTypes.RequestFailUserNewsletters;
  actionRequestGetAll = actions.RequestGetAllUserNewsletters;
  actionRequestGetOne = actions.RequestGetUserNewsletter;
  actionRequestDelete = actions.RequestDeleteUserNewsletter;
  actionSuccessDelete =
    actions.UserNewslettersActionTypes.SuccessDeleteUserNewsletter;
  actionSetSelected = actions.SetSelectedUserNewsletters;
}
