import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getEntityAccess,
  getSelectedEntitysAccess,
} from '../reducers/entitys-access.selectors';
import * as actions from '../reducers/entitys-access.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { EntityAccess } from '../entity-access.model';

@Component({
  selector: 'kyr-entitys-access-delete',
  templateUrl: './entitys-access-delete.component.html',
})
export class EntitysAccessDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modelList$: Observable<EntityAccess[]>;
  modelList: EntityAccess[] = [];
  returnUrl = ['/entitys-access'];
  modulePath = 'entitys-access';

  selectorGetModel = getEntityAccess;
  selectorGetSelected = getSelectedEntitysAccess;
  actionRequestFail = actions.EntitysAccessActionTypes.RequestFailEntitysAccess;
  actionRequestGetAll = actions.RequestGetAllEntitysAccess;
  actionRequestGetOne = actions.RequestGetEntityAccess;
  actionRequestDelete = actions.RequestDeleteEntityAccess;
  actionSuccessDelete =
    actions.EntitysAccessActionTypes.SuccessDeleteEntityAccess;
  actionSetSelected = actions.SetSelectedEntitysAccess;

  delete() {
    this.isSaving = true;

    const ids = this.modelList.map((obj: any) => obj.entity2_id);
    ids.forEach((id: number) => {
      this.store.dispatch(new this.actionRequestDelete(id));
    });
  }
}
