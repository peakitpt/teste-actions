
export class ComplexTreeField {
  type: string = 'complex-tree';
  label: string;

  dataSource: { label: string, name: string, children: any[]}[];
  dataSourceColumns: { id: string, label: string }[];

  public constructor(init?:Partial<ComplexTreeField>) {
    Object.assign(this, init);
  }
}