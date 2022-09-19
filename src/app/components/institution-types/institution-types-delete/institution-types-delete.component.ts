import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { getInstitutionType, getSelectedInstitutionTypes } from '../reducers/institution-types.selectors';
import * as actions from '../reducers/institution-types.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { InstitutionType } from '../institution-type.model';

@Component({
  selector: 'kyr-institution-types-delete',
  templateUrl: './institution-types-delete.component.html',
})
export class InstitutionTypesDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<InstitutionType[]>;
  modelList: InstitutionType[] = [];
  returnUrl = ['/institution-types'];
  modulePath = 'institution-types';

  selectorGetModel = getInstitutionType;
  selectorGetSelected = getSelectedInstitutionTypes;
  actionRequestFail = actions.InstitutionTypeActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.InstitutionTypeActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
