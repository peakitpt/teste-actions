import { Component, Input, ViewEncapsulation } from '@angular/core';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';
import { EntityPerson } from '../../person.model';

@Component({
  selector: 'kyr-persons-details-christian-life-tab',
  templateUrl: './persons-details-christian-life-tab.component.html',
  styleUrls: ['./persons-details-christian-life-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PersonsDetailsChristianLifeTabComponent {
  @Input() modulePath: string;
  @Input() model: EntityPerson;

  constructor(
    public sharedModule: SharedModule,
    public i18nextPipe: I18NextPipe
  ) {}

  openDetails(modulePath: string, id: number) {
    window.open(`${modulePath}/${id}/details`, '_blank');
  }

  getOftenEucharistLabel(value: string): string {
    const byValue = this.sharedModule
      .getOftenEucharists()
      .find((o) => o.value === value);
    const byLabel = this.sharedModule
      .getOftenEucharists()
      .find((o) => o.label === value);
    return byValue
      ? byValue.label
      : byLabel
      ? byLabel.label
      : this.fixOftenEucharistLabel(value);
  }

  getCatechismYearLabel(value: number): string {
    return this.sharedModule.getCatechismYears().find((o) => o.value === value)
      .label;
  }

  getLivesWithLabel(value: string): string {
    return this.sharedModule.getLivesWith().find((o) => o.value === value)
      .label;
  }

  fixOftenEucharistLabel(value: string): string {
    switch (value) {
      case 'Diária': // pt
      case 'Diaria': // es
      case 'Daily': // en
        return this.i18nextPipe.transform('translation:frequency.daily');
      case 'Semanal': // pt / es
      case 'Weekly':
        return this.i18nextPipe.transform('translation:frequency.weekly');
      case 'Quinzenal': // pt
      case 'Quincenal': // es
      case 'Biweekly': // en
        return this.i18nextPipe.transform('translation:frequency.quarterly');
      case 'Mensal': // pt
      case 'Mensual': // es
      case 'Monthly': // en
        return this.i18nextPipe.transform('translation:frequency.monthly');
      case 'Anual': // pt / es
      case 'Yearly': // en
        return this.i18nextPipe.transform('translation:frequency.yearly');
      default:
        return '----';
    }
  }
}
