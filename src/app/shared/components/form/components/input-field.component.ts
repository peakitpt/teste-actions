import {
  Component,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'kyr-input-field',
  templateUrl: './input-field.component.html',
})
export class InputFieldComponent {
  @Input() label: string;
  @Input() customClass: string;
  @Input() required: boolean = false;
  @Input() form: FormControl;
}