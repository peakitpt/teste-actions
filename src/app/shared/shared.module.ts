import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UiMaterialModule } from '@peakitpt/ui-material';
import { I18NextPipe, I18NextModule } from 'angular-i18next';
import { ReportsGroupsService } from '@peakitpt/ui-kyrios-api';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import * as moment from 'moment';
import { EnvironmentImpl } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State as BaseState } from 'src/app/components/base/reducers/base.reducer';
import { getUserInfo } from 'src/app/components/base/reducers/base.selectors';
import { AccessLogsService } from '@peakitpt/ui-kyrios-api';

import { UiTableFiltersComponent } from './components/ui/ui-table-filters/ui-table-filters.component';
import { UiTablePaginationComponent } from './components/ui/ui-table-pagination/ui-table-pagination.component';
import { UiTableSearchComponent } from './components/ui/ui-table-search/ui-table-search.component';
import { UiSearchTextComponent } from './components/ui/ui-search-text/ui-search-text.component';
import { UiReportsButton } from './components/ui/ui-reports-button/ui-reports-button.component';

// PIPES
import { SafePipe } from './pipes/safe.pipe';

// MODALS
import { ReportsGroupsModalComponent } from './components/modals/reports-groups-modal/reports-groups-modal.component';
import { CountriesModalComponent } from './components/modals/countries-modal/countries-modal.component';
import { PatronsModalComponent } from './components/modals/patrons-modal/patrons-modal.component';
import { GroupsModalComponent } from './components/modals/groups-modal/groups-modal.component';
import { BishopricsModalComponent } from './components/modals/bishoprics-modal/bishoprics-modal.component';
import { ChapelriesModalComponent } from './components/modals/chapelries-modal/chapelries-modal.component';
import { ArchpristshipsModalComponent } from './components/modals/archpristships-modal/archpristships-modal.component';
import { WorshipplacesModalComponent } from './components/modals/worshipplaces-modal/worshipplaces-modal.component';
import { FormationsModalComponent } from './components/modals/formations-modal/formations-modal.component';
import { PersonsModalComponent } from './components/modals/persons-modal/persons-modal.component';
import { ContentsModalComponent } from './components/modals/contents-modal/contents-modal.component';
import { SectionsModalComponent } from './components/modals/sections-modal/sections-modal.component';
import { SubscriptionLayoutsModalComponent } from './components/modals/subscription-layouts-modal/subscription-layouts-modal.component';
import { ParishionersModalComponent } from './components/modals/parishioners-modal/parishioners-modal.component';
import { FormationTypesModalComponent } from './components/modals/formation-types-modal/formation-types-modal.component';
import { PastoralAgentsTypesModalComponent } from './components/modals/pastoral-agents-types-modal/pastoral-agents-types-modal.component';
import { SubscriptionsModalComponent } from './components/modals/subscriptions-modal/subscriptions-modal.component';
import { PriestsModalComponent } from './components/modals/priests-modal/priests-modal.component';
import { CuriaFunctionsModalComponent } from './components/modals/curia-functions-modal/curia-functions-modal.component';
import { PlacesModalComponent } from './components/modals/places-modal/places-modal.component';
import { LayoutsModalComponent } from './components/modals/layouts-modal/layouts-modal.component';
import { NumerationsModalComponent } from './components/modals/numerations-modal/numerations-modal.component';
import { UsersModalComponent } from './components/modals/users-modal/users-modal.component';
import { ReportsGroupersModalComponent } from './components/modals/reports-groupers-modal/reports-groupers-modal.component';
import { ReportsModalComponent } from './components/modals/reports-modal/reports-modal.component';
import { EmolumentsModalComponent } from './components/modals/emoluments-modal/emoluments-modal.component';
import { GenerateDocConfirmationModalComponent } from './components/modals/generate-doc-confirmation-modal/generate-doc-confirmation-modal.component';
import { PriestsAndPersonsModalComponent } from './components/modals/priests-and-persons-modal/priests-and-persons-modal.component';
import { DocumentsTypesModalComponent } from './components/modals/documents-types-modal/documents-types-modal.component';
import { NewslettersLayoutsModalComponent } from './components/modals/newsletters-layouts-modal/newsletters-layouts-modal.component';
import { NewsletterSubscriptionsModalComponent } from './components/modals/newsletter-subscriptions-modal/newsletter-subscriptions-modal.component';
import { AccrualTypesModalComponent } from './components/modals/accrual-types-modal/accrual-types-modal.component';
import { AccountingChartAccountsModalComponent } from './components/modals/accounting-chart-accounts-modal/accounting-chart-accounts-modal.component';
import { AccountingTaxonomyCodesModalComponent } from './components/modals/accounting-taxonomy-codes-modal/accounting-taxonomy-codes-modal.component';
import { AccountingTaxonomyReferencesModalComponent } from './components/modals/accounting-taxonomy-references-modal/accounting-taxonomy-references-modal.component';
import { Baptism } from '../components/baptisms/baptism.model';
import { DetailsComponent } from './components/details/details.component';
import { NgTemplateNameDirective } from './components/ng-template-name.directive';
import { FormComponent } from './components/form/form.component';
import { InputSelectFieldComponent } from './components/form/components/input-select-field.component';
import { InputFieldComponent } from './components/form/components/input-field.component';
import { DateFieldComponent } from './components/form/components/date-field.component';
import { TableFieldComponent } from './components/form/components/table-field.component';
import { TextAreaFieldComponent } from './components/form/components/text-area-field.component';
import { TabGroupFieldComponent } from './components/form/components/tab-group-field.component';
import { ImageFieldComponent } from './components/form/components/image-field.component';
import { ChipsFieldComponent } from './components/form/components/chips-field.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ClergyTypesModalComponent } from './components/modals/clergy-types-modal/clergy-types-modal.component';
import { CuriaAdministrativeProcessTypesModalComponent } from './components/modals/curia-administrative-process-types-modal/curia-administrative-process-types-modal.component';
import { InstitutionsModalComponent } from './components/modals/institutions-modal/institutions-modal.component';

import { AccountingCostCentersModalComponent } from './components/modals/accounting-cost-centers-modal/accounting-cost-centers-modal.component';
import { AccountingJournalsModalComponent } from './components/modals/accounting-journals-modal/accounting-journals-modal.component';
import { AccountingTransactionDocumentTypesModalComponent } from './components/modals/accounting-transaction-document-types-modal/accounting-transaction-document-types-modal.component';
import { PriestsV1ModalComponent } from './components/modals/priests-v1-modal/priests-v1-modal.component';
import { ComplexTreeFieldComponent } from './components/form/components/complex-tree-field.component';
import { InstitutionsTypesModalComponent } from './components/modals/institutions-types-modal/institutions-types-modal.component';
import { CuriaSecretariatTypesModalComponent } from './components/modals/curia-secretariat-types-modal/curia-secretariat-types-modal.component';
import { ViewsModalComponent } from './components/modals/views-modal/views-modal.component';
import { AppointmentTypesModalComponent } from './components/modals/appointment-types-modal/appointment-types-modal.component';
import { CuriaProvisionTypesModalComponent } from './components/modals/curia-provision-types-modal/curia-provision-types-modal.component';
import { ValencesModalComponent } from './components/modals/valences-modal/valences-modal.component';

@NgModule({
  declarations: [
    UiTableFiltersComponent,
    UiTablePaginationComponent,
    UiTablePaginationComponent,
    UiTableSearchComponent,
    UiSearchTextComponent,
    UiReportsButton,
    // PIPES
    SafePipe,
    // MODALS
    ReportsGroupsModalComponent,
    CountriesModalComponent,
    PatronsModalComponent,
    BishopricsModalComponent,
    GroupsModalComponent,
    ChapelriesModalComponent,
    ArchpristshipsModalComponent,
    WorshipplacesModalComponent,
    PersonsModalComponent,
    FormationsModalComponent,
    ContentsModalComponent,
    SectionsModalComponent,
    ParishionersModalComponent,
    FormationTypesModalComponent,
    PastoralAgentsTypesModalComponent,
    SubscriptionLayoutsModalComponent,
    SubscriptionsModalComponent,
    PriestsModalComponent,
    PriestsV1ModalComponent,
    SubscriptionsModalComponent,
    CuriaFunctionsModalComponent,
    PlacesModalComponent,
    LayoutsModalComponent,
    NumerationsModalComponent,
    UsersModalComponent,
    ReportsGroupersModalComponent,
    ReportsModalComponent,
    EmolumentsModalComponent,
    GenerateDocConfirmationModalComponent,
    PriestsAndPersonsModalComponent,
    DocumentsTypesModalComponent,
    NewslettersLayoutsModalComponent,
    NewsletterSubscriptionsModalComponent,
    AccrualTypesModalComponent,
    AccountingChartAccountsModalComponent,
    AccountingTaxonomyCodesModalComponent,
    AccountingTaxonomyReferencesModalComponent,
    CuriaSecretariatTypesModalComponent,
    CuriaAdministrativeProcessTypesModalComponent,
    InstitutionsModalComponent,
    ViewsModalComponent,
    AppointmentTypesModalComponent,
    CuriaProvisionTypesModalComponent,

    DetailsComponent,
    FormComponent,
    InputSelectFieldComponent,
    InputFieldComponent,
    DateFieldComponent,
    TableFieldComponent,
    TextAreaFieldComponent,
    TabGroupFieldComponent,
    ImageFieldComponent,
    ChipsFieldComponent,
    ClergyTypesModalComponent,
    NgTemplateNameDirective,
    ComplexTreeFieldComponent,

    AccountingCostCentersModalComponent,
    AccountingJournalsModalComponent,
    AccountingTransactionDocumentTypesModalComponent,

    InstitutionsTypesModalComponent,
    ValencesModalComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    UiMaterialModule,
    I18NextModule,
    MatCheckboxModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatTabsModule,
    RouterModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    UiReportsButton,
    // Components
    UiTableFiltersComponent,
    UiTablePaginationComponent,
    UiTablePaginationComponent,
    UiTableSearchComponent,
    UiSearchTextComponent,
    // PIPES
    SafePipe,
    // MODALS
    ReportsGroupsModalComponent,
    CountriesModalComponent,
    PatronsModalComponent,
    BishopricsModalComponent,
    GroupsModalComponent,
    ChapelriesModalComponent,
    ArchpristshipsModalComponent,
    WorshipplacesModalComponent,
    PersonsModalComponent,
    FormationsModalComponent,
    ContentsModalComponent,
    SectionsModalComponent,
    ParishionersModalComponent,
    FormationTypesModalComponent,
    PastoralAgentsTypesModalComponent,
    SubscriptionsModalComponent,
    PriestsModalComponent,
    PriestsV1ModalComponent,
    SubscriptionsModalComponent,
    CuriaFunctionsModalComponent,
    PlacesModalComponent,
    NumerationsModalComponent,
    UsersModalComponent,
    ReportsGroupersModalComponent,
    ReportsModalComponent,
    EmolumentsModalComponent,
    GenerateDocConfirmationModalComponent,
    PriestsAndPersonsModalComponent,
    DocumentsTypesModalComponent,
    NewslettersLayoutsModalComponent,
    NewsletterSubscriptionsModalComponent,
    AccrualTypesModalComponent,
    AccountingChartAccountsModalComponent,
    AccountingTaxonomyCodesModalComponent,
    AccountingTaxonomyReferencesModalComponent,
    CuriaSecretariatTypesModalComponent,
    CuriaAdministrativeProcessTypesModalComponent,
    ViewsModalComponent,
    AppointmentTypesModalComponent,
    CuriaProvisionTypesModalComponent,

    DetailsComponent,
    FormComponent,
    // InputSelectFieldComponent,
    ClergyTypesModalComponent,
    NgTemplateNameDirective,

    AccountingCostCentersModalComponent,
    AccountingJournalsModalComponent,
    AccountingTransactionDocumentTypesModalComponent,
  ],
  entryComponents: [],
  providers: [ReportsGroupsService, DatePipe, AccessLogsService],
})
export class SharedModule {
  static USER_PAROQUIA = 'Paroquia';
  static USER_USERS = 'Users';
  static USER_SUPERUSERS = 'SuperUsers';
  static USER_PAROQUIANOS = 'Paroquianos';
  static USER_LOCAL = 'Local';
  static USER_DIOCESES = 'Dioceses';
  static USER_ARCIPRESTADOS = 'Arciprestados';
  static USER_SACERDOTE = 'Sacerdote';
  static USER_INSTITUTIONS = 'Institutions';

  readonly PATTERN_EMAIL = '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$';
  readonly PATTERN_HOUR = '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$';
  readonly ERROR_COLOR = '#ff8080';
  readonly SUCCESS_COLOR = '#66ff99';
  readonly WARN_COLOR = '#FFB204';

  constructor(
    private i18nextPipe: I18NextPipe,
    private datepipe: DatePipe,
    private baseStore: Store<BaseState>,
    private accessLogsService: AccessLogsService
  ) {}

  logAccess(subs: Subscription[], modulePath: string, route: ActivatedRoute) {
    subs.push(
      this.baseStore.select(getUserInfo).subscribe((user: any) => {
        if (user) {
          const user_id = +user.payload.user.id;
          const entity_ekklesia_location_id =
            +localStorage.getItem('subscriptionId');

          const path = route.snapshot.url.join('/');

          this.accessLogsService
            .create({
              route: path
                ? [modulePath, path].join('/')
                : `${modulePath}/index`,
              user_id,
              entity_ekklesia_location_id,
            })
            .subscribe((_result: any) => {
              // Resolve the request but do nothing with the result
            });
        }
      })
    );
  }

  isDiocese(entity?: any): boolean {
    const entityType = entity?.entity_type_id
      ? entity?.entity_type_id
      : localStorage.getItem('subscriptionTypeId');
    return entityType ? +entityType === 9 : false;
  }

  checkIfEntityType(typeName: string, entity: any): boolean {
    switch (typeName) {
      case SharedModule.USER_PAROQUIA:
        return entity.entity_type_id === 2;
      case SharedModule.USER_USERS:
        return entity.entity_type_id === 3;
      case SharedModule.USER_SUPERUSERS:
        return entity.entity_type_id === 4;
      case SharedModule.USER_PAROQUIANOS:
        return entity.entity_type_id === 5;
      case SharedModule.USER_LOCAL:
        return entity.entity_type_id === 8;
      case SharedModule.USER_DIOCESES:
        return entity.entity_type_id === 9;
      case SharedModule.USER_ARCIPRESTADOS:
        return entity.entity_type_id === 10;
      case SharedModule.USER_SACERDOTE:
        return entity.entity_type_id === 11;
      case SharedModule.USER_INSTITUTIONS:
        return entity.entity_type_id === 13;
    }
    return false;
  }

  patternErrorMessage(form: FormGroup, inputName: string): string {
    return form.get(inputName).errors?.pattern
      ? this.i18nextPipe.transform('translation:message.invalid_format')
      : '';
  }

  isSmallScreen(): boolean {
    return window.innerWidth < 550;
  }

  isDuplicateMode(route: ActivatedRoute): boolean {
    return (
      route.snapshot.url.length > 1 &&
      route.snapshot.url[1].path === 'duplicate'
    );
  }

  parseDateToString(date: string | Date, format?: string): string {
    if (!format) {
      format = this.i18nextPipe.transform('translation:format.date');
    }
    if (typeof date === 'string') {
      date = this.dateToUtc(date);
    }
    return this.datepipe.transform(date, format);
  }

  dateToUtc(date: string | Date): string {
    return moment.utc(date, 'DD/MM/YYYY HH:mm').format();
  }

  getFormattedHour(date = new Date()): string {
    return `${('0' + new Date(date).getHours()).substr(-2)}:${(
      '0' + new Date(date).getMinutes()
    ).substr(-2)}`;
  }

  calculateAge(
    from: Date | string,
    to?: Date | string,
    untilToday = true
  ): number {
    if (!from || (!to && !untilToday)) {
      return null;
    }
    if (!to && untilToday) {
      to = new Date();
    }
    if (to && !untilToday) {
      to = new Date(to);
    }

    from = new Date(from);
    const removeOneYear =
      to <
      new Date(
        new Date(to).getFullYear() +
          '-' +
          (new Date(from).getMonth() + 1) +
          '-' +
          new Date(from).getDate()
      );

    let age = new Date(to).getFullYear() - new Date(from).getFullYear();
    if (removeOneYear) {
      age -= 1;
    }

    return age < 0 ? null : age;
  }

  getPagerMenu(): any[] {
    return [
      {
        name: this.i18nextPipe.transform('translation:table.items_to_show'),
        isTitle: true,
      },
      {
        name: this.i18nextPipe.transform('translation:table.item', {
          count: 5,
        }),
        value: 'limit_5',
      },
      {
        name: this.i18nextPipe.transform('translation:table.item', {
          count: 10,
        }),
        value: 'limit_10',
      },
      {
        name: this.i18nextPipe.transform('translation:table.item', {
          count: 20,
        }),
        value: 'limit_20',
      },
      {
        name: this.i18nextPipe.transform('translation:table.item', {
          count: 30,
        }),
        value: 'limit_30',
      },
      {
        name: this.i18nextPipe.transform('translation:table.item', {
          count: 50,
        }),
        value: 'limit_50',
      },
      {
        name: this.i18nextPipe.transform('translation:table.item', {
          count: 100,
        }),
        value: 'limit_100',
      },
      {
        name: this.i18nextPipe.transform('translation:table.item', {
          count: 1000,
        }),
        value: 'limit_1000',
      },
      {
        name: this.i18nextPipe.transform('translation:table.item', {
          count: 5000,
        }),
        value: 'limit_5000',
      },
      // {
      //   name: this.i18nextPipe.transform('translation:table.item'),
      //   value: 'limit_all',
      // },
    ];
  }

  // Baptism || Wedding || CuriaBaptism || CuriaWedding
  visibleSendToCuria(model: Baptism): boolean {
    if (+localStorage.getItem('subscriptionTypeId') !== 2) {
      return false;
    }

    return (
      model &&
      !model.blocked &&
      (!model.process_id ||
        (model.process_id && model.curia_status !== 'rejected'))
    );
  }

  // Provided the file partial @path, returns the full download link being aware of the current environment
  getUploadFileLink(environment: EnvironmentImpl, path: string): string {
    if (!path) {
      return 'assets/image-placeholder-350x350.png';
    } else if (path.startsWith('/files') || path.startsWith('/uploads')) {
      return `${environment.railsAppUrl}${path}`;
    } else if (path.startsWith('/var/www')) {
      return `${environment.railsAppUrl}${path.split('public')[1]}`;
    } else if (path.startsWith('/filemanagers')) {
      try {
        return this.getUploadFileLink(
          environment,
          atob(path.split('?f=')[1].split('&fn=')[0])
        );
      } catch {
        return this.getUploadFileLink(
          environment,
          `${path.split('?f=')[1].split('&fn=')[0]}`
        );
      }
    } else if (path.startsWith('/app/public/uploads/RackMultipart')) {
      return `${environment.railsAppUrl}${path.split('public')[1]}`;
    } else if (path.startsWith('public/uploads/tmp/')) {
      return `${environment.apiUploaderUrl}${path.split('uploads')[1]}`;
    } else {
      return `${environment.apiUploaderUrl}/${path}`;
    }
  }

  // DATASOURCES (selects)
  getWeekdays(): Array<{ label: string; value: number }> {
    return [
      {
        label: this.i18nextPipe.transform('translation:weekdays.monday'),
        value: 1,
      },
      {
        label: this.i18nextPipe.transform('translation:weekdays.tuesday'),
        value: 2,
      },
      {
        label: this.i18nextPipe.transform('translation:weekdays.wednesday'),
        value: 3,
      },
      {
        label: this.i18nextPipe.transform('translation:weekdays.thursday'),
        value: 4,
      },
      {
        label: this.i18nextPipe.transform('translation:weekdays.friday'),
        value: 5,
      },
      {
        label: this.i18nextPipe.transform('translation:weekdays.saturday'),
        value: 6,
      },
      {
        label: this.i18nextPipe.transform('translation:weekdays.sunday'),
        value: 7,
      },
    ];
  }

  getMonths(): Array<{ label: string; value: number }> {
    return [
      {
        label: this.i18nextPipe.transform('translation:months.january'),
        value: 1,
      },
      {
        label: this.i18nextPipe.transform('translation:months.february'),
        value: 2,
      },
      {
        label: this.i18nextPipe.transform('translation:months.march'),
        value: 3,
      },
      {
        label: this.i18nextPipe.transform('translation:months.april'),
        value: 4,
      },
      { label: this.i18nextPipe.transform('translation:months.may'), value: 5 },
      {
        label: this.i18nextPipe.transform('translation:months.june'),
        value: 6,
      },
      {
        label: this.i18nextPipe.transform('translation:months.july'),
        value: 7,
      },
      {
        label: this.i18nextPipe.transform('translation:months.august'),
        value: 8,
      },
      {
        label: this.i18nextPipe.transform('translation:months.september'),
        value: 9,
      },
      {
        label: this.i18nextPipe.transform('translation:months.october'),
        value: 10,
      },
      {
        label: this.i18nextPipe.transform('translation:months.november'),
        value: 11,
      },
      {
        label: this.i18nextPipe.transform('translation:months.december'),
        value: 12,
      },
    ];
  }

  getBooleanoptions(): Array<{ label: string; value: any }> {
    return [
      {
        label: this.i18nextPipe.transform('translation:all'),
        value: '',
      },
      {
        label: this.i18nextPipe.transform('translation:yes'),
        value: true,
      },
      {
        label: this.i18nextPipe.transform('translation:no'),
        value: false,
      },
    ];
  }

  getGenders(): Array<{ label: string; value: boolean }> {
    return [
      {
        label: this.i18nextPipe.transform('translation:gender.male'),
        value: true,
      },
      {
        label: this.i18nextPipe.transform('translation:gender.female'),
        value: false,
      },
    ];
  }

  getQualifications(): Array<{ label: string; value: number }> {
    return [
      {
        label: '----',
        value: null,
      },
      {
        label: this.i18nextPipe.transform(
          'translation:qualifications.less_than_four_years'
        ),
        value: 1,
      },
      {
        label: this.i18nextPipe.transform(
          'translation:qualifications.first_cicle'
        ),
        value: 2,
      },
      {
        label: this.i18nextPipe.transform(
          'translation:qualifications.second_cicle'
        ),
        value: 3,
      },
      {
        label: this.i18nextPipe.transform(
          'translation:qualifications.third_cicle'
        ),
        value: 4,
      },
      {
        label: this.i18nextPipe.transform(
          'translation:qualifications.level_three_professional_technical'
        ),
        value: 5,
      },
      {
        label: this.i18nextPipe.transform(
          'translation:qualifications.high_school'
        ),
        value: 6,
      },
      {
        label: this.i18nextPipe.transform(
          'translation:qualifications.bachelor_degree'
        ),
        value: 7,
      },
      {
        label: this.i18nextPipe.transform(
          'translation:qualifications.graduation'
        ),
        value: 8,
      },
      {
        label: this.i18nextPipe.transform(
          'translation:qualifications.masters_degree'
        ),
        value: 9,
      },
      {
        label: this.i18nextPipe.transform('translation:qualifications.phd'),
        value: 10,
      },
      {
        label: this.i18nextPipe.transform(
          'translation:qualifications.illiterate'
        ),
        value: 11,
      },
    ];
  }

  getDocumentTypes(): Array<{ label: string; value: string }> {
    return [
      {
        label: '----',
        value: null,
      },
      {
        label: this.i18nextPipe.transform(
          'translation:identification_document_types.identity_card'
        ),
        value: 'Bilhete de Identidade',
      },
      {
        label: this.i18nextPipe.transform(
          'translation:identification_document_types.citizen_card'
        ),
        value: 'Cartão de Cidadão',
      },
      {
        label: this.i18nextPipe.transform(
          'translation:identification_document_types.passport'
        ),
        value: 'Passaporte',
      },
      {
        label: this.i18nextPipe.transform(
          'translation:identification_document_types.residence_title'
        ),
        value: 'Título de Residência',
      },
    ];
  }

  getFrequencies(): Array<{ label: string; value: number }> {
    return [
      {
        label: this.i18nextPipe.transform('translation:frequency.daily'),
        value: 1,
      },
      {
        label: this.i18nextPipe.transform('translation:frequency.weekly'),
        value: 2,
      },
      {
        label: this.i18nextPipe.transform('translation:frequency.quarterly'),
        value: 3,
      },
      {
        label: this.i18nextPipe.transform('translation:frequency.monthly'),
        value: 4,
      },
      {
        label: this.i18nextPipe.transform('translation:frequency.yearly'),
        value: 5,
      },
    ];
  }

  getCivilStatuses(): Array<{ label: string; value: number }> {
    return [
      {
        label: '----',
        value: null,
      },
      {
        label: this.i18nextPipe.transform(
          'translation:civil_statuses.catholic_married'
        ),
        value: 1,
      },
      {
        label: this.i18nextPipe.transform(
          'translation:civil_statuses.civil_married'
        ),
        value: 2,
      },
      {
        label: this.i18nextPipe.transform(
          'translation:civil_statuses.divorced'
        ),
        value: 3,
      },
      {
        label: this.i18nextPipe.transform(
          'translation:civil_statuses.civil_divorced'
        ),
        value: 4,
      },
      {
        label: this.i18nextPipe.transform(
          'translation:civil_statuses.divorced_not_remarried'
        ),
        value: 5,
      },
      {
        label: this.i18nextPipe.transform(
          'translation:civil_statuses.divorced_remarried'
        ),
        value: 6,
      },
      {
        label: this.i18nextPipe.transform(
          'translation:civil_statuses.legally_separated'
        ),
        value: 7,
      },
      {
        label: this.i18nextPipe.transform('translation:civil_statuses.single'),
        value: 8,
      },
      {
        label: this.i18nextPipe.transform('translation:civil_statuses.union'),
        value: 9,
      },
      {
        label: this.i18nextPipe.transform('translation:civil_statuses.widower'),
        value: 10,
      },
      {
        label: this.i18nextPipe.transform(
          'translation:civil_statuses.deceased'
        ),
        value: 11,
      },
      {
        label: this.i18nextPipe.transform('translation:civil_statuses.other'),
        value: 12,
      },
    ];
  }

  getWeddingTypes(): Array<{ label: string; value: string }> {
    return [
      {
        label: '----',
        value: null,
      },
      {
        label: this.i18nextPipe.transform('translation:wedding_types.catholic'),
        value: 'Católico',
      },
      {
        label: this.i18nextPipe.transform('translation:wedding_types.civil'),
        value: 'Civil',
      },
      {
        label: this.i18nextPipe.transform('translation:wedding_types.union'),
        value: 'União de Facto',
      },
      {
        label: this.i18nextPipe.transform(
          'translation:wedding_types.not_married'
        ),
        value: 'Não casado(a)',
      },
    ];
  }

  getIdentificationDocsTypes(): Array<{ label: string; value: string }> {
    return [
      {
        label: '----',
        value: null,
      },
      {
        label: this.i18nextPipe.transform(
          'translation:identification_document_types.identity_card'
        ),
        value: this.i18nextPipe.transform(
          'translation:identification_document_types.identity_card'
        ),
      },
      {
        label: this.i18nextPipe.transform(
          'translation:identification_document_types.citizen_card'
        ),
        value: this.i18nextPipe.transform(
          'translation:identification_document_types.citizen_card'
        ),
      },
      {
        label: this.i18nextPipe.transform(
          'translation:identification_document_types.passport'
        ),
        value: this.i18nextPipe.transform(
          'translation:identification_document_types.passport'
        ),
      },
      {
        label: this.i18nextPipe.transform(
          'translation:identification_document_types.residence_title'
        ),
        value: this.i18nextPipe.transform(
          'translation:identification_document_types.residence_title'
        ),
      },
    ];
  }

  getPastoralAgentsTypesGroupsOptions(): Array<{
    label: string;
    value: string;
  }> {
    return [
      {
        label: this.i18nextPipe.transform(
          'translation:pastoral_agents_types_groups.pastoral_agents'
        ),
        value: 'pastoral_agents',
      },
      {
        label: this.i18nextPipe.transform(
          'translation:pastoral_agents_types_groups.ecclesia_activities'
        ),
        value: 'ecclesia_activities',
      },
      {
        label: this.i18nextPipe.transform(
          'translation:pastoral_agents_types_groups.animators'
        ),
        value: 'animators',
      },
      {
        label: this.i18nextPipe.transform(
          'translation:pastoral_agents_types_groups.departments'
        ),
        value: 'departments',
      },
      {
        label: this.i18nextPipe.transform(
          'translation:pastoral_agents_types_groups.adults_christian_education'
        ),
        value: 'adults_christian_education',
      },
      {
        label: this.i18nextPipe.transform(
          'translation:pastoral_agents_types_groups.teachers'
        ),
        value: 'teachers',
      },
      {
        label: this.i18nextPipe.transform(
          'translation:pastoral_agents_types_groups.universities'
        ),
        value: 'universities',
      },
    ];
  }

  getOftenEucharists(): Array<{ label: string; value: string }> {
    return [
      {
        value: null,
        label: '----',
      },
      {
        value: '1',
        label: this.i18nextPipe.transform('translation:frequency.daily'),
      },
      {
        value: '2',
        label: this.i18nextPipe.transform('translation:frequency.weekly'),
      },
      {
        value: '3',
        label: this.i18nextPipe.transform('translation:frequency.quarterly'),
      },
      {
        value: '4',
        label: this.i18nextPipe.transform('translation:frequency.monthly'),
      },
      {
        value: '5',
        label: this.i18nextPipe.transform('translation:frequency.yearly'),
      },
    ];
  }

  getCatechismYears(): Array<{ label: string; value: number }> {
    return [
      {
        value: null,
        label: '----',
      },
      {
        value: 1,
        label: this.i18nextPipe.transform('persons:catechism_years.1_year'),
      },
      {
        value: 2,
        label: this.i18nextPipe.transform('persons:catechism_years.2_year'),
      },
      {
        value: 3,
        label: this.i18nextPipe.transform('persons:catechism_years.3_year'),
      },
      {
        value: 4,
        label: this.i18nextPipe.transform('persons:catechism_years.4_year'),
      },
      {
        value: 5,
        label: this.i18nextPipe.transform('persons:catechism_years.5_year'),
      },
      {
        value: 6,
        label: this.i18nextPipe.transform('persons:catechism_years.6_year'),
      },
      {
        value: 7,
        label: this.i18nextPipe.transform('persons:catechism_years.7_year'),
      },
      {
        value: 8,
        label: this.i18nextPipe.transform('persons:catechism_years.8_year'),
      },
      {
        value: 9,
        label: this.i18nextPipe.transform('persons:catechism_years.9_year'),
      },
      {
        value: 10,
        label: this.i18nextPipe.transform('persons:catechism_years.10_year'),
      },
    ];
  }

  getLivesWith(): Array<{ label: string; value: string }> {
    return [
      {
        value: null,
        label: '----',
      },
      {
        value: 'b',
        label: this.i18nextPipe.transform('persons:lives_with.parents'),
      },
      {
        value: 'm',
        label: this.i18nextPipe.transform('persons:lives_with.mother'),
      },
      {
        value: 'f',
        label: this.i18nextPipe.transform('persons:lives_with.father'),
      },
      {
        value: 'o',
        label: this.i18nextPipe.transform('persons:lives_with.other'),
      },
    ];
  }

  getAppModuleRelations(): Array<{ app: string; module: string }> {
    return [
      { app: 'dashboard_calendar', module: 'dashboard' },
      { app: 'archive', module: 'parishioner' },
      { app: 'archive', module: 'parishioner_process' },
      { app: 'archive', module: 'family' },
      { app: 'archive', module: 'death' },
      { app: 'archive', module: 'priest' },
      { app: 'archive', module: 'clergy_type' },
      { app: 'archive', module: 'institution' },
      { app: 'archive', module: 'institution_type' },
      { app: 'archive', module: 'mec' },
      { app: 'archive', module: 'mecs_formation' },
      { app: 'archive', module: 'mecs_renewal' },
      { app: 'archive', module: 'acolyte' },
      { app: 'archive', module: 'acolytes_formation' },
      { app: 'archive', module: 'acolytes_renewal' },
      { app: 'archive', module: 'reader' },
      { app: 'archive', module: 'readers_formation' },
      { app: 'archive', module: 'readers_renewal' },
      { app: 'archive', module: 'pastoral_agent' },
      { app: 'archive', module: 'pastoral_agents_type' },
      { app: 'archive', module: 'mass_intention' },
      { app: 'archive', module: 'mass_intentions_type' },
      { app: 'catechisms', module: 'catechism' },
      { app: 'catechisms', module: 'catechisms_individual_document' },
      { app: 'catechisms', module: 'catechisms_session' },
      { app: 'sacraments', module: 'baptism' },
      { app: 'sacraments', module: 'wedding' },
      { app: 'sacraments', module: 'chrism' },
      { app: 'sacraments', module: 'chrisms_entity' },
      { app: 'sacraments', module: 'catechumen' },
      { app: 'sacraments', module: 'curia_baptism' },
      { app: 'sacraments', module: 'curia_wedding' },
      { app: 'sacraments', module: 'curia_ministries_and_order' },
      { app: 'processes', module: 'curia_secretariat' },
      { app: 'processes', module: 'curia_secretariat_type' },
      { app: 'processes', module: 'curia_administrative_process' },
      { app: 'processes', module: 'curia_administrative_process_type' },
      { app: 'processes', module: 'curia_economic_council' },
      { app: 'processes', module: 'curia_provision' },
      { app: 'processes', module: 'curia_provision_type' },
      { app: 'processes', module: 'mass_intention' },
      { app: 'processes', module: 'mass_intentions_type' },
      { app: 'processes', module: 'nomination' },
      { app: 'treasury', module: 'document' },
      { app: 'treasury', module: 'current_account' },
      { app: 'treasury', module: 'current_accounts_receipt' },
      { app: 'treasury', module: 'current_accounts_line' },
      { app: 'treasury', module: 'documents_type' },
      { app: 'treasury', module: 'treasury_location' },
      { app: 'accounting', module: 'accounting_exercise' },
      { app: 'accounting', module: 'accounting_chart_account' },
      { app: 'accounting', module: 'accounting_journal' },
      { app: 'accounting', module: 'accounting_transaction_document_type' },
      { app: 'accounting', module: 'accounting_cost_center' },
      { app: 'accounting', module: 'accounting_transaction' },
      { app: 'accounting', module: 'accounting_balance_sheet' },
      { app: 'accounting', module: 'accounting_transaction_line' },
      { app: 'accounting', module: 'accounting_taxonomy_code' },
      { app: 'accounting', module: 'accounting_taxonomy_reference' },
      { app: 'accounting', module: 'accounting_transaction_type' },
      { app: 'accruals', module: 'accruals_accrual' },
      { app: 'accruals', module: 'accruals_processment' },
      { app: 'accruals', module: 'accruals_type' },
      { app: 'cms', module: 'content' },
      { app: 'cms', module: 'event' },
      { app: 'cms', module: 'section' },
      { app: 'cms', module: 'emenu' },
      { app: 'cms', module: 'websiteconfiguration' },
      { app: 'newsletter', module: 'newsletter' },
      { app: 'newsletter', module: 'text_message' },
      { app: 'newsletter', module: 'newsletters_layout' },
      { app: 'newsletter', module: 'newsletter_subscription' },
      { app: 'newsletter', module: 'newsletter_group_subscription' },
      { app: 'dms', module: 'gestdocument' },
      { app: 'catholic_directory', module: 'catholic_directory_priest' },
      { app: 'catholic_directory', module: 'catholic_directory_institution' },
      { app: 'reporting', module: 'reports_view' },
      { app: 'reporting', module: 'report' },
      { app: 'reporting', module: 'reports_group' },
      { app: 'reporting', module: 'reports_grouper' },
      { app: 'reporting', module: 'subscription_statistic' },
      { app: 'reporting', module: 'admin_statistic' },
      { app: 'reporting', module: 'reportmanagment' },
      { app: 'places', module: 'country' },
      { app: 'places', module: 'bishopric' },
      { app: 'places', module: 'archpriestship' },
      { app: 'places', module: 'chapelry' },
      { app: 'places', module: 'worshipplace' },
      { app: 'places', module: 'valence' },
      { app: 'subscription_admin', module: 'subscription_user' },
      { app: 'admin', module: 'user' },
      { app: 'admin', module: 'subscription' },
      { app: 'admin', module: 'module_documentation_link' },
      { app: 'settings', module: 'subscription_setting' },
      { app: 'settings', module: 'profile_priest' },
      { app: 'settings', module: 'numeration' },
      { app: 'settings', module: 'numeration_view' },
      { app: 'settings', module: 'curia_function' },
      { app: 'settings', module: 'appointment_type' },
      { app: 'settings', module: 'group' },
      { app: 'settings', module: 'emolument' },
      { app: 'settings', module: 'emoluments_type' },
      { app: 'settings', module: 'formation' },
      { app: 'settings', module: 'formations_type' },
      { app: 'settings', module: 'patron' },
      { app: 'settings', module: 'relationship_degree' },
      { app: 'settings', module: 'records_importer' },
    ];
  }

  getCurrencies() {
    return [
      {
        name: 'Euro',
        code: 'EUR',
      },
      {
        name: 'Brasilian real',
        code: 'BRL',
      },
      {
        name: 'US dolar',
        code: 'USD',
      },
      {
        name: 'Great Britain pound',
        code: 'GBP',
      },
    ];
  }

  convertToNumber(value: string | number, decimalCases: number = 2): number {
    let result: any = String(value);
    result = parseFloat(
      parseFloat(result.replace(',', '.')).toFixed(decimalCases)
    );
    return result;
  }
}
