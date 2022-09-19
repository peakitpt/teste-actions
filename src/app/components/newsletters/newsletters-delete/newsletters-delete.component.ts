import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Newsletter } from '../newsletter.model';
import {
  getSelectedNewsletters,
  getNewsletter,
} from '../reducers/newsletters.selectors';
import * as actions from '../reducers/newsletters.actions';

@Component({
  selector: 'kyr-newsletters-delete',
  templateUrl: './newsletters-delete.component.html',
})
export class NewslettersDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<Newsletter[]>;
  modelList: Newsletter[] = [];
  modulePath = 'newsletters';
  returnUrl = ['/newsletters'];

  selectorGetModel = getNewsletter;
  selectorGetSelected = getSelectedNewsletters;
  actionRequestFail = actions.NewslettersActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.NewslettersActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
