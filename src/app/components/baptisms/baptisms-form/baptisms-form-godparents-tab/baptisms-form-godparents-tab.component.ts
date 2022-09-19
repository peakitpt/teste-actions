import { Component, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'kyr-baptisms-form-godparents-tab',
  templateUrl: './baptisms-form-godparents-tab.component.html',
})
export class BaptismsFormGodparentsTabComponent {
  @Input() modulePath: string;
  @Input() form: FormGroup;

  @Input() leftTemplate: TemplateRef<any>;
  @Input() personsRightTemplate: TemplateRef<any>;
}
