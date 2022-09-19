import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getCuriaMinistryAndOrder,
  getSelectedCuriaMinistriesAndOrders,
} from '../reducers/curia-ministries-and-orders.selectors';
import * as actions from '../reducers/curia-ministries-and-orders.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { CuriaMinistryAndOrder } from '../curia-ministry-and-order.model';

@Component({
  selector: 'kyr-curia-ministries-and-orders-delete',
  templateUrl: './curia-ministries-and-orders-delete.component.html',
})
export class CuriaMinistriesAndOrdersDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modelList$: Observable<CuriaMinistryAndOrder[]>;
  modelList: CuriaMinistryAndOrder[] = [];
  returnUrl = ['/curia-ministries-and-orders'];
  modulePath = 'curia-ministries-and-orders';

  selectorGetModel = getCuriaMinistryAndOrder;
  selectorGetSelected = getSelectedCuriaMinistriesAndOrders;
  actionRequestFail =
    actions.CuriaMinistriesAndOrdersActionTypes
      .RequestFailCuriaMinistriesAndOrders;
  actionRequestGetAll = actions.RequestGetAllCuriaMinistriesAndOrders;
  actionRequestGetOne = actions.RequestGetCuriaMinistryAndOrder;
  actionRequestDelete = actions.RequestDeleteCuriaMinistryAndOrder;
  actionSuccessDelete =
    actions.CuriaMinistriesAndOrdersActionTypes
      .SuccessDeleteCuriaMinistryAndOrder;
  actionSetSelected = actions.SetSelectedCuriaMinistriesAndOrders;
}
