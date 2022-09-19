export class TextAreaField {
  type: string = 'textarea';
  label: string;
  form: any;
  required: boolean = false;
  readonly: boolean = false;
  name: string;

  public constructor(init?: Partial<TextAreaField>) {
    Object.assign(this, init);
  }
}
