import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { DocumentsFormComponent } from '../../documents/documents-form/documents-form.component';
import * as actions from '../reducers/weddings.actions';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormBuilder } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { SnackBarService } from '@peakitpt/ui-material';

import { ActivatedRoute, Router } from '@angular/router';
import { ActionsSubject, Store } from '@ngrx/store';
import { State } from '../../documents/reducers/documents.reducer';
import * as EmolumentsState from '../../../shared/components/modals/emoluments-modal/reducers/emoluments-modal.reducer';
import {
  WeddingsService,
  DocumentsService,
  EntitiesService,
  PersonsService,
  FileManagerService,
} from '@peakitpt/ui-kyrios-api';
import * as ParishionersState from '../../../shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import * as DocumentsTypesState from 'src/app/shared/components/modals/documents-types-modal/reducers/documents-types-modal.reducer';
import { State as PersonsState } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.reducer';

@Component({
  selector: 'kyr-weddings-emit-documents',
  templateUrl: './weddings-emit-documents.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeddingsEmitDocumentsComponent
  extends DocumentsFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  preFillWithNew = true;
  modulePath = 'documents';
  canEdit: boolean = false;

  constructor(
    public store: Store<State>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    public emolumentsStore: Store<EmolumentsState.State>,
    public documentTypesStore: Store<DocumentsTypesState.State>,
    public documentsService: DocumentsService,
    public parishionersStore: Store<ParishionersState.State>,
    public personsStore: Store<PersonsState>,
    public personsService: PersonsService,
    public entitiesService: EntitiesService,
    public fileManagerService: FileManagerService,
    private service: WeddingsService
  ) {
    super(
      store,
      router,
      route,
      sharedModule,
      fb,
      i18nextPipe,
      snackBarService,
      actionSubject,
      emolumentsStore,
      documentTypesStore,
      documentsService,
      parishionersStore,
      personsStore,
      personsService,
      entitiesService,
      fileManagerService
    );
  }

  ngOnInit() {
    if (this.actionClearGet) {
      this.store.dispatch(new this.actionClearGet());
    }
    this.sharedModule.logAccess(this.subs, this.modulePath, this.route);
    this.initializeForm();
    this.initKeysToIgnoreOnDuplicate();
    this.setDocumentTypesModal();
    this.setEmolumentsModal();
    this.setParishionersModal();
    this.duplicateMode = false;

    this.subs.push(
      this.route.params.subscribe((params) => {
        this.isLoading = true;

        if (params.id && this.preFillWithNew) {
          this.id = +params.id;
          this.addToHeaderOptionsMenu();

          this.model$ = this.store.select(this.selectorGetModel);

          this.subs.push(
            this.service
              .getNewWeddingDocument(this.id)
              .subscribe((obj: any) => {
                if (obj) {
                  this.setFormValues(obj);
                  this.isLoading = false;
                }
              })
          );
        } else {
          this.isLoading = false;
        }
      })
    );
  }

  onFormValid(payload = this.form.getRawValue()) {
    this.subs.push(
      this.service.createNewWeddingDocument(this.id, payload).subscribe(
        (response: any) => {
          this.onSaveSuccess(response);
        },
        (error) => {
          this.snackBarService.openSnackBar(
            error,
            this.sharedModule.ERROR_COLOR
          );
        }
      )
    );
  }

  onSaveSuccess(result: any) {
    this.isLoading = true;

    this.snackBarService.openSnackBar(
      this.i18nextPipe.transform(`${this.modulePath}:message.save_success`),
      this.sharedModule.SUCCESS_COLOR
    );

    this.modal.close();
  }
}
