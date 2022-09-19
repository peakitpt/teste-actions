import { VisibleField } from './visible-field';

export class TextField extends VisibleField {
  label: string;
  type: string = 'text';
  isHtml: boolean = false;
  model: any;
  url: string;
  internalUrl: string;

  public constructor(init?:Partial<TextField>) {
    super();
    Object.assign(this, init);
  }
}