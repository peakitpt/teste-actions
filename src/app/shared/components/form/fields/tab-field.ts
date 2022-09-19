import { SectionField } from './section-field';
import { RowField } from './row-field';

export class TabField  {
  name: string;
  textLabel: string;
  type: string = 'tab';
  fields: (SectionField | RowField)[];

  public constructor(init?:Partial<TabField>) {
    Object.assign(this, init);
  }
}