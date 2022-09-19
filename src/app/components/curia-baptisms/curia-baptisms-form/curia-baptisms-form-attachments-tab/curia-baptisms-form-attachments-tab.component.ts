import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TableDataSource } from '@peakitpt/ui-material';
import { Subscription } from 'rxjs';
import { CuriaBaptismsAttachment } from '../../curia-baptism.model';

@Component({
  selector: 'kyr-curia-baptisms-form-attachments-tab',
  templateUrl: './curia-baptisms-form-attachments-tab.component.html',
})
export class CuriaBaptismsFormAttachmentsTabComponent {
  @Input() modulePath: string;
  @Input() form: FormGroup;
  @Input() id: number;
  @Input() subs: Subscription[] = [];

  @Input() attachmentsFormArray: FormArray;
  @Input() attachmentsDS: TableDataSource<any>;
  @Input() attachmentsColumns: any[];

  attachmentFormControlPlaceholder = new FormControl();

  constructor(public fb: FormBuilder) {}

  addTableLine(
    newObj: any,
    formArray: FormArray,
    tableDS: TableDataSource<any>
  ) {
    formArray.push(this.fb.group(newObj));
    tableDS.data = formArray.value;
  }

  addAttachment(event: any) {
    if (event.target.files && event.target.files[0]) {
      const newAttachment: CuriaBaptismsAttachment = {
        attachment: null,
        attachment_name: event.target.files[0].name,
        baptism_id: null,
        created_at: null,
        description: null,
        id: null,
        updated_at: null,
        file_to_upload: event.target.files[0],
      };

      this.addTableLine(
        newAttachment,
        this.attachmentsFormArray,
        this.attachmentsDS
      );
    }
  }
}
