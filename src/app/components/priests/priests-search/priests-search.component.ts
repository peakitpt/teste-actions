import { BaseSearchComponent } from 'src/app/shared/components/base-search-component';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { Store } from '@ngrx/store';
import { State } from 'src/app/components/base/reducers/base.reducer';
import { RequestPostSearch } from 'src/app/components/base/reducers/base.actions';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getClergyTypesSelected } from 'src/app/shared/components/modals/clergy-types-modal/reducers/clergy-types-modal.selectors';
import * as ClergyTypesState from '../../../shared/components/modals/clergy-types-modal/reducers/clergy-types-modal.reducer';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { getCuriaFunctionsSelected } from 'src/app/shared/components/modals/curia-functions-modal/reducers/curia-functions-modal.selectors';
import { State as CuriaFunctionsState } from 'src/app/shared/components/modals/curia-functions-modal/reducers/curia-functions-modal.reducer';
import { State as ParishionersState } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { getParishionersSelected } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.selectors';

@Component({
  selector: 'kyr-priests-search',
  templateUrl: './priests-search.component.html',
})
export class PriestsSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'priests';

  actionRequestPostSearch = RequestPostSearch;

  groupOptions: any[] = [];

  constructor(
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public store: Store<State>,
    public sharedModule: SharedModule,
    public cdr: ChangeDetectorRef,
    public router: Router,
    public route: ActivatedRoute,
    private clergyTypesStore: Store<ClergyTypesState.State>,
    private curiaFunctionsStore: Store<CuriaFunctionsState>,
    private parishionersStore: Store<ParishionersState>
  ) {
    super(fb, i18nextPipe, store, sharedModule, cdr);
  }

  ngOnInit() {
    super.ngOnInit();
    this.subs.push(
      this.clergyTypesStore
        .select(getClergyTypesSelected)
        .subscribe((v: SelectedModalRow) => {
          if (v && this.form) {
            if (v.inputName === 'clergy_type_description') {
              this.form.get('searchFields').get('clergy_type_id').patchValue({
                value: v.model.id,
              });
              this.form
                .get('searchFields')
                .get('clergy_type_description')
                .patchValue({
                  value: v.model.name,
                });
            }
          }
        })
    );
    this.subs.push(
      this.curiaFunctionsStore
        .select(getCuriaFunctionsSelected)
        .subscribe((v: SelectedModalRow) => {
          if (v && this.form) {
            if (v.inputName === 'appointments_curia_function_description') {
              this.form
                .get('searchFields')
                .get('appointments_curia_function_id')
                .patchValue({
                  value: v.model.id,
                });
              this.form
                .get('searchFields')
                .get('appointments_curia_function_description')
                .patchValue({
                  value: v.model.name,
                });
            }
          }
        })
    );
    this.subs.push(
      this.parishionersStore
        .select(getParishionersSelected)
        .subscribe((v: SelectedModalRow) => {
          if (v && this.form) {
            if (v.inputName === 'appointments_appointment_place_description') {
              this.form
                .get('searchFields')
                .get('appointments_appointment_place_id')
                .patchValue({
                  value: v.model.id,
                });
              this.form
                .get('searchFields')
                .get('appointments_appointment_place_description')
                .patchValue({
                  value: v.model.complete_relation,
                });
            } else if (
              v.inputName ===
              'appointments_appointment_place_description_starts'
            ) {
              this.form
                .get('searchFields')
                .get('appointments_appointment_place_description_starts')
                .patchValue({
                  value: v.model.complete_relation,
                });
            }
          }
        })
    );
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        name: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.complete_relation`
          ),
          value: null,
          mainField: true,
        }),
        priest_birth_date_start: this.fb.group({
          searchWordLabel:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.priest_birth_date`
            ) + ` ${this.i18nextPipe.transform('translation:range.min')}`,
          value: null,
          mainField: false,
        }),
        priest_birth_date_end: this.fb.group({
          searchWordLabel:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.priest_birth_date`
            ) + ` ${this.i18nextPipe.transform('translation:range.max')}`,
          value: null,
          mainField: false,
        }),
        ordination_date_start: this.fb.group({
          searchWordLabel:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.ordination_date`
            ) + ` ${this.i18nextPipe.transform('translation:range.min')}`,
          value: null,
          mainField: false,
        }),
        ordination_date_end: this.fb.group({
          searchWordLabel:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.ordination_date`
            ) + ` ${this.i18nextPipe.transform('translation:range.max')}`,
          value: null,
          mainField: false,
        }),
        deceased: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.deceased`
          ),
          value: '',
          mainField: false,
        }),
        disabled: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.disabled`
          ),
          value: '',
          mainField: false,
        }),
        clergy_type_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.clergy_type_description`
          ),
          value: null,
          mainField: false,
        }),
        clergy_type_id: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.clergy_type_id`
          ),
          value: null,
          mainField: false,
        }),
        changes_request: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.changes_request`
          ),
          value: '',
          mainField: false,
        }),

        hashtag_tag: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.hashtag_tag`
          ),
          value: null,
          mainField: false,
        }),
        appointments_curia_function_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.appointments_curia_function_description`
          ),
          value: null,
          mainField: false,
        }),
        appointments_curia_function_id: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.appointments_curia_function_id`
          ),
          value: null,
          mainField: false,
        }),
        appointments_appointment_place_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.appointments_appointment_place_description`
          ),
          value: null,
          mainField: false,
        }),
        appointments_appointment_place_id: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.appointments_appointment_place_id`
          ),
          value: null,
          mainField: false,
        }),
        appointments_appointment_place_description_starts: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.appointments_appointment_place_description_starts`
          ),
          value: null,
          mainField: false,
        }),
      }),
    });

    this.groupOptions = [
      { value: null, label: this.i18nextPipe.transform(`translation:all`) },
      {
        value: '1',
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.types.presbiterals`
        ),
      },
      {
        value: '2',
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.types.deacons`
        ),
      },
      {
        value: '3',
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.types.bishops`
        ),
      },
    ];
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  searchStringBuilder(
    searchWordLabel: string,
    value: any,
    field?: string
  ): string {
    switch (field) {
      case 'clergy_type_id':
        return '';

      case 'priest_birth_date_start':
      case 'priest_birth_date_end':
      case 'ordination_date_start':
      case 'ordination_date_end':
        return `${searchWordLabel}:(${this.sharedModule.parseDateToString(
          value
        )}) `;
      case 'changes_request':
      case 'deceased':
      case 'disabled':
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
      case 'changes_request':
      case 'deceased':
      case 'disabled':
        const booleanOption = this.booleanOptions.find(
          (o) => o.label === newValue
        );
        super.updateField(field, booleanOption ? booleanOption.value : null);
        break;
      case 'priest_birth_date_start':
      case 'priest_birth_date_end':
      case 'ordination_date_start':
      case 'ordination_date_end':
        super.updateField(field, this.sharedModule.dateToUtc(newValue));
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
    modalTitle = '',
    queryStringParams: any = {}
  ) {
    this.router.navigate([modalName], {
      queryParams: {
        modalTitle,
        inputName,
        modalParams: btoa(JSON.stringify(modalParams)),
        queryStringParams: btoa(JSON.stringify(queryStringParams)),
      },
      relativeTo: this.route,
      queryParamsHandling: 'merge',
    });
  }
}
