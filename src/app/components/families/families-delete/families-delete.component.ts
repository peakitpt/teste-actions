import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Family } from '../family.model';
import { getSelectedFamilies, getFamily } from '../reducers/families.selectors';
import * as actions from '../reducers/families.actions';

@Component({
  selector: 'kyr-families-delete',
  templateUrl: './families-delete.component.html',
})
export class FamiliesDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<Family[]>;
  modelList: Family[] = [];
  modulePath = 'families';
  returnUrl = ['/families'];

  selectorGetModel = getFamily;
  selectorGetSelected = getSelectedFamilies;
  actionRequestFail = actions.FamiliesActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.FamiliesActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
