import { Component, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { Catechism } from 'src/app/components/catechisms/catechism.model';
import { I18NextPipe } from 'angular-i18next';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { State as PersonsState } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.reducer';
import {
  RequestGetByEntityId,
  ClearGetByEntityId,
} from 'src/app/components/persons/reducers/persons.actions';
import { getPersonByEntityId } from 'src/app/components/persons/reducers/persons.selectors';
import { EntityPerson } from 'src/app/components/persons/person.model';

@Component({
  selector: 'kyr-catechisms-details-catechism-tab',
  templateUrl: './catechisms-details-catechism-tab.component.html',
  styleUrls: ['./catechisms-details-catechism-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CatechismsDetailsCatechismTabComponent implements OnDestroy {
  @Input() modulePath: string;
  @Input() model: Catechism;

  private subs: Subscription[] = [];

  constructor(
    public sharedModule: SharedModule,
    public i18nextPipe: I18NextPipe,
    private personsStore: Store<PersonsState>
  ) {}

  getSchedule(model: Catechism): string {
    let resultStr = '';
    if (model.week_day) {
      resultStr += this.getWeekday(model.week_day);
    }
    if (model.week_day && (model.start_time || model.end_time)) {
      resultStr += ', ';
    }
    if (model.start_time) {
      resultStr += model.start_time;
    }
    if (model.end_time) {
      resultStr += ` ${this.i18nextPipe.transform('translation:range.to')} ${
        model.end_time
      }`;
    }
    return resultStr;
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

  private getWeekday(weekDay: number): string {
    switch (weekDay) {
      case 1:
        return this.i18nextPipe.transform('translation:weekdays.monday');
      case 2:
        return this.i18nextPipe.transform('translation:weekdays.tuesday');
      case 3:
        return this.i18nextPipe.transform('translation:weekdays.wednesday');
      case 4:
        return this.i18nextPipe.transform('translation:weekdays.thursday');
      case 5:
        return this.i18nextPipe.transform('translation:weekdays.friday');
      case 6:
        return this.i18nextPipe.transform('translation:weekdays.saturday');
      case 7:
        return this.i18nextPipe.transform('translation:weekdays.sunday');
      default:
        return '';
    }
  }

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
