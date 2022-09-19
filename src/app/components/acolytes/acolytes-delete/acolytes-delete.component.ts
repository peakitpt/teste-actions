import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getAcolyte,
  getSelectedAcolytes,
} from '../reducers/acolytes.selectors';
import * as actions from '../reducers/acolytes.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';

@Component({
  selector: 'kyr-acolytes-delete',
  templateUrl: './acolytes-delete.component.html',
})
export class AcolytesDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<any[]>;
  modelList: any[] = [];
  returnUrl = ['/acolytes'];
  modulePath = 'acolytes';

  selectorGetModel = getAcolyte;
  selectorGetSelected = getSelectedAcolytes;
  actionRequestFail = actions.AcolytesActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.AcolytesActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
