import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getCuriaProvision,
  getSelectedCuriaProvisions,
} from '../reducers/curia-provisions.selectors';
import * as actions from '../reducers/curia-provisions.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { CuriaProvision } from '../curia-provision.model';

@Component({
  selector: 'kyr-curia-provisions-delete',
  templateUrl: './curia-provisions-delete.component.html',
})
export class CuriaProvisionsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modelList$: Observable<CuriaProvision[]>;
  modelList: CuriaProvision[] = [];
  returnUrl = ['/curia-provisions'];
  modulePath = 'curia-provisions';

  selectorGetModel = getCuriaProvision;
  selectorGetSelected = getSelectedCuriaProvisions;
  actionRequestFail =
    actions.CuriaProvisionsActionTypes.RequestFailCuriaProvisions;
  actionRequestGetAll = actions.RequestGetAllCuriaProvisions;
  actionRequestGetOne = actions.RequestGetCuriaProvision;
  actionRequestDelete = actions.RequestDeleteCuriaProvision;
  actionSuccessDelete =
    actions.CuriaProvisionsActionTypes.SuccessDeleteCuriaProvision;
  actionSetSelected = actions.SetSelectedCuriaProvisions;
}
