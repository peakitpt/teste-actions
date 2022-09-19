import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getNomination,
  getSelectedNominations,
} from '../reducers/nominations.selectors';
import * as actions from '../reducers/nominations.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Nomination } from '../nomination.model';

@Component({
  selector: 'kyr-nominations-delete',
  templateUrl: './nominations-delete.component.html',
})
export class NominationsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modelList$: Observable<Nomination[]>;
  modelList: Nomination[] = [];
  returnUrl = ['/nominations'];
  modulePath = 'nominations';

  selectorGetModel = getNomination;
  selectorGetSelected = getSelectedNominations;
  actionRequestFail = actions.NominationsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.NominationsActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
