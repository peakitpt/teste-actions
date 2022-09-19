import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TableDataSource } from '@peakitpt/ui-material';
import { Subscription } from 'rxjs';
import { CuriaAdministrativeProcessAttachment } from '../../curia-administrative-process.model';

@Component({
  selector: 'kyr-curia-administrative-processes-form-attachments-tab',
  templateUrl:
    './curia-administrative-processes-form-attachments-tab.component.html',
})
export class CuriaAdministrativeProcessesFormAttachmentsTabComponent {
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
      const newAttachment: CuriaAdministrativeProcessAttachment = {
        attachment: null,
        attachment_name: event.target.files[0].name,
        created_at: null,
        curia_administrative_process_id: null,
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
