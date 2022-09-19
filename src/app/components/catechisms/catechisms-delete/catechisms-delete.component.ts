import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { Catechism } from '../catechism.model';
import {
  getSelectedCatechisms,
  getCatechism,
} from '../reducers/catechisms.selectors';
import * as actions from '../reducers/catechisms.actions';

@Component({
  selector: 'kyr-catechisms-delete',
  templateUrl: './catechisms-delete.component.html',
})
export class CatechismsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<Catechism[]>;
  modelList: Catechism[] = [];
  modulePath = 'catechisms';
  returnUrl = ['/catechisms'];

  selectorGetModel = getCatechism;
  selectorGetSelected = getSelectedCatechisms;
  actionRequestFail = actions.CatechismsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.CatechismsActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
