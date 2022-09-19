import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { CuriaSecretariatType } from '../curia-secretariat-type.model';
import {
  getSelectedCuriaSecretariatTypes,
  getCuriaSecretariatType,
} from '../reducers/curia-secretariat-types.selectors';
import * as actions from '../reducers/curia-secretariat-types.actions';

@Component({
  selector: 'kyr-curia-secretariat-types-delete',
  templateUrl: './curia-secretariat-types-delete.component.html',
})
export class CuriaSecretariatTypesDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modelList$: Observable<CuriaSecretariatType[]>;
  modelList: CuriaSecretariatType[] = [];
  modulePath = 'curia-secretariat-types';
  returnUrl = ['/curia-secretariat-types'];

  selectorGetModel = getCuriaSecretariatType;
  selectorGetSelected = getSelectedCuriaSecretariatTypes;
  actionRequestFail = actions.CuriaSecretariatTypesActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.CuriaSecretariatTypesActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
