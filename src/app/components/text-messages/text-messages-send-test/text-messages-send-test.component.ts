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

import { TextMessage } from '../text-message.model';
import * as actions from '../reducers/text-messages.actions';

@Component({
  selector: 'kyr-text-messages-send-test',
  templateUrl: './text-messages-send-test.component.html',
})
export class TextMessagesSendTestComponent implements AfterViewInit, OnDestroy {
  private subs: Subscription[] = [];
  modulePath = 'text-messages';
  isSaving = false;
  isLoading = false;

  private actionRequestSendTest = actions.RequestSendTest;
  private actionRequestFail =
    actions.TextMessagesActionTypes.RequestFailSendTest;
  private actionSuccessSendTest =
    actions.TextMessagesActionTypes.SuccessSendTest;
  private actionRequestGetAll = actions.RequestGetAll;

  @Input() model: TextMessage;
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
    this.subscribeForSendTestAction();
    this.modal.open();
  }

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }

  modalClose() {
    this.emitModalClose.emit();
  }

  subscribeForSendTestAction() {
    // Subscribe for SendTest action
    this.subs.push(
      this.actionSubject
        .pipe(ofType(this.actionRequestFail, this.actionSuccessSendTest))
        .subscribe((result: any) => {
          this.isSaving = false;
          if (result.payload instanceof RequestError) {
            this.isLoading = false;
            this.snackBarService.openSnackBar(
              this.i18nextPipe.transform(
                result.payload.error.error.message.includes('403 Forbidden')
                  ? `${this.modulePath}:message.error_403`
                  : result.payload.error.error.message
              ),
              this.sharedModule.ERROR_COLOR
            );
          } else {
            this.snackBarService.openSnackBar(
              this.i18nextPipe.transform(
                `${this.modulePath}:message.send_success`
              ),
              this.sharedModule.SUCCESS_COLOR
            );
            this.store.dispatch(new this.actionRequestGetAll()); // Refresh table
            this.modal.close();
          }
        })
    );
  }

  sendTest() {
    this.isSaving = true;
    this.isLoading = true;

    if (this.model.test_recipient) {
      this.store.dispatch(new this.actionRequestSendTest(this.model)); // Send Test TextMessage
    } else {
      this.isSaving = false;
      this.snackBarService.openSnackBar(
        this.i18nextPipe.transform(
          `${this.modulePath}:message.error_no_test_recipient`
        ),
        this.sharedModule.ERROR_COLOR
      );
      this.modal.close();
    }
  }
}
