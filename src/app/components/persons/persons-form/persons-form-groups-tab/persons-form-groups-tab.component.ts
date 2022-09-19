import {
  Component,
  Input,
  AfterViewInit,
  TemplateRef,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Observable } from 'rxjs';
import { NewsletterGroupSubscriptionResponse } from 'src/app/components/newsletter-group-subscriptions/newsletter-group-subscription.model';
import { getNewsletterGroupSubscriptionsList } from 'src/app/components/newsletter-group-subscriptions/reducers/newsletter-group-subscriptions.selectors';
import { RequestGetAll as RequestGroups } from 'src/app/components/newsletter-group-subscriptions/reducers/newsletter-group-subscriptions.actions';
import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { PersonsService } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-persons-form-groups-tab',
  templateUrl: './persons-form-groups-tab.component.html',
})
export class PersonsFormGroupsTabComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input() modulePath: string;
  @Input() entityPersonId: number;

  appName = 'archive';
  modelList$: Observable<NewsletterGroupSubscriptionResponse>;
  viewName = 'Parishioner';

  selectorGetList = getNewsletterGroupSubscriptionsList;
  actionRequestGetAll = RequestGroups;

  @ViewChild('groupNameTemplate') groupNameTemplate: TemplateRef<any>;
  @ViewChild('subscriptionDateTemplate')
  subscriptionDateTemplate: TemplateRef<any>;
  @ViewChild('unsubscriptionDateTemplate')
  unsubscriptionDateTemplate: TemplateRef<any>;
  @ViewChild('activeTemplate') activeTemplate: TemplateRef<any>;

  constructor(
    public titleService: Title,
    public router: Router,
    public route: ActivatedRoute,
    public i18nextPipe: I18NextPipe,
    public sharedModule: SharedModule,
    public actionSubject: ActionsSubject,
    public store: Store<any>,
    public menuHelperService: MenuHelperService,
    public http: HttpClient,
    public fb: FormBuilder,
    public moduleService?: PersonsService
  ) {
    super(
      titleService,
      router,
      route,
      i18nextPipe,
      sharedModule,
      actionSubject,
      store,
      menuHelperService,
      http,
      fb,
      moduleService
    );
  }

  ngOnInit() {
    this.filters = { entity_person_id: this.entityPersonId, groups: true };
    super.ngOnInit();
  }

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'group.name',
        title: this.i18nextPipe.transform(
          'newsletter-group-subscriptions:model.group.name'
        ),
        template: this.groupNameTemplate,
      },
      {
        id: 'subscription_date',
        title: this.i18nextPipe.transform(
          'newsletter-group-subscriptions:model.subscription_date'
        ),
        template: this.subscriptionDateTemplate,
      },
      {
        id: 'unsubscription_date',
        title: this.i18nextPipe.transform(
          'newsletter-group-subscriptions:model.unsubscription_date'
        ),
        template: this.unsubscriptionDateTemplate,
      },
      {
        id: 'active',
        title: this.i18nextPipe.transform(
          'newsletter-group-subscriptions:model.active'
        ),
        template: this.activeTemplate,
        stopRowClickPropagation: true,
      },
    ];
  }

  menuClick(event: string, data?: any) {
    switch (event) {
      case 'toggle_modal':
        this.router.navigate(
          [
            this.modulePath,
            this.entityPersonId,
            'edit',
            'toggle-newsletter-group-subscription',
            data.id,
          ],
          {
            queryParams: {
              data: btoa(
                JSON.stringify({
                  active: data.active,
                  group: data.group.name,
                  refreshTableParams: {
                    query: this.filters,
                    page: this.page,
                    limit: this.limit,
                    sort: this.sort,
                    order: this.order,
                  },
                })
              ),
            },
          }
        );
        break;
      default:
        super.menuClick(event, data);
        break;
    }
  }

  setSideNav() {
    // Must do nothing in order to not interfere with search
  }
}
