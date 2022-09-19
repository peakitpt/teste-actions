import { FormControl } from '@angular/forms';

export class ChipsField {
  type: string = 'chips';
  label: string;
  form: any;
  readonly: boolean = false;
  name: string;
  getTagId: Function;
  getTagLabel: Function;
  fillFormArray: Function;

  public constructor(init?:Partial<ChipsField>) {
    Object.assign(this, init);
  }
}