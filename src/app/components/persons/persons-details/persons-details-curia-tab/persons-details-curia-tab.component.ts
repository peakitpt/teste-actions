import { Component, Input, ViewEncapsulation } from '@angular/core';
import { EntityPerson } from '../../person.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'kyr-persons-details-curia-tab',
  templateUrl: './persons-details-curia-tab.component.html',
  styleUrls: ['./persons-details-curia-tab.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PersonsDetailsCuriaTabComponent {
  @Input() modulePath: string;
  @Input() model: EntityPerson;

  constructor() {}

  openDetails(modulePath: string, id: number, railsApp = false) {
    if (railsApp) {
      window.open(`${environment.railsAppUrl}/${modulePath}/${id}`, '_blank');
    } else {
      window.open(`${modulePath}/${id}/details`, '_blank');
    }
  }
}
