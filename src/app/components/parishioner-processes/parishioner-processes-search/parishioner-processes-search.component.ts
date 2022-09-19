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
import { SelectedModalRow } from 'src/app/shared/shared.model';

import { FormBuilder } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { Store } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { State } from 'src/app/components/base/reducers/base.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import * as ViewsState from '../../../shared/components/modals/views-modal/reducers/views-modal.reducer';
import * as ViewsSelectors from '../../../shared/components/modals/views-modal/reducers/views-modal.selectors';

@Component({
  selector: 'kyr-parishioner-processes-search',
  templateUrl: './parishioner-processes-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ParishionerProcessesSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'parishioner-processes';

  actionRequestPostSearch = RequestPostSearch;

  viewsQSP = {
    modal: true,
    format: 'json',
    use_translation: true,
    filter_views: this.filterViews(),
  };

  constructor(
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public store: Store<State>,
    public sharedModule: SharedModule,
    public cdr: ChangeDetectorRef,
    public viewsStore: Store<ViewsState.State>,
    public router: Router,
    public route: ActivatedRoute
  ) {
    super(fb, i18nextPipe, store, sharedModule, cdr);
  }

  ngOnInit() {
    super.ngOnInit();
    this.subs.push(
      this.viewsStore
        .select(ViewsSelectors.getViewsSelected)
        .subscribe((v: SelectedModalRow) => {
          if (v && this.form) {
            this.form.get('searchFields').get('view_description').patchValue({
              value: v.model.name,
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
        process_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.process_description`
          ),
          value: null,
          mainField: true,
        }),
        serie_number: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.serie_number`
          ),
          value: null,
        }),
        view_id: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.view_id`
          ),
          value: null,
        }),
        view_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.view_description`
          ),
          value: null,
        }),
      }),
    });
  }

  openSelectionModal(
    modalName: string,
    inputName?: string,
    modalParams: any = {},
    modalTitle = '',
    queryStringParams: any = this.viewsQSP
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

  private filterViews(): string {
    if (this.sharedModule.isDiocese()) {
      return 'curia_processes';
    }
    return 'processes';
  }
}
