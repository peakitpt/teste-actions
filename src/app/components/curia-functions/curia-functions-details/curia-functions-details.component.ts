import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';

import { CuriaFunction } from '../curia-function.model';
import * as actions from '../reducers/curia-functions.actions';
import { getCuriaFunction } from '../reducers/curia-functions.selectors';

@Component({
  selector: 'kyr-curia-functions-details',
  templateUrl: './curia-functions-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CuriaFunctionsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<CuriaFunction>;
  model: CuriaFunction;
  returnUrl = '/curia-functions';
  modulePath = 'curia-functions';
  viewName = 'CuriaFunction';

  // Selectors & actions
  selectorGetModel = getCuriaFunction;
  actionRequestFail = actions.CuriaFunctionsActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
  actionClearGet = actions.ClearGet;
  actionRequestGetAll = actions.RequestGetAll;

  actionRequestFailSaveAndGenerateDocument =
    actions.CuriaFunctionsActionTypes.RequestFailSaveAndGenerateDocument;
  actionSuccessSaveAndGenerateDocument =
    actions.CuriaFunctionsActionTypes.SuccessSaveAndGenerateDocument;
  // Selectors & actions END

  localeOptions: any;

  ngOnInit() {
    super.ngOnInit();
    this.localeOptions = {
      pt: this.i18nextPipe.transform(`translation:_languages.pt`),
      en: this.i18nextPipe.transform(`translation:_languages.en`),
      es: this.i18nextPipe.transform(`translation:_languages.es`),
    };
  }
}
