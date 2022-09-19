import { Component, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';

@Component({
  selector: 'kyr-weddings-form-mod2-tab',
  templateUrl: './weddings-form-mod2-tab.component.html',
})
export class WeddingsFormMod2TabComponent {
  @Input() modulePath: string;
  @Input() form: FormGroup;

  @Input() leftTemplate: TemplateRef<any>;
  @Input() chapelriesRightTemplate: TemplateRef<any>;

  constructor(public i18nextPipe: I18NextPipe) {}

  groomBrideOptions = [];

  ngOnInit() {
    this.groomBrideOptions = [
      {
        label: '',
        value: null,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.grooms_genders.groom`
        ),
        value: true,
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.grooms_genders.bride`
        ),
        value: false,
      },
    ];
  }
}
