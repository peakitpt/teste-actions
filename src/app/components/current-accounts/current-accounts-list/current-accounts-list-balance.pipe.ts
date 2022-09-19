import { Pipe, PipeTransform } from '@angular/core';
import { I18NextPipe } from 'angular-i18next';
import { CurrentAccount, CurrentAccountLine } from '../current-account.model';

@Pipe({
  name: 'currentAccountsListBalancePipe',
})
export class CurrentAccountsListBalancePipe implements PipeTransform {
  constructor(public i18nextPipe: I18NextPipe) {}

  transform(data: CurrentAccount): number {
    let balance: number = 0;

    data.current_accounts_lines.forEach((line: CurrentAccountLine) => {
      if (line.documents_status_id < 3) {
        const tempVirtualAmmount =
          +line.pending_amount - +line.amount_to_receive;
        balance += +tempVirtualAmmount;
      }
    });

    return balance;
  }
}
