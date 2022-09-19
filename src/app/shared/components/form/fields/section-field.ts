import { DateField } from './date-field';
import { IconField } from './icon-field';
import { ImageField } from './image-field';
import { RowField } from './row-field';
import { TableDataField } from './table-data-field';
import { TableDataSearchField } from './table-data-search-field';
import { TableField } from './table-field';
import { TemplateField } from './template-field';

export class SectionField {
  label: string;
  id: string;
  type: string = 'section';
  fields: Array<ImageField | IconField | DateField | TemplateField | TableField | TableDataField | TableDataSearchField | RowField>;
  isVisible: boolean = true;

  public constructor(init?:Partial<SectionField>) {
    Object.assign(this, init);
  }
}