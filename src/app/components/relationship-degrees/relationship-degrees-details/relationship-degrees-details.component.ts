import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/relationship-degrees.actions';
import { getRelationshipDegree } from '../reducers/relationship-degrees.selectors';
import { Observable } from 'rxjs';
import { RelationshipDegree } from '../relationship-degree.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';

@Component({
  selector: 'kyr-relationship-degrees-details',
  templateUrl: './relationship-degrees-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class RelationshipDegreesDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<RelationshipDegree>;
  returnUrl = '/relationship-degrees';
  modulePath = 'relationship-degrees';
  viewName = 'RelationshipDegree';

  selectorGetModel = getRelationshipDegree;
  actionRequestFail = actions.RelationshipDegreesActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
}
