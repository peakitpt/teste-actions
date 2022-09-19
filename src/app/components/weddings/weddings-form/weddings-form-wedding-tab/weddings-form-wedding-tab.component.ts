import { Component, Input, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';

@Component({
  selector: 'kyr-weddings-form-wedding-tab',
  templateUrl: './weddings-form-wedding-tab.component.html',
})
export class WeddingsFormWeddingTabComponent {
  @Input() modulePath: string;
  @Input() form: FormGroup;
  @Input() id: number;

  @Input() leftTemplate: TemplateRef<any>;
  @Input() emolumentsRightTemplate: TemplateRef<any>;
  @Input() parishionersRightTemplate: TemplateRef<any>;
  @Input() worshipplacesRightTemplate: TemplateRef<any>;

  constructor(public i18nextPipe: I18NextPipe) {}

  civilRegistrationCertificatesOptions = [];
  propertyRegimeOptions = [];
  documentEntityDescriptionQP = {
    modal: true,
    serialize: 'parishioners_name_type_complete_relation_taxpayer_address',
    except_users: true,
    format: 'json',
    documents: true,
  };

  ngOnInit() {
    this.civilRegistrationCertificatesOptions = [
      {
        value: null,
        label: '',
      },
      {
        value: '1',
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.between_catholics`
        ),
      },
      {
        value: '2',
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.between_catholic_and_non_baptized`
        ),
      },
      {
        value: '3',
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.between_catholic_and_non_catholic`
        ),
      },
    ];

    this.propertyRegimeOptions = [
      {
        value: null,
        label: '',
      },
      {
        value: 1,
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.stats_communion_acquired`
        ),
      },
      {
        value: 2,
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.stats_separation`
        ),
      },
      {
        value: 3,
        label: this.i18nextPipe.transform(
          `${this.modulePath}:model.options.stats_general_communion`
        ),
      },
    ];
  }
}
