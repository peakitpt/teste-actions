import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';

@Component({
  selector: 'kyr-persons-form-reports-tab',
  templateUrl: './persons-form-reports-tab.component.html'
})
export class PersonsFormReportsTabComponent implements OnInit {
  @Input() modulePath: string;
  @Input() form: FormGroup;

  @Input() leftTemplate: TemplateRef<any>;
  @Input() worshipplacesRightTemplate: TemplateRef<any>;

  suitabilityRequestOptions: Array<{ label: string; value: number }> = [];

  constructor(private i18nextPipe: I18NextPipe) {}

  ngOnInit() {
    this.suitabilityRequestOptions = this.getSuitabilityRequests();
  }

  private getSuitabilityRequests(): Array<{ label: string; value: number }> {
    return [
      {
        label: '----',
        value: null
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:suitability_request_options.baptism`
        ),
        value: 1
      },
      {
        label: this.i18nextPipe.transform(
          `${this.modulePath}:suitability_request_options.chrism`
        ),
        value: 2
      }
    ];
  }
}
