import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/documents-types.actions';
import { getDocumentsType } from '../reducers/documents-types.selectors';
import { Observable } from 'rxjs';
import { DocumentsType } from '../documents-type.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';

@Component({
  selector: 'kyr-documents-types-details',
  templateUrl: './documents-types-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DocumentsTypesDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<DocumentsType>;
  returnUrl = '/documents-types';
  modulePath = 'documents-types';
  viewName = 'DocumentsType';

  selectorGetModel = getDocumentsType;
  actionRequestFail =
    actions.DocumentsTypesActionTypes.RequestFailDocumentsTypes;
  actionRequestGetOne = actions.RequestGetDocumentsType;

  afterGetModel() {
    super.afterGetModel();
    this.buildHeaderOptionsMenu();
  }

  buildHeaderOptionsMenu() {
    const menu = [
      {
        name: this.i18nextPipe.transform('translation:action.duplicate'),
        value: 'duplicate',
        icon: 'file_copy',
      },
    ];
    if (this.model && !this.model.block_remove) {
      menu.push({
        name: this.i18nextPipe.transform('translation:action.delete'),
        value: 'delete',
        icon: 'delete',
      });
    }
    this.headerOptionsMenu = menu;
  }
}
