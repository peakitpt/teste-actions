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
  selector: 'kyr-documents-types-search',
  templateUrl: './documents-types-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DocumentsTypesSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'documents-types';

  actionRequestPostSearch = RequestPostSearch;

  movementTypesOptions: Array<{ value: any; label: string }> = [
    {
      label: this.i18nextPipe.transform('translation:all'),
      value: null,
    },
    {
      value: 'c',
      label: this.i18nextPipe.transform(
        `documents:model.movement_type_option.c`
      ),
    },
    {
      value: 'd',
      label: this.i18nextPipe.transform(
        `documents:model.movement_type_option.d`
      ),
    },
  ];

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
        name: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.code`
          ),
          mainField: true,
          value: null,
        }),
        description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.description`
          ),
          value: null,
        }),
        movement_type: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.movement_type`
          ),
          value: null,
        }),
        self_assessment: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.self_assessment`
          ),
          value: null,
        }),
        affects_legal_tax_reports: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.affects_legal_tax_reports`
          ),
          value: null,
        }),
        active: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.active`
          ),
          value: null,
        }),
      }),
    });
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  searchStringBuilder(
    searchWordLabel: string,
    value: any,
    field?: string
  ): string {
    switch (field) {
      case 'movement_type':
        return `${searchWordLabel}:(${
          this.movementTypesOptions.find((o) => o.value === value).label
        }) `;
      case 'self_assessment':
      case 'affects_legal_tax_reports':
      case 'active':
        return `${searchWordLabel}:(${
          this.booleanOptions.find((o) => o.value === value).label
        }) `;
      default:
        return super.searchStringBuilder(searchWordLabel, value, field);
    }
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  updateField(field: string, newValue: any) {
    switch (field) {
      case 'movement_type':
        const movementTypesOptions = this.movementTypesOptions.find(
          (o) => o.label === newValue
        );
        super.updateField(
          field,
          movementTypesOptions ? movementTypesOptions.value : null
        );
        break;
      case 'self_assessment':
      case 'affects_legal_tax_reports':
      case 'active':
        const booleanOption = this.booleanOptions.find(
          (o) => o.label === newValue
        );
        super.updateField(field, booleanOption ? booleanOption.value : null);
        break;
      default:
        super.updateField(field, newValue);
        break;
    }
  }
}
