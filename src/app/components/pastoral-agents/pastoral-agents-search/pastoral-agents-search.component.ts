import { BaseSearchComponent } from 'src/app/shared/components/base-search-component';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { Store } from '@ngrx/store';
import { State } from 'src/app/components/base/reducers/base.reducer';
import { RequestPostSearch } from 'src/app/components/base/reducers/base.actions';
import { getPastoralAgents } from '../reducers/pastoral-agents.selectors';
import * as actions from '../reducers/pastoral-agents.actions';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as FormationsState from '../../../shared/components/modals/formations-modal/reducers/formations-modal.reducer';
import * as FormationsSelectors from '../../../shared/components/modals/formations-modal/reducers/formations-modal.selectors';
import { SelectedModalRow } from 'src/app/shared/shared.model';

@Component({
  selector: 'kyr-pastoral-agents-search',
  templateUrl: './pastoral-agents-search.component.html',
})
export class PastoralAgentsSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'pastoral-agents';

  actionRequestPostSearch = RequestPostSearch;

  selectorGetList = getPastoralAgents;
  actionRequestGetAll = actions.RequestGetAll;

  constructor(
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public store: Store<State>,
    public sharedModule: SharedModule,
    public cdr: ChangeDetectorRef,
    public router: Router,
    public route: ActivatedRoute,
    public formationsStore: Store<FormationsState.State>
  ) {
    super(fb, i18nextPipe, store, sharedModule, cdr);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.subs.push(
      this.formationsStore
        .select(FormationsSelectors.getFormationSelected)
        .subscribe((v: SelectedModalRow) => {
          if (v && this.form) {
            console.log('v', v);
            this.form.get('searchFields').get('formations').patchValue({
              value: v.model.id,
              valueLabel: v.model.description,
            });
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
            `${this.modulePath}:model.entity.name`
          ),
          mainField: true,
          value: null,
        }),
        pastoral_agent_number: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.pastoral_agent_number`
          ),
          value: null,
        }),
        reader_worshipplace: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.reader_institution_center_worshipplace_description`
          ),
          value: null,
        }),
        reader_institution_date_start: this.fb.group({
          searchWordLabel:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.reader_institution_date`
            ) + ` ${this.i18nextPipe.transform('translation:range.min')}`,
          value: null,
        }),
        reader_institution_date_end: this.fb.group({
          searchWordLabel:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.reader_institution_date`
            ) + ` ${this.i18nextPipe.transform('translation:range.max')}`,
          value: null,
        }),
        acolyte_worshipplace: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.acolyte_institution_center_worshipplace_description`
          ),
          value: null,
        }),
        acolyte_institution_date_start: this.fb.group({
          searchWordLabel:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.acolyte_institution_date`
            ) + ` ${this.i18nextPipe.transform('translation:range.min')}`,
          value: null,
        }),
        acolyte_institution_date_end: this.fb.group({
          searchWordLabel:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.acolyte_institution_date`
            ) + ` ${this.i18nextPipe.transform('translation:range.max')}`,
          value: null,
        }),
        mec_worshipplace: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.mec_institution_center_worshipplace_description`
          ),
          value: null,
        }),
        mec_institution_date_start: this.fb.group({
          searchWordLabel:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.mec_institution_date`
            ) + ` ${this.i18nextPipe.transform('translation:range.min')}`,
          value: null,
        }),
        mec_institution_date_end: this.fb.group({
          searchWordLabel:
            this.i18nextPipe.transform(
              `${this.modulePath}:model.mec_institution_date`
            ) + ` ${this.i18nextPipe.transform('translation:range.max')}`,
          value: null,
        }),
        formations: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.formations`
          ),
          value: null,
          valueLabel: null,
        }),
        // email: this.fb.group({
        //   searchWordLabel: this.i18nextPipe.transform(
        //     `${this.modulePath}:model.email`
        //   ),
        //   value: null
        // }),
        // archpriestship: this.fb.group({
        //   searchWordLabel: this.i18nextPipe.transform(
        //     `${this.modulePath}:model.archpriestship`
        //   ),
        //   value: null
        // }),
        // chapelry: this.fb.group({
        //   searchWordLabel: this.i18nextPipe.transform(
        //     `${this.modulePath}:model.chapelry`
        //   ),
        //   value: null
        // }),
        // serie_number: this.fb.group({
        //   searchWordLabel: this.i18nextPipe.transform(
        //     `${this.modulePath}:model.serie_number`
        //   ),
        //   value: null
        // }),
        // active: this.fb.group({
        //   searchWordLabel: this.i18nextPipe.transform(
        //     `${this.modulePath}:model.active`
        //   ),
        //   value: null
        // }),
        // approved: this.fb.group({
        //   searchWordLabel: this.i18nextPipe.transform(
        //     `${this.modulePath}:model.approved`
        //   ),
        //   value: null
        // }),
        // is_parishioner: this.fb.group({
        //   searchWordLabel: this.i18nextPipe.transform(
        //     `${this.modulePath}:model.is_parishioner`
        //   ),
        //   value: null
        // })
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
      case 'reader_institution_date_start':
      case 'reader_institution_date_end':
      case 'acolyte_institution_date_start':
      case 'acolyte_institution_date_end':
      case 'mec_institution_date_start':
      case 'mec_institution_date_end':
        return `${searchWordLabel}:(${this.sharedModule.parseDateToString(
          value
        )}) `;
      case 'active':
      case 'approved':
      case 'is_parishioner':
        return `${searchWordLabel}:(${
          this.booleanOptions.find((o) => o.value === value).label
        }) `;
      // case 'formations':
      //   return super.searchStringBuilder(
      //     searchWordLabel,
      //     this.form.get('searchFields').value[field].valueLabel,
      //     field
      //   );
      default:
        return super.searchStringBuilder(searchWordLabel, value, field);
    }
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  updateField(field: string, newValue: any) {
    switch (field) {
      case 'reader_institution_date_start':
      case 'reader_institution_date_end':
      case 'acolyte_institution_date_start':
      case 'acolyte_institution_date_end':
      case 'mec_institution_date_start':
      case 'mec_institution_date_end':
        super.updateField(field, this.sharedModule.dateToUtc(newValue));
        break;
      case 'active':
      case 'approved':
      case 'is_parishioner':
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
      default:
        this.form
          .get('searchFields')
          .get(field)
          .get('value')
          .setValue(newValue);
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
