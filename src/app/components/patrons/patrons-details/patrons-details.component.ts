import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/patrons.actions';
import { getPatron } from '../reducers/patrons.selectors';
import { Observable } from 'rxjs';
import { Patron } from '../patrons.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';

@Component({
  selector: 'kyr-patrons-details',
  templateUrl: './patrons-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PatronsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<Patron>;
  returnUrl = '/patrons';
  modulePath = 'patrons';
  viewName = 'Patron';

  selectorGetModel = getPatron;
  actionRequestFail = actions.PatronsActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
}
