import { AfterViewInit, Component,
  Input,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'kyr-chips-field',
  templateUrl: './chips-field.component.html',
})
export class ChipsFieldComponent implements AfterViewInit {
  @Input() label: string;
  @Input() name: string;
  @Input() form: any;
  @Input() readonly: boolean = false;

  @Input() getTagId: Function = (tag: any) => {
    return tag.id;
  }
  @Input() getTagLabel: Function = (tag: any) => {
    return tag.tag;
  }
  @Input() fillFormArray: Function = (id: any, label: any) => {
    return {
      id: id,
      tag: label
    };
  }

  hashtagsList: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngAfterViewInit() {
    this.form.get(this.name).value.forEach((tag: any) => {
      this.hashtagsList.push({
        id: this.getTagId(tag),
        label: this.getTagLabel(tag),
        selected: true,
      });
    });
  }

  onDataChange(data: any) {
    const res = [];
    this.hashtagsList.forEach((tag) => {
      res.push(Object.assign(this.fillFormArray(tag.id, tag.label), {
        deleted: false,
        _destroy: tag.selected ? false : true,
      }));
    });
    this.form.setControl(this.name, this.fb.array(res));  
  }
}