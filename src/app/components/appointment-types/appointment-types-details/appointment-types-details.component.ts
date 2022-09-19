import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';

import { AppointmentType } from '../appointment-type.model';
import * as actions from '../reducers/appointment-types.actions';
import { getAppointmentType } from '../reducers/appointment-types.selectors';

@Component({
  selector: 'kyr-appointment-types-details',
  templateUrl: './appointment-types-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppointmentTypesDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<AppointmentType>;
  model: AppointmentType;
  returnUrl = '/appointment-types';
  modulePath = 'appointment-types';
  viewName = 'AppointmentType';

  // Selectors & actions
  selectorGetModel = getAppointmentType;
  actionRequestFail = actions.AppointmentTypesActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
  actionClearGet = actions.ClearGet;
  actionRequestGetAll = actions.RequestGetAll;
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
