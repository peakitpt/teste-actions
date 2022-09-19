import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getRelationshipDegree,
  getSelectedRelationshipDegrees,
} from '../reducers/relationship-degrees.selectors';
import * as actions from '../reducers/relationship-degrees.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { RelationshipDegree } from '../relationship-degree.model';

@Component({
  selector: 'kyr-relationship-degrees-delete',
  templateUrl: './relationship-degrees-delete.component.html',
})
export class RelationshipDegreesDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<RelationshipDegree[]>;
  modelList: RelationshipDegree[] = [];
  returnUrl = ['/relationship-degrees'];
  modulePath = 'relationship-degrees';

  selectorGetModel = getRelationshipDegree;
  selectorGetSelected = getSelectedRelationshipDegrees;
  actionRequestFail = actions.RelationshipDegreesActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.RelationshipDegreesActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
