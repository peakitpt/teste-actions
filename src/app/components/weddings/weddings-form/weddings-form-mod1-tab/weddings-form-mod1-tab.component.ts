import { Component, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'kyr-weddings-form-mod1-tab',
  templateUrl: './weddings-form-mod1-tab.component.html',
})
export class WeddingsFormMod1TabComponent {
  @Input() modulePath: string;
  @Input() form: FormGroup;
}
