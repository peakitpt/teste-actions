import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Wedding } from '../../wedding.model';

@Component({
  selector: 'kyr-weddings-details-grooms-tab',
  templateUrl: './weddings-details-grooms-tab.component.html',
})
export class WeddingsDetailsGroomsTabComponent {
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
