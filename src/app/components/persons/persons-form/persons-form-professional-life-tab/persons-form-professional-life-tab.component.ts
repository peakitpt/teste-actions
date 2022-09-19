import { Component, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'kyr-persons-form-professional-life-tab',
  templateUrl: './persons-form-professional-life-tab.component.html'
})
export class PersonsFormProfessionalLifeTabComponent {
  @Input() modulePath: string;
  @Input() form: FormGroup;

  @Input() leftTemplate: TemplateRef<any>;
  @Input() countriesRightTemplate: TemplateRef<any>;

  constructor(public sharedModule: SharedModule) {}
}
