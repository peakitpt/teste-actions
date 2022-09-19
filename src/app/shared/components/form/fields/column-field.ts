
export class ColumnField {
  type: string = 'column';
  fields: any[] = [];
	fxLayoutAlign: string = "space-between stretch";
	fxLayoutGap: number = 10;
	fxFlex: number = 33.33;

  public constructor(init?:Partial<ColumnField>) {
    Object.assign(this, init);
  }
}