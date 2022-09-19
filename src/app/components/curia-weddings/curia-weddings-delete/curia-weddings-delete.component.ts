import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { CuriaWedding } from '../curia-wedding.model';
import {
  getSelectedCuriaWeddings,
  getCuriaWedding,
} from '../reducers/curia-weddings.selectors';
import * as actions from '../reducers/curia-weddings.actions';

@Component({
  selector: 'kyr-curia-weddings-delete',
  templateUrl: './curia-weddings-delete.component.html',
})
export class CuriaWeddingsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modelList$: Observable<CuriaWedding[]>;
  modelList: CuriaWedding[] = [];
  modulePath = 'curia-weddings';
  returnUrl = ['/curia-weddings'];

  selectorGetModel = getCuriaWedding;
  selectorGetSelected = getSelectedCuriaWeddings;
  actionRequestFail = actions.CuriaWeddingsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.CuriaWeddingsActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
