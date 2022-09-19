import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { getEmenu, getSelectedEmenus } from '../reducers/emenus.selectors';
import * as actions from '../reducers/emenus.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Emenu } from '../emenu.model';

@Component({
  selector: 'kyr-emenus-delete',
  templateUrl: './emenus-delete.component.html',
})
export class EmenusDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<Emenu[]>;
  modelList: Emenu[] = [];
  returnUrl = ['/emenus'];
  modulePath = 'emenus';

  selectorGetModel = getEmenu;
  selectorGetSelected = getSelectedEmenus;
  actionRequestFail = actions.EmenusActionTypes.RequestFailEmenus;
  actionRequestGetAll = actions.RequestGetAllEmenus;
  actionRequestGetOne = actions.RequestGetEmenu;
  actionRequestDelete = actions.RequestDeleteEmenu;
  actionSuccessDelete = actions.EmenusActionTypes.SuccessDeleteEmenu;
  actionSetSelected = actions.SetSelectedEmenus;
}
