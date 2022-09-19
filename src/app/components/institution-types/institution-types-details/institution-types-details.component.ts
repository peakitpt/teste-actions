import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/institution-types.actions';
import { getInstitutionType } from '../reducers/institution-types.selectors';
import { Observable } from 'rxjs';
import { InstitutionType } from '../institution-type.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import { SnackBarService, TableDataSource } from '@peakitpt/ui-material';
import { Tab } from 'src/app/shared/components/details/fields/tab-field';
import { Section } from 'src/app/shared/components/details/fields/section-field';
import { IconField } from 'src/app/shared/components/details/fields/icon-field';
import { TextField } from 'src/app/shared/components/details/fields/text-field';
import { FormBuilder } from '@angular/forms';
import { ActionsSubject, Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { I18NextPipe } from 'angular-i18next';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'kyr-institution-types-details',
  templateUrl: './institution-types-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class InstitutionTypesDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<InstitutionType>;
  returnUrl = '/institution-types';
  modulePath = 'institution-types';
  viewName = 'InstitutionType';

  selectorGetModel = getInstitutionType;
  actionRequestFail = actions.InstitutionTypeActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;

  actionClearGet = actions.ClearGet;

  detailsFields: Tab[] = [];

  constructor(
    public store: Store<any>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public matDialog: MatDialog,
    public i18nextPipe: I18NextPipe,
    public http: HttpClient,
    public actionSubject: ActionsSubject,
    public snackBarService: SnackBarService,
    public fb: FormBuilder
  ) {
    super(
      store,
      router,
      route,
      sharedModule,
      matDialog,
      i18nextPipe,
      http,
      actionSubject,
      snackBarService
    );
  }

  afterGetModel() {
    super.afterGetModel();
    this.buildFields();
  }

  buildFields() {
    this.detailsFields = [
      new Tab({
        name: 'institution_type',
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':header.institution_type'
        ),
        fields: [
          new Section({
            id: 'institution-type',
            label: this.i18nextPipe.transform(
              `${this.modulePath}:header.institution_type`
            ),
            fields: [
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.name`
                ),
                model: this.model.name,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.locale`
                ),
                model: this.model.locale.toUpperCase(),
              }),
            ],
          }),
          new Section({
            id: 'options',
            label: this.i18nextPipe.transform(
              `${this.modulePath}:header.options`
            ),
            fields: [
              new IconField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.photo`
                ),
                model: this.model.photo,
                icon_true: 'check_box',
                icon_false: 'check_box_outline_blank',
              }),
              new IconField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.archpriestship`
                ),
                model: this.model.archpriestship,
                icon_true: 'check_box',
                icon_false: 'check_box_outline_blank',
              }),
              new IconField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.chapelry`
                ),
                model: this.model.chapelry,
                icon_true: 'check_box',
                icon_false: 'check_box_outline_blank',
              }),
              new IconField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.institution_gender`
                ),
                model: this.model.institution_gender,
                icon_true: 'check_box',
                icon_false: 'check_box_outline_blank',
              }),
              new IconField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.timetable`
                ),
                model: this.model.timetable,
                icon_true: 'check_box',
                icon_false: 'check_box_outline_blank',
              }),
              new IconField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.holidays`
                ),
                model: this.model.holidays,
                icon_true: 'check_box',
                icon_false: 'check_box_outline_blank',
              }),
              new IconField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.property`
                ),
                model: this.model.property,
                icon_true: 'check_box',
                icon_false: 'check_box_outline_blank',
              }),
              new IconField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.mandate`
                ),
                model: this.model.mandate,
                icon_true: 'check_box',
                icon_false: 'check_box_outline_blank',
              }),
              new IconField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.community`
                ),
                model: this.model.community,
                icon_true: 'check_box',
                icon_false: 'check_box_outline_blank',
              }),
              new IconField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.congregation`
                ),
                model: this.model.congregation,
                icon_true: 'check_box',
                icon_false: 'check_box_outline_blank',
              }),
              new IconField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.secular_institute`
                ),
                model: this.model.secular_institute,
                icon_true: 'check_box',
                icon_false: 'check_box_outline_blank',
              }),
              new IconField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.valences`
                ),
                model: this.model.valences,
                icon_true: 'check_box',
                icon_false: 'check_box_outline_blank',
              }),
              new IconField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.christian_life_centers_type`
                ),
                model: this.model.christian_life_centers_type,
                icon_true: 'check_box',
                icon_false: 'check_box_outline_blank',
              }),
              new IconField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.website_type_id`
                ),
                model: this.model.website_type_id,
                icon_true: 'check_box',
                icon_false: 'check_box_outline_blank',
              }),
              new IconField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.scholarity`
                ),
                model: this.model.scholarity,
                icon_true: 'check_box',
                icon_false: 'check_box_outline_blank',
              }),
              new IconField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.social_media`
                ),
                model: this.model.social_media,
                icon_true: 'check_box',
                icon_false: 'check_box_outline_blank',
              }),
              new IconField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.periodicity_id`
                ),
                model: this.model.periodicity_id,
                icon_true: 'check_box',
                icon_false: 'check_box_outline_blank',
              }),
              new IconField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.historical_note`
                ),
                model: this.model.historical_note,
                icon_true: 'check_box',
                icon_false: 'check_box_outline_blank',
              }),
              new IconField({
                label: this.i18nextPipe.transform(
                  `${this.modulePath}:model.observations`
                ),
                model: this.model.observations,
                icon_true: 'check_box',
                icon_false: 'check_box_outline_blank',
              }),
            ],
          }),
        ],
      }),
    ];
  }
}
