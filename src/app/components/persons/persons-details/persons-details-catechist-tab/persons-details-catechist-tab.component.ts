import { Component, Input } from '@angular/core';
import { EntityPerson } from '../../person.model';

@Component({
  selector: 'kyr-persons-details-catechist-tab',
  templateUrl: './persons-details-catechist-tab.component.html'
})
export class PersonsDetailsCatechistTabComponent {
  @Input() modulePath: string;
  @Input() model: EntityPerson;

  constructor() {}
}
