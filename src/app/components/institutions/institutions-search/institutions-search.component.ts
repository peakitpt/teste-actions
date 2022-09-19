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
import * as InstitutionsTypesState from '../../../shared/components/modals/institutions-types-modal/reducers/institutions-types-modal.reducer';
import * as InstitutionsTypesSelectors from '../../../shared/components/modals/institutions-types-modal/reducers/institutions-types-modal.selectors';
import { SelectedModalRow } from 'src/app/shared/shared.model';

@Component({
  selector: 'kyr-institutions-search',
  templateUrl: './institutions-search.component.html',
  styleUrls: ['institutions-search.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InstitutionsSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'institutions';

  actionRequestPostSearch = RequestPostSearch;

  constructor(
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public store: Store<State>,
    public sharedModule: SharedModule,
    public cdr: ChangeDetectorRef,
    public router: Router,
    public route: ActivatedRoute,
    public institutionsTypesStore: Store<InstitutionsTypesState.State>
  ) {
    super(fb, i18nextPipe, store, sharedModule, cdr);
  }

  ngOnInit() {
    this.subs.push(
      this.institutionsTypesStore
        .select(InstitutionsTypesSelectors.getInstitutionsTypesSelected)
        .subscribe((v: SelectedModalRow) => {
          if (v && this.form) {
            this.form
              .get('searchFields')
              .get('institution_type_description')
              .patchValue({ value: v.model.name });
          }
        })
    );
    super.ngOnInit();
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        name: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.name`
          ),
          value: null,
          mainField: true,
        }),
        entity_id: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity_id`
          ),
          value: null,
        }),
        chapelry_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.chapelry_description`
          ),
          value: null,
        }),
        institution_type_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.institution_type_description`
          ),
          value: null,
        }),
        disabled: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.entity.disabled`
          ),
          value: '',
        }),
      }),
    });
    this.cdr.detectChanges();
  }

  // SPECIAL FIELDS SHOULD BE MANAGED HERE (ex.: Dates)
  searchStringBuilder(
    searchWordLabel: string,
    value: any,
    field?: string
  ): string {
    switch (field) {
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
      case 'disabled':
        const disableOptions = this.booleanOptions.find(
          (o) => o.label === newValue
        );
        super.updateField(field, disableOptions ? disableOptions.value : null);
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
