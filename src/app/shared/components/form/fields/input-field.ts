import { TemplateRef } from '@angular/core';

export class InputField {
  type: string = 'input';
  label: string;
  form: any;
  required: boolean = false;
  name: string;
  leftTemplate: TemplateRef<any> = null;
  leftTemplateContext: any;
  rightTemplate: TemplateRef<any> = null;
  rightTemplateContext: any;

  public constructor(init?:Partial<InputField>) {
    Object.assign(this, init);
  }
}