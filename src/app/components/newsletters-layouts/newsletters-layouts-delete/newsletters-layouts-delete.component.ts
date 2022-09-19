import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { NewslettersLayout } from '../newsletters-layout.model';
import {
  getSelectedNewslettersLayouts,
  getNewslettersLayout,
} from '../reducers/newsletters-layouts.selectors';
import * as actions from '../reducers/newsletters-layouts.actions';

@Component({
  selector: 'kyr-newsletters-layouts-delete',
  templateUrl: './newsletters-layouts-delete.component.html',
})
export class NewslettersLayoutsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<NewslettersLayout[]>;
  modelList: NewslettersLayout[] = [];
  modulePath = 'newsletters-layouts';
  returnUrl = ['/newsletters-layouts'];

  selectorGetModel = getNewslettersLayout;
  selectorGetSelected = getSelectedNewslettersLayouts;
  actionRequestFail = actions.NewslettersLayoutsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.NewslettersLayoutsActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
