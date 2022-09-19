import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';

import { CuriaProvisionType } from 'src/app/components/curia-provision-types/curia-provision-type.model';
import { getCuriaProvisionType } from 'src/app/components/curia-provision-types/reducers/curia-provision-types.selectors';
import * as actions from 'src/app/components/curia-provision-types/reducers/curia-provision-types.actions';

@Component({
  selector: 'kyr-curia-provision-types-form',
  templateUrl: './curia-provision-types-form.component.html',
})
export class CuriaProvisionTypesFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<CuriaProvisionType>;
  modulePath = 'curia-provision-types';

  selectorGetModel = getCuriaProvisionType;
  actionRequestFail = actions.CuriaProvisionTypesActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.CuriaProvisionTypesActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.CuriaProvisionTypesActionTypes.SuccessPost;

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
