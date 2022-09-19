import { Component, Input } from '@angular/core';
import { EntityPerson } from '../../person.model';

@Component({
  selector: 'kyr-persons-details-mec-tab',
  templateUrl: './persons-details-mec-tab.component.html'
})
export class PersonsDetailsMecTabComponent {
  @Input() modulePath: string;
  @Input() model: EntityPerson;

  constructor() {}

  openDetails(modulePath: string, id: number) {
    window.open(`${modulePath}/${id}/details`, '_blank');
  }
}
