export interface AccountingBalanceSheetResponse {
  results: AccountingBalanceSheet[];
  total: number;
  grand_total: number;
  aggregates: AccountingBalanceSheetAggregate;
  groups: any[];
  page: number;
  limit: number;
}

export interface AccountingBalanceSheet {
  account_description: string;
  account_id: string;
  accounting_chart_account_id: number;
  accounting_exercise_id: number;
  company_id: number;
  created_at: string;
  grouping_category: string;
  id: number;
  period: number | string;
  period_aggregated_balance: number | string;
  period_aggregated_credit_amount: number | string;
  period_aggregated_debit_amount: number | string;
  period_balance: number | string;
  period_total_credit: number | string;
  period_total_debit: number | string;
  recalculated_at: string;
  recalculated_by_user_id: number;
  updated_at: number;
  year: string;
}

export interface AccountingBalanceSheetAggregate {
  period_aggregated_balance: PeriodAggregatedBalance;
  period_aggregated_credit_amount: PeriodAggregatedCreditAmount;
  period_aggregated_debit_amount: PeriodAggregatedDebitAmount;
  period_total_credit: PeriodTotalCredit;
  period_total_debit: PeriodTotalDebit;
}

export interface PeriodAggregatedBalance {
  sum: number | string;
}
export interface PeriodAggregatedCreditAmount {
  sum: number | string;
}
export interface PeriodAggregatedDebitAmount {
  sum: number | string;
}
export interface PeriodTotalCredit {
  sum: number | string;
}
export interface PeriodTotalDebit {
  sum: number | string;
}
