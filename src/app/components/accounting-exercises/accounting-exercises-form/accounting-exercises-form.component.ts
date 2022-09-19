import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as actions from '../reducers/accounting-exercises.actions';
import { getAccountingExercise } from '../reducers/accounting-exercises.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { AccountingExercise } from '../accounting-exercise.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextPipe } from 'angular-i18next';
import { SnackBarService } from '@peakitpt/ui-material';
import { getAccountingTaxonomyReferencesSelected } from 'src/app/shared/components/modals/accounting-taxonomy-references-modal/reducers/accounting-taxonomy-references-modal.selectors';
import * as AccountingTaxonomyReferenceState from '../../../shared/components/modals/accounting-taxonomy-references-modal/reducers/accounting-taxonomy-references-modal.reducer';

@Component({
  selector: 'kyr-accounting-exercises-form',
  templateUrl: './accounting-exercises-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccountingExercisesFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<AccountingExercise>;
  modulePath = 'accounting-exercises';
  preFillWithNew = true;

  selectorGetModel = getAccountingExercise;
  actionRequestFail = actions.AccountingExercisesActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.AccountingExercisesActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.AccountingExercisesActionTypes.SuccessPost;
  actionRequestGetNew = actions.RequestGetNew;

  accountingTaxonomyReferencesMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];

  constructor(
    public store: Store<any>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    private accountingTaxonomyReferencesStore: Store<AccountingTaxonomyReferenceState.State>
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

  ngOnInit() {
    super.ngOnInit();
    this.setAccountingTaxonomyReferencesModal();
  }

  initializeForm() {
    this.form = this.fb.group({
      active: [true, Validators.required],
      company_id: [],
      created_at: [],
      created_by_user_id: [],
      deleted: [false],
      deleted_by_user_id: [],
      end_date: [null, Validators.required],
      id: [],
      start_date: [null, Validators.required],
      taxonomy_reference_description: [null, Validators.required],
      taxonomy_reference_id: [null, Validators.required],
      updated_at: [],
      updated_by_user_id: [],
      year: [null, Validators.required],
    });
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);
    this.model = obj;
  }

  menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'clear_accounting-taxonomy-references_modal': {
        this.form.get('taxonomy_reference_id').setValue(null);
        this.form.get('taxonomy_reference_description').setValue(null);
        break;
      }
      case 'view_selected_accounting-taxonomy-references': {
        if (this.form.get('taxonomy_reference_id').value) {
          this.openDetails(
            'accounting-taxonomy-references',
            this.form.get('taxonomy_reference_id').value
          );
        }
        break;
      }
      default: {
        super.menuClick(event, inputName);
      }
    }
  }

  onSubmit() {
    this.isSaving = true;

    if (this.form.valid) {
      this.onFormValid();
    } else {
      this.savingError(
        this.i18nextPipe.transform('translation:message.form_errors')
      );
    }
  }

  // THIS FORM SPECIFIC FUNCTIONS [START]
  private setAccountingTaxonomyReferencesModal() {
    this.accountingTaxonomyReferencesMenuOptions = this.defaultModalMenu(
      'accounting-taxonomy-references'
    );

    // When a row is selected
    this.subs.push(
      this.accountingTaxonomyReferencesStore
        .select(getAccountingTaxonomyReferencesSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.form.get(`${row.inputName}_id`).setValue(row.model.id);
            this.form
              .get(`${row.inputName}_description`)
              .setValue(row.model.code);
          }
        })
    );
  }
}
