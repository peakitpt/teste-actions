import { Component, Input } from '@angular/core';
import { EntityPerson } from '../../person.model';

@Component({
  selector: 'kyr-persons-details-categories-tab',
  templateUrl: './persons-details-categories-tab.component.html'
})
export class PersonsDetailsCategoriesTabComponent {
  @Input() modulePath: string;
  @Input() model: EntityPerson;

  constructor() {}
}
