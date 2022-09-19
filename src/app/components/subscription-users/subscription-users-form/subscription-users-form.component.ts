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

import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { State } from '../reducers/subscription-users.reducer';
import { Observable } from 'rxjs';
import { I18NextPipe } from 'angular-i18next';
import * as actions from '../reducers/subscription-users.actions';
import { SnackBarService } from '@peakitpt/ui-material';
import { getSubscriptionUser } from '../reducers/subscription-users.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { SubscriptionUser } from '../subscription-user.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComplexTreeComponent } from '@peakitpt/ui-material/components/tree/complex-tree/complex-tree.component';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { environment } from 'src/environments/environment';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'kyr-subscription-users-form',
  templateUrl: './subscription-users-form.component.html',
})
export class SubscriptionUsersFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<SubscriptionUser>;
  modulePath = 'subscription-users';

  localeOptions = [
    {
      value: 'pt',
      label: this.i18nextPipe.transform(`translation:_languages.pt`),
    },
    {
      value: 'en',
      label: this.i18nextPipe.transform(`translation:_languages.en`),
    },
    {
      value: 'es',
      label: this.i18nextPipe.transform(`translation:_languages.es`),
    },
  ];

  // TEMPLATES
  @ViewChild('formTemplate')
  formTemplate: TemplateRef<any>;
  @ViewChild('permissionsFormModulesTemplate')
  permissionsFormModulesTemplate: TemplateRef<any>;
  // ------

  titleForm = new FormControl();
  _attributesOptions: any[];
  get attributesOptions(): any[] {
    if (this._attributesOptions === undefined) {
      this._attributesOptions = [
        {
          label: this.i18nextPipe.transform(
            `${this.modulePath}:model.accounting_attributes`
          ),
          value: 'accounting_attributes',
        },
        {
          label: this.i18nextPipe.transform(
            `${this.modulePath}:model.accounting_attributes`
          ),
          value: 'accounting_attributes',
        },
        {
          label: this.i18nextPipe.transform(
            `${this.modulePath}:model.admin_attributes`
          ),
          value: 'admin_attributes',
        },
        {
          label: this.i18nextPipe.transform(
            `${this.modulePath}:model.archive_attributes`
          ),
          value: 'archive_attributes',
        },
        {
          label: this.i18nextPipe.transform(
            `${this.modulePath}:model.catholic_directory_attributes`
          ),
          value: 'catholic_directory_attributes',
        },
        {
          label: this.i18nextPipe.transform(
            `${this.modulePath}:model.cms_attributes`
          ),
          value: 'cms_attributes',
        },
        {
          label: this.i18nextPipe.transform(
            `${this.modulePath}:model.dash_calendar_attributes`
          ),
          value: 'dash_calendar_attributes',
        },
        {
          label: this.i18nextPipe.transform(
            `${this.modulePath}:model.dms_attributes`
          ),
          value: 'dms_attributes',
        },
        {
          label: this.i18nextPipe.transform(
            `${this.modulePath}:model.newsletter_attributes`
          ),
          value: 'newsletter_attributes',
        },
        {
          label: this.i18nextPipe.transform(
            `${this.modulePath}:model.reporting_attributes`
          ),
          value: 'reporting_attributes',
        },
        {
          label: this.i18nextPipe.transform(
            `${this.modulePath}:model.sacraments_attributes`
          ),
          value: 'sacraments_attributes',
        },
        {
          label: this.i18nextPipe.transform(
            `${this.modulePath}:model.settings_attributes`
          ),
          value: 'settings_attributes',
        },
        {
          label: this.i18nextPipe.transform(
            `${this.modulePath}:model.subscription_admin_attributes`
          ),
          value: 'subscription_admin_attributes',
        },
        {
          label: this.i18nextPipe.transform(
            `${this.modulePath}:model.treasury_attributes`
          ),
          value: 'treasury_attributes',
        },
      ];
    }
    return this._attributesOptions;
  }

  @ViewChild('permissionsTree') permissionsTree: ComplexTreeComponent;
  permissionsReady = false;
  permissionsData = [];
  permissionsColumns = [];

  // ----

  selectorGetModel = getSubscriptionUser;
  actionRequestFail =
    actions.SubscriptionUsersActionTypes.RequestFailSubscriptionUsers;
  actionRequestGetAll = actions.RequestGetAllSubscriptionUsers;
  actionRequestGetOne = actions.RequestGetSubscriptionUser;
  actionRequestPut = actions.RequestPutSubscriptionUser;
  actionSuccessPut =
    actions.SubscriptionUsersActionTypes.SuccessPutSubscriptionUser;
  actionRequestPost = actions.RequestPostSubscriptionUser;
  actionSuccessPost =
    actions.SubscriptionUsersActionTypes.SuccessPostSubscriptionUser;

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

  onAfterViewInit() {
    this.formTabs = [
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.subscription_users`
        ),
        templateContent: this.formTemplate,
      },
    ];

    // If it is an edit, add a new tab
    if (this.id) {
      this.formTabs.push({
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.permissions_modules`
        ),
        templateContent: this.permissionsFormModulesTemplate,
      });
    }
  }

  subscribeForSavingActions() {
    // Subscribe for creating/updating actions
    this.subs.push(
      this.actionSubject
        .pipe(
          ofType(
            this.actionRequestFail,
            this.actionSuccessPut,
            this.actionSuccessPost
          )
        )
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
              const error = JSON.parse(
                result.payload.error.headers.get('X-Flash-Messages')
              );
              if (error) {
                errorMessage = `${error.error[0].message}\n`;
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

  initializeForm() {
    this.form = this.fb.group({
      id: [],
      name: [null, Validators.required],
      email: [null, Validators.required],
      locale: [null, Validators.required],
      disabled: [false],
      is_subscription_admin: [false],
      access_only_to_own_catechisms: [false],
      updated_by_user_id: [],
      user_id: [],
      subscription_id: [],
      subscription_description: [],
      role: [],
      profile_id: [],
      entity: [],
      entity_id: [],
      expiration_date: [],
      blocked_at: [],
      deleted_by_user_id: [],
      session_id: [],
      sync_at: [],
      blocked_by_user_id: [],
      created_at: [],
      created_by_user_id: [],
      current_sign_in_at: [],
      sign_in_count: [0],
      subscriptions_limit: [1],
      approved_at: [new Date()],
      block_remove: [false],
      deleted: [false],
      accounting_attributes: [],
      accruals_attributes: [],
      admin_attributes: [],
      archive_attributes: [],
      catholic_directory_attributes: [],
      cms_attributes: [],
      dash_calendar_attributes: [],
      dms_attributes: [],
      newsletter_attributes: [],
      reporting_attributes: [],
      sacraments_attributes: [],
      settings_attributes: [],
      subscription_admin_attributes: [],
      treasury_attributes: [],
      catechism_attributes: [],
      places_attributes: [],
      processes_attributes: [],
    });
  }

  setFormValues(obj: any) {
    const permissionArray = [];
    Object.keys(obj).forEach((key: any) => {
      if (this.duplicateMode && ['id'].includes(key)) {
        // Don't include these keys on duplicate mode
      } else if (
        this.form.contains(key) &&
        !(this.form.get(key) instanceof FormArray)
      ) {
        switch (key) {
          default:
            this.form.get(key).setValue(obj[key]);
        }
      }

      if (key.includes('_attributes') && obj[key].length > 0) {
        obj[key].forEach((attribute) => {
          permissionArray.push({
            attribute: this.i18nextPipe.transform(
              `${this.modulePath}:model.${key}`
            ),
            can_read: attribute.can_read,
            id: attribute.id,
            user_id: attribute.user_id,
            view_id: attribute.view_id,
            view_description: attribute.view_description,
          });
        });
      }
    });
    this.buildPermissionsData(obj);
  }

  onFormValid() {
    if (this.form.value.id) {
      const form = this.addPermissionsToFormValue();
      this.store.dispatch(new this.actionRequestPut(form));
    } else {
      // When its a new user, the attributes have to be removed
      const form = this.removeAttributesFromForm();
      this.store.dispatch(new this.actionRequestPost(form));
    }
  }

  buildPermissionsData(data: SubscriptionUser) {
    this.permissionsColumns = [
      {
        id: 'can_read',
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.permission`
        ),
      },
    ];
    // Change later to this, currently there is only one permission
    // this.permissionsColumns = [
    //   {
    //     id: 'can_create',
    //     label: 'Create',
    //   },
    //   {
    //     id: 'can_edit',
    //     label: 'Edit',
    //   },
    //   {
    //     id: 'can_read',
    //     label: 'Read',
    //   },
    //   {
    //     id: 'can_delete',
    //     label: 'Delete',
    //   },
    // ];

    this.permissionsData = [];
    Object.keys(data).forEach((key: string) => {
      if (key.endsWith('_attributes')) {
        this.permissionsData.push({
          label: this.i18nextPipe.transform(`${this.modulePath}:model.${key}`),
          name: key,
          children: this.buildPermissionLeaves(data[key]),
        });
      }
    });

    this.permissionsReady = true;
  }

  buildPermissionLeaves(leaves: any[]): any[] {
    const res = [];
    leaves.forEach((leaf: any) => {
      const newLeaf = {
        ...leaf,
        label: leaf['view_description'],
      };
      res.push(newLeaf);
    });
    return res;
  }

  addPermissionsToFormValue() {
    const res = JSON.parse(JSON.stringify(this.form.value));

    this.permissionsTree.getForm().forEach((element) => {
      res[element.name].forEach((line, index) => {
        for (let permission of this.permissionsColumns) {
          line[permission.id] = element['children'][index][permission.id];
        }
      });
    });

    return res;
  }

  removeAttributesFromForm() {
    const form = JSON.parse(JSON.stringify(this.form.value));
    const res = {};

    Object.keys(form).forEach((field) => {
      if (!field.includes('_attributes')) {
        res[field] = form[field];
      }
    });
    return res;
  }
}
