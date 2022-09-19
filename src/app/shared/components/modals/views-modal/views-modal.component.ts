import {
  Component,
  ViewChild,
  OnDestroy,
  AfterViewInit,
  OnInit,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { PaginatorComponent } from '@peakitpt/ui-material';
import { Observable } from 'rxjs';
import { ViewsResponse } from './views-modal.model';
import { getError, getViews } from './reducers/views-modal.selectors';
import * as actions from './reducers/views-modal.actions';
import { BaseModalListComponent } from '../base-modal-list-component';

@Component({
  selector: 'kyr-views-modal',
  templateUrl: './views-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewsModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild('nameColumnTemplate') nameColumnTemplate: TemplateRef<any>;
  @ViewChild('paginator') paginator: PaginatorComponent;

  modelList$: Observable<ViewsResponse>;
  selectorGetList = getViews;
  modulePath = 'views';
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionRequestSetSelected = actions.RequestSetSelected;

  setTableColumns() {
    return [
      {
        id: 'name',
        title: this.i18nextPipe.transform('views:model.name'),
        template: this.nameColumnTemplate,
      },
    ];
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
      }),
    });
  }
}
