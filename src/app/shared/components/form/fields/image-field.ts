import { Store } from '@ngrx/store';

export class ImageField {
  type: string = 'image';
  label: string;
  form: any;
	required: boolean = false;
  imageValue: string;
	readonly: boolean = false;
	store: Store<any>;
  action: any;
  name: string;
  successPostImageActionCallback: Function;
  onImageChange: Function;

  public constructor(init?:Partial<ImageField>) {
    Object.assign(this, init);
  }
}