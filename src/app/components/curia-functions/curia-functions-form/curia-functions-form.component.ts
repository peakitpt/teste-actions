import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  BaseFormComponent,
  ModalMenuOption,
} from 'src/app/shared/components/base-form-component';
import { SnackBarService } from '@peakitpt/ui-material';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { SelectedModalRow } from 'src/app/shared/shared.model';

import { CuriaFunction } from 'src/app/components/curia-functions/curia-function.model';
import * as actions from 'src/app/components/curia-functions/reducers/curia-functions.actions';
import { getCuriaFunction } from '../reducers/curia-functions.selectors';
import { State } from 'src/app/components/curia-functions/reducers/curia-functions.reducer';

import { State as AppointmentTypesState } from 'src/app/shared/components/modals/appointment-types-modal/reducers/appointment-types-modal.reducer';
import { getAppointmentTypesSelected } from 'src/app/shared/components/modals/appointment-types-modal/reducers/appointment-types-modal.selectors';

@Component({
  selector: 'kyr-curia-functions-form',
  templateUrl: './curia-functions-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CuriaFunctionsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<CuriaFunction>;
  modulePath = 'curia-functions';
  preFillWithNew = true;

  // Selectors & actions
  selectorGetModel = getCuriaFunction;
  actionRequestFail = actions.CuriaFunctionsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.CuriaFunctionsActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.CuriaFunctionsActionTypes.SuccessPost;
  actionRequestGetNew = actions.RequestGetNew;

  // Selectors & actions END

  /* This specific's component fields */
  localeOptions: Array<{ label: string; value: string }> = [];

  appointmentTypesMenuOptions: ModalMenuOption[] = [];

  constructor(
    public store: Store<State>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    private appointmentTypesStore: Store<AppointmentTypesState>
  ) {
    super(
      store,
      router,
      route,
      sharedModule,
      fb,
      i18nextPipe,
      snackBarService,
      actionSubject
    );
  }

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
      abbreviated_name: [null],
      appointment_type_description: [null, Validators.required],
      appointment_type_id: [null, Validators.required],
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

  ngOnInit() {
    super.ngOnInit();
    this.setAppointmentTypesModal();
  }

  clearModalInputs() {
    ['appointment_type_description', 'appointment_type_id'].forEach(
      (field: string) => this.affectField(field, null)
    );
  }

  menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'clear_appointment-type_modal':
        if (inputName) {
          this.affectField(`${inputName}_id`, null);
          this.affectField(`${inputName}_description`, null);
        }
        break;
      case 'view_selected_appointment-type':
        if (inputName) {
          const id = this.form.get(`${inputName}_id`).value;
          if (id) {
            this.openDetails('appointment-types', id);
          }
        }
        break;
      case 'quick_insertion_appointment-type':
        this.openQuickInsertionModal(
          'quick-insert-appointment-types-modal',
          inputName
        );
        break;
      default:
        super.menuClick(event, inputName);
        break;
    }
  }

  // THIS FORM SPECIFIC FUNCTIONS [START]
  private setAppointmentTypesModal() {
    this.appointmentTypesMenuOptions =
      this.defaultModalMenu('appointment-type');

    this.subs.push(
      this.appointmentTypesStore
        .select(getAppointmentTypesSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.affectField(`${row.inputName}_id`, row.model.id);
            this.affectField(`${row.inputName}_description`, row.model.name);
          }
        })
    );
  }
  // THIS FORM SPECIFIC FUNCTIONS [END]
}
