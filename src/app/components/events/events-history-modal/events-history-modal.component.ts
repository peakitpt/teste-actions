import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Event } from '../event.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { I18NextPipe } from 'angular-i18next';
import { HttpClient } from '@angular/common/http';
import { DialogComponent } from '@peakitpt/ui-material';
import { getRegistrationHistory } from '../reducers/events.selectors';
import { RequestGetRegistrationHistory } from '../reducers/events.actions';

@Component({
  selector: 'kyr-events-history-modal',
  templateUrl: './events-history-modal.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class EventsHistoryModalComponent implements OnInit, AfterViewInit {
  model$: Observable<any>;
  returnUrl = '/events';
  modulePath = 'events';
  viewName = 'Event';

  subs: Subscription[] = [];

  selectorGetHistoryModel = getRegistrationHistory;
  actionRequestGetHistory = RequestGetRegistrationHistory;

  @Input() data: any;
  @Output() modalClosed = new EventEmitter();
  @ViewChild('modal') modal: DialogComponent;

  constructor(
    public store: Store<any>,
    public router: Router,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
    public i18nextPipe: I18NextPipe,
    public http: HttpClient
  ) {}

  ngOnInit() {
    this.model$ = this.store.select(this.selectorGetHistoryModel);
    this.store.dispatch(new this.actionRequestGetHistory(this.data));
  }

  ngAfterViewInit() {
    this.modal.open();
  }

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }

  onModalClose() {
    this.modalClosed.emit();
  }
}
