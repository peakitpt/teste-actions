import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'kyr-table-filters',
  templateUrl: './ui-table-filters.component.html',
  styleUrls: ['./ui-table-filters.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UiTableFiltersComponent {
  @Input() filterList: any[] = [];
}
