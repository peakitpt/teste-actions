import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';

import { MassIntentionsType } from 'src/app/components/mass-intentions-types/mass-intentions-type.model';
import { getMassIntentionsType } from 'src/app/components/mass-intentions-types/reducers/mass-intentions-types.selectors';
import * as actions from 'src/app/components/mass-intentions-types/reducers/mass-intentions-types.actions';

@Component({
  selector: 'kyr-mass-intentions-types-form',
  templateUrl: './mass-intentions-types-form.component.html',
})
export class MassIntentionsTypesFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy {
  model$: Observable<MassIntentionsType>;
  modulePath = 'mass-intentions-types';

  selectorGetModel = getMassIntentionsType;
  actionRequestFail = actions.MassIntentionsTypesActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.MassIntentionsTypesActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.MassIntentionsTypesActionTypes.SuccessPost;

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
