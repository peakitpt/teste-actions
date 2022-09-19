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
import { ActivatedRoute, Router } from '@angular/router';
import { getCuriaFunctionsSelected } from 'src/app/shared/components/modals/curia-functions-modal/reducers/curia-functions-modal.selectors';
import * as CuriaFunctionsState from '../../../shared/components/modals/curia-functions-modal/reducers/curia-functions-modal.reducer';
import { getParishionersSelected } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.selectors';
import * as ParishionersState from '../../../shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'kyr-nominations-search',
  templateUrl: './nominations-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class NominationsSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'nominations';
  actionRequestPostSearch = RequestPostSearch;
  nominationTypeSource = [];

  // Quick Insert Management
  parishionersParams = {
    modal: true,
    entity_type: 'Locals',
    translatable: true,
    serialize: 'parishioners_complete_relation',
    format: 'json',
  };

  constructor(
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public store: Store<State>,
    public sharedModule: SharedModule,
    public cdr: ChangeDetectorRef,
    private curiaFunctionsStore: Store<CuriaFunctionsState.State>,
    private parishionersStore: Store<ParishionersState.State>,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(fb, i18nextPipe, store, sharedModule, cdr);
  }

  ngOnInit() {
    super.ngOnInit();
    this.subs.push(
      this.curiaFunctionsStore
        .select(getCuriaFunctionsSelected)
        .subscribe((v: SelectedModalRow) => {
          if (v && this.form) {
            if (v.inputName === 'search') {
              this.form.get('searchFields').get('function_id').patchValue({
                value: v.model.id,
              });
              this.form
                .get('searchFields')
                .get('function_description')
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
            if (v.inputName === 'search') {
              this.form.get('searchFields').get('place_id').patchValue({
                value: v.model.id,
              });
              this.form
                .get('searchFields')
                .get('place_description')
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
        serie_number: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.serie_number`
          ),
          value: null,
          mainField: true,
        }),
        nomination_type_id: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.nomination_type_id`
          ),
          value: null,
        }),
        entity_priest_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_priest_description`
          ),
          value: null,
        }),
        function_id: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.function_id`
          ),
          value: null,
        }),
        function_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.function_description`
          ),
          value: null,
        }),
        place_id: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.place_id`
          ),
          value: null,
        }),
        place_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.place_description`
          ),
          value: null,
        }),
        nomination_date: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.nomination_date`
          ),
          value: null,
        }),
        enabled: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.enabled`
          ),
          value: null,
        }),
      }),
    });

    this.nominationTypeSource = [
      {
        label: this.i18nextPipe.transform('translation:all'),
        value: null,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.not_parishioner`
        ),
        value: 0,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.parishioner`
        ),
        value: 1,
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
      case 'enabled':
        return `${searchWordLabel}:(${
          this.booleanOptions.find((o) => o.value === value).label
        }) `;
      case 'nomination_type_id':
        return `${searchWordLabel}:(${
          this.nominationTypeSource.find((o) => o.value === value).label
        }) `;
      case 'nomination_date':
        return `${searchWordLabel}:(${this.sharedModule.parseDateToString(
          value
        )}) `;
      default:
        return super.searchStringBuilder(searchWordLabel, value, field);
    }
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  updateField(field: string, newValue: any) {
    switch (field) {
      case 'enabled':
        this.form
          .get('searchFields')
          .get(field)
          .get('value')
          .setValue(
            this.booleanOptions.find((i) => i.label === newValue)
              ? this.booleanOptions.find((i) => i.label === newValue).value
              : null
          );
        break;
      case 'nomination_type_id':
        this.form
          .get('searchFields')
          .get(field)
          .get('value')
          .setValue(
            this.nominationTypeSource.find((i) => i.label === newValue)
              ? this.nominationTypeSource.find((i) => i.label === newValue)
                  .value
              : null
          );
        break;
      case 'nomination_date':
        if (newValue !== null && newValue !== undefined) {
          super.updateField(field, this.sharedModule.dateToUtc(newValue));
        } else {
          super.updateField(field, newValue);
        }
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
    queryStringParams: any = null
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
