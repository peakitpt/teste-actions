import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';

import { CuriaSecretariatType } from 'src/app/components/curia-secretariat-types/curia-secretariat-type.model';
import { getCuriaSecretariatType } from 'src/app/components/curia-secretariat-types/reducers/curia-secretariat-types.selectors';
import * as actions from 'src/app/components/curia-secretariat-types/reducers/curia-secretariat-types.actions';

@Component({
  selector: 'kyr-curia-secretariat-types-form',
  templateUrl: './curia-secretariat-types-form.component.html',
})
export class CuriaSecretariatTypesFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<CuriaSecretariatType>;
  modulePath = 'curia-secretariat-types';

  selectorGetModel = getCuriaSecretariatType;
  actionRequestFail = actions.CuriaSecretariatTypesActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.CuriaSecretariatTypesActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.CuriaSecretariatTypesActionTypes.SuccessPost;

  initializeForm() {
    this.form = this.fb.group({
      name: [null, Validators.required],
      block_remove: [false],
      created_at: [],
      created_by_user_id: [],
      deleted: [false],
      deleted_by_user_id: [],
      entity_ekklesia_location_id: [],
      id: [],
      sync_at: [],
      updated_at: [],
      updated_by_user_id: [],
    });
  }
}
