import { Component, Input, OnInit } from '@angular/core';
import { I18NextPipe } from 'angular-i18next';
import { environment } from 'src/environments/environment';
import { Wedding } from '../../wedding.model';

@Component({
  selector: 'kyr-weddings-details-wedding-tab',
  templateUrl: './weddings-details-wedding-tab.component.html',
})
export class WeddingsDetailsWeddingTabComponent implements OnInit {
  @Input() modulePath: string;
  @Input() model: Wedding;

  constructor(public i18nextPipe: I18NextPipe) {}

  civilRegistrationCertificatesOptions = {};
  propertyRegimeOptions = {};

  ngOnInit() {
    this.civilRegistrationCertificatesOptions = {
      1: this.i18nextPipe.transform(
        `${this.modulePath}:model.options.between_catholics`
      ),
      2: this.i18nextPipe.transform(
        `${this.modulePath}:model.options.between_catholic_and_non_baptized`
      ),
      3: this.i18nextPipe.transform(
        `${this.modulePath}:model.options.between_catholic_and_non_catholic`
      ),
    };

    this.propertyRegimeOptions = {
      1: this.i18nextPipe.transform(
        `${this.modulePath}:model.options.stats_communion_acquired`
      ),
      2: this.i18nextPipe.transform(
        `${this.modulePath}:model.options.stats_separation`
      ),
      3: this.i18nextPipe.transform(
        `${this.modulePath}:model.options.stats_general_communion`
      ),
    };
  }

  openDetails(modulePath: string, id: number, railsApp = false) {
    if (railsApp) {
      window.open(`${environment.railsAppUrl}/${modulePath}/${id}`, '_blank');
    } else {
      window.open(`${modulePath}/${id}/details`, '_blank');
    }
  }
}
