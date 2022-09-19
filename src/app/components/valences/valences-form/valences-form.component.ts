import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as actions from '../reducers/valences.actions';
import { getValence } from '../reducers/valences.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { Valence } from '../valence.model';

@Component({
  selector: 'kyr-valences-form',
  templateUrl: './valences-form.component.html',
})
export class ValencesFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Valence>;
  modulePath = 'valences';
  preFillWithNew = true;

  selectorGetModel = getValence;
  selectorGetNewModel = getValence;
  actionRequestFail = actions.ValencesActionTypes.RequestFailValences;
  actionRequestGetAll = actions.RequestGetAllValences;
  actionRequestGetOne = actions.RequestGetValence;
  actionRequestPut = actions.RequestPutValence;
  actionSuccessPut = actions.ValencesActionTypes.SuccessPutValence;
  actionRequestPost = actions.RequestPostValence;
  actionSuccessPost = actions.ValencesActionTypes.SuccessPostValence;
  actionRequestGetNew = actions.RequestGetNewValence;

  initializeForm() {
    this.form = this.fb.group({
      block_remove: [false, Validators.required],
      created_at: [],
      created_by_user_id: [],
      deleted: [false, Validators.required],
      deleted_by_user_id: [],
      id: [],
      inserted_by_user: [true, Validators.required],
      locale: ['pt', Validators.required],
      name: [],
      updated_at: [],
      updated_by_user_id: [],
      validated: [true, Validators.required],
    });
  }
}
