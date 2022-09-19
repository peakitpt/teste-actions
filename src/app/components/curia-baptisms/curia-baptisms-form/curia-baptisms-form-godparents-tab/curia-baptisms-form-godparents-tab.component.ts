import { Component, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'kyr-curia-baptisms-form-godparents-tab',
  templateUrl: './curia-baptisms-form-godparents-tab.component.html',
})
export class CuriaBaptismsFormGodparentsTabComponent {
  @Input() modulePath: string;
  @Input() form: FormGroup;

  @Input() leftTemplate: TemplateRef<any>;
  @Input() personsRightTemplate: TemplateRef<any>;
}
