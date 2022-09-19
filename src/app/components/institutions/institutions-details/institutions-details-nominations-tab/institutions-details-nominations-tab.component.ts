import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Institution } from '../../institution.model';

@Component({
  selector: 'kyr-institutions-details-nominations-tab',
  templateUrl: './institutions-details-nominations-tab.component.html',
})
export class InstitutionsDetailsNominationsTabComponent {
  @Input() modulePath: string;
  @Input() model: Institution;

  openDetails(modulePath: string, id: number, railsApp = false) {
    if (railsApp) {
      window.open(`${environment.railsAppUrl}/${modulePath}/${id}`, '_blank');
    } else {
      window.open(`${modulePath}/${id}/details`, '_blank');
    }
  }
}
