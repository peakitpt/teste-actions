import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CuriaWedding } from '../../curia-wedding.model';

@Component({
  selector: 'kyr-curia-weddings-details-mod1-tab',
  templateUrl: './curia-weddings-details-mod1-tab.component.html',
})
export class CuriaWeddingsDetailsMod1TabComponent {
  @Input() modulePath: string;
  @Input() model: CuriaWedding;

  openDetails(modulePath: string, id: number, railsApp = false) {
    if (railsApp) {
      window.open(`${environment.railsAppUrl}/${modulePath}/${id}`, '_blank');
    } else {
      window.open(`${modulePath}/${id}/details`, '_blank');
    }
  }
}
