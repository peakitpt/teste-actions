import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Chrism } from '../chrism.model';
import { getSelectedChrisms, getChrism } from '../reducers/chrisms.selectors';
import * as actions from '../reducers/chrisms.actions';

@Component({
  selector: 'kyr-chrisms-delete',
  templateUrl: './chrisms-delete.component.html',
})
export class ChrismsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<Chrism[]>;
  modelList: Chrism[] = [];
  modulePath = 'chrisms';
  returnUrl = ['/chrisms'];

  selectorGetModel = getChrism;
  selectorGetSelected = getSelectedChrisms;
  actionRequestFail = actions.ChrismsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.ChrismsActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
