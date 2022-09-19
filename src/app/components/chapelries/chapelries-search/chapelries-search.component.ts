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
import { State } from 'src/app/components/base/reducers/base.reducer';
import { RequestPostSearch } from 'src/app/components/base/reducers/base.actions';
import { getBishopricsList } from '../../bishoprics/reducers/bishoprics.selectors';
import * as actions from '../../bishoprics/reducers/bishoprics.actions';
import * as BishopricsState from '../../../shared/components/modals/bishoprics-modal/reducers/bishoprics-modal.reducer';
import * as BishopricsSelectors from '../../../shared/components/modals/bishoprics-modal/reducers/bishoprics-modal.selectors';
import * as ArchpristshipsState from '../../../shared/components/modals/archpristships-modal/reducers/archpristships-modal.reducer';
import * as ArchpristshipsSelectors from '../../../shared/components/modals/archpristships-modal/reducers/archpristships-modal.selectors';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'kyr-chapelries-search',
  templateUrl: './chapelries-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ChapelriesSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'chapelries';

  actionRequestPostSearch = RequestPostSearch;

  selectorGetList = getBishopricsList;
  actionRequestGetAll = actions.RequestGetAll;

  constructor(
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public store: Store<State>,
    public sharedModule: SharedModule,
    public cdr: ChangeDetectorRef,
    public bishopricsStore: Store<BishopricsState.State>,
    public archpristshipsStore: Store<ArchpristshipsState.State>,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(fb, i18nextPipe, store, sharedModule, cdr);
  }

  ngOnInit() {
    super.ngOnInit();
    this.subs.push(
      this.bishopricsStore
        .select(BishopricsSelectors.getBishopricsSelected)
        .subscribe((v: SelectedModalRow) => {
          if (v && this.form) {
            this.form.get('searchFields').get('diocese_id').patchValue({
              value: v.model.entity_id,
              valueLabel: v.model.entity_description,
            });
          }
        })
    );

    this.subs.push(
      this.archpristshipsStore
        .select(ArchpristshipsSelectors.getArchpristshipsSelected)
        .subscribe((v: SelectedModalRow) => {
          if (v && this.form) {
            this.form.get('searchFields').get('archpriestship_id').patchValue({
              value: v.model.id,
              valueLabel: v.model.name,
            });
          }
        })
    );
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        entity_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_description`
          ),
          mainField: true,
          value: null,
        }),
        archpriestship_id: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_relation_attributes.archpristship_description`
          ),
          value: null,
          valueLabel: null,
        }),
        diocese_id: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_relation_attributes.diocese_description`
          ),
          value: null,
          valueLabel: null,
        }),
        country_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.country_description`
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
      case 'validated':
        return `${searchWordLabel}:(${
          this.booleanOptions.find((o) => o.value === value).label
        }) `;
      // case 'archpriestship_id':
      // case 'diocese_id':
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
      case 'validated':
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
