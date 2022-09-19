import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Gestdocument } from '../gestdocument.model';
import {
  getSelectedGestdocuments,
  getGestdocument,
} from '../reducers/gestdocuments.selectors';
import * as actions from '../reducers/gestdocuments.actions';

@Component({
  selector: 'kyr-gestdocuments-delete',
  templateUrl: './gestdocuments-delete.component.html',
})
export class GestdocumentsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<Gestdocument[]>;
  modelList: Gestdocument[] = [];
  modulePath = 'gestdocuments';
  returnUrl = ['/gestdocuments'];

  selectorGetModel = getGestdocument;
  selectorGetSelected = getSelectedGestdocuments;
  actionRequestFail = actions.GestdocumentsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.GestdocumentsActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
