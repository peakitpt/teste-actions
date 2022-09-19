import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import * as actions from '../reducers/subscription-users.actions';
import { getSubscriptionUser } from '../reducers/subscription-users.selectors';
import { Observable } from 'rxjs';
import { SubscriptionUser } from '../subscription-user.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'kyr-subscription-users-details',
  templateUrl: './subscription-users-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class SubscriptionUsersDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<SubscriptionUser>;
  returnUrl = '/subscription-users';
  modulePath = 'subscription-users';
  viewName = 'SubscriptionUser';

  // TEMPLATES
  @ViewChild('subscriptionUsersTemplate')
  subscriptionUsersTemplate: TemplateRef<any>;
  @ViewChild('permissionsModulesTemplate')
  permissionsModulesTemplate: TemplateRef<any>;
  // ----

  titleForm = new FormControl();
  _attributesOptions: any[];
  get attributesOptions(): any[] {
    if (this._attributesOptions === undefined) {
      this._attributesOptions = [
        {
          label: this.i18nextPipe.transform(
            'subscription-users:model.accounting_attributes'
          ),
          value: 'accounting_attributes',
        },
        {
          label: this.i18nextPipe.transform(
            'subscription-users:model.accounting_attributes'
          ),
          value: 'accounting_attributes',
        },
        {
          label: this.i18nextPipe.transform(
            'subscription-users:model.admin_attributes'
          ),
          value: 'admin_attributes',
        },
        {
          label: this.i18nextPipe.transform(
            'subscription-users:model.archive_attributes'
          ),
          value: 'archive_attributes',
        },
        {
          label: this.i18nextPipe.transform(
            'subscription-users:model.catholic_directory_attributes'
          ),
          value: 'catholic_directory_attributes',
        },
        {
          label: this.i18nextPipe.transform(
            'subscription-users:model.cms_attributes'
          ),
          value: 'cms_attributes',
        },
        {
          label: this.i18nextPipe.transform(
            'subscription-users:model.dash_calendar_attributes'
          ),
          value: 'dash_calendar_attributes',
        },
        {
          label: this.i18nextPipe.transform(
            'subscription-users:model.dms_attributes'
          ),
          value: 'dms_attributes',
        },
        {
          label: this.i18nextPipe.transform(
            'subscription-users:model.newsletter_attributes'
          ),
          value: 'newsletter_attributes',
        },
        {
          label: this.i18nextPipe.transform(
            'subscription-users:model.reporting_attributes'
          ),
          value: 'reporting_attributes',
        },
        {
          label: this.i18nextPipe.transform(
            'subscription-users:model.sacraments_attributes'
          ),
          value: 'sacraments_attributes',
        },
        {
          label: this.i18nextPipe.transform(
            'subscription-users:model.settings_attributes'
          ),
          value: 'settings_attributes',
        },
        {
          label: this.i18nextPipe.transform(
            'subscription-users:model.subscription_admin_attributes'
          ),
          value: 'subscription_admin_attributes',
        },
        {
          label: this.i18nextPipe.transform(
            'subscription-users:model.treasury_attributes'
          ),
          value: 'treasury_attributes',
        },
      ];
    }
    return this._attributesOptions;
  }

  _formTabs: any[];
  get formTabs(): any[] {
    if (this._formTabs === undefined) {
      this._formTabs = [
        {
          textLabel: this.i18nextPipe.transform(
            'subscription-users:tabs.subscription_users'
          ),
          templateContent: this.subscriptionUsersTemplate,
        },
        {
          textLabel: this.i18nextPipe.transform(
            'subscription-users:tabs.permissions_modules'
          ),
          templateContent: this.permissionsModulesTemplate,
        },
      ];
    }
    return this._formTabs;
  }

  permissionsReady = false;
  permissionsData = [];
  permissionsColumns = [];
  // ------

  selectorGetModel = getSubscriptionUser;
  actionRequestFail =
    actions.SubscriptionUsersActionTypes.RequestFailSubscriptionUsers;
  actionRequestGetOne = actions.RequestGetSubscriptionUser;

  ngOnInit() {
    this.headerOptionsMenu = [
      {
        name: this.i18nextPipe.transform('translation:action.duplicate'),
        value: 'duplicate',
        icon: 'file_copy',
      },
      {
        name: this.i18nextPipe.transform('translation:action.delete'),
        value: 'delete',
        icon: 'delete',
      },
    ];

    this.subs.push(
      this.route.params.subscribe((params) => {
        if (params.id) {
          this.id = +params.id;
          this.model$ = this.store.select(this.selectorGetModel);
          this.store.dispatch(new this.actionRequestGetOne(+params.id));
          this.getModelPermissions();
        }
      })
    );
  }

  getModelPermissions() {
    this.subs.push(
      this.model$.subscribe((r) => {
        if (r) {
          this.buildPermissionsData(r);
        }
      })
    );
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

    if (this.permissionsData.length > 0) {
      this.permissionsReady = true;
    }
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
}
