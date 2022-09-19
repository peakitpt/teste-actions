import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'kyr-table-search',
  templateUrl: './ui-table-search.component.html',
  styleUrls: ['./ui-table-search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UiTableSearchComponent {
  @Input() menuTemplate: any;
  @Input() searchWordControl: FormControl = new FormControl();
  @Input() fxFlex = 100;

  @Output() searchEvent: EventEmitter<any> = new EventEmitter();
  @Output() clearEvent: EventEmitter<any> = new EventEmitter();

  search() {
    this.searchEvent.emit(this.searchWordControl.value);
  }

  clear() {
    this.clearEvent.emit();
  }
}
