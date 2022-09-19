import {
  Component,
  AfterViewInit,
  OnDestroy,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { DialogComponent, SnackBarService } from '@peakitpt/ui-material';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { Subscription } from 'rxjs';

import { NewsletterSubscription } from '../../newsletter-subscription.model';
import * as actions from '../../reducers/newsletter-subscriptions.actions';

@Component({
  selector: 'kyr-newsletter-subscription-toggle-confirmation',
  templateUrl: './newsletter-subscriptions-toggle-confirmation.component.html',
})
export class NewsletterSubscriptionsToggleConfirmationComponent
  implements AfterViewInit, OnDestroy {
  private subs: Subscription[] = [];
  modulePath = 'newsletter-subscriptions';
  isSaving = false;
  isLoading = false;

  private actionRequestToggle = actions.RequestToggle;
  private actionRequestFailToggle =
    actions.NewsletterSubscriptionsActionTypes.RequestFailToggle;
  private actionSuccessToggle =
    actions.NewsletterSubscriptionsActionTypes.SuccessToggle;
  private actionRequestGetAll = actions.RequestGetAll;

  @Input() model: NewsletterSubscription;
  @Output() emitModalClose = new EventEmitter();
  @ViewChild('modal') modal: DialogComponent;

  constructor(
    public store: Store<any>,
    public i18nextPipe: I18NextPipe,
    public sharedModule: SharedModule,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject
  ) {}

  ngAfterViewInit() {
    this.subscribeForToggleAction();
    this.modal.open();
  }

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }

  modalClose() {
    this.emitModalClose.emit();
  }

  subscribeForToggleAction() {
    // Subscribe for Toggle action
    this.subs.push(
      this.actionSubject
        .pipe(ofType(this.actionRequestFailToggle, this.actionSuccessToggle))
        .subscribe((result: any) => {
          this.isSaving = false;
          if (result.payload instanceof RequestError) {
            this.isLoading = false;
            this.snackBarService.openSnackBar(
              this.i18nextPipe.transform(result.payload.error.error.message),
              this.sharedModule.ERROR_COLOR
            );
          } else {
            this.snackBarService.openSnackBar(
              this.i18nextPipe.transform(
                `${this.modulePath}:message.${
                  result.payload.active ? 'activated' : 'deactivated'
                }_success`
              ),
              this.sharedModule.SUCCESS_COLOR
            );

            this.store.dispatch(new this.actionRequestGetAll()); // Refresh table
            this.modal.close();
          }
        })
    );
  }

  toggle() {
    this.isSaving = true;
    this.isLoading = true;
    this.store.dispatch(new this.actionRequestToggle(this.model));
  }
}
