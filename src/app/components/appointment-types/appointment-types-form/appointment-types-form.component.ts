import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';

import { AppointmentType } from 'src/app/components/appointment-types/appointment-type.model';
import { getAppointmentType } from 'src/app/components/appointment-types/reducers/appointment-types.selectors';
import * as actions from 'src/app/components/appointment-types/reducers/appointment-types.actions';
import * as modalActions from '../../../shared/components/modals/appointment-types-modal/reducers/appointment-types-modal.actions';

@Component({
  selector: 'kyr-appointment-types-form',
  templateUrl: './appointment-types-form.component.html',
})
export class AppointmentTypesFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<AppointmentType>;
  modulePath = 'appointment-types';
  preFillWithNew = true;

  selectorGetModel = getAppointmentType;
  actionRequestFail = actions.AppointmentTypesActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionRequestSetSelected = modalActions.RequestSetSelected;
  actionSuccessPut = actions.AppointmentTypesActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.AppointmentTypesActionTypes.SuccessPost;

  localeOptions: Array<{ label: string; value: string }> = [];

  initializeForm() {
    this.localeOptions = [
      {
        value: 'pt',
        label: this.i18nextPipe.transform(`translation:_languages.pt`),
      },
      {
        value: 'es',
        label: this.i18nextPipe.transform(`translation:_languages.es`),
      },
      {
        value: 'en',
        label: this.i18nextPipe.transform(`translation:_languages.en`),
      },
    ];

    this.form = this.fb.group({
      block_remove: [false],
      created_at: [null],
      created_by_user_id: [null],
      deleted: [false],
      deleted_by_user_id: [null],
      id: [null],
      inserted_by_user: [true],
      locale: ['pt', Validators.required],
      name: [null, Validators.required],
      updated_at: [null],
      updated_by_user_id: [null],
      validated: [true],
    });
  }
}
