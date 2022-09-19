import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { getPriest, getSelectedPriests } from '../reducers/priests.selectors';
import * as actions from '../reducers/priests.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Priest } from '../priest.model';

@Component({
  selector: 'kyr-priests-delete',
  templateUrl: './priests-delete.component.html',
})
export class PriestsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<Priest[]>;
  modelList: Priest[] = [];
  returnUrl = ['/priests'];
  modulePath = 'priests';

  selectorGetModel = getPriest;
  selectorGetSelected = getSelectedPriests;
  actionRequestFail = actions.PriestActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.PriestActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
