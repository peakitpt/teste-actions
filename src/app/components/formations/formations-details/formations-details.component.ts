import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import * as actions from '../reducers/formations.actions';
import { getFormation } from '../reducers/formations.selectors';
import { Observable } from 'rxjs';
import { Formation } from '../formation.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';

@Component({
  selector: 'kyr-formations-details',
  templateUrl: './formations-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormationsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit {
  model$: Observable<Formation>;
  returnUrl = '/formations';
  modulePath = 'formations';
  viewName = 'Formation';

  selectorGetModel = getFormation;
  actionRequestFail = actions.FormationsActionTypes.RequestFailFormations;
  actionRequestGetOne = actions.RequestGetFormation;
}
