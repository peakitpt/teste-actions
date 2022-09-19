import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';

import { Catechumen } from '../catechumen.model';
import * as actions from '../reducers/catechumens.actions';
import { getCatechumen } from '../reducers/catechumens.selectors';

@Component({
  selector: 'kyr-catechumens-details',
  templateUrl: './catechumens-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CatechumensDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Catechumen>;
  model: Catechumen;
  returnUrl = '/catechumens';
  modulePath = 'catechumens';
  viewName = 'Catechumen';

  // Selectors & actions
  selectorGetModel = getCatechumen;
  actionRequestFail = actions.CatechumensActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
  actionClearGet = actions.ClearGet;
  actionRequestGetAll = actions.RequestGetAll;

  actionRequestSaveAndGenerateDocument = actions.RequestSaveAndGenerateDocument;
  actionRequestFailSaveAndGenerateDocument =
    actions.CatechumensActionTypes.RequestFailSaveAndGenerateDocument;
  actionSuccessSaveAndGenerateDocument =
    actions.CatechumensActionTypes.SuccessSaveAndGenerateDocument;
  // Selectors & actions END
}
