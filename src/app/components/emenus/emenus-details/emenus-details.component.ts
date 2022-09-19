import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/emenus.actions';
import { getEmenu } from '../reducers/emenus.selectors';
import { Observable } from 'rxjs';
import { Emenu } from '../emenu.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';

@Component({
  selector: 'kyr-emenus-details',
  templateUrl: './emenus-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class EmenusDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<Emenu>;
  returnUrl = '/emenus';
  modulePath = 'emenus';
  viewName = 'Emenu';

  selectorGetModel = getEmenu;
  actionRequestFail = actions.EmenusActionTypes.RequestFailEmenus;
  actionRequestGetOne = actions.RequestGetEmenu;

  optionsNoDeleteMenu = [
    {
      name: this.i18nextPipe.transform('translation:action.duplicate'),
      value: 'duplicate',
      icon: 'file_copy',
    },
  ];
}
