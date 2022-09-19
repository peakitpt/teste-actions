import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Death } from '../death.model';
import { getSelectedDeaths, getDeath } from '../reducers/deaths.selectors';
import * as actions from '../reducers/deaths.actions';

@Component({
  selector: 'kyr-deaths-delete',
  templateUrl: './deaths-delete.component.html',
})
export class DeathsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<Death[]>;
  modelList: Death[] = [];
  modulePath = 'deaths';
  returnUrl = ['/deaths'];

  selectorGetModel = getDeath;
  selectorGetSelected = getSelectedDeaths;
  actionRequestFail = actions.DeathsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.DeathsActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
