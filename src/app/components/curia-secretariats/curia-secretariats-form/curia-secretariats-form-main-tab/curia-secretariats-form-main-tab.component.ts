import { AfterViewInit, Component, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';

@Component({
  selector: 'kyr-curia-secretariats-form-main-tab',
  templateUrl: './curia-secretariats-form-main-tab.component.html',
})
export class CuriaSecretariatsFormMainTabComponent implements AfterViewInit {
  @Input() modulePath: string;
  @Input() form: FormGroup;
  @Input() id: number;

  @Input() leftTemplate: TemplateRef<any>;
  @Input() emolumentsRightTemplate: TemplateRef<any>;
  @Input() parishionersRightTemplate: TemplateRef<any>;
  @Input() worshipplacesRightTemplate: TemplateRef<any>;
  @Input() curiaSecretariatTypesRightTemplate: TemplateRef<any>;

  typesOptions: Array<{ label: string; value: number }> = [];

  constructor(public i18nextPipe: I18NextPipe) {}

  ngAfterViewInit() {
    this.typesOptions = [
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.Ministério`
        ),
        value: 1,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.Ordem`
        ),
        value: 2,
      },
    ];
  }
}
