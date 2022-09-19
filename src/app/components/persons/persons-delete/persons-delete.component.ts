import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityPerson } from '../person.model';
import { getSelectedPersons, getPerson } from '../reducers/persons.selectors';
import * as actions from '../reducers/persons.actions';

@Component({
  selector: 'kyr-persons-delete',
  templateUrl: './persons-delete.component.html',
})
export class PersonsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<EntityPerson[]>;
  modelList: EntityPerson[] = [];
  modulePath = 'persons';
  returnUrl = ['/persons'];

  selectorGetModel = getPerson;
  selectorGetSelected = getSelectedPersons;
  actionRequestFail = actions.PersonsActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete = actions.PersonsActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
