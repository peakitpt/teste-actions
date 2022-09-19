import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  OnDestroy,
} from '@angular/core';
import * as actions from '../reducers/profile-priests.actions';
import {
  getCurrentAccountLinesListCuria,
  getCurrentAccountLinesListProfilePriestlyFraternity,
  getProfilePriest,
} from '../reducers/profile-priests.selectors';
import { Observable, Subscription } from 'rxjs';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import {
  DialogComponent,
  SnackBarService,
  TableDataSource,
} from '@peakitpt/ui-material';
import { RequestGetAllGroups } from '../reducers/profile-priests.actions';
import { Tab } from 'src/app/shared/components/details/fields/tab-field';
import { Section } from 'src/app/shared/components/details/fields/section-field';
import { ImageField } from 'src/app/shared/components/details/fields/image-field';
import { IconField } from 'src/app/shared/components/details/fields/icon-field';
import { DateField } from 'src/app/shared/components/details/fields/date-field';
import { TextField } from 'src/app/shared/components/details/fields/text-field';
import { TableField } from 'src/app/shared/components/details/fields/table-field';
import { TableDataField } from 'src/app/shared/components/details/fields/table-data-field';
import { TableDataSearchField } from 'src/app/shared/components/details/fields/table-data-search-field';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActionsSubject, Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { I18NextPipe } from 'angular-i18next';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { environment } from 'src/environments/environment';
import { ProfilePriest } from '../profile-priest.model';
import { TemplateField } from 'src/app/shared/components/details/fields/template-field';
import { ProfilePriestsService } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-profile-priests-details',
  templateUrl: './profile-priests-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ProfilePriestsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<ProfilePriest>;
  returnUrl = '/dashboard';
  modulePath = 'profile-priests';
  viewName = 'Priest';
  translationPath = 'priests';

  selectorGetModel = getProfilePriest;
  actionRequestFail = actions.ProfilePriestActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;

  @ViewChild('leftTemplate') leftTemplate: TemplateRef<any>;

  detailsFields: Tab[] = [];

  dataSourcePriestlyCards: TableDataSource<any> = new TableDataSource([]); // The data that feeds the table
  dataSourceColumnsPriestlyCards: any[] = [];
  dataSourceRetreats: TableDataSource<any> = new TableDataSource([]); // The data that feeds the table
  dataSourceColumnsRetreats: any[] = [];
  dataSourceOngoingFormations: TableDataSource<any> = new TableDataSource([]); // The data that feeds the table
  dataSourceColumnsOngoingFormations: any[] = [];
  dataSourcePublications: TableDataSource<any> = new TableDataSource([]); // The data that feeds the table
  dataSourceColumnsPublications: any[] = [];
  dataSourceCurriculums: TableDataSource<any> = new TableDataSource([]); // The data that feeds the table
  dataSourceColumnsCurriculums: any[] = [];
  dataSourceAcademicQualifications: TableDataSource<any> = new TableDataSource(
    []
  ); // The data that feeds the table
  dataSourceColumnsAcademicQualifications: any[] = [];

  total_amountTotal: number = 0;
  total_amountCurrency: string = 'EUR';
  pending_amountTotal: number = 0;
  pending_amountCurrency: string = 'EUR';
  curia_total_amountTotal: number = 0;
  curia_total_amountCurrency: string = 'EUR';
  curia_pending_amountTotal: number = 0;
  curia_pending_amountCurrency: string = 'EUR';

  @ViewChild('documentsDateTemplate') documentsDateTemplate: TemplateRef<any>;
  @ViewChild('documentsTotalTemplate') documentsTotalTemplate: TemplateRef<any>;
  @ViewChild('total_amountTotalTemplate')
  total_amountTotalTemplate: TemplateRef<any>;
  @ViewChild('pending_amountTotalTemplate')
  pending_amountTotalTemplate: TemplateRef<any>;
  @ViewChild('documentsPendingTemplate')
  documentsPendingTemplate: TemplateRef<any>;
  @ViewChild('searchMenuTemplate') searchMenuTemplate: TemplateRef<any>;
  @ViewChild('curiatotal_amountTotalTemplate')
  curiatotal_amountTotalTemplate: TemplateRef<any>;
  @ViewChild('curiapending_amountTotalTemplate')
  curiapending_amountTotalTemplate: TemplateRef<any>;

  @ViewChild('tableLineTemplate') tableLineTemplate: TemplateRef<any>;

  @ViewChild('modalToggle') modalToggle: DialogComponent;

  changesRequestFormControl: FormControl;
  @ViewChild('changesRequestTemplate') changesRequestTemplate: TemplateRef<any>;

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
    public fb: FormBuilder,
    public service: ProfilePriestsService
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

  ngOnDestroy() {
    super.ngOnDestroy();
    this.store.dispatch(new actions.ClearGet());
  }

  afterGetModel() {
    super.afterGetModel();

    this.fillForm();
    this.buildDataSources();
    this.buildFields();
    this.store
      .select(getCurrentAccountLinesListProfilePriestlyFraternity)
      .subscribe((val) => {
        if (val !== undefined && val !== null) {
          this.total_amountTotal = this.pending_amountTotal = 0;
          val.results.forEach((v) => {
            this.total_amountCurrency = this.pending_amountCurrency =
              v.currency;
            this.total_amountTotal += parseFloat(v.total_amount);
            this.pending_amountTotal += parseFloat(v.pending_amount);
          });
        }
      });
    this.store.select(getCurrentAccountLinesListCuria).subscribe((val) => {
      if (val !== undefined && val !== null) {
        this.curia_total_amountTotal = this.curia_pending_amountTotal = 0;
        val.results.forEach((v) => {
          this.curia_total_amountCurrency = this.curia_pending_amountCurrency =
            v.currency;
          this.curia_total_amountTotal += parseFloat(v.total_amount);
          this.curia_pending_amountTotal += parseFloat(v.pending_amount);
        });
      }
    });
  }

  buildDataSources() {
    this.dataSourcePriestlyCards.data = this.model.entity_priest_priestly_cards;
    this.dataSourceColumnsPriestlyCards = [
      {
        id: 'renewal_date',
        title: this.i18nextPipe.transform(
          `${this.translationPath}:model.entity_priest_priestly_cards.renewal_date`
        ),
      },
    ];
    this.dataSourceRetreats.data = this.model.entity_priest_retreats;
    this.dataSourceColumnsRetreats = [
      {
        id: 'retreat_year',
        title: this.i18nextPipe.transform(
          `${this.translationPath}:model.entity_priest_retreats.retreat_year`
        ),
      },
      {
        id: 'retreat_place',
        title: this.i18nextPipe.transform(
          `${this.translationPath}:model.entity_priest_retreats.retreat_place`
        ),
      },
    ];
    this.dataSourceOngoingFormations.data =
      this.model.entity_priest_ongoing_formations;
    this.dataSourceColumnsOngoingFormations = [
      {
        id: 'start_date',
        title: this.i18nextPipe.transform(
          `${this.translationPath}:model.entity_priest_ongoing_formations.start_date`
        ),
      },
      {
        id: 'end_date',
        title: this.i18nextPipe.transform(
          `${this.translationPath}:model.entity_priest_ongoing_formations.end_date`
        ),
      },
      {
        id: 'description',
        title: this.i18nextPipe.transform(
          `${this.translationPath}:model.entity_priest_ongoing_formations.description`
        ),
      },
    ];
    this.dataSourcePublications.data = this.model.entity_priest_publications;
    this.dataSourceColumnsPublications = [
      {
        id: 'publication_date',
        title: this.i18nextPipe.transform(
          `${this.translationPath}:model.entity_priest_publications.publication_date`
        ),
      },
      {
        id: 'description',
        title: this.i18nextPipe.transform(
          `${this.translationPath}:model.entity_priest_publications.description`
        ),
      },
    ];
    this.dataSourceCurriculums.data = this.model.entity_priest_curriculums;
    this.dataSourceColumnsCurriculums = [
      {
        id: 'start_date',
        title: this.i18nextPipe.transform(
          `${this.translationPath}:model.entity_priest_curriculums.start_date`
        ),
      },
      {
        id: 'end_date',
        title: this.i18nextPipe.transform(
          `${this.translationPath}:model.entity_priest_curriculums.end_date`
        ),
      },
      {
        id: 'description',
        title: this.i18nextPipe.transform(
          `${this.translationPath}:model.entity_priest_curriculums.description`
        ),
      },
    ];
    this.dataSourceAcademicQualifications.data =
      this.model.entity_priest_academic_qualifications;
    this.dataSourceColumnsAcademicQualifications = [
      {
        id: 'start_date',
        title: this.i18nextPipe.transform(
          `${this.translationPath}:model.entity_priest_academic_qualifications.start_date`
        ),
      },
      {
        id: 'end_date',
        title: this.i18nextPipe.transform(
          `${this.translationPath}:model.entity_priest_academic_qualifications.end_date`
        ),
      },
      {
        id: 'description',
        title: this.i18nextPipe.transform(
          `${this.translationPath}:model.entity_priest_academic_qualifications.description`
        ),
      },
    ];
  }

  buildFields() {
    this.detailsFields = [
      new Tab({
        name: 'personal_data',
        textLabel: this.i18nextPipe.transform(
          this.translationPath + ':header.personal_data'
        ),
        fields: [
          new Section({
            id: 'changes_request_section',
            label: '',
            isVisible: this.model.changes_request,
            fields: [
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.changes_request`
                ),
                model: this.model.changes_request,
                isHtml: true,
              }),
            ],
          }),
          new Section({
            id: 'personal-data',
            label: this.i18nextPipe.transform(
              `${this.translationPath}:header.personal_data`
            ),
            fields: [
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.entity.name`
                ),
                model: this.model.entity.name,
                isVisible: this.model.entity.name,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.abbreviated_name`
                ),
                model: this.model.abbreviated_name,
                isVisible: this.model.abbreviated_name,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.clergy_type_description`
                ),
                model: this.model.clergy_type_description,
                isVisible: this.model.clergy_type_description,
                internalUrl: `/clergy-types/${this.model.clergy_type_id}/details`,
              }),
              new DateField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.priest_birth_date`
                ),
                model: this.model.priest_birth_date,
                isVisible: this.model.priest_birth_date,
              }),
              new ImageField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.entity.photo_url`
                ),
                model: this.model.entity.photo_url,
              }),
              new IconField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.deceased`
                ),
                model: this.model.deceased,
                icon_true: 'check_box',
                icon_false: 'check_box_outline_blank',
              }),
              new DateField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.death_date`
                ),
                model: this.model.death_date,
                isVisible: this.model.death_date,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.title_for_documents`
                ),
                model: this.model.title_for_documents,
                isVisible: this.model.title_for_documents,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.birth_chapelry_description`
                ),
                model: this.model.birth_chapelry_description,
                isVisible: this.model.birth_chapelry_description,
                internalUrl: `/chapelries/${this.model.birth_chapelry_id}/details`,
              }),
              new ImageField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.coat_of_arms_filename`
                ),
                model: this.model.coat_of_arms,
                isVisible: this.model.coat_of_arms,
              }),
            ],
          }),
          new Section({
            id: 'address',
            label: this.i18nextPipe.transform(
              `${this.translationPath}:header.address`
            ),
            fields: [
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.residence`
                ),
                model: this.model.residence,
                isVisible: this.model.residence,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.residence_chapelry_description`
                ),
                model: this.model.residence_chapelry_description,
                isVisible: this.model.residence_chapelry_description,
                internalUrl: `/chapelries/${this.model.residence_chapelry_id}/details`,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.entity.address`
                ),
                model: this.model.entity.address,
                isVisible: this.model.entity.address,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.entity.door_number`
                ),
                model: this.model.entity.door_number,
                isVisible: this.model.entity.door_number,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.entity.postal_code`
                ),
                model: this.model.entity.postal_code,
                isVisible: this.model.entity.postal_code,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.entity.place`
                ),
                model: this.model.entity.place,
                isVisible: this.model.entity.place,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.entity.county`
                ),
                model: this.model.entity.county,
                isVisible: this.model.entity.county,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.entity.district`
                ),
                model: this.model.entity.district,
                isVisible: this.model.entity.district,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.entity.country_description`
                ),
                model: this.model.entity.country_description,
                isVisible: this.model.entity.country_description,
                internalUrl: `/countries/${this.model.entity.country_id}/details`,
              }),
            ],
          }),
          new Section({
            id: 'contacts',
            label: this.i18nextPipe.transform(
              `${this.translationPath}:header.contacts`
            ),
            fields: [
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.entity.mobilephone`
                ),
                model: this.model.entity.mobilephone,
                isVisible: this.model.entity.mobilephone,
                url: `tel:${this.model.entity.mobilephone}`,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.private_mobilephone`
                ),
                model: this.model.private_mobilephone,
                isVisible: this.model.private_mobilephone,
                url: `tel:${this.model.private_mobilephone}`,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.entity.phone`
                ),
                model: this.model.entity.phone,
                isVisible: this.model.entity.phone,
                url: `tel:${this.model.entity.phone}`,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.entity.fax`
                ),
                model: this.model.entity.fax,
                isVisible: this.model.entity.fax,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.entity.email`
                ),
                model: this.model.entity.email,
                isVisible: this.model.entity.email,
                url: `mailto:${this.model.entity.email}`,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.entity.url`
                ),
                model: this.model.entity.url,
                isVisible: this.model.entity.url,
              }),
              new IconField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.entity.newsletter_subscriptor`
                ),
                model: this.model.entity.newsletter_subscriptor,
                icon_true: 'check_box',
                icon_false: 'check_box_outline_blank',
              }),
            ],
          }),
          new Section({
            id: 'identification_documents',
            label: this.i18nextPipe.transform(
              `${this.translationPath}:header.identification_documents`
            ),
            isVisible:
              this.model.entity_person?.ident_document_type ||
              this.model.entity_person?.ident_document_number ||
              this.model.entity_person?.ident_document_emission_date ||
              this.model.entity_person?.ident_document_emitted_by ||
              this.model.entity_person?.ident_document_validity_date ||
              this.model.entity.taxpayer,
            fields: [
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.entity_person.ident_document_type`
                ),
                model: this.model.entity_person?.ident_document_type,
                isVisible: this.model.entity_person?.ident_document_type,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.entity_person.ident_document_number`
                ),
                model: this.model.entity_person?.ident_document_number,
                isVisible: this.model.entity_person?.ident_document_number,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.entity_person.ident_document_emission_date`
                ),
                model: this.model.entity_person?.ident_document_emission_date,
                isVisible:
                  this.model.entity_person?.ident_document_emission_date,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.entity_person.ident_document_emitted_by`
                ),
                model: this.model.entity_person?.ident_document_emitted_by,
                isVisible: this.model.entity_person?.ident_document_emitted_by,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.entity_person.ident_document_validity_date`
                ),
                model: this.model.entity_person?.ident_document_validity_date,
                isVisible:
                  this.model.entity_person?.ident_document_validity_date,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.entity.taxpayer`
                ),
                model: this.model.entity.taxpayer,
                isVisible: this.model.entity.taxpayer,
              }),
            ],
          }),
          new Section({
            id: 'filiation',
            label: this.i18nextPipe.transform(
              `${this.translationPath}:header.filiation`
            ),
            isVisible:
              this.model.father_description !== null &&
              this.model.mother_description !== null,
            fields: [
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.father_description`
                ),
                model: this.model.father_description,
                isVisible: this.model.father_description,
                internalUrl: `/persons/${this.model.father_id}/details`,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.mother_description`
                ),
                model: this.model.mother_description,
                isVisible: this.model.mother_description,
                internalUrl: `/persons/${this.model.mother_id}/details`,
              }),
            ],
          }),
          new Section({
            id: 'other_informations',
            isVisible: this.model.observations != null,
            label: this.i18nextPipe.transform(
              `${this.translationPath}:header.other_informations`
            ),
            fields: [
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.observations`
                ),
                model: this.model.observations,
              }),
              new TemplateField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.changes_request`
                ),
                template: this.changesRequestTemplate,
              }),
            ],
          }),
        ],
      }),
      new Tab({
        name: 'ordination_appointmens',
        textLabel: this.i18nextPipe.transform(
          `${this.translationPath}:tabs.ordination_appointmens`
        ),
        isVisible: this.model.ordination_date || this.model.ordination_place,
        fields: [
          new Section({
            id: 'ordination',
            label: this.i18nextPipe.transform(
              `${this.translationPath}:header.ordination`
            ),
            fields: [
              new DateField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.ordination_date`
                ),
                model: this.model.ordination_date,
                isVisible: this.model.ordination_date,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.ordination_place`
                ),
                model: this.model.ordination_place,
                isVisible: this.model.ordination_place,
              }),
            ],
          }),
          new Section({
            id: 'appoitments',
            label: this.i18nextPipe.transform(
              `${this.translationPath}:header.appoitments`
            ),
            fields: [
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.imported_actual_appointments`
                ),
                model: this.model.imported_actual_appointments,
              }),
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.appointments`
                ),
                model: this.model.appointments,
              }),
              new TableField({
                dataSource: this.model.entity_priest_appointments,
                dataSourceColumns: [
                  {
                    id: 'start_date',
                    title: this.i18nextPipe.transform(
                      `${this.translationPath}:model.entity_priest_appointments.start_date`
                    ),
                    template: this.tableLineTemplate,
                    type: 'date',
                  },
                  {
                    id: 'end_date',
                    title: this.i18nextPipe.transform(
                      `${this.translationPath}:model.entity_priest_appointments.end_date`
                    ),
                    template: this.tableLineTemplate,
                    type: 'date',
                  },
                  {
                    id: 'curia_function_description',
                    title: this.i18nextPipe.transform(
                      `${this.translationPath}:model.entity_priest_appointments.curia_function_description`
                    ),
                    template: this.tableLineTemplate,
                    url: (row: any) => {
                      return `${environment.railsAppUrl}/curia_functions/${row.curia_function_id}`;
                    },
                  },
                  {
                    id: 'appointment_place_description',
                    title: this.i18nextPipe.transform(
                      `${this.translationPath}:model.entity_priest_appointments.appointment_place_description`
                    ),
                    template: this.tableLineTemplate,
                    url: (row: any) => {
                      return `/chapelries/${row.appointment_place_id}/details`;
                    },
                  },
                  {
                    id: 'representing_description',
                    title: this.i18nextPipe.transform(
                      `${this.translationPath}:model.entity_priest_appointments.representing_description`
                    ),
                    template: this.tableLineTemplate,
                    url: (row: any) => {
                      return `/worshipplaces/${row.representing_id}/details`;
                    },
                  },
                  {
                    id: 'description',
                    title: this.i18nextPipe.transform(
                      `${this.translationPath}:model.entity_priest_appointments.description`
                    ),
                    template: this.tableLineTemplate,
                  },
                ],
              }),
            ],
          }),
        ],
      }),
      new Tab({
        name: 'current_accounts',
        textLabel: this.i18nextPipe.transform(
          `${this.translationPath}:tabs.current_accounts`
        ),
        fields: [
          new Section({
            id: 'current_account_priestly_fraternity',
            label: this.i18nextPipe.transform(
              `${this.translationPath}:header.current_account_priestly_fraternity`
            ),
            fields: [
              new TableDataSearchField({
                fb: this.fb,
                selectorGetList:
                  getCurrentAccountLinesListProfilePriestlyFraternity,
                actionRequestGetAll:
                  actions.RequestGetAllCurrentAccountLinesProfilePriestlyFraternity,
                store: this.store,
                id: this.id,
                sharedModule: this.sharedModule,
                fields: [
                  {
                    name: 'document_date',
                    label: this.i18nextPipe.transform(
                      `${this.translationPath}:current_account_priestly_fraternity.document_date`
                    ),
                    value: null,
                    type: 'dateRangeInput',
                  },
                  {
                    name: 'documents_status_id',
                    label: this.i18nextPipe.transform(
                      `${this.translationPath}:current_account_priestly_fraternity.documents_status_description`
                    ),
                    value: null,
                    type: 'inputSelect',
                    options: [
                      {
                        value: null,
                        label: this.i18nextPipe.transform(`translation:all`),
                      },
                      {
                        value: '1',
                        label: this.i18nextPipe.transform(
                          `${this.translationPath}:types.pending`
                        ),
                      },
                      {
                        value: '2',
                        label: this.i18nextPipe.transform(
                          `${this.translationPath}:types.partially_paid`
                        ),
                      },
                      {
                        value: '3',
                        label: this.i18nextPipe.transform(
                          `${this.translationPath}:types.paid`
                        ),
                      },
                      {
                        value: '4',
                        label: this.i18nextPipe.transform(
                          `${this.translationPath}:types.canceled`
                        ),
                      },
                    ],
                  },
                  {
                    name: 'serie_number',
                    label: this.i18nextPipe.transform(
                      `${this.translationPath}:current_account_priestly_fraternity.serie_number`
                    ),
                    value: null,
                    type: 'textInput',
                    mainField: true,
                  },
                  {
                    name: 'total_amount',
                    label: this.i18nextPipe.transform(
                      `${this.translationPath}:current_account_priestly_fraternity.total_amount`
                    ),
                    value: null,
                    type: 'textInput',
                  },
                ],
              }),
              new TableDataField({
                selectorGetList:
                  getCurrentAccountLinesListProfilePriestlyFraternity,
                actionRequestGetAll:
                  actions.RequestGetAllCurrentAccountLinesProfilePriestlyFraternity,
                store: this.store,
                id: this.id,
                hasFooter: true,
                tableColumns: [
                  {
                    id: 'document_date',
                    title: this.i18nextPipe.transform(
                      `${this.translationPath}:current_account_priestly_fraternity.document_date`
                    ),
                    template: this.documentsDateTemplate,
                  },
                  {
                    id: 'documents_status_description',
                    title: this.i18nextPipe.transform(
                      `${this.translationPath}:current_account_priestly_fraternity.documents_status_description`
                    ),
                  },
                  {
                    id: 'serie_number',
                    title: this.i18nextPipe.transform(
                      `${this.translationPath}:current_account_priestly_fraternity.serie_number`
                    ),
                  },
                  {
                    id: 'currency',
                    title: this.i18nextPipe.transform(
                      `${this.translationPath}:current_account_priestly_fraternity.currency`
                    ),
                  },
                  {
                    id: 'total_amount',
                    title: this.i18nextPipe.transform(
                      `${this.translationPath}:current_account_priestly_fraternity.total_amount`
                    ),
                    template: this.documentsTotalTemplate,
                    templateFooter: this.total_amountTotalTemplate,
                  },
                  {
                    id: 'pending_amount',
                    title: this.i18nextPipe.transform(
                      `${this.translationPath}:current_account_priestly_fraternity.pending_amount`
                    ),
                    template: this.documentsPendingTemplate,
                    templateFooter: this.pending_amountTotalTemplate,
                  },
                ],
              }),
            ],
          }),
          new Section({
            id: 'current_account_curia',
            label: this.i18nextPipe.transform(
              `${this.translationPath}:header.current_account_curia`
            ),
            fields: [
              new TableDataSearchField({
                fb: this.fb,
                selectorGetList: getCurrentAccountLinesListCuria,
                actionRequestGetAll:
                  actions.RequestGetAllCurrentAccountLinesCuria,
                store: this.store,
                id: this.id,
                fields: [
                  {
                    name: 'document_date',
                    label: this.i18nextPipe.transform(
                      `${this.translationPath}:current_account_curia.document_date`
                    ),
                    value: null,
                    type: 'dateRangeInput',
                  },
                  {
                    name: 'documents_status_id',
                    label: this.i18nextPipe.transform(
                      `${this.translationPath}:current_account_curia.documents_status_description`
                    ),
                    value: null,
                    type: 'inputSelect',
                    options: [
                      {
                        value: null,
                        label: this.i18nextPipe.transform(`translation:all`),
                      },
                      {
                        value: '1',
                        label: this.i18nextPipe.transform(
                          `${this.translationPath}:types.pending`
                        ),
                      },
                      {
                        value: '2',
                        label: this.i18nextPipe.transform(
                          `${this.translationPath}:types.partially_paid`
                        ),
                      },
                      {
                        value: '3',
                        label: this.i18nextPipe.transform(
                          `${this.translationPath}:types.paid`
                        ),
                      },
                      {
                        value: '4',
                        label: this.i18nextPipe.transform(
                          `${this.translationPath}:types.canceled`
                        ),
                      },
                    ],
                  },
                  {
                    name: 'serie_number',
                    label: this.i18nextPipe.transform(
                      `${this.translationPath}:current_account_curia.serie_number`
                    ),
                    value: null,
                    type: 'textInput',
                    mainField: true,
                  },
                  {
                    name: 'total_amount',
                    label: this.i18nextPipe.transform(
                      `${this.translationPath}:current_account_curia.total_amount`
                    ),
                    value: null,
                    type: 'textInput',
                  },
                ],
              }),
              new TableDataField({
                selectorGetList: getCurrentAccountLinesListCuria,
                actionRequestGetAll:
                  actions.RequestGetAllCurrentAccountLinesCuria,
                store: this.store,
                id: this.id,
                hasFooter: true,
                tableColumns: [
                  {
                    id: 'document_date',
                    title: this.i18nextPipe.transform(
                      `${this.translationPath}:current_account_curia.document_date`
                    ),
                    template: this.documentsDateTemplate,
                  },
                  {
                    id: 'documents_status_description',
                    title: this.i18nextPipe.transform(
                      `${this.translationPath}:current_account_curia.documents_status_description`
                    ),
                  },
                  {
                    id: 'serie_number',
                    title: this.i18nextPipe.transform(
                      `${this.translationPath}:current_account_curia.serie_number`
                    ),
                  },
                  {
                    id: 'currency',
                    title: this.i18nextPipe.transform(
                      `${this.translationPath}:current_account_curia.currency`
                    ),
                  },
                  {
                    id: 'total_amount',
                    title: this.i18nextPipe.transform(
                      `${this.translationPath}:current_account_curia.total_amount`
                    ),
                    template: this.documentsTotalTemplate,
                    templateFooter: this.curiatotal_amountTotalTemplate,
                  },
                  {
                    id: 'pending_amount',
                    title: this.i18nextPipe.transform(
                      `${this.translationPath}:current_account_curia.pending_amount`
                    ),
                    template: this.documentsPendingTemplate,
                    templateFooter: this.curiapending_amountTotalTemplate,
                  },
                ],
              }),
            ],
          }),
        ],
      }),
      new Tab({
        name: 'other_infos',
        textLabel: this.i18nextPipe.transform(
          `${this.translationPath}:tabs.other_infos`
        ),
        isVisible:
          this.model.entity_priest_priestly_cards.length > 0 ||
          this.model.entity_priest_retreats.length > 0 ||
          this.model.ongoing_formations ||
          this.model.entity_priest_ongoing_formations.length > 0 ||
          this.model.publications ||
          this.model.entity_priest_publications.length > 0 ||
          this.model.curriculum ||
          this.model.entity_priest_curriculums.length > 0 ||
          this.model.priest_academic_qualifications ||
          this.model.entity_priest_academic_qualifications.length > 0,
        fields: [
          new Section({
            id: 'priest_card_renewals',
            label: this.i18nextPipe.transform(
              `${this.translationPath}:header.priest_card_renewals`
            ),
            isVisible: this.model.entity_priest_priestly_cards.length > 0,
            fields: [
              new TableField({
                dataSource: this.dataSourcePriestlyCards,
                dataSourceColumns: this.dataSourceColumnsPriestlyCards,
              }),
            ],
          }),
          new Section({
            id: 'retreats',
            label: this.i18nextPipe.transform(
              `${this.translationPath}:header.retreats`
            ),
            isVisible: this.model.entity_priest_retreats.length > 0,
            fields: [
              new TableField({
                dataSource: this.dataSourceRetreats,
                dataSourceColumns: this.dataSourceColumnsRetreats,
              }),
            ],
          }),
          new Section({
            id: 'permanent_formation',
            label: this.i18nextPipe.transform(
              `${this.translationPath}:header.permanent_formation`
            ),
            isVisible:
              this.model.ongoing_formations ||
              this.model.entity_priest_ongoing_formations.length > 0,
            fields: [
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.ongoing_formations`
                ),
                model: this.model.ongoing_formations,
                isVisible: this.model.ongoing_formations,
              }),
              new TableField({
                dataSource: this.dataSourceOngoingFormations,
                dataSourceColumns: this.dataSourceColumnsOngoingFormations,
                isVisible:
                  this.model.entity_priest_ongoing_formations.length > 0,
              }),
            ],
          }),
          new Section({
            id: 'publications',
            label: this.i18nextPipe.transform(
              `${this.translationPath}:header.publications`
            ),
            isVisible:
              this.model.publications ||
              this.model.entity_priest_publications.length > 0,
            fields: [
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.publications`
                ),
                model: this.model.publications,
                isVisible: this.model.publications,
              }),
              new TableField({
                dataSource: this.dataSourcePublications,
                dataSourceColumns: this.dataSourceColumnsPublications,
                isVisible: this.model.entity_priest_publications.length > 0,
              }),
            ],
          }),
          new Section({
            id: 'curriculum',
            label: this.i18nextPipe.transform(
              `${this.translationPath}:header.curriculum`
            ),
            isVisible:
              this.model.curriculum ||
              this.model.entity_priest_curriculums.length > 0,
            fields: [
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.curriculum`
                ),
                model: this.model.curriculum,
                isVisible: this.model.curriculum,
              }),
              new TableField({
                dataSource: this.dataSourceCurriculums,
                dataSourceColumns: this.dataSourceColumnsCurriculums,
                isVisible: this.model.entity_priest_curriculums.length > 0,
              }),
            ],
          }),
          new Section({
            id: 'academic_qualifications',
            label: this.i18nextPipe.transform(
              `${this.translationPath}:header.academic_qualifications`
            ),
            isVisible:
              this.model.priest_academic_qualifications ||
              this.model.entity_priest_academic_qualifications.length > 0,
            fields: [
              new TextField({
                label: this.i18nextPipe.transform(
                  `${this.translationPath}:model.priest_academic_qualifications`
                ),
                model: this.model.priest_academic_qualifications,
                isHtml: true,
                isVisible: this.model.priest_academic_qualifications,
              }),
              new TableField({
                dataSource: this.dataSourceAcademicQualifications,
                dataSourceColumns: this.dataSourceColumnsAcademicQualifications,
                isVisible:
                  this.model.entity_priest_academic_qualifications.length > 0,
              }),
            ],
          }),
        ],
      }),
    ];
  }

  activateDeactivateGroup(data: any) {
    this.modalToggle.data = {
      id: data.id,
      active: data.active,
      groupName: data.group_name,
    };
    this.modalToggle.open();
  }

  toggleSubscription(data: any) {
    let mySub = this.actionSubject
      .pipe(
        ofType(
          this.actionRequestFail,
          actions.ProfilePriestActionTypes.SuccessActivateDeactivateGroup
        )
      )
      .subscribe((result: any) => {
        if (result.payload instanceof RequestError) {
          this.snackBarService.openSnackBar(
            this.i18nextPipe.transform(
              result.payload.error.error.message.includes('403 Forbidden')
                ? `${this.translationPath}:message.error_403`
                : result.payload.error.error.message
            ),
            this.sharedModule.ERROR_COLOR
          );
          mySub.unsubscribe();
        } else {
          this.snackBarService.openSnackBar(
            this.i18nextPipe.transform(
              `${this.translationPath}:message.${
                data.active
                  ? 'group_toggle_deactivated'
                  : 'group_toggle_activated'
              }`
            ),
            this.sharedModule.SUCCESS_COLOR
          );
          this.store.dispatch(
            new RequestGetAllGroups({
              query: {},
              page: 0,
              limit: 10,
              sort: '',
              order: '',
              id: this.id,
            })
          );
          this.modalToggle.close();
          mySub.unsubscribe();
        }
      });

    this.store.dispatch(new actions.RequestActivateDeactivateGroup(data.id));
  }

  fillForm() {
    this.changesRequestFormControl = this.fb.control(
      this.model.changes_request
    );
  }

  onRequestChangeClick() {
    const payload = {
      ...this.model,
      changes_request: this.changesRequestFormControl.value,
    };

    const sub: Subscription = this.service.update(payload).subscribe(
      (r) => {
        this.snackBarService.openSnackBar(
          this.i18nextPipe.transform(
            `${this.translationPath}:message.change_requested`
          ),
          this.sharedModule.SUCCESS_COLOR
        );
      },
      (err) => {
        this.snackBarService.openSnackBar(
          this.i18nextPipe.transform('translation:message.error_401', {
            appName: environment.appName,
          }),
          this.sharedModule.ERROR_COLOR
        );
      }
    );
  }
}
