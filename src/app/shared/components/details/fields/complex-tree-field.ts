import {VisibleField} from './visible-field';

export class ComplexTreeField extends VisibleField {
  type = 'complex-tree';
  label: string;

  dataSource: { label: string, name: string, children: any[]}[];
  dataSourceColumns: { id: string, label: string }[];

  public constructor(init?: Partial<ComplexTreeField>) {
    super();
    Object.assign(this, init);
  }
}
