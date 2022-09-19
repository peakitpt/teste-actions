import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { EntityPerson } from '../../person.model';
import { NewsletterGroupSubscriptionResponse } from 'src/app/components/newsletter-group-subscriptions/newsletter-group-subscription.model';
import { State as NewsletterGroupSubscriptionsState } from 'src/app/components/newsletter-group-subscriptions/reducers/newsletter-group-subscriptions.reducer';
import { getNewsletterGroupSubscriptionsList } from 'src/app/components/newsletter-group-subscriptions/reducers/newsletter-group-subscriptions.selectors';
import { RequestGetAll as RequestGroups } from 'src/app/components/newsletter-group-subscriptions/reducers/newsletter-group-subscriptions.actions';

@Component({
  selector: 'kyr-persons-details-groups-tab',
  templateUrl: './persons-details-groups-tab.component.html',
  styleUrls: ['./persons-details-groups-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PersonsDetailsGroupsTabComponent implements OnInit {
  @Input() modulePath: string;
  @Input() model: EntityPerson;

  modelList$: Observable<NewsletterGroupSubscriptionResponse>;

  constructor(
    private newsletterGroupSubscriptionsStore: Store<NewsletterGroupSubscriptionsState>
  ) {}

  ngOnInit() {
    this.modelList$ = this.newsletterGroupSubscriptionsStore.select(
      getNewsletterGroupSubscriptionsList
    );
    this.newsletterGroupSubscriptionsStore.dispatch(
      new RequestGroups({
        query: { entity_person_id: this.model.id, groups: true },
      })
    );
  }
}
