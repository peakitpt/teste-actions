import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as actions from '../reducers/numerations.actions';
import { getNumeration } from '../reducers/numerations.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { Numeration } from '../numeration.model';

@Component({
  selector: 'kyr-numerations-form',
  templateUrl: './numerations-form.component.html',
})
export class NumerationsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Numeration>;
  modulePath = 'numerations';
  preFillWithNew = true;

  selectorGetModel = getNumeration;
  selectorGetNewModel = getNumeration;
  actionRequestFail = actions.NumerationsActionTypes.RequestFailNumerations;
  actionRequestGetAll = actions.RequestGetAllNumerations;
  actionRequestGetOne = actions.RequestGetNumeration;
  actionRequestPut = actions.RequestPutNumeration;
  actionSuccessPut = actions.NumerationsActionTypes.SuccessPutNumeration;
  actionRequestPost = actions.RequestPostNumeration;
  actionSuccessPost = actions.NumerationsActionTypes.SuccessPostNumeration;
  actionRequestGetNew = actions.RequestGetNewNumeration;

  initializeForm() {
    this.form = this.fb.group({
      id: [],
      name: [null, Validators.required],
      active: [true],
      block_edit: [false],
      block_remove: [false],
      created_at: [],
      created_by_user_id: [],
      deleted: [false],
      deleted_by_user_id: [],
      documents_type_id: [],
      entity_ekklesia_location_id: [],
      is_default: [false],
      numeration_view_attributes: [[]],
      ser_length: [null, Validators.required],
      ser_max: [null, Validators.required],
      ser_preffix: [],
      ser_suffix: [],
      ser_value: [null, Validators.required],
      ser_year: [],
      serie: [],
      updated_at: [],
      updated_by_user_id: [],
    });
  }
}
