import { Section } from './section-field';
import { VisibleField } from './visible-field';

export class Tab extends VisibleField {
  name: string;
  textLabel: string;
  type: string = 'tab';
  fields: Section[];

  public constructor(init?:Partial<Tab>) {
    super();
    Object.assign(this, init);
  }
}