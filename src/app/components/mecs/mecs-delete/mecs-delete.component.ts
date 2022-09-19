import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { getMEC, getSelectedMecs } from '../reducers/mecs.selectors';
import * as actions from '../reducers/mecs.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';

@Component({
  selector: 'kyr-mecs-delete',
  templateUrl: './mecs-delete.component.html',
})
export class MecsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<any[]>;
  modelList: any[] = [];
  returnUrl = ['/mecs'];
  modulePath = 'mecs';

  selectorGetModel = getMEC;
  selectorGetSelected = getSelectedMecs;
  actionRequestFail = actions.MecsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.MecsActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
