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
import { getChapelriesList } from '../../chapelries/reducers/chapelries.selectors';
import { getArchpristshipsList } from '../../archpristships/reducers/archpristships.selectors';
import * as actionsBishoprics from '../../bishoprics/reducers/bishoprics.actions';
import * as actionsChapelries from '../../chapelries/reducers/chapelries.actions';
import * as actionsArchpriestships from '../../archpristships/reducers/archpristships.actions';
import * as BishopricsState from '../../../shared/components/modals/bishoprics-modal/reducers/bishoprics-modal.reducer';
import * as ChapelriesState from '../../../shared/components/modals/chapelries-modal/reducers/chapelries-modal.reducer';
import * as ArchpristshipsState from '../../../shared/components/modals/archpristships-modal/reducers/archpristships-modal.reducer';
import * as BishopricsSelectors from '../../../shared/components/modals/bishoprics-modal/reducers/bishoprics-modal.selectors';
import * as ChapelriesSelectors from '../../../shared/components/modals/chapelries-modal/reducers/chapelries-modal.selectors';
import * as ArchpristshipsSelectors from '../../../shared/components/modals/archpristships-modal/reducers/archpristships-modal.selectors';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'kyr-worshipplaces-search',
  templateUrl: './worshipplaces-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class WorshipplacesSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'worshipplaces';

  actionRequestPostSearch = RequestPostSearch;

  selectorBishopricsList = getBishopricsList;
  selectorChapelriesList = getChapelriesList;
  selectorArchpristshipsList = getArchpristshipsList;
  actionRequestGetAllBishoprics = actionsBishoprics.RequestGetAll;
  actionRequestGetAllChapelries = actionsChapelries.RequestGetAll;
  actionRequestGetAllArchpristships = actionsArchpriestships.RequestGetAll;

  constructor(
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public store: Store<State>,
    public sharedModule: SharedModule,
    public cdr: ChangeDetectorRef,
    public bishopricsStore: Store<BishopricsState.State>,
    public chapelriesStore: Store<ChapelriesState.State>,
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
            this.form
              .get('searchFields')
              .get('diocese_description')
              .patchValue({ value: v.model.entity_description });
          }
        })
    );
    this.subs.push(
      this.archpristshipsStore
        .select(ArchpristshipsSelectors.getArchpristshipsSelected)
        .subscribe((v: SelectedModalRow) => {
          if (v && this.form) {
            this.form
              .get('searchFields')
              .get('archpriestship_description')
              .patchValue({
                value: v.model.complete_relation.split(' > ').pop(),
              });
          }
        })
    );
    this.subs.push(
      this.chapelriesStore
        .select(ChapelriesSelectors.getChapelriesSelected)
        .subscribe((v: SelectedModalRow) => {
          if (v && this.form) {
            this.form
              .get('searchFields')
              .get('chapelry_description')
              .patchValue({ value: v.model.name });
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
        chapelry_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_relation_attributes.chapelry_description`
          ),
          value: null,
        }),
        archpriestship_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_relation_attributes.arciprestado_description`
          ),
          value: null,
        }),
        diocese_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_relation_attributes.diocese_description`
          ),
          value: null,
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
