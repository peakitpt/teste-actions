import { Component, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'kyr-curia-baptisms-form-parents-grandparents-tab',
  templateUrl: './curia-baptisms-form-parents-grandparents-tab.component.html',
})
export class CuriaBaptismsFormParentsGrandparentsTabComponent {
  @Input() modulePath: string;
  @Input() form: FormGroup;

  @Input() leftTemplate: TemplateRef<any>;
  @Input() personsRightTemplate: TemplateRef<any>;
  @Input() chapelriesRightTemplate: TemplateRef<any>;
}
