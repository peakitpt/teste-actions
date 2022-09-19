import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { CuriaBaptism } from '../curia-baptism.model';
import {
  getSelectedCuriaBaptisms,
  getCuriaBaptism,
} from '../reducers/curia-baptisms.selectors';
import * as actions from '../reducers/curia-baptisms.actions';

@Component({
  selector: 'kyr-curia-baptisms-delete',
  templateUrl: './curia-baptisms-delete.component.html',
})
export class CuriaBaptismsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modelList$: Observable<CuriaBaptism[]>;
  modelList: CuriaBaptism[] = [];
  modulePath = 'curia-baptisms';
  returnUrl = ['/curia-baptisms'];

  selectorGetModel = getCuriaBaptism;
  selectorGetSelected = getSelectedCuriaBaptisms;
  actionRequestFail = actions.CuriaBaptismsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.CuriaBaptismsActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
