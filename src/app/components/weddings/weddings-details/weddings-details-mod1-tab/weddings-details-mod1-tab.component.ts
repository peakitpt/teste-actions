import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Wedding } from '../../wedding.model';

@Component({
  selector: 'kyr-weddings-details-mod1-tab',
  templateUrl: './weddings-details-mod1-tab.component.html',
})
export class WeddingsDetailsMod1TabComponent {
  @Input() modulePath: string;
  @Input() model: Wedding;

  openDetails(modulePath: string, id: number, railsApp = false) {
    if (railsApp) {
      window.open(`${environment.railsAppUrl}/${modulePath}/${id}`, '_blank');
    } else {
      window.open(`${modulePath}/${id}/details`, '_blank');
    }
  }
}
