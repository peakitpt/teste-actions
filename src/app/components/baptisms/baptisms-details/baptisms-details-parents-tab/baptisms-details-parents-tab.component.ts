import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Baptism } from '../../baptism.model';

@Component({
  selector: 'kyr-baptisms-details-parents-tab',
  templateUrl: './baptisms-details-parents-tab.component.html',
})
export class BaptismsDetailsParentsTabComponent {
  @Input() modulePath: string;
  @Input() model: Baptism;

  openDetails(modulePath: string, id: number, railsApp = false) {
    if (railsApp) {
      window.open(`${environment.railsAppUrl}/${modulePath}/${id}`, '_blank');
    } else {
      window.open(`${modulePath}/${id}/details`, '_blank');
    }
  }
}
