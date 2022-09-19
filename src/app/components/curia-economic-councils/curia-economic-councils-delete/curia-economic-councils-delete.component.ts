import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getCuriaEconomicCouncil,
  getSelectedCuriaEconomicCouncils,
} from '../reducers/curia-economic-councils.selectors';
import * as actions from '../reducers/curia-economic-councils.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { CuriaEconomicCouncil } from '../curia-economic-council.model';

@Component({
  selector: 'kyr-curia-economic-councils-delete',
  templateUrl: './curia-economic-councils-delete.component.html',
})
export class CuriaEconomicCouncilsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modelList$: Observable<CuriaEconomicCouncil[]>;
  modelList: CuriaEconomicCouncil[] = [];
  returnUrl = ['/curia-economic-councils'];
  modulePath = 'curia-economic-councils';

  selectorGetModel = getCuriaEconomicCouncil;
  selectorGetSelected = getSelectedCuriaEconomicCouncils;
  actionRequestFail =
    actions.CuriaEconomicCouncilsActionTypes.RequestFailCuriaEconomicCouncils;
  actionRequestGetAll = actions.RequestGetAllCuriaEconomicCouncils;
  actionRequestGetOne = actions.RequestGetCuriaEconomicCouncil;
  actionRequestDelete = actions.RequestDeleteCuriaEconomicCouncil;
  actionSuccessDelete =
    actions.CuriaEconomicCouncilsActionTypes.SuccessDeleteCuriaEconomicCouncil;
  actionSetSelected = actions.SetSelectedCuriaEconomicCouncils;
}
