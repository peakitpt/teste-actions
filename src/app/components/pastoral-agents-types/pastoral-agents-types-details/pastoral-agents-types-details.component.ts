import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/pastoral-agents-types.actions';
import { getPastoralAgentsType } from '../reducers/pastoral-agents-types.selectors';
import { Observable } from 'rxjs';
import { PastoralAgentsType } from '../pastoral-agents-type.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';

@Component({
  selector: 'kyr-pastoral-agents-types-details',
  templateUrl: './pastoral-agents-types-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PastoralAgentsTypesDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<PastoralAgentsType>;
  returnUrl = '/pastoral-agents-types';
  modulePath = 'pastoral-agents-types';
  viewName = 'PastoralAgentsType';

  selectorGetModel = getPastoralAgentsType;
  actionRequestFail =
    actions.PastoralAgentsTypesActionTypes.RequestFailPastoralAgentsTypes;
  actionRequestGetOne = actions.RequestGetPastoralAgentsType;

  groupsDescription(value: string): string {
    let group: string;
    switch (value) {
      case 'pastoral_agents':
      case 'ecclesia_activities':
      case 'animators':
      case 'departments':
      case 'adults_christian_education':
      case 'teachers':
      case 'universities':
        group = this.i18nextPipe.transform(
          'translation:pastoral_agents_types_groups.' + value
        );
        break;
    }
    return group;
  }
}
