import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import { DialogComponent, SnackBarService } from '@peakitpt/ui-material';
import { I18NextPipe } from 'angular-i18next';
import { Subscription } from 'rxjs';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as groupsActions from 'src/app/components/newsletter-group-subscriptions/reducers/newsletter-group-subscriptions.actions';
import { State as NewsletterGroupSubscriptionsState } from 'src/app/components/newsletter-group-subscriptions/reducers/newsletter-group-subscriptions.reducer';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'kyr-persons-form-groups-tab-toggle',
  templateUrl: './persons-form-groups-tab-toggle.component.html',
})
export class PersonsFormGroupsTabToggleComponent
  implements OnInit, AfterViewInit {
  modulePath = 'persons';
  private returnUrl = ['/persons'];
  private subs: Subscription[] = [];
  private active: boolean;
  isLoading = true;
  isSaving = false;
  action = '';
  groupName = '';
  refreshTableParams: any = {};

  private actionRequestFail =
    groupsActions.NewsletterGroupSubscriptionsActionTypes.RequestFail;
  private actionRequestGetAll = groupsActions.RequestGetAll;
  private actionRequestToggle = groupsActions.RequestToggle;
  private actionSuccessToggle =
    groupsActions.NewsletterGroupSubscriptionsActionTypes.SuccessToggle;

  @ViewChild('modal') modal: DialogComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private i18nextPipe: I18NextPipe,
    private actionSubject: ActionsSubject,
    private snackBarService: SnackBarService,
    private sharedModule: SharedModule,
    private newsletterGroupSubscriptionsStore: Store<NewsletterGroupSubscriptionsState>
  ) {}

  ngOnInit() {
    this.isLoading = true;

    this.route.queryParams.subscribe((params) => {
      const decodedParams = JSON.parse(atob(params.data));
      this.active = decodedParams.active;
      this.action = this.i18nextPipe.transform(
        `${this.modulePath}:action.${
          this.active ? 'group_deactivate' : 'group_activate'
        }`
      );
      this.groupName = decodedParams.group;
      this.refreshTableParams = decodedParams.refreshTableParams;
      this.isLoading = false;
    });

    this.subs.push(
      // Get the parent URL so we can return to it after closing the modal and access the Item ID
      this.route.parent.paramMap.subscribe((parentParams: any) => {
        if (Object.keys(parentParams.params).includes('id')) {
          // Set the returnUrl from parent URL
          this.returnUrl.push(parentParams.params.id);
          this.returnUrl.push('edit');
        }
      })
    );
  }

  ngAfterViewInit() {
    this.subscribeForToggleAction();
    this.modal.open();
  }

  subscribeForToggleAction() {
    this.subs.push(
      this.actionSubject
        .pipe(ofType(this.actionRequestFail, this.actionSuccessToggle))
        .subscribe((result: any) => {
          this.isSaving = false;
          if (result.payload instanceof RequestError) {
            this.isSaving = false;
            this.snackBarService.openSnackBar(
              this.i18nextPipe.transform(
                result.payload.error.error.message.includes('403 Forbidden')
                  ? `${this.modulePath}:message.error_403`
                  : result.payload.error.error.message
              ),
              this.sharedModule.ERROR_COLOR
            );
          } else {
            this.isLoading = true;
            this.isSaving = false;
            this.snackBarService.openSnackBar(
              this.i18nextPipe.transform(
                `${this.modulePath}:message.${
                  this.active
                    ? 'group_toggle_deactivated'
                    : 'group_toggle_activated'
                }`
              ),
              this.sharedModule.SUCCESS_COLOR
            );
            this.newsletterGroupSubscriptionsStore.dispatch(
              new this.actionRequestGetAll(this.refreshTableParams)
            ); // Refresh table
            this.modal.close();
          }
        })
    );
  }

  modalClose() {
    this.router.navigate(this.returnUrl);
  }

  toggleSubscription() {
    this.isSaving = true;

    this.subs.push(
      this.route.params.subscribe((params) => {
        const subscriptionId = params.newsletter_group_subscription_id;
        this.newsletterGroupSubscriptionsStore.dispatch(
          new this.actionRequestToggle(subscriptionId)
        ); // Toggle status
      })
    );
  }
}
