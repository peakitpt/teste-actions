import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as actions from '../reducers/emoluments-types.actions';
import { getEmolumentType } from '../reducers/emoluments-types.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { EmolumentType } from '../emoluments-type.model';

@Component({
  selector: 'kyr-emoluments-types-form',
  templateUrl: './emoluments-types-form.component.html',
})
export class EmolumentsTypesFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<EmolumentType>;
  modulePath = 'emoluments-types';

  selectorGetModel = getEmolumentType;
  actionRequestFail =
    actions.EmolumentsTypesActionTypes.RequestFailEmolumentsTypes;
  actionRequestGetAll = actions.RequestGetAllEmolumentsTypes;
  actionRequestGetOne = actions.RequestGetEmolumentType;
  actionRequestPut = actions.RequestPutEmolumentType;
  actionSuccessPut = actions.EmolumentsTypesActionTypes.SuccessPutEmolumentType;
  actionRequestPost = actions.RequestPostEmolumentType;
  actionSuccessPost =
    actions.EmolumentsTypesActionTypes.SuccessPostEmolumentType;

  initializeForm() {
    this.form = this.fb.group({
      block_remove: [false],
      created_at: [],
      created_by_user_id: [],
      deleted: [false],
      deleted_by_user_id: [],
      entity_ekklesia_location_id: [],
      id: [],
      inserted_by_user: [false],
      is_donation_emolument: [false, Validators.required],
      name: [null, Validators.required],
      sync_at: [],
      updated_at: [],
      updated_by_user_id: [],
      validated: [true],
    });
  }
}
