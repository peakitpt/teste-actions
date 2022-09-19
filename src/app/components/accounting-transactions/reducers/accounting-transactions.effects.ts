import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { AccountingTransactionsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './accounting-transactions.actions';
import {
  AccountingTransaction,
  AccountingTransactionResponse,
} from '../accounting-transaction.model';

@Injectable()
export class AccountingTransactionsEffects {
  @Effect()
  RequestGetAll = this.actions$.pipe(
    ofType(actions.AccountingTransactionsActionTypes.RequestGetAll),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: AccountingTransactionResponse) =>
            new actions.SuccessGetAll(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.AccountingTransactionsActionTypes.RequestGetAll,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetAccountingTransaction = this.actions$.pipe(
    ofType(actions.AccountingTransactionsActionTypes.RequestGet),
    map((action: actions.SuccessGet) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map(
          (response: AccountingTransaction) => new actions.SuccessGet(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.AccountingTransactionsActionTypes.RequestGet,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostAccountingTransaction = this.actions$.pipe(
    ofType(actions.AccountingTransactionsActionTypes.RequestPost),
    map((action: actions.SuccessPost) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response: any) => new actions.SuccessPost(response)),
        catchError((error) => {
          return of(
            new actions.RequestFail(
              new RequestError(
                actions.AccountingTransactionsActionTypes.RequestPost,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutAccountingTransaction = this.actions$.pipe(
    ofType(actions.AccountingTransactionsActionTypes.RequestPut),
    map((action: actions.SuccessPut) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response: any) => new actions.SuccessPut(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.AccountingTransactionsActionTypes.RequestPut,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteAccountingTransaction = this.actions$.pipe(
    ofType(actions.AccountingTransactionsActionTypes.RequestDelete),
    map((action: actions.SuccessDelete) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response: any) => new actions.SuccessDelete(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.AccountingTransactionsActionTypes.RequestDelete,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDelete = this.actions$.pipe(
  //   ofType(actions.AccountingTransactionsActionTypes.RequestBulkDelete),
  //   map((action: actions.SuccessBulkDelete) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDelete(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFail(
  //             new RequestError(
  //               actions.AccountingTransactionsActionTypes.RequestBulkDelete,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirely = this.actions$.pipe(
    ofType(actions.AccountingTransactionsActionTypes.RequestGetEntirely),
    map((action: actions.SuccessGetEntirely) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: AccountingTransactionResponse) =>
            new actions.SuccessGetEntirely(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.AccountingTransactionsActionTypes.RequestGetEntirely,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetNew = this.actions$.pipe(
    ofType(actions.AccountingTransactionsActionTypes.RequestGetNew),
    map((action: actions.SuccessGetNew) => action.payload),
    switchMap(() => {
      return this.service.getNew().pipe(
        map(
          (response: AccountingTransaction) =>
            new actions.SuccessGetNew(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.AccountingTransactionsActionTypes.RequestGetNew,
                error
              )
            )
          )
        )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private service: AccountingTransactionsService
  ) {}
}
