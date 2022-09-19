import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';

import { NewslettersLayout } from '../newsletters-layout.model';
import { getNewslettersLayout } from '../reducers/newsletters-layouts.selectors';
import * as actions from '../reducers/newsletters-layouts.actions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'kyr-newsletters-layouts-form',
  templateUrl: './newsletters-layouts-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class NewslettersLayoutsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  environment = environment;
  model$: Observable<NewslettersLayout>;
  model: NewslettersLayout;
  modulePath = 'newsletters-layouts';

  selectorGetModel = getNewslettersLayout;
  actionRequestFail = actions.NewslettersLayoutsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.NewslettersLayoutsActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.NewslettersLayoutsActionTypes.SuccessPost;

  initializeForm() {
    this.form = this.fb.group({
      block_remove: [false],
      created_at: [],
      created_by_user_id: [],
      deleted: [false],
      deleted_by_user_id: [],
      entity_ekklesia_location_id: [],
      id: [],
      img_url: [],
      img_url_filename: [],
      layout: [null, Validators.required],
      sync_at: [],
      title: [null, Validators.required],
      updated_at: [],
      updated_by_user_id: [],
    });
  }
}
