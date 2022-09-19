import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getCuriaSecretariat,
  getSelectedCuriaSecretariats,
} from '../reducers/curia-secretariats.selectors';
import * as actions from '../reducers/curia-secretariats.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { CuriaSecretariat } from '../curia-secretariat.model';

@Component({
  selector: 'kyr-curia-secretariats-delete',
  templateUrl: './curia-secretariats-delete.component.html',
})
export class CuriaSecretariatsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modelList$: Observable<CuriaSecretariat[]>;
  modelList: CuriaSecretariat[] = [];
  returnUrl = ['/curia-secretariats'];
  modulePath = 'curia-secretariats';

  selectorGetModel = getCuriaSecretariat;
  selectorGetSelected = getSelectedCuriaSecretariats;
  actionRequestFail =
    actions.CuriaSecretariatsActionTypes.RequestFailCuriaSecretariats;
  actionRequestGetAll = actions.RequestGetAllCuriaSecretariats;
  actionRequestGetOne = actions.RequestGetCuriaSecretariat;
  actionRequestDelete = actions.RequestDeleteCuriaSecretariat;
  actionSuccessDelete =
    actions.CuriaSecretariatsActionTypes.SuccessDeleteCuriaSecretariat;
  actionSetSelected = actions.SetSelectedCuriaSecretariats;
}
