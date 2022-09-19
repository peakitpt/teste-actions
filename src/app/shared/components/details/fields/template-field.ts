import { TemplateRef } from '@angular/core';
import { VisibleField } from './visible-field';

export class TemplateField extends VisibleField {
  template: TemplateRef<any>;
  label: string;
  type: string = 'template';
  model: any;

  public constructor(init?: Partial<TemplateField>) {
    super();
    Object.assign(this, init);
  }
}
