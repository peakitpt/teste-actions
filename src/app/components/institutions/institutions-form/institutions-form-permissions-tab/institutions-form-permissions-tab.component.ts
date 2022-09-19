import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TableDataSource } from '@peakitpt/ui-material';
import { I18NextPipe } from 'angular-i18next';
import { EntityInstitutionValences } from '../../institution.model';

@Component({
  selector: 'kyr-institutions-form-permissions-tab',
  templateUrl: './institutions-form-permissions-tab.component.html',
})
export class InstitutionsFormPermissionsTabComponent {
  @Input() modulePath: string;
  @Input() form: FormGroup;
  @Input() id: number;

  @Input() leftTemplate: TemplateRef<any>;
  @Input() institutionTypeDescriptionRightTemplate: TemplateRef<any>;
  @Input() archpristshipRightTemplate: TemplateRef<any>;
  @Input() chapelryRightTemplate: TemplateRef<any>;
  @Input() countryRightTemplate: TemplateRef<any>;

  @Input() valencesFormArray: FormArray;
  @Input() valencesDS: TableDataSource<any>;
  @Input() valencesColumns: any[];

  @Input() permissionsAttributesDS: any;
  @Input() permissionsAttributesColumns: any[];

  websiteTypeOptions: any[];

  newValence: EntityInstitutionValences = {
    created_at: null,
    entity_institution_id: null,
    id: null,
    updated_at: null,
    valence_description: null,
    valence_id: null,
  };

  constructor(public i18nextPipe: I18NextPipe, public fb: FormBuilder) {}

  // addTableLine(
  //   newObj: any,
  //   formArray: FormArray,
  //   tableDS: TableDataSource<any>
  // ) {
  //   formArray.push(this.fb.group(newObj));
  //   tableDS.data = formArray.value;
  // }
}
