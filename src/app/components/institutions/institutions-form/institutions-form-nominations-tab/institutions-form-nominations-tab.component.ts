import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TableDataSource } from '@peakitpt/ui-material';
import { environment } from 'src/environments/environment';
import { Institution } from '../../institution.model';
import { I18NextPipe } from 'angular-i18next';

@Component({
  selector: 'kyr-institutions-form-nominations-tab',
  templateUrl: './institutions-form-nominations-tab.component.html',
})
export class InstitutionsFormNominationsTabComponent {
  @Input() modulePath: string;
  @Input() model: Institution;
  @Input() nominationsDS;
  @Input() nominationsColumns;

  openDetails(modulePath: string, id: number, railsApp = false) {
    if (railsApp) {
      window.open(`${environment.railsAppUrl}/${modulePath}/${id}`, '_blank');
    } else {
      window.open(`${modulePath}/${id}/details`, '_blank');
    }
  }
}
