import { BaseSearchComponent } from 'src/app/shared/components/base-search-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { Store } from '@ngrx/store';
import { State } from 'src/app/components/base/reducers/base.reducer';
import { RequestPostSearch } from 'src/app/components/base/reducers/base.actions';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivatedRoute, Router } from '@angular/router';
import { getCuriaFunctionsSelected } from 'src/app/shared/components/modals/curia-functions-modal/reducers/curia-functions-modal.selectors';
import * as CuriaFunctionsState from '../../../shared/components/modals/curia-functions-modal/reducers/curia-functions-modal.reducer';
import { SelectedModalRow } from 'src/app/shared/shared.model';

@Component({
  selector: 'kyr-curia-ministries-and-orders-search',
  templateUrl: './curia-ministries-and-orders-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CuriaMinistriesAndOrdersSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'curia-ministries-and-orders';

  actionRequestPostSearch = RequestPostSearch;

  typeIdOptions = [];

  constructor(
    public fb: FormBuilder,
    public i18NextPipe: I18NextPipe,
    public store: Store<State>,
    public sharedModule: SharedModule,
    public cdr: ChangeDetectorRef,
    public router: Router,
    public route: ActivatedRoute,
    private curiaFunctionsStore: Store<CuriaFunctionsState.State>
  ) {
    super(fb, i18NextPipe, store, sharedModule, cdr);
  }

  ngOnInit() {
    super.ngOnInit();
    this.typeIdOptions = [
      { value: null, label: this.i18nextPipe.transform(`translation:all`) },
      {
        value: '1',
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.Ministério`
        ),
      },
      {
        value: '2',
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.Ordem`
        ),
      },
    ];
    this.subs.push(
      this.curiaFunctionsStore
        .select(getCuriaFunctionsSelected)
        .subscribe((v: SelectedModalRow) => {
          if (v && this.form) {
            if (v.inputName === 'function_description') {
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
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        serie_number: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.serie_number`
          ),
          mainField: true,
          value: null,
        }),
        type_id: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.type_id`
          ),
          value: null,
        }),
        entity_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_description`
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
        place_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.place_description`
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
