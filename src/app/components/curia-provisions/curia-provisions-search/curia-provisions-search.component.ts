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
import { getCuriaProvisionTypesSelected } from 'src/app/shared/components/modals/curia-provision-types-modal/reducers/curia-provision-types-modal.selectors';
import * as CuriaProvisionTypesState from '../../../shared/components/modals/curia-provision-types-modal/reducers/curia-provision-types-modal.reducer';
import { SelectedModalRow } from 'src/app/shared/shared.model';

@Component({
  selector: 'kyr-curia-provisions-search',
  templateUrl: './curia-provisions-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CuriaProvisionsSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'curia-provisions';

  actionRequestPostSearch = RequestPostSearch;

  constructor(
    public fb: FormBuilder,
    public i18NextPipe: I18NextPipe,
    public store: Store<State>,
    public sharedModule: SharedModule,
    public cdr: ChangeDetectorRef,
    public router: Router,
    public route: ActivatedRoute,
    private curiaProvisionTypesStore: Store<CuriaProvisionTypesState.State>
  ) {
    super(fb, i18NextPipe, store, sharedModule, cdr);
  }

  ngOnInit() {
    super.ngOnInit();
    this.subs.push(
      this.curiaProvisionTypesStore
        .select(getCuriaProvisionTypesSelected)
        .subscribe((v: SelectedModalRow) => {
          if (v && this.form) {
            if (v.inputName === 'provision_type_description') {
              this.form
                .get('searchFields')
                .get('provision_type_id')
                .patchValue({
                  value: v.model.id,
                });
              this.form
                .get('searchFields')
                .get('provision_type_description')
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
        provision_type_id: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.provision_type_id`
          ),
          value: null,
        }),
        provision_type_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.provision_type_description`
          ),
          value: null,
        }),
        place_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.place_description`
          ),
          value: null,
        }),
        expiration_date: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.expiration_date`
          ),
          value: null,
        }),
        document_date: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.document_date`
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
      case 'expiration_date':
      case 'document_date':
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
      case 'expiration_date':
      case 'document_date':
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
