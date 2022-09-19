import { OnInit } from '@angular/core';
import { Component, Input } from '@angular/core';
import { I18NextPipe } from 'angular-i18next';
import { environment } from 'src/environments/environment';
import { CuriaWedding } from '../../curia-wedding.model';

@Component({
  selector: 'kyr-curia-weddings-details-mod2-tab',
  templateUrl: './curia-weddings-details-mod2-tab.component.html',
})
export class CuriaWeddingsDetailsMod2TabComponent implements OnInit {
  @Input() modulePath: string;
  @Input() model: CuriaWedding;

  groomGendersOptions = {};

  constructor(public i18nextPipe: I18NextPipe) {}

  ngOnInit() {
    this.groomGendersOptions = {
      true: this.i18nextPipe.transform(
        `${this.modulePath}:model.options.grooms_genders.groom`
      ),
      false: this.i18nextPipe.transform(
        `${this.modulePath}:model.options.grooms_genders.bride`
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
