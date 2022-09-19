export class IconField {
  label: string;
  type: string = 'icon';
  model: any;
  icon_true: string;
  icon_false: string;

  public constructor(init?:Partial<IconField>) {
    Object.assign(this, init);
  }
}