import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Baptism } from '../baptism.model';
import {
  getSelectedBaptisms,
  getBaptism,
} from '../reducers/baptisms.selectors';
import * as actions from '../reducers/baptisms.actions';

@Component({
  selector: 'kyr-baptisms-delete',
  templateUrl: './baptisms-delete.component.html',
})
export class BaptismsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<Baptism[]>;
  modelList: Baptism[] = [];
  modulePath = 'baptisms';
  returnUrl = ['/baptisms'];

  selectorGetModel = getBaptism;
  selectorGetSelected = getSelectedBaptisms;
  actionRequestFail = actions.BaptismsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.BaptismsActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
