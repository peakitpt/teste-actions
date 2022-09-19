import { Component, Input, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import {
  Catechism,
  CatechismTransfer,
} from 'src/app/components/catechisms/catechism.model';
import { State as PersonsState } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.reducer';
import {
  RequestGetByEntityId,
  ClearGetByEntityId,
} from 'src/app/components/persons/reducers/persons.actions';
import { getPersonByEntityId } from 'src/app/components/persons/reducers/persons.selectors';
import { EntityPerson } from 'src/app/components/persons/person.model';

@Component({
  selector: 'kyr-catechisms-details-transfers-tab',
  templateUrl: './catechisms-details-transfers-tab.component.html',
})
export class CatechismsDetailsTransfersTabComponent implements OnDestroy {
  @Input() modulePath: string;
  @Input() model: Catechism;

  private subs: Subscription[] = [];

  constructor(private personsStore: Store<PersonsState>) {}

  openTransferReport(data: CatechismTransfer) {
    window.open(
      `${environment.railsAppUrl}/catechisms/${data.catechism_id}/${data.report_url}`,
      '_blank'
    );
  }

  openDetails(modulePath: string, id: number, railsApp = false) {
    if (modulePath === 'persons') {
      this.personsStore.dispatch(new RequestGetByEntityId(id));
      let getEntity$: Subscription = this.personsStore
        .select(getPersonByEntityId)
        .subscribe((person: EntityPerson) => {
          if (person) {
            getEntity$.unsubscribe();
            this.personsStore.dispatch(new ClearGetByEntityId());
            window.open(`${modulePath}/${person.id}/details`, '_blank');
          }
        });
    } else {
      if (railsApp) {
        window.open(`${environment.railsAppUrl}/${modulePath}/${id}`, '_blank');
      } else {
        window.open(`${modulePath}/${id}/details`, '_blank');
      }
    }
  }

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
