import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { CuriaFunction } from '../curia-function.model';
import {
  getSelectedCuriaFunctions,
  getCuriaFunction,
} from '../reducers/curia-functions.selectors';
import * as actions from '../reducers/curia-functions.actions';

@Component({
  selector: 'kyr-curia-functions-delete',
  templateUrl: './curia-functions-delete.component.html',
})
export class CuriaFunctionsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modelList$: Observable<CuriaFunction[]>;
  modelList: CuriaFunction[] = [];
  modulePath = 'curia-functions';
  returnUrl = ['/curia-functions'];

  selectorGetModel = getCuriaFunction;
  selectorGetSelected = getSelectedCuriaFunctions;
  actionRequestFail = actions.CuriaFunctionsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.CuriaFunctionsActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
