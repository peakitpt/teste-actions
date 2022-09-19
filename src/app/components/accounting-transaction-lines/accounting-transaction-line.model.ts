import { Numeration } from '../numerations/numeration.model';

export interface AccountingTransactionLineResponse {
  results: AccountingTransactionLine[];
  total: number;
  page: number;
  limit: number;
}

export interface AccountingTransactionLine {
  accounting_chart_account_description: string;
  accounting_chart_account_id: number;
  accounting_transaction_id: number;
  credit_amount: string;
  debit_amount: string;
  description: string;
  id: number;
  period: number;
  trans_date: string;
  transaction_id: string;
}
