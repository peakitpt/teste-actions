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
import { SharedModule } from 'src/app/shared/shared.module';
import { State } from 'src/app/components/base/reducers/base.reducer';
import { RequestPostSearch } from 'src/app/components/base/reducers/base.actions';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'kyr-curia-administrative-process-types-search',
  templateUrl: './curia-administrative-process-types-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CuriaAdministrativeProcessTypesSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'curia-administrative-process-types';

  actionRequestPostSearch = RequestPostSearch;

  subtypeDescriptionOptions = [];

  constructor(
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public store: Store<State>,
    public sharedModule: SharedModule,
    public cdr: ChangeDetectorRef
  ) {
    super(fb, i18nextPipe, store, sharedModule, cdr);
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        name: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.name`
          ),
          value: null,
          mainField: true,
        }),
        subtype_description: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.subtype_description`
          ),
          value: null,
        }),
      }),
    });

    this.subtypeDescriptionOptions = [
      {
        label: this.i18nextPipe.transform('translation:all'),
        value: null,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.option.party_provisions`
        ),
        value: 'Licenças de Festas',
      },
    ];
  }
}
