import { Component, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'kyr-curia-administrative-processes-form-party-provisions-tab',
  templateUrl:
    './curia-administrative-processes-form-party-provisions-tab.component.html',
})
export class CuriaAdministrativeProcessesFormPartyProvisionsTabComponent {
  environment = environment;

  @Input() modulePath: string;
  @Input() form: FormGroup;
  @Input() id: number;

  @Input() leftTemplate: TemplateRef<any>;
  @Input() chapelriesRightTemplate: TemplateRef<any>;
  @Input() priestsRightTemplate: TemplateRef<any>;

  priestsQSP = {
    can_sign: true,
  };

  constructor(public i18nextPipe: I18NextPipe) {}
}
