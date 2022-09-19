import { ActionsSubject } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { FormArray, FormBuilder } from '@angular/forms';
import { State } from '../reducers/subscription-settings.reducer';
import { Observable } from 'rxjs';
import { I18NextPipe } from 'angular-i18next';
import * as actions from '../reducers/subscription-settings.actions';
import { SnackBarService, Tab, TabsComponent } from '@peakitpt/ui-material';
import { getSubscriptionSetting } from '../reducers/subscription-settings.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Title } from '@angular/platform-browser';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { SideMenuInterface } from '../../base/base.component';
import { RequestPostSideNav } from 'src/app/components/base/reducers/base.actions';
import { environment } from 'src/environments/environment';
import { ofType } from '@ngrx/effects';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { getParishionersSelected } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.selectors';
import * as ParishionersState from '../../../shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { getDocumentsTypesSelected } from 'src/app/shared/components/modals/documents-types-modal/reducers/documents-types-modal.selectors';
import * as DocumentsTypesState from '../../../shared/components/modals/documents-types-modal/reducers/documents-types-modal.reducer';
import { getNewslettersLayoutsSelected } from 'src/app/shared/components/modals/newsletters-layouts-modal/reducers/newsletters-layouts-modal.selectors';
import * as NewslettersLayoutsState from '../../../shared/components/modals/newsletters-layouts-modal/reducers/newsletters-layouts-modal.reducer';
import { getInstitutionsSelected } from 'src/app/shared/components/modals/institutions-modal/reducers/institutions-modal.selectors';
import * as InstitutionsState from '../../../shared/components/modals/institutions-modal/reducers/institutions-modal.reducer';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { SubscriptionSettingsV2Service } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-subscription-settings-form',
  templateUrl: './subscription-settings-form.component.html',
  styleUrls: ['./subscription-settings-form.component.scss'],
})
export class SubscriptionSettingsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<any>;
  modulePath = 'subscription-settings';
  appName = 'dashboard';

  selectorGetModel = getSubscriptionSetting;
  actionRequestFail =
    actions.SubscriptionSettingsActionTypes.RequestFailSubscriptionSettings;
  actionRequestGetOne = actions.RequestGetSubscriptionSetting;
  actionRequestPost = actions.RequestPostSubscriptionSetting;
  actionSuccessPost =
    actions.SubscriptionSettingsActionTypes.SuccessPostSubscriptionSetting;

  @ViewChild('defenitionsTemplate') defenitionsTemplate: TemplateRef<any>;
  @ViewChild('configurationAssistTemplate')
  configurationAssistTemplate: TemplateRef<any>;
  @ViewChild('tabsComponent') tabsComponent: TabsComponent;
  tabs: Tab[] = [];
  environment = environment;
  pagerMenu: any[] = [];
  currencyOptions: any[] = [];
  currencyLocked: boolean = true;
  smsGatewayOptions: any[] = [];
  smtpAuthenticationTypes: any[] = [];
  signAsOptions: any[];
  parishionersMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  documentsTypesMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  newslettersLayoutsMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  institutionsMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  parishionerParams = {
    entity_type: 'Sacerdote',
    serialize: 'parishioners_simple',
    modal: true,
    format: 'json',
    except_users: true,
  };

  constructor(
    public store: Store<State>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    public titleService: Title,
    public menuHelperService: MenuHelperService,
    private parishionersStore: Store<ParishionersState.State>,
    private documentsTypesStore: Store<DocumentsTypesState.State>,
    private newslettersLayoutsStore: Store<NewslettersLayoutsState.State>,
    private institutionsStore: Store<InstitutionsState.State>,
    private serviceV2: SubscriptionSettingsV2Service
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
    this.form = this.fb.group({
      created_at: [],
      created_by_user_id: [],
      currency: [],
      current_account_notification_layout_description: [],
      current_account_notification_layout_id: [],
      entity_ekklesia_location_id: [],
      entity_priest_id: [],
      finance_department: [],
      hide_warnings_from_dash: [],
      hide_wizard_from_dash: [],
      id: [],
      mass_intention_default_delivered_document_type_description: [],
      mass_intention_default_delivered_document_type_id: [],
      priest_description: [],
      priest_id: [],
      priestly_fraternity_institution_description: [],
      priestly_fraternity_institution_id: [],
      sign_as: [],
      sms_gateway: [],
      sms_msisdn: [],
      sms_password: [],
      smtp_address: [],
      smtp_authentication: [],
      smtp_domain: [],
      smtp_enable_starttls_auto: [],
      smtp_password: [],
      smtp_port: [],
      smtp_use_custom_settings: [],
      smtp_use_ssl: [],
      smtp_user_name: [],
      treasury_default_document_type_description: [],
      treasury_default_document_type_id: [],
      updated_at: [],
      updated_by_user_id: [],
      smtp_sender_name: [],
    });
  }

  ngOnInit() {
    this.initializeForm();
    this.pagerMenu = this.sharedModule.getPagerMenu();

    this.titleService.setTitle(
      `${environment.appName} | ${this.i18nextPipe.transform(
        this.modulePath + ':module.name_many'
      )}`
    );

    this.isLoading = false;

    this.model$ = this.store.select(this.selectorGetModel);
    this.store.dispatch(new actions.RequestGetSubscriptionSetting());

    this.subs.push(
      this.model$.subscribe((obj: any) => {
        if (obj) {
          this.setFormValues(obj);
          this.checkCurrencyLocked();
          this.isLoading = false;
          this.checkCurrentTab();
        }
      })
    );

    this.sharedModule.getCurrencies().forEach((currency) => {
      this.currencyOptions.push({
        label: currency.code,
        value: currency.code,
      });
    });

    this.signAsOptions = [
      {
        label: this.i18nextPipe.transform(`${this.modulePath}:option.parson`),
        value: 'parson',
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:option.parish_admin`
        ),
        value: 'parish_admin',
      },
    ];

    this.smsGatewayOptions = [
      {
        label: '',
        value: null,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:option.vodafone_pt`
        ),
        value: 'http://smsws.vodafone.pt/SmsBroadcastWs/service.web?wsdl',
      },
    ];

    this.smtpAuthenticationTypes = [
      {
        label: '',
        value: null,
      },
      {
        label: this.i18nextPipe.transform(`${this.modulePath}:option.plain`),
        value: 'plain',
      },
      {
        label: this.i18nextPipe.transform(`${this.modulePath}:option.login`),
        value: 'login',
      },
      {
        label: this.i18nextPipe.transform(`${this.modulePath}:option.cram_md5`),
        value: 'cram_md5',
      },
    ];

    this.setParishionersModal();
    this.setDocumentsTypesModal();
    this.setNewslettersLayoutsModal();
    this.setInstitutionsModal();
  }

  ngAfterViewInit() {
    this.setSideNav();
    this.setTabs();
    this.subscribeForSavingActions();
    this.onAfterViewInit();
    this.modal.open();
  }

  menuClick(event: any, inputName?: string) {
    switch (event) {
      case 'clear_parishioner_modal':
        this.form.get('priest_description').setValue(null);
        this.form.get('priest_id').setValue(null);
        break;
      case 'clear_documents-types_modal':
        this.form
          .get('treasury_default_document_type_description')
          .setValue(null);
        this.form.get('treasury_default_document_type_id').setValue(null);
        break;
      case 'clear_newsletters-layouts_modal':
        this.form
          .get('current_account_notification_layout_description')
          .setValue(null);
        this.form.get('current_account_notification_layout_id').setValue(null);
        break;
      case 'clear_institutions_modal':
        this.form
          .get('priestly_fraternity_institution_description')
          .setValue(null);
        this.form.get('priestly_fraternity_institution_id').setValue(null);
        break;
      default:
        super.menuClick(event, inputName);
        break;
    }
  }

  subscribeForSavingActions() {
    // Subscribe for creating/updating actions
    this.subs.push(
      this.actionSubject
        .pipe(ofType(this.actionRequestFail, this.actionSuccessPost))
        .subscribe((result: any) => {
          this.isSaving = false;
          if (result.payload instanceof RequestError) {
            let errorMessage = '';

            if (result.payload.error.status === 400) {
              errorMessage = result.payload.error.error.message;
            } else if (result.payload.error.status === 401) {
              if ('message' in result.payload.error) {
                errorMessage = result.payload.error.error.message;
              } else {
                errorMessage = this.i18nextPipe.transform(
                  'translation:message.error_401',
                  { appName: environment.appName }
                );
              }
            } else if (
              result.payload.error.status === 422 &&
              'error' in result.payload.error
            ) {
              for (const key of Object.keys(result.payload.error.error)) {
                errorMessage += `${result.payload.error.error[key]}\n`;
              }
            }

            this.snackBarService.openSnackBar(
              errorMessage,
              this.sharedModule.ERROR_COLOR
            );
          } else {
            this.onSaveSuccess(result);
          }
        })
    );
  }

  onSaveSuccess(result: any) {
    this.isLoading = true;

    this.snackBarService.openSnackBar(
      this.i18nextPipe.transform(`${this.modulePath}:message.save_success`),
      this.sharedModule.SUCCESS_COLOR
    );

    this.store.dispatch(new actions.RequestGetSubscriptionSetting());
  }

  setSideNav() {
    this.subs.push(
      this.menuHelperService
        .createSideMenuInterface(
          this.appName,
          this.modulePath,
          null,
          null,
          null,
          false
        )
        .subscribe((r: SideMenuInterface) => {
          if (r) {
            this.store.dispatch(new RequestPostSideNav(r));
          }
        })
    );
  }

  onSubmit() {
    this.isSaving = true;
    this.onFormValid();
  }

  onFormValid(payload = this.form.getRawValue()) {
    const cleanForm = this.form.getRawValue();
    this.store.dispatch(new this.actionRequestPost(cleanForm));
  }

  closeModal() {
    this.modal.close();
  }

  openSelectionModal(
    modalName: string,
    inputName?: string,
    modalParams: any = {},
    modalTitle = '',
    queryStringParams: any = {}
  ) {
    this.router.navigate([modalName], {
      queryParams: {
        modalTitle,
        inputName,
        modalParams: btoa(JSON.stringify(modalParams)),
        queryStringParams: btoa(JSON.stringify(queryStringParams)),
      },
      relativeTo: this.route,
      queryParamsHandling: 'merge',
    });
  }

  defaultModalMenu(
    menuIdentifier: string
  ): Array<{ name: string; value: string; icon: string }> {
    const menu = [
      {
        name: this.i18nextPipe.transform('translation:action.clear'),
        value: `clear_${menuIdentifier}_modal`,
        icon: 'clear',
      },
    ];
    return menu;
  }

  setTabs() {
    this.tabs = [
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.defenitions'
        ),
        templateContent: this.defenitionsTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.configuration_assist'
        ),
        templateContent: this.configurationAssistTemplate,
      },
    ];
  }

  private setParishionersModal() {
    this.parishionersMenuOptions = this.defaultModalMenu('parishioner');

    // When a row is selected
    this.subs.push(
      this.parishionersStore
        .select(getParishionersSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.form.get(`${row.inputName}_id`).setValue(row.model.id);
            this.form
              .get(`${row.inputName}_description`)
              .setValue(row.model.name);
          }
        })
    );
  }

  private setDocumentsTypesModal() {
    this.documentsTypesMenuOptions = this.defaultModalMenu('documents-types');

    // When a row is selected
    this.subs.push(
      this.documentsTypesStore
        .select(getDocumentsTypesSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.form.get(`${row.inputName}_id`).setValue(row.model.id);
            this.form
              .get(`${row.inputName}_description`)
              .setValue(`[${row.model.name}] ${row.model.description}`);
          }
        })
    );
  }

  private setNewslettersLayoutsModal() {
    this.newslettersLayoutsMenuOptions = this.defaultModalMenu(
      'newsletters-layouts'
    );

    // When a row is selected
    this.subs.push(
      this.newslettersLayoutsStore
        .select(getNewslettersLayoutsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.form.get(`${row.inputName}_id`).setValue(row.model.id);
            this.form
              .get(`${row.inputName}_description`)
              .setValue(row.model.title);
          }
        })
    );
  }

  private setInstitutionsModal() {
    this.institutionsMenuOptions = this.defaultModalMenu('institutions');

    // When a row is selected
    this.subs.push(
      this.institutionsStore
        .select(getInstitutionsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.form.get(`${row.inputName}_id`).setValue(row.model.id);
            this.form
              .get(`${row.inputName}_description`)
              .setValue(row.model.entity__name);
          }
        })
    );
  }

  checkCurrencyLocked() {
    this.subs.push(
      this.serviceV2
        .isCurrencyLocked(this.model.entity_ekklesia_location_id)
        .subscribe((r) => {
          this.currencyLocked = r;
          if (r) {
            this.form.controls['currency'].disable();
          }
        })
    );
  }

  canSeePriestlyFraternity(): boolean {
    return +localStorage.getItem('subscriptionTypeId') == 9;
  }

  checkCurrentTab() {
    if (location.hash.includes('tab_wizard')) {
      this.tabsComponent.changeFocus(1);
    }
  }
}
