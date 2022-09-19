import { BaseSearchComponent } from 'src/app/shared/components/base-search-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { Store } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { State } from 'src/app/components/base/reducers/base.reducer';
import { RequestPostSearch } from 'src/app/components/base/reducers/base.actions';
import { ChangeDetectorRef } from '@angular/core';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import * as AppointmentTypesState from '../../../shared/components/modals/appointment-types-modal/reducers/appointment-types-modal.reducer';
import * as AppointmentTypesSelectors from '../../../shared/components/modals/appointment-types-modal/reducers/appointment-types-modal.selectors';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'kyr-curia-functions-search',
  templateUrl: './curia-functions-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CuriaFunctionsSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'curia-functions';

  actionRequestPostSearch = RequestPostSearch;

  /* This specific's component fields */
  localeOptions: Array<{ label: string; value: string }> = [];

  constructor(
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public store: Store<State>,
    public sharedModule: SharedModule,
    public cdr: ChangeDetectorRef,
    public appointmentTypesStore: Store<AppointmentTypesState.State>,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(fb, i18nextPipe, store, sharedModule, cdr);
  }

  ngOnInit() {
    super.ngOnInit();
    this.subs.push(
      this.appointmentTypesStore
        .select(AppointmentTypesSelectors.getAppointmentTypesSelected)
        .subscribe((v: SelectedModalRow) => {
          if (v && this.form) {
            this.form
              .get('searchFields')
              .get('appointment_type_description')
              .patchValue({
                value: v.model.name,
                valueLabel: v.model.name,
              });
          }
        })
    );
  }

  buildForm() {
    this.localeOptions = [
      {
        value: null,
        label: '',
      },
      {
        value: 'pt',
        label: this.i18nextPipe.transform(`translation:_languages.pt`),
      },
      {
        value: 'es',
        label: this.i18nextPipe.transform(`translation:_languages.es`),
      },
      {
        value: 'en',
        label: this.i18nextPipe.transform(`translation:_languages.en`),
      },
    ];

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
        appointment_type_id: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.appointment_type_id`
          ),
          value: null,
        }),
        appointment_type_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.appointment_type_description`
          ),
          value: null,
        }),
        locale: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.locale`
          ),
          value: null,
        }),
        validated: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.validated`
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
      case 'locale':
        return `${searchWordLabel}:(${
          this.localeOptions.find((o) => o.value === value).label
        }) `;
      case 'validated':
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
      case 'locale':
        const localeOption = this.localeOptions.find(
          (o) => o.label === newValue
        );
        super.updateField(field, localeOption ? localeOption.value : null);
        break;
      case 'validated':
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

  openSelectionModal(
    modalName: string,
    inputName?: string,
    modalParams: any = {},
    modalTitle = ''
  ) {
    this.router.navigate([modalName], {
      queryParams: {
        modalTitle,
        inputName,
        modalParams: btoa(JSON.stringify(modalParams)),
      },
      relativeTo: this.route,
      queryParamsHandling: 'merge',
    });
  }
}
