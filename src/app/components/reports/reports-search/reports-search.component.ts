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
  selector: 'kyr-reports-search',
  templateUrl: './reports-search.component.html',
})
export class ReportsSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'reports';

  actionRequestPostSearch = RequestPostSearch;

  exportTypeOptions = [
    {
      value: '',
      label: this.i18nextPipe.transform('translation:all'),
    },
    {
      value: 'Pdf',
      label: this.i18nextPipe.transform(`${this.modulePath}:option.pdf`),
    },
    {
      value: 'Docx',
      label: this.i18nextPipe.transform(`${this.modulePath}:option.docx`),
    },
    {
      value: 'Xlsx',
      label: this.i18nextPipe.transform(`${this.modulePath}:option.xlsx`),
    },
    {
      value: 'Odt',
      label: this.i18nextPipe.transform(`${this.modulePath}:option.odt`),
    },
  ];

  reportTypeOptions = [
    {
      value: '',
      label: this.i18nextPipe.transform('translation:all'),
    },
    {
      value: 'List',
      label: this.i18nextPipe.transform(`${this.modulePath}:option.list`),
    },
    {
      value: 'Form',
      label: this.i18nextPipe.transform(`${this.modulePath}:option.form`),
    },
  ];

  constructor(
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public store: Store<State>,
    public sharedModule: SharedModule,
    public cdr: ChangeDetectorRef
  ) {
    super(fb, i18nextPipe, store, sharedModule, cdr);
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        name: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.name`
          ),
          value: null,
          mainField: true,
        }),
        report_type: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.report_type`
          ),
          value: null,
        }),
        module: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.module`
          ),
          value: null,
        }),
        export_type: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.export_type`
          ),
          value: null,
        }),
        report_file: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.report_file`
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
      case 'export_type':
        return `${searchWordLabel}:(${
          this.exportTypeOptions.find((o) => o.value === value).label
        }) `;
      case 'report_type':
        return `${searchWordLabel}:(${
          this.reportTypeOptions.find((o) => o.value === value).label
        }) `;
      default:
        return super.searchStringBuilder(searchWordLabel, value, field);
    }
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  updateField(field: string, newValue: any) {
    switch (field) {
      case 'export_type':
        const exportTypeOption = this.exportTypeOptions.find(
          (o) => o.label === newValue
        );
        super.updateField(
          field,
          exportTypeOption ? exportTypeOption.value : null
        );
        break;
      case 'report_type':
        const reportTypeOption = this.reportTypeOptions.find(
          (o) => o.label === newValue
        );
        super.updateField(
          field,
          reportTypeOption ? exportTypeOption.value : null
        );
        break;
      default:
        super.updateField(field, newValue);
        break;
    }
  }
}
