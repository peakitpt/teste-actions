
export class RowField {
  type: string = 'row';
  fields: any[] = [];
  fxLayout: string = 'row wrap';

  public constructor(init?:Partial<RowField>) {
    Object.assign(this, init);
  }
}