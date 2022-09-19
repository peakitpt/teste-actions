import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Institution } from '../institution.model';
import {
  getSelectedInstitutions,
  getInstitution,
} from '../reducers/institutions.selectors';
import * as actions from '../reducers/institutions.actions';

@Component({
  selector: 'kyr-institutions-delete',
  templateUrl: './institutions-delete.component.html',
})
export class InstitutionsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modelList$: Observable<Institution[]>;
  modelList: Institution[] = [];
  modulePath = 'institutions';
  returnUrl = ['/institutions'];

  selectorGetModel = getInstitution;
  selectorGetSelected = getSelectedInstitutions;
  actionRequestFail = actions.InstitutionsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.InstitutionsActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
