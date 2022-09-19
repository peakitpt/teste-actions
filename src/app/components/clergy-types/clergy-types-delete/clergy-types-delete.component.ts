import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { getClergyType, getSelectedClergyTypes } from '../reducers/clergy-types.selectors';
import * as actions from '../reducers/clergy-types.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { ClergyType } from '../clergy-type.model';

@Component({
  selector: 'kyr-clergy-types-delete',
  templateUrl: './clergy-types-delete.component.html',
})
export class ClergyTypesDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<ClergyType[]>;
  modelList: ClergyType[] = [];
  returnUrl = ['/clergy-types'];
  modulePath = 'clergy-types';

  selectorGetModel = getClergyType;
  selectorGetSelected = getSelectedClergyTypes;
  actionRequestFail = actions.ClergyTypeActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.ClergyTypeActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
