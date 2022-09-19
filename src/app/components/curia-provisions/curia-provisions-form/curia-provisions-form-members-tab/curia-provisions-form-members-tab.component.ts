import { TemplateRef } from '@angular/core';
import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TableDataSource } from '@peakitpt/ui-material';
import { I18NextPipe } from 'angular-i18next';
import { environment } from 'src/environments/environment';
import { CuriaProvisionMember } from '../../curia-provision.model';

@Component({
  selector: 'kyr-curia-provisions-form-members-tab',
  templateUrl: './curia-provisions-form-members-tab.component.html',
})
export class CuriaProvisionsFormMembersTabComponent {
  environment = environment;

  @Input() modulePath: string;
  @Input() form: FormGroup;
  @Input() id: number;

  @Input() parishionersRightTemplate: TemplateRef<any>;
  @Input() curiaFunctionsRightTemplate: TemplateRef<any>;

  @Input() membersFormArray: FormArray;
  @Input() membersDS: TableDataSource<any>;
  @Input() membersColumns: any[];

  newMember: CuriaProvisionMember = {
    created_at: null,
    curia_provision_id: null,
    function_description: null,
    function_id: null,
    member_description: null,
    member_id: null,
    id: null,
    updated_at: null,
    _destroy: false,
  };

  constructor(public fb: FormBuilder, public i18nextPipe: I18NextPipe) {}

  addTableLine(
    newObj: any,
    formArray: FormArray,
    tableDS: TableDataSource<any>
  ) {
    formArray.push(this.fb.group(newObj));
    tableDS.data = formArray.value;
  }
}
