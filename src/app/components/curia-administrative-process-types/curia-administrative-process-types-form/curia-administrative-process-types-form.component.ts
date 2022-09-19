import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';

import { CuriaAdministrativeProcessType } from 'src/app/components/curia-administrative-process-types/curia-administrative-process-type.model';
import { getCuriaAdministrativeProcessType } from 'src/app/components/curia-administrative-process-types/reducers/curia-administrative-process-types.selectors';
import * as actions from 'src/app/components/curia-administrative-process-types/reducers/curia-administrative-process-types.actions';
import * as modalActions from '../../../shared/components/modals/curia-administrative-process-types-modal/reducers/curia-administrative-process-types-modal.actions';

@Component({
  selector: 'kyr-curia-administrative-process-types-form',
  templateUrl: './curia-administrative-process-types-form.component.html',
})
export class CuriaAdministrativeProcessTypesFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<CuriaAdministrativeProcessType>;
  modulePath = 'curia-administrative-process-types';

  selectorGetModel = getCuriaAdministrativeProcessType;
  actionRequestFail =
    actions.CuriaAdministrativeProcessTypesActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut =
    actions.CuriaAdministrativeProcessTypesActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost =
    actions.CuriaAdministrativeProcessTypesActionTypes.SuccessPost;
  actionRequestSetSelected = modalActions.RequestSetSelected;

  subtypeDescriptionOptions = [];

  initializeForm() {
    this.form = this.fb.group({
      block_remove: [false],
      created_at: [null],
      created_by_user_id: [null],
      deleted: [false],
      deleted_by_user_id: [null],
      entity_ekklesia_location_id: [null],
      id: [null],
      name: [null, Validators.required],
      subtype_description: [null],
      subtype_id: [null],
      updated_at: [null],
      updated_by_user_id: [null],
    });

    this.subtypeDescriptionOptions = [
      {
        label: null,
        value: null,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.option.party_provisions`
        ),
        value: 1,
      },
    ];
  }
}
