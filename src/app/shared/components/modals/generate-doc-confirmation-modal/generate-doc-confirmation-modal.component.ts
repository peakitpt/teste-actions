import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { DialogComponent, SnackBarService } from '@peakitpt/ui-material';
import { I18NextPipe } from 'angular-i18next';
import { ActionsSubject, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ofType } from '@ngrx/effects';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';

@Component({
  selector: 'kyr-generate-doc-confirmation-modal',
  templateUrl: './generate-doc-confirmation-modal.component.html',
})
export class GenerateDocConfirmationModalComponent
  implements AfterViewInit, OnDestroy {
  private subs: Subscription[] = [];
  isSaving = false;
  isLoading = false;
  // Don't extend from SharedModule to avoid circular dependency
  private readonly ERROR_COLOR = '#ff8080';
  private readonly SUCCESS_COLOR = '#66ff99';

  @Input() form: any;
  @Input() modulePath: string;
  @Input() actionRequestSaveAndGenerateDocument: any;
  @Input() actionRequestFailSaveAndGenerateDocument: any;
  @Input() actionSuccessSaveAndGenerateDocument: any;

  @Output() emitModalClose = new EventEmitter();

  @ViewChild('modal') modal: DialogComponent;

  private saveSuccess = false;

  constructor(
    private store: Store<any>,
    private i18nextPipe: I18NextPipe,
    private snackBarService: SnackBarService,
    private actionSubject: ActionsSubject
  ) {}

  isSmallScreen(): boolean {
    return window.innerWidth < 550;
  }

  ngAfterViewInit() {
    this.subscribeForSaveAndGenerateDocumentAction();
    this.modal.open();
  }

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }

  modalClose() {
    this.emitModalClose.emit(this.saveSuccess);
  }

  subscribeForSaveAndGenerateDocumentAction() {
    // Subscribe for SaveAndGenerateDocument action
    this.subs.push(
      this.actionSubject
        .pipe(
          ofType(
            this.actionRequestFailSaveAndGenerateDocument,
            this.actionSuccessSaveAndGenerateDocument
          )
        )
        .subscribe((result: any) => {
          this.isSaving = false;
          if (result.payload instanceof RequestError) {
            this.isLoading = false;
            this.snackBarService.openSnackBar(
              result.payload.error.error.message,
              this.ERROR_COLOR
            );
          } else {
            this.onSaveSuccess(result);
          }
        })
    );
  }

  confirm() {
    this.isSaving = true;
    this.isLoading = true;

    if (
      this.form.emolument_description &&
      this.form.tax != null &&
      this.form.tax >= 0 &&
      this.form.document_entity_description
    ) {
      this.store.dispatch(
        new this.actionRequestSaveAndGenerateDocument(this.form)
      );
    } else {
      this.isSaving = false;
      this.snackBarService.openSnackBar(
        this.i18nextPipe.transform(
          'translation:message.error_document_data_needed'
        ),
        this.ERROR_COLOR
      );
      this.modal.close();
    }
  }

  onSaveSuccess(result: any) {
    this.isLoading = true;
    this.saveSuccess = true;

    this.snackBarService.openSnackBar(
      this.i18nextPipe.transform(`${this.modulePath}:message.save_success`),
      this.SUCCESS_COLOR
    );

    this.modal.close();
  }
}
