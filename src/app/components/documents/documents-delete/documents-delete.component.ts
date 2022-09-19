import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getDocument,
  getSelectedDocuments,
} from '../reducers/documents.selectors';
import * as actions from '../reducers/documents.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Document } from '../document.model';

@Component({
  selector: 'kyr-documents-delete',
  templateUrl: './documents-delete.component.html',
})
export class DocumentsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<Document[]>;
  modelList: Document[] = [];
  returnUrl = ['/documents'];
  modulePath = 'documents';

  selectorGetModel = getDocument;
  selectorGetSelected = getSelectedDocuments;
  actionRequestFail = actions.DocumentsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.DocumentsActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
