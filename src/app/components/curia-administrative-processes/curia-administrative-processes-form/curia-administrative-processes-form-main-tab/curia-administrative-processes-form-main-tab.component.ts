import { AfterViewInit, Component, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';

@Component({
  selector: 'kyr-curia-administrative-processes-form-main-tab',
  templateUrl: './curia-administrative-processes-form-main-tab.component.html',
})
export class CuriaAdministrativeProcessesFormMainTabComponent {
  @Input() modulePath: string;
  @Input() form: FormGroup;
  @Input() id: number;

  @Input() leftTemplate: TemplateRef<any>;
  @Input() emolumentsRightTemplate: TemplateRef<any>;
  @Input() parishionersRightTemplate: TemplateRef<any>;
  @Input() curiaAdministrativeProcessTypesRightTemplate: TemplateRef<any>;

  constructor(public i18nextPipe: I18NextPipe) {}
}
