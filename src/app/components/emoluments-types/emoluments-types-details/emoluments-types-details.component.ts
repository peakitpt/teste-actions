import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/emoluments-types.actions';
import { getEmolumentType } from '../reducers/emoluments-types.selectors';
import { Observable } from 'rxjs';
import { EmolumentType } from '../emoluments-type.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';

@Component({
  selector: 'kyr-emoluments-types-details',
  templateUrl: './emoluments-types-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class EmolumentsTypesDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<EmolumentType>;
  returnUrl = '/emoluments-types';
  modulePath = 'emoluments-types';
  viewName = 'Emolument';

  selectorGetModel = getEmolumentType;
  actionRequestFail =
    actions.EmolumentsTypesActionTypes.RequestFailEmolumentsTypes;
  actionRequestGetOne = actions.RequestGetEmolumentType;
}
