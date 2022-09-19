import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/user-newsletters.actions';
import { getUserNewsletter } from '../reducers/user-newsletters.selectors';
import { Observable } from 'rxjs';
import { UserNewsletter } from '../user-newsletter.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';

@Component({
  selector: 'kyr-user-newsletters-details',
  templateUrl: './user-newsletters-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class UserNewslettersDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<UserNewsletter>;
  returnUrl = '/user-newsletters';
  modulePath = 'user-newsletters';
  viewName = 'UserNewsletter';

  selectorGetModel = getUserNewsletter;
  actionRequestFail =
    actions.UserNewslettersActionTypes.RequestFailUserNewsletters;
  actionRequestGetOne = actions.RequestGetUserNewsletter;
}
