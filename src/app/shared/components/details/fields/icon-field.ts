import { VisibleField } from './visible-field';

export class IconField extends VisibleField {
  label: string;
  type: string = 'icon';
  model: any;
  icon_true: string;
  icon_false: string;

  public constructor(init?:Partial<IconField>) {
    super();
    Object.assign(this, init);
  }
}