import {
  Component,
  Input,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'kyr-date-field',
  templateUrl: './date-field.component.html',
})
export class DateFieldComponent {
  @Input() label: string;
  @Input() customClass: string;
  @Input() required: boolean = false;
  @Input() form: FormControl;
  @Input() maxDate: Date;
}