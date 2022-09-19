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

import { Gestdocument } from 'src/app/components/gestdocuments/gestdocument.model';
import * as actions from 'src/app/components/gestdocuments/reducers/gestdocuments.actions';
import { getGestdocument } from '../reducers/gestdocuments.selectors';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'kyr-gestdocuments-form',
  templateUrl: './gestdocuments-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class GestdocumentsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  environment = environment;
  model$: Observable<Gestdocument>;
  modulePath = 'gestdocuments';

  // Selectors & actions
  selectorGetModel = getGestdocument;
  actionRequestFail = actions.GestdocumentsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.GestdocumentsActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.GestdocumentsActionTypes.SuccessPost;
  // Selectors & actions END

  initializeForm() {
    this.form = this.fb.group({
      block_remove: [false],
      created_at: [],
      created_by_user_id: [],
      deleted: [false],
      deleted_by_user_id: [],
      document_date: [new Date()],
      document_reference: [null, Validators.required],
      document_text: [null, Validators.required],
      document_title: [null, Validators.required],
      entity_address: [null, Validators.required],
      entity_ekklesia_location_id: [],
      entity_name: [null, Validators.required],
      entity_title: [null, Validators.required],
      footnotes: [],
      id: [],
      institution_date: [new Date()],
      institution_name: [null, Validators.required],
      institution_reference: [],
      institution_service: [],
      institution_subject: [null, Validators.required],
      signature: [],
      signature_post: [],
      sync_at: [],
      updated_at: [],
      updated_by_user_id: [],
    });
  }
}
