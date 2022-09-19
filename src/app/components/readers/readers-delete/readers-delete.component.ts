import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { getReader, getSelectedReaders } from '../reducers/readers.selectors';
import * as actions from '../reducers/readers.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';

@Component({
  selector: 'kyr-readers-delete',
  templateUrl: './readers-delete.component.html',
})
export class ReadersDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<any[]>;
  modelList: any[] = [];
  returnUrl = ['/readers'];
  modulePath = 'readers';

  selectorGetModel = getReader;
  selectorGetSelected = getSelectedReaders;
  actionRequestFail = actions.ReadersActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.ReadersActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
