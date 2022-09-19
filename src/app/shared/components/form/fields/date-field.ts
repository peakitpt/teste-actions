export class DateField {
  label: string;
  type: string = 'date';
  model: any;
  form: any;
  name: string;

  public constructor(init?:Partial<DateField>) {
    Object.assign(this, init);
  }
}