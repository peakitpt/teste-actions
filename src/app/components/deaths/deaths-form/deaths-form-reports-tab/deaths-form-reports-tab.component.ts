import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'kyr-deaths-form-reports-tab',
  templateUrl: './deaths-form-reports-tab.component.html',
})
export class DeathsFormReportsTabComponent {
  @Input() modulePath: string;
  @Input() form: FormGroup;

  constructor() {}
}
