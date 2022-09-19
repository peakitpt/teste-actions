import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Baptism } from '../../baptism.model';

@Component({
  selector: 'kyr-baptisms-details-main-tab',
  templateUrl: './baptisms-details-main-tab.component.html',
})
export class BaptismsDetailsMainTabComponent {
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
