
export class CheckboxField {
  type: string = 'checkbox';
  label: string;
  form: any;
  name: string;

  public constructor(init?:Partial<CheckboxField>) {
    Object.assign(this, init);
  }
}