import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Catechumen } from '../catechumen.model';
import {
  getSelectedCatechumens,
  getCatechumen,
} from '../reducers/catechumens.selectors';
import * as actions from '../reducers/catechumens.actions';

@Component({
  selector: 'kyr-catechumens-delete',
  templateUrl: './catechumens-delete.component.html',
})
export class CatechumensDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<Catechumen[]>;
  modelList: Catechumen[] = [];
  modulePath = 'catechumens';
  returnUrl = ['/catechumens'];

  selectorGetModel = getCatechumen;
  selectorGetSelected = getSelectedCatechumens;
  actionRequestFail = actions.CatechumensActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.CatechumensActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
