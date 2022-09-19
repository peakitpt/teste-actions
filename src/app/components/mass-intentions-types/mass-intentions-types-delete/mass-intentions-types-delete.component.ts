import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { MassIntentionsType } from '../mass-intentions-type.model';
import {
  getSelectedMassIntentionsTypes,
  getMassIntentionsType,
} from '../reducers/mass-intentions-types.selectors';
import * as actions from '../reducers/mass-intentions-types.actions';

@Component({
  selector: 'kyr-mass-intentions-types-delete',
  templateUrl: './mass-intentions-types-delete.component.html',
})
export class MassIntentionsTypesDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<MassIntentionsType[]>;
  modelList: MassIntentionsType[] = [];
  modulePath = 'mass-intentions-types';
  returnUrl = ['/mass-intentions-types'];

  selectorGetModel = getMassIntentionsType;
  selectorGetSelected = getSelectedMassIntentionsTypes;
  actionRequestFail = actions.MassIntentionsTypesActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.MassIntentionsTypesActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
