import { BaseSearchComponent } from 'src/app/shared/components/base-search-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { RequestPostSearch } from 'src/app/components/base/reducers/base.actions';

@Component({
  selector: 'kyr-newsletters-layouts-search',
  templateUrl: './newsletters-layouts-search.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class NewslettersLayoutsSearchComponent
  extends BaseSearchComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'newsletters-layouts';

  actionRequestPostSearch = RequestPostSearch;

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        title: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.title`
          ),
          value: null,
          mainField: true,
        }),
      }),
    });
  }
}
