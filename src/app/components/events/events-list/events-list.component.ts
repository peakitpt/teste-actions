import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  TemplateRef,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BaseListComponent } from 'src/app/shared/components/base-list-component';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsSubject, Store } from '@ngrx/store';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { EventsService } from '@peakitpt/ui-kyrios-api';

import {
  getEventsListEntirely,
  getSelectedEvents,
} from './../reducers/events.selectors';
import { getEventsList } from '../reducers/events.selectors';
import * as actions from '../reducers/events.actions';
import { EventResponse, Event } from '../event.model';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'kyr-events-list',
  templateUrl: './events-list.component.html',
})
export class EventsListComponent
  extends BaseListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  appName = 'cms';
  modulePath = 'events';
  viewName = 'Event';
  modelList$: Observable<EventResponse>;
  selectedRows$: Observable<Event[]>;

  selectorGetList = getEventsList;
  selectorGetSelected = getSelectedEvents;
  selectorGetListEntirely = getEventsListEntirely;
  actionSetSelected = actions.SetSelectedEvents;
  actionRequestGetAll = actions.RequestGetAllEvents;
  actionRequestGetListEntirely = actions.RequestGetEntirelyEvents;

  @ViewChild('validatedTemplate') validatedTemplate: TemplateRef<any>;
  @ViewChild('eventFromDate') eventFromDate: TemplateRef<any>;
  @ViewChild('eventToDate') eventToDate: TemplateRef<any>;

  constructor(
    public titleService: Title,
    public router: Router,
    public route: ActivatedRoute,
    public i18nextPipe: I18NextPipe,
    public sharedModule: SharedModule,
    public actionSubject: ActionsSubject,
    public store: Store<any>,
    public menuHelperService: MenuHelperService,
    public http: HttpClient,
    public fb: FormBuilder,
    public moduleService?: EventsService
  ) {
    super(
      titleService,
      router,
      route,
      i18nextPipe,
      sharedModule,
      actionSubject,
      store,
      menuHelperService,
      http,
      fb,
      moduleService
    );
  }

  tableChangesDetector(): Subscription {
    return this.actionSubject
      .pipe(
        ofType(
          actions.EventsActionTypes.SuccessPostEvent,
          actions.EventsActionTypes.SuccessPutEvent,
          actions.EventsActionTypes.SuccessDeleteEvent
        )
      )
      .subscribe(() => {
        this.table.clearSelections();
        this.refreshTable();
      });
  }

  buildTableColumns() {
    this.tableColumns = [
      {
        id: 'title',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.title`),
        sortable: true,
        filter: false,
      },
      {
        id: 'event_from_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.event_from_date`
        ),
        sortable: true,
        filter: false,
        template: this.eventFromDate,
      },
      {
        id: 'event_from_hour',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.event_from_hour`
        ),
        sortable: true,
        filter: false,
      },
      {
        id: 'event_to_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.event_to_date`
        ),
        sortable: true,
        filter: false,
        template: this.eventToDate,
      },
      {
        id: 'event_to_hour',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.event_to_hour`
        ),
        sortable: true,
        filter: false,
      },
      {
        id: 'buttons',
        title: '',
        filter: false,
        sortable: false,
        isColumnStickyEnd: true,
        template: this.sharedModule.isSmallScreen()
          ? this.buttonsTemplate
          : undefined,
        hoverTemplate: this.sharedModule.isSmallScreen()
          ? undefined
          : this.buttonsTemplate,
        stopRowClickPropagation: true,
      },
    ];

    this.smallScreenTableColumns = [
      {
        id: 'title',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.title`),
        sortable: true,
        filter: false,
      },
    ];
  }
}
