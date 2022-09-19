import { DateField } from './date-field';
import { IconField } from './icon-field';
import { ImageField } from './image-field';
import { TableDataField } from './table-data-field';
import { TableDataSearchField } from './table-data-search-field';
import { TableField } from './table-field';
import { TemplateField } from './template-field';
import { TextField } from './text-field';
import { VisibleField } from './visible-field';
import {ComplexTreeField} from './complex-tree-field';

export class Section extends VisibleField {
  label: string;
  id: string;
  type = 'section';
  // tslint:disable-next-line:max-line-length
  fields: Array<ImageField | IconField | DateField | TextField | TemplateField | TableField | TableDataField | TableDataSearchField | ComplexTreeField>;

  public constructor(init?: Partial<Section>) {
    super();
    Object.assign(this, init);
  }
}
