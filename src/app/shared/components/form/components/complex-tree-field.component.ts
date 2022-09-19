import {
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'kyr-complex-tree-field',
  templateUrl: './complex-tree-field.component.html',
})
export class ComplexTreeFieldComponent {
  @Input() label: string;

  @Input() dataSource: { label: string, name: string, children: any[]}[] = [];
  @Input() dataSourceColumns: { id: string, label: string }[] = [];
}