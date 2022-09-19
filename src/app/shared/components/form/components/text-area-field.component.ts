import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'kyr-text-area-field',
  templateUrl: './text-area-field.component.html',
})
export class TextAreaFieldComponent {
  @Input() label: string;
  @Input() form: FormControl;
  @Input() required: boolean = false;
  @Input() readonly: boolean = false;
}
