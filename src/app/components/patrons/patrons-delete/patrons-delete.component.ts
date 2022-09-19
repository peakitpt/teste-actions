import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { getPatron, getSelectedPatrons } from '../reducers/patrons.selectors';
import * as actions from '../reducers/patrons.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Patron } from '../patrons.model';

@Component({
  selector: 'kyr-patrons-delete',
  templateUrl: './patrons-delete.component.html',
})
export class PatronsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<Patron[]>;
  modelList: Patron[] = [];
  returnUrl = ['/patrons'];
  modulePath = 'patrons';

  selectorGetModel = getPatron;
  selectorGetSelected = getSelectedPatrons;
  actionRequestFail = actions.PatronsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.PatronsActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
