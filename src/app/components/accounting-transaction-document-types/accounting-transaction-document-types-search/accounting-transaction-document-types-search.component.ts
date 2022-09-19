import { BaseSearchComponent } from 'src/app/shared/components/base-search-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { Store } from '@ngrx/store';
import { State } from 'src/app/components/base/reducers/base.reducer';
import { RequestPostSearch } from 'src/app/components/base/reducers/base.actions';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'kyr-accounting-transaction-document-types-search',
  templateUrl: './accounting-transaction-document-types-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AccountingTransactionDocumentTypesSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'accounting-transaction-document-types';

  actionRequestPostSearch = RequestPostSearch;

  constructor(
    public fb: FormBuilder,
    public i18NextPipe: I18NextPipe,
    public store: Store<State>,
    public sharedModule: SharedModule,
    public cdr: ChangeDetectorRef
  ) {
    super(fb, i18NextPipe, store, sharedModule, cdr);
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.description`
          ),
          mainField: true,
          value: null,
        }),
      }),
    });
  }
}
