import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getCuriaAdministrativeProcess,
  getSelectedCuriaAdministrativeProcesses,
} from '../reducers/curia-administrative-processes.selectors';
import * as actions from '../reducers/curia-administrative-processes.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { CuriaAdministrativeProcess } from '../curia-administrative-process.model';

@Component({
  selector: 'kyr-curia-administrative-processes-delete',
  templateUrl: './curia-administrative-processes-delete.component.html',
})
export class CuriaAdministrativeProcessesDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modelList$: Observable<CuriaAdministrativeProcess[]>;
  modelList: CuriaAdministrativeProcess[] = [];
  returnUrl = ['/curia-administrative-processes'];
  modulePath = 'curia-administrative-processes';

  selectorGetModel = getCuriaAdministrativeProcess;
  selectorGetSelected = getSelectedCuriaAdministrativeProcesses;
  actionRequestFail =
    actions.CuriaAdministrativeProcessesActionTypes
      .RequestFailCuriaAdministrativeProcesses;
  actionRequestGetAll = actions.RequestGetAllCuriaAdministrativeProcesses;
  actionRequestGetOne = actions.RequestGetCuriaAdministrativeProcess;
  actionRequestDelete = actions.RequestDeleteCuriaAdministrativeProcess;
  actionSuccessDelete =
    actions.CuriaAdministrativeProcessesActionTypes
      .SuccessDeleteCuriaAdministrativeProcess;
  actionSetSelected = actions.SetSelectedCuriaAdministrativeProcesses;
}
