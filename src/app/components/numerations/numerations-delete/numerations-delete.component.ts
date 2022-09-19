import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getNumeration,
  getSelectedNumerations,
} from '../reducers/numerations.selectors';
import * as actions from '../reducers/numerations.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Numeration } from '../numeration.model';

@Component({
  selector: 'kyr-numerations-delete',
  templateUrl: './numerations-delete.component.html',
})
export class NumerationsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<Numeration[]>;
  modelList: Numeration[] = [];
  returnUrl = ['/numerations'];
  modulePath = 'numerations';

  selectorGetModel = getNumeration;
  selectorGetSelected = getSelectedNumerations;
  actionRequestFail = actions.NumerationsActionTypes.RequestFailNumerations;
  actionRequestGetAll = actions.RequestGetAllNumerations;
  actionRequestGetOne = actions.RequestGetNumeration;
  actionRequestDelete = actions.RequestDeleteNumeration;
  actionSuccessDelete = actions.NumerationsActionTypes.SuccessDeleteNumeration;
  actionSetSelected = actions.SetSelectedNumerations;
}
