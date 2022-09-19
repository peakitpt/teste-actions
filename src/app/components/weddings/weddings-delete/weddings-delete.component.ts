import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Wedding } from '../wedding.model';
import {
  getSelectedWeddings,
  getWedding,
} from '../reducers/weddings.selectors';
import * as actions from '../reducers/weddings.actions';

@Component({
  selector: 'kyr-weddings-delete',
  templateUrl: './weddings-delete.component.html',
})
export class WeddingsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modelList$: Observable<Wedding[]>;
  modelList: Wedding[] = [];
  modulePath = 'weddings';
  returnUrl = ['/weddings'];

  selectorGetModel = getWedding;
  selectorGetSelected = getSelectedWeddings;
  actionRequestFail = actions.WeddingsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.WeddingsActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
