import { BaseSearchComponent } from 'src/app/shared/components/base-search-component';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { Store } from '@ngrx/store';
import { State } from 'src/app/components/base/reducers/base.reducer';
import { RequestPostSearch } from 'src/app/components/base/reducers/base.actions';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'kyr-pastoral-agents-types-search',
  templateUrl: './pastoral-agents-types-search.component.html',
  providers: [SharedModule],
})
export class PastoralAgentsTypesSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'pastoral-agents-types';

  actionRequestPostSearch = RequestPostSearch;
  groupOptions: Array<{ label: string; value: string }>;

  constructor(
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public sharedModule: SharedModule,
    public cdr: ChangeDetectorRef,
    public store: Store<State>
  ) {
    super(fb, i18nextPipe, store, sharedModule, cdr);
    this.groupOptions = this.sharedModule.getPastoralAgentsTypesGroupsOptions();
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
        group: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.group`
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
      case 'group':
        return (
          searchWordLabel +
          ':(' +
          this.groupOptions.find((i) => i.value === value).label +
          ') '
        );
      default:
        return super.searchStringBuilder(searchWordLabel, value, field);
    }
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  updateField(field: string, newValue: any) {
    switch (field) {
      case 'group':
        this.form
          .get('searchFields')
          .get(field)
          .get('value')
          .setValue(
            this.groupOptions.find((i) => i.label === newValue)
              ? this.groupOptions.find((i) => i.label === newValue).value
              : null
          );
        break;
      default:
        super.updateField(field, newValue);
    }
  }
}
