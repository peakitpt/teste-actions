import { Component, Input } from '@angular/core';
import { EntityPerson } from '../../person.model';

@Component({
  selector: 'kyr-persons-details-elder-sick-tab',
  templateUrl: './persons-details-elder-sick-tab.component.html'
})
export class PersonsDetailsElderSickTabComponent {
  @Input() modulePath: string;
  @Input() model: EntityPerson;

  constructor() {}
}
