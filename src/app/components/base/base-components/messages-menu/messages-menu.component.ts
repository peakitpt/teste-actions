import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../reducers/base.reducer';
import { getNewsletters } from '../../reducers/base.selectors';
import { RequestGetAllNewsletters } from '../../reducers/base.actions';
import { Router } from '@angular/router';
import * as PendingEntitiesActions from '../../../pending-entities/reducers/pending-entities.actions';
import * as PendingEntitiesSelectors from '../../../pending-entities/reducers/pending-entities.selectors';
import * as PendingEntitiesState from '../../../pending-entities/reducers/pending-entities.reducer';

@Component({
  selector: 'kyr-messages-menu',
  templateUrl: './messages-menu.component.html',
  styleUrls: ['./messages-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MessagesMenuComponent implements OnInit {
  subs: Subscription[] = [];
  newsletters$: Observable<any>;
  totalMessages = 0;
  totalPentingEntities = 0;
  totalNotifications = 0;

  constructor(
    private store: Store<State>,
    private router: Router,
    private pendingEntitiesStore: Store<PendingEntitiesState.State>
  ) {}

  ngOnInit() {
    this.subscribeToNewsletters();
    this.getNewsletters();
    this.getPendingEntitiesCount();
  }

  subscribeToNewsletters() {
    this.newsletters$ = this.store.select(getNewsletters);

    this.subs.push(
      this.newsletters$.subscribe((messages) => {
        if (messages) {
          this.totalMessages = messages.total;
        }
      })
    );
  }

  getNewsletters() {
    this.store.dispatch(
      new RequestGetAllNewsletters({
        query: { read: false },
        page: 1,
        limit: 10,
      })
    );
  }

  goToMessage(id: number) {
    this.router.navigate(['user-newsletters', id, 'details']);
  }

  goToMessages() {
    this.router.navigate(['user-newsletters']);
  }

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }

  getPendingEntitiesCount() {
    this.pendingEntitiesStore.dispatch(
      new PendingEntitiesActions.RequestCountPendingEntity(null)
    );

    this.pendingEntitiesStore
      .select(PendingEntitiesSelectors.getCountPendingEntity)
      .subscribe((amount: any) => {
        if (amount && amount.pending > 0) {
          this.totalPentingEntities = amount.pending;
          this.totalNotifications = this.totalMessages + amount.pending;
        }
      });
  }
}
