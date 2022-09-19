import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getEmolument,
  getSelectedEmoluments,
} from '../reducers/emoluments.selectors';
import * as actions from '../reducers/emoluments.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Emolument } from '../emolument.model';

@Component({
  selector: 'kyr-emoluments-delete',
  templateUrl: './emoluments-delete.component.html',
})
export class EmolumentsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<Emolument[]>;
  modelList: Emolument[] = [];
  returnUrl = ['/emoluments'];
  modulePath = 'emoluments';

  selectorGetModel = getEmolument;
  selectorGetSelected = getSelectedEmoluments;
  actionRequestFail = actions.EmolumentsActionTypes.RequestFailEmoluments;
  actionRequestGetAll = actions.RequestGetAllEmoluments;
  actionRequestGetOne = actions.RequestGetEmolument;
  actionRequestDelete = actions.RequestDeleteEmolument;
  actionSuccessDelete = actions.EmolumentsActionTypes.SuccessDeleteEmolument;
  actionSetSelected = actions.SetSelectedEmoluments;
}
