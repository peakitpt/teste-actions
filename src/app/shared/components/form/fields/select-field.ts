
export class SelectField {
  type: string = 'select';
  label: string;
  form: any;
  required: boolean = false;
  name: string;
  options: any[] = [];

  public constructor(init?:Partial<SelectField>) {
    Object.assign(this, init);
  }
}