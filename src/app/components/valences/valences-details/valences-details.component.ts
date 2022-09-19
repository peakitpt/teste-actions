import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/valences.actions';
import { getValence } from '../reducers/valences.selectors';
import { Observable } from 'rxjs';
import { Valence } from '../valence.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';

@Component({
  selector: 'kyr-valences-details',
  templateUrl: './valences-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ValencesDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<Valence>;
  returnUrl = '/valences';
  modulePath = 'valences';
  viewName = 'Valence';

  selectorGetModel = getValence;
  actionRequestFail = actions.ValencesActionTypes.RequestFailValences;
  actionRequestGetOne = actions.RequestGetValence;
}
