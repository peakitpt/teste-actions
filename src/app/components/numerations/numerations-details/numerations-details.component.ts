import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/numerations.actions';
import { getNumeration } from '../reducers/numerations.selectors';
import { Observable } from 'rxjs';
import { Numeration } from '../numeration.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';

@Component({
  selector: 'kyr-numerations-details',
  templateUrl: './numerations-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class NumerationsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<Numeration>;
  returnUrl = '/numerations';
  modulePath = 'numerations';
  viewName = 'Numeration';

  selectorGetModel = getNumeration;
  actionRequestFail = actions.NumerationsActionTypes.RequestFailNumerations;
  actionRequestGetOne = actions.RequestGetNumeration;
}
