import { Pipe, PipeTransform } from '@angular/core';
import { I18NextPipe } from 'angular-i18next';

@Pipe({
  name: 'reportsRowMenuPipe',
})
export class ReportsRowMenuPipe implements PipeTransform {
  constructor(public i18nextPipe: I18NextPipe) {}

  transform(data: any): any {
    const menu = [
      {
        name: this.i18nextPipe.transform('translation:action.duplicate'),
        value: 'duplicate',
        icon: 'file_copy',
      },
    ];
    if (
      data.reportings_permission.entity_id ===
      +localStorage.getItem('subscriptionId')
    ) {
      menu.push({
        name: this.i18nextPipe.transform('translation:action.delete'),
        value: 'delete',
        icon: 'delete',
      });
    }
    menu.push({
      name: this.i18nextPipe.transform(`reports:action.permissions`),
      value: 'permissions',
      icon: 'lock_open',
    });
    return menu;
  }
}
