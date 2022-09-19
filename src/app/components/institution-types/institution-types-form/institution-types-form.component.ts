import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { CheckboxField } from 'src/app/shared/components/form/fields/checkbox-field';
import { InputField } from 'src/app/shared/components/form/fields/input-field';
import { RowField } from 'src/app/shared/components/form/fields/row-field';
import { SectionField } from 'src/app/shared/components/form/fields/section-field';
import { InstitutionType } from '../institution-type.model';
import * as actions from '../reducers/institution-types.actions';
import { getInstitutionType } from '../reducers/institution-types.selectors';
import { State } from 'src/app/components/institution-types/reducers/institution-types.reducer';
import { SelectField } from 'src/app/shared/components/form/fields';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from '@peakitpt/ui-material';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'kyr-institution-types-form',
  templateUrl: './institution-types-form.component.html',
})
export class InstitutionTypesFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<InstitutionType>;
  modulePath = 'institution-types';

  selectorGetModel = getInstitutionType;
  actionRequestFail = actions.InstitutionTypeActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.InstitutionTypeActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.InstitutionTypeActionTypes.SuccessPost;

  formFields: any[] = [];
  preFillWithNew = true;

  localeOptions: any[] = [];

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

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    if (!this.id) {
      this.buildFields();
    }
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.store.dispatch(new actions.ClearGet());
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);
    this.buildFields();
  }

  initializeForm() {
    this.form = this.fb.group({
      archpriestship: [false],
      block_remove: [false],
      chapelry: [false],
      christian_life_centers_type: [false],
      community: [false],
      congregation: [false],
      created_at: [null],
      created_by_user_id: [null],
      deleted: [false],
      deleted_by_user_id: [null],
      historical_note: [false],
      holidays: [false],
      id: [],
      inserted_by_user: [true],
      institution_gender: [false],
      locale: [null],
      mandate: [false],
      name: [null],
      observations: [false],
      periodicity_id: [false],
      photo: [false],
      property: [false],
      scholarity: [false],
      secular_institute: [false],
      social_media: [false],
      timetable: [false],
      updated_at: [null],
      updated_by_user_id: [null],
      valences: [false],
      validated: [false],
      website_type_id: [false],
    });

    this.localeOptions = [
      {
        value: 'pt',
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.localeOptions.portuguese`
        ),
      },
      {
        value: 'es',
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.localeOptions.spanish`
        ),
      },
      {
        value: 'en',
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.localeOptions.english`
        ),
      },
    ];
  }

  buildFields() {
    this.formFields = [
      new SectionField({
        id: 'institution-type',
        label: `${this.modulePath}:header.institution_type`,
        fields: [
          new RowField({
            fields: [
              new InputField({
                label: `${this.modulePath}:model.name`,
                form: this.form.get('name'),
              }),
              new SelectField({
                label: `${this.modulePath}:model.locale`,
                form: this.form.get('locale'),
                name: 'locale',
                options: this.localeOptions,
              }),
            ],
          }),
        ],
      }),
      new SectionField({
        id: 'options',
        label: `${this.modulePath}:header.options`,
        fields: [
          new RowField({
            fields: [
              new CheckboxField({
                label: `${this.modulePath}:model.photo`,
                form: this.form.get('photo'),
              }),
              new CheckboxField({
                label: `${this.modulePath}:model.archpriestship`,
                form: this.form.get('archpriestship'),
              }),
              new CheckboxField({
                label: `${this.modulePath}:model.chapelry`,
                form: this.form.get('chapelry'),
              }),
              new CheckboxField({
                label: `${this.modulePath}:model.institution_gender`,
                form: this.form.get('institution_gender'),
              }),
            ],
          }),
          new RowField({
            fields: [
              new CheckboxField({
                label: `${this.modulePath}:model.timetable`,
                form: this.form.get('timetable'),
              }),
              new CheckboxField({
                label: `${this.modulePath}:model.holidays`,
                form: this.form.get('holidays'),
              }),
              new CheckboxField({
                label: `${this.modulePath}:model.property`,
                form: this.form.get('property'),
              }),
              new CheckboxField({
                label: `${this.modulePath}:model.mandate`,
                form: this.form.get('mandate'),
              }),
            ],
          }),
          new RowField({
            fields: [
              new CheckboxField({
                label: `${this.modulePath}:model.community`,
                form: this.form.get('community'),
              }),
              new CheckboxField({
                label: `${this.modulePath}:model.congregation`,
                form: this.form.get('congregation'),
              }),
              new CheckboxField({
                label: `${this.modulePath}:model.secular_institute`,
                form: this.form.get('secular_institute'),
              }),
              new CheckboxField({
                label: `${this.modulePath}:model.valences`,
                form: this.form.get('valences'),
              }),
            ],
          }),
          new RowField({
            fields: [
              new CheckboxField({
                label: `${this.modulePath}:model.christian_life_centers_type`,
                form: this.form.get('christian_life_centers_type'),
              }),
              new CheckboxField({
                label: `${this.modulePath}:model.website_type_id`,
                form: this.form.get('website_type_id'),
              }),
              new CheckboxField({
                label: `${this.modulePath}:model.scholarity`,
                form: this.form.get('scholarity'),
              }),
              new CheckboxField({
                label: `${this.modulePath}:model.social_media`,
                form: this.form.get('social_media'),
              }),
            ],
          }),
          new RowField({
            fields: [
              new CheckboxField({
                label: `${this.modulePath}:model.periodicity_id`,
                form: this.form.get('periodicity_id'),
              }),
              new CheckboxField({
                label: `${this.modulePath}:model.historical_note`,
                form: this.form.get('historical_note'),
              }),
              new CheckboxField({
                label: `${this.modulePath}:model.observations`,
                form: this.form.get('observations'),
              }),
            ],
          }),
        ],
      }),
    ];
  }
}
