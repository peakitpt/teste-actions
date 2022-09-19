import { ActionsSubject } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { FormBuilder, Validators } from '@angular/forms';
import { State } from '../reducers/treasury-locations.reducer';
import { Observable } from 'rxjs';
import { I18NextPipe } from 'angular-i18next';
import * as actions from '../reducers/treasury-locations.actions';
import { SnackBarService } from '@peakitpt/ui-material';
import { getTreasuryLocation } from '../reducers/treasury-locations.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { TreasuryLocation } from '../treasury-location.model';
import { SharedModule } from 'src/app/shared/shared.module';
import {
  CheckboxField,
  InputField,
  RowField,
  SectionField,
  TabField,
  TabGroupField,
} from 'src/app/shared/components/form/fields';

@Component({
  selector: 'kyr-treasury-locations-form',
  templateUrl: './treasury-locations-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class TreasuryLocationsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<TreasuryLocation>;
  modulePath = 'treasury-locations';
  formFields: any[] = [];
  preFillWithNew = true;

  selectorGetModel = getTreasuryLocation;
  actionRequestFail =
    actions.TreasuryLocationsActionTypes.RequestFailTreasuryLocations;
  actionRequestGetAll = actions.RequestGetAllTreasuryLocations;
  actionRequestGetOne = actions.RequestGetTreasuryLocation;
  actionRequestPut = actions.RequestPutTreasuryLocation;
  actionSuccessPut =
    actions.TreasuryLocationsActionTypes.SuccessPutTreasuryLocation;
  actionRequestPost = actions.RequestPostTreasuryLocation;
  actionSuccessPost =
    actions.TreasuryLocationsActionTypes.SuccessPostTreasuryLocation;

  constructor(
    public store: Store<State>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject
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

  ngAfterViewInit() {
    super.ngAfterViewInit();
    if (!this.id) {
      this.buildFields();
    }
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);
    this.buildFields();
  }

  initializeForm() {
    this.form = this.fb.group({
      active: [false, Validators.required],
      created_at: [null],
      created_by_user_id: [null],
      deleted: [false],
      deleted_by_user_id: [null],
      entity_ekklesia_location_id: [null],
      id: [null],
      name: [null, Validators.required],
      updated_at: [null],
      updated_by_user_id: [null],
    });
  }

  buildFields() {
    this.formFields = [
      new SectionField({
        label: `${this.modulePath}:header.treasury_location`,
        fields: [
          new RowField({
            fields: [
              new CheckboxField({
                label: `${this.modulePath}:model.active`,
                form: this.form.get('active'),
                name: 'active',
              }),
              new InputField({
                label: `${this.modulePath}:model.name`,
                form: this.form.get('name'),
                name: 'name',
                required: true,
              }),
            ],
          }),
        ],
      }),
    ];
  }
}
