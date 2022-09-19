import { TemplateRef } from '@angular/core';

export class TemplateField {
  template: TemplateRef<any>;
  label: string;
  type: string = 'template';

  public constructor(init?:Partial<TemplateField>) {
    Object.assign(this, init);
  }
}