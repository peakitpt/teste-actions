import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { getEvent, getSelectedEvents } from '../reducers/events.selectors';
import * as actions from '../reducers/events.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Event } from '../event.model';

@Component({
  selector: 'kyr-events-delete',
  templateUrl: './events-delete.component.html',
})
export class EventsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<Event[]>;
  modelList: Event[] = [];
  returnUrl = ['/events'];
  modulePath = 'events';

  selectorGetModel = getEvent;
  selectorGetSelected = getSelectedEvents;
  actionRequestFail = actions.EventsActionTypes.RequestFailEvents;
  actionRequestGetAll = actions.RequestGetAllEvents;
  actionRequestGetOne = actions.RequestGetEvent;
  actionRequestDelete = actions.RequestDeleteEvent;
  actionSuccessDelete = actions.EventsActionTypes.SuccessDeleteEvent;
  actionSetSelected = actions.SetSelectedEvents;
}
