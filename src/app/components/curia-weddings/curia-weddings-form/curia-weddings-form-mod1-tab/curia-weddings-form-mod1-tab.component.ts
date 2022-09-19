import { Component, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'kyr-curia-weddings-form-mod1-tab',
  templateUrl: './curia-weddings-form-mod1-tab.component.html',
})
export class CuriaWeddingsFormMod1TabComponent {
  @Input() modulePath: string;
  @Input() form: FormGroup;
}
