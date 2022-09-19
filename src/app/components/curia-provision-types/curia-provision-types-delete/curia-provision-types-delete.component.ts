import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { CuriaProvisionType } from '../curia-provision-type.model';
import {
  getSelectedCuriaProvisionTypes,
  getCuriaProvisionType,
} from '../reducers/curia-provision-types.selectors';
import * as actions from '../reducers/curia-provision-types.actions';

@Component({
  selector: 'kyr-curia-provision-types-delete',
  templateUrl: './curia-provision-types-delete.component.html',
})
export class CuriaProvisionTypesDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modelList$: Observable<CuriaProvisionType[]>;
  modelList: CuriaProvisionType[] = [];
  modulePath = 'curia-provision-types';
  returnUrl = ['/curia-provision-types'];

  selectorGetModel = getCuriaProvisionType;
  selectorGetSelected = getSelectedCuriaProvisionTypes;
  actionRequestFail = actions.CuriaProvisionTypesActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.CuriaProvisionTypesActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
