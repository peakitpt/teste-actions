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
  selector: 'kyr-bishopric-integrated-views-search',
  templateUrl: './bishopric-integrated-views-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class BishopricIntegratedViewsSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'bishopric-integrated-views';

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
        year: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.year`
          ),
          mainField: true,
          value: null,
        }),
      }),
    });
  }
}
