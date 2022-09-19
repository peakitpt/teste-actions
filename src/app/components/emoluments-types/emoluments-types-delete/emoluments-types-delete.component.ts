import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getEmolumentType,
  getSelectedEmolumentsTypes,
} from '../reducers/emoluments-types.selectors';
import * as actions from '../reducers/emoluments-types.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { EmolumentType } from '../emoluments-type.model';

@Component({
  selector: 'kyr-emoluments-types-delete',
  templateUrl: './emoluments-types-delete.component.html',
})
export class EmolumentsTypesDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<EmolumentType[]>;
  modelList: EmolumentType[] = [];
  returnUrl = ['/emoluments-types'];
  modulePath = 'emoluments-types';

  selectorGetModel = getEmolumentType;
  selectorGetSelected = getSelectedEmolumentsTypes;
  actionRequestFail =
    actions.EmolumentsTypesActionTypes.RequestFailEmolumentsTypes;
  actionRequestGetAll = actions.RequestGetAllEmolumentsTypes;
  actionRequestGetOne = actions.RequestGetEmolumentType;
  actionRequestDelete = actions.RequestDeleteEmolumentType;
  actionSuccessDelete =
    actions.EmolumentsTypesActionTypes.SuccessDeleteEmolumentType;
  actionSetSelected = actions.SetSelectedEmolumentsTypes;
}
