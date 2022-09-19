import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { AppointmentType } from '../appointment-type.model';
import {
  getSelectedAppointmentTypes,
  getAppointmentType,
} from '../reducers/appointment-types.selectors';
import * as actions from '../reducers/appointment-types.actions';

@Component({
  selector: 'kyr-appointment-types-delete',
  templateUrl: './appointment-types-delete.component.html',
})
export class AppointmentTypesDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modelList$: Observable<AppointmentType[]>;
  modelList: AppointmentType[] = [];
  modulePath = 'appointment-types';
  returnUrl = ['/appointment-types'];

  selectorGetModel = getAppointmentType;
  selectorGetSelected = getSelectedAppointmentTypes;
  actionRequestFail = actions.AppointmentTypesActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.AppointmentTypesActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
