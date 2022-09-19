import { BaseSearchComponent } from 'src/app/shared/components/base-search-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import { RequestPostSearch } from 'src/app/components/base/reducers/base.actions';
import { FormBuilder } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { Store } from '@ngrx/store';
import { State } from 'src/app/components/base/reducers/base.reducer';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'kyr-curia-weddings-search',
  templateUrl: './curia-weddings-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CuriaWeddingsSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'curia-weddings';

  actionRequestPostSearch = RequestPostSearch;

  civilRegistrationCertificatesOptions: any[];

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
        serie_number: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.serie_number`
          ),
          value: null,
          mainField: true,
        }),
        entity_groom_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_groom_description`
          ),
          value: null,
        }),
        entity_bride_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_bride_description`
          ),
          value: null,
        }),
        seat_number: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.seat_number`
          ),
          value: null,
        }),
        date_start: this.fb.group({
          searchWordLabel:
            this.i18nextPipe.transform(`${this.modulePath}:model.date`) +
            ` ${this.i18nextPipe.transform('translation:range.min')}`,
          value: null,
        }),
        date_end: this.fb.group({
          searchWordLabel:
            this.i18nextPipe.transform(`${this.modulePath}:model.date`) +
            ` ${this.i18nextPipe.transform('translation:range.max')}`,
          value: null,
        }),
        entity_location_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_location_description`
          ),
          value: null,
        }),
        civil_registration_certificates: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.civil_registration_certificates`
          ),
          value: '',
        }),
        curia_status: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.curia_status`
          ),
          value: '',
        }),
      }),
    });

    this.civilRegistrationCertificatesOptions = [
      {
        label: '',
        value: '',
      },
      {
        label: this.i18nextPipe.transform(
          this.modulePath + ':model.options.catholic'
        ),
        value: '1',
      },
      {
        label: this.i18nextPipe.transform(
          this.modulePath + ':model.options.between_catholic_not_baptized'
        ),
        value: '2',
      },
      {
        label: this.i18nextPipe.transform(
          this.modulePath + ':model.options.between_catholic_not_catholic'
        ),
        value: '3',
      },
    ];
    this.cdr.detectChanges();
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  searchStringBuilder(
    searchWordLabel: string,
    value: any,
    field?: string
  ): string {
    switch (field) {
      case 'date_start':
      case 'date_end':
      case 'curiaWedding_date_start':
      case 'curiaWedding_date_end':
        return `${searchWordLabel}:(${this.sharedModule.parseDateToString(
          value
        )}) `;
      case 'curia_status':
        return `${searchWordLabel}:(${this.i18nextPipe.transform(
          `translation:curia_status.${value}`
        )}) `;
      default:
        return super.searchStringBuilder(searchWordLabel, value, field);
    }
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  updateField(field: string, newValue: any) {
    switch (field) {
      case 'date_start':
      case 'date_end':
      case 'curiaWedding_date_start':
      case 'curiaWedding_date_end':
        super.updateField(field, this.sharedModule.dateToUtc(newValue));
        break;
      case 'curia_status':
        const curiaStatusesOption = this.curiaStatusesOptions.find(
          (o) => o.label === newValue
        );
        super.updateField(
          field,
          curiaStatusesOption ? curiaStatusesOption.value : null
        );
        break;
      default:
        super.updateField(field, newValue);
        break;
    }
  }
}
