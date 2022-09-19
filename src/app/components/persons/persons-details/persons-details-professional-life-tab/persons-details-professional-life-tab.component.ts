import { Component, Input } from '@angular/core';
import { EntityPerson } from '../../person.model';

@Component({
  selector: 'kyr-persons-details-professional-life-tab',
  templateUrl: './persons-details-professional-life-tab.component.html'
})
export class PersonsDetailsProfessionalLifeTabComponent {
  @Input() modulePath: string;
  @Input() model: EntityPerson;

  constructor() {}

  openDetails(modulePath: string, id: number) {
    window.open(`${modulePath}/${id}/details`, '_blank');
  }
}
