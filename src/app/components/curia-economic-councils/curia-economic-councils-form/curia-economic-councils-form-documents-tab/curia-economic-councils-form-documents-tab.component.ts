import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'kyr-curia-economic-councils-form-documents-tab',
  templateUrl: './curia-economic-councils-form-documents-tab.component.html',
})
export class CuriaEconomicCouncilsFormDocumentsTabComponent {
  environment = environment;

  @Input() modulePath: string;
  @Input() form: FormGroup;
  @Input() id: number;
}
