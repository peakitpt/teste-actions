import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getDocumentsType,
  getSelectedDocumentsTypes,
} from '../reducers/documents-types.selectors';
import * as actions from '../reducers/documents-types.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { DocumentsType } from '../documents-type.model';

@Component({
  selector: 'kyr-documents-types-delete',
  templateUrl: './documents-types-delete.component.html',
})
export class DocumentsTypesDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<DocumentsType[]>;
  modelList: DocumentsType[] = [];
  returnUrl = ['/documents-types'];
  modulePath = 'documents-types';

  selectorGetModel = getDocumentsType;
  selectorGetSelected = getSelectedDocumentsTypes;
  actionRequestFail =
    actions.DocumentsTypesActionTypes.RequestFailDocumentsTypes;
  actionRequestGetAll = actions.RequestGetAllDocumentsTypes;
  actionRequestGetOne = actions.RequestGetDocumentsType;
  actionRequestDelete = actions.RequestDeleteDocumentsType;
  actionSuccessDelete =
    actions.DocumentsTypesActionTypes.SuccessDeleteDocumentsType;
  actionSetSelected = actions.SetSelectedDocumentsTypes;
}
