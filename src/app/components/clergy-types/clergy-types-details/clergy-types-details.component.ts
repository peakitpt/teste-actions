import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/clergy-types.actions';
import { getClergyType } from '../reducers/clergy-types.selectors';
import { Observable } from 'rxjs';
import { ClergyType } from '../clergy-type.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';

@Component({
  selector: 'kyr-clergy-types-details',
  templateUrl: './clergy-types-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ClergyTypesDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<ClergyType>;
  returnUrl = '/clergy-types';
  modulePath = 'clergy-types';
  viewName = 'ClergyType';

  selectorGetModel = getClergyType;
  actionRequestFail = actions.ClergyTypeActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;

  getGroupName(i: number): string {
    const groups = [
      null,
      this.i18nextPipe.transform(`${this.modulePath}:model.types.presbiterals`),
      this.i18nextPipe.transform(`${this.modulePath}:model.types.deacons`),
      this.i18nextPipe.transform(`${this.modulePath}:model.types.bishops`),
    ];
    return groups[i];
  }
}
