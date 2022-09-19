import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { CuriaAdministrativeProcessType } from '../curia-administrative-process-type.model';
import {
  getSelectedCuriaAdministrativeProcessTypes,
  getCuriaAdministrativeProcessType,
} from '../reducers/curia-administrative-process-types.selectors';
import * as actions from '../reducers/curia-administrative-process-types.actions';

@Component({
  selector: 'kyr-curia-administrative-process-types-delete',
  templateUrl: './curia-administrative-process-types-delete.component.html',
})
export class CuriaAdministrativeProcessTypesDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modelList$: Observable<CuriaAdministrativeProcessType[]>;
  modelList: CuriaAdministrativeProcessType[] = [];
  modulePath = 'curia-administrative-process-types';
  returnUrl = ['/curia-administrative-process-types'];

  selectorGetModel = getCuriaAdministrativeProcessType;
  selectorGetSelected = getSelectedCuriaAdministrativeProcessTypes;
  actionRequestFail =
    actions.CuriaAdministrativeProcessTypesActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete =
    actions.CuriaAdministrativeProcessTypesActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
