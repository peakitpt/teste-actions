import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextPipe } from 'angular-i18next';
import { SnackBarService } from '@peakitpt/ui-material';
import { SelectedModalRow } from 'src/app/shared/shared.model';

import { NewsletterGroupSubscription } from 'src/app/components/newsletter-group-subscriptions/newsletter-group-subscription.model';
import { getNewsletterGroupSubscription } from 'src/app/components/newsletter-group-subscriptions/reducers/newsletter-group-subscriptions.selectors';
import * as actions from 'src/app/components/newsletter-group-subscriptions/reducers/newsletter-group-subscriptions.actions';

import { State as GroupsState } from 'src/app/components/groups/reducers/groups.reducer';
import { Group, GroupResponse } from 'src/app/components/groups/group.model';
import { getGroupsListEntirely } from 'src/app/components/groups/reducers/groups.selectors';
import { RequestGetEntirely as GroupsGetEntirely } from 'src/app/components/groups/reducers/groups.actions';

import { State as NewsletterSubscriptionsState } from 'src/app/components/newsletter-subscriptions/reducers/newsletter-subscriptions.reducer';
import { getNewsletterSubscriptionsSelected } from 'src/app/shared/components/modals/newsletter-subscriptions-modal/reducers/newsletter-subscriptions-modal.selectors';

@Component({
  selector: 'kyr-newsletter-group-subscriptions-form',
  templateUrl: './newsletter-group-subscriptions-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class NewsletterGroupSubscriptionsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<NewsletterGroupSubscription>;
  modulePath = 'newsletter-group-subscriptions';

  // Selectors & actions
  selectorGetModel = getNewsletterGroupSubscription;
  actionRequestFail =
    actions.NewsletterGroupSubscriptionsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost =
    actions.NewsletterGroupSubscriptionsActionTypes.SuccessPost;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.NewsletterGroupSubscriptionsActionTypes.SuccessPut;
  // Selectors & actions END

  /* This specific's component fields */
  groupsOptions: Array<{ value: number; label: string }> = [];

  constructor(
    public store: Store<any>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    private groupsStore: Store<GroupsState>,
    private newsletterSubscriptionsStore: Store<NewsletterSubscriptionsState>
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
      subscription_date: [new Date()],
      unsubscription_date: [],
      active: [true],
      id: [],
      group_id: [null, Validators.required],
      newsletter_subscription_id: [null, Validators.required],
      newsletter_subscription_description: [null, Validators.required],
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.setNewsletterSubscriptionsModal();
    this.getGroups();
  }

  addToHeaderOptionsMenu() {
    this.headerOptionsMenu = [];
  }

  clearModalInputs() {
    [
      'newsletter_subscription_description',
      'newsletter_subscription_id',
    ].forEach((field: string) => this.affectField(field, null));
  }

  // THIS FORM SPECIFIC FUNCTIONS [START]
  private setNewsletterSubscriptionsModal() {
    this.subs.push(
      this.newsletterSubscriptionsStore
        .select(getNewsletterSubscriptionsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.affectField(`${row.inputName}_id`, row.model.id);
            this.affectField(`${row.inputName}_description`, row.model.name);
          }
        })
    );
  }

  private getGroups() {
    const groups$: Observable<GroupResponse> = this.groupsStore.select(
      getGroupsListEntirely
    );
    this.groupsStore.dispatch(new GroupsGetEntirely({ limit: 'none' }));
    this.subs.push(
      groups$.subscribe((result: GroupResponse) => {
        if (result) {
          result.results.forEach((group: Group) => {
            this.groupsOptions.push({
              label: group.name,
              value: group.id,
            });
          });
        }
      })
    );
  }
  // THIS FORM SPECIFIC FUNCTIONS [END]
}
