import { VisibleField } from './visible-field';

export class DateField extends VisibleField {
  label: string;
  type: string = 'date';
  model: any;

  public constructor(init?:Partial<DateField>) {
    super();
    Object.assign(this, init);
  }
}