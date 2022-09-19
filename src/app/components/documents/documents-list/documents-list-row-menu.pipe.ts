import { Pipe, PipeTransform } from '@angular/core';
import { I18NextPipe } from 'angular-i18next';

@Pipe({
  name: 'documentsRowMenuPipe',
})
export class DocumentsRowMenuPipe implements PipeTransform {
  constructor(public i18nextPipe: I18NextPipe) {}

  transform(data: any): any {
    const menu = [
      {
        name: this.i18nextPipe.transform('translation:action.duplicate'),
        value: 'duplicate',
        icon: 'file_copy',
      },
    ];
    if (!data.block_remove) {
      menu.push({
        name: this.i18nextPipe.transform('translation:action.delete'),
        value: 'delete',
        icon: 'delete',
      });
    }
    return menu;
  }
}
