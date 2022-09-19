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
import { getCuriaAdministrativeProcessTypesSelected } from 'src/app/shared/components/modals/curia-administrative-process-types-modal/reducers/curia-administrative-process-types-modal.selectors';
import * as CuriaAdministrativeProcessTypesState from '../../../shared/components/modals/curia-administrative-process-types-modal/reducers/curia-administrative-process-types-modal.reducer';
import { getParishionersSelected } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.selectors';
import * as ParishionersState from '../../../shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { SelectedModalRow } from 'src/app/shared/shared.model';

@Component({
  selector: 'kyr-curia-administrative-processes-search',
  templateUrl: './curia-administrative-processes-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CuriaAdministrativeProcessesSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'curia-administrative-processes';

  actionRequestPostSearch = RequestPostSearch;
  parishionersQueryStringParams = {
    serialize: 'parishioners_name_type_complete_relation_taxpayer_address',
    except_users: true,
  };

  constructor(
    public fb: FormBuilder,
    public i18NextPipe: I18NextPipe,
    public store: Store<State>,
    public sharedModule: SharedModule,
    public cdr: ChangeDetectorRef,
    public router: Router,
    public route: ActivatedRoute,
    private curiaAdministrativeProcessTypesStore: Store<CuriaAdministrativeProcessTypesState.State>,
    private parishionersStore: Store<ParishionersState.State>
  ) {
    super(fb, i18NextPipe, store, sharedModule, cdr);
  }

  ngOnInit() {
    super.ngOnInit();
    this.subs.push(
      this.curiaAdministrativeProcessTypesStore
        .select(getCuriaAdministrativeProcessTypesSelected)
        .subscribe((v: SelectedModalRow) => {
          if (v && this.form) {
            if (
              v.inputName === 'curia_administrative_process_type_description'
            ) {
              this.form
                .get('searchFields')
                .get('curia_administrative_process_type_id')
                .patchValue({
                  value: v.model.id,
                });
              this.form
                .get('searchFields')
                .get('curia_administrative_process_type_description')
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
            if (v.inputName === 'document_entity_description') {
              this.form
                .get('searchFields')
                .get('document_entity_id')
                .patchValue({
                  value: v.model.id,
                });
              this.form
                .get('searchFields')
                .get('document_entity_description')
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
        title: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.title`
          ),
          value: null,
        }),
        curia_administrative_process_type_id: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.curia_administrative_process_type_id`
          ),
          value: null,
        }),
        curia_administrative_process_type_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.curia_administrative_process_type_description`
          ),
          value: null,
        }),
        document_entity_id: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.document_entity_id`
          ),
          value: null,
        }),
        document_entity_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.document_entity_description`
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
