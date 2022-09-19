import { Pipe, PipeTransform } from '@angular/core';
import { CurrentAccountLine } from '../current-account.model';

@Pipe({
  name: 'filterPending',
  pure: false,
})
export class FilterPendingPipe implements PipeTransform {
  transform(data: CurrentAccountLine[]): CurrentAccountLine[] {
    const res: CurrentAccountLine[] = [];

    data.forEach((elem: CurrentAccountLine) => {
      if (elem.documents_status_id < 3) {
        res.push(elem);
      }
    });
    return res;
  }
}
