import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as actions from '../reducers/formation-types.actions';
import { getFormationType } from '../reducers/formation-types.selectors';
import { Observable } from 'rxjs';
import { FormationType } from '../formation-type.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';

@Component({
  selector: 'kyr-formation-types-details',
  templateUrl: './formation-types-details.component.html',
})
export class FormationTypesDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit {
  model$: Observable<FormationType>;
  returnUrl = '/formation-types';
  modulePath = 'formation-types';
  viewName = 'FormationType';

  selectorGetModel = getFormationType;
  actionRequestFail =
    actions.FormationTypesActionTypes.RequestFailFormationTypes;
  actionRequestGetOne = actions.RequestGetFormationType;
}
