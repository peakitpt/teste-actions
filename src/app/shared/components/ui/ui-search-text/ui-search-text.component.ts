import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'kyr-search-text',
  templateUrl: './ui-search-text.component.html',
  styleUrls: ['./ui-search-text.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UiSearchTextComponent {
  @Input() label: string;
  @Input() placeholder: string;
  @Input() type: string = 'text';
  @Input() control: FormControl = new FormControl();

  @Output() searchEvent: EventEmitter<any> = new EventEmitter();

  search() {
    this.searchEvent.emit(this.control.value);
  }
}
