import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import {
  CurrentAccountsReceiptsService,
  CurrentAccountsService,
} from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './current-accounts.actions';
import {
  CurrentAccount,
  CurrentAccountResponse,
} from '../current-account.model';

@Injectable()
export class CurrentAccountsEffects {
  @Effect()
  RequestGetAllCurrentAccounts = this.actions$.pipe(
    ofType(actions.CurrentAccountsActionTypes.RequestGetAllCurrentAccounts),
    map((action: actions.SuccessGetAllCurrentAccounts) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: CurrentAccountResponse) =>
            new actions.SuccessGetAllCurrentAccounts(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCurrentAccounts(
              new RequestError(
                actions.CurrentAccountsActionTypes.RequestGetAllCurrentAccounts,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetCurrentAccount = this.actions$.pipe(
    ofType(actions.CurrentAccountsActionTypes.RequestGetCurrentAccount),
    map((action: actions.SuccessGetCurrentAccount) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map(
          (response: CurrentAccount) =>
            new actions.SuccessGetCurrentAccount(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCurrentAccounts(
              new RequestError(
                actions.CurrentAccountsActionTypes.RequestGetCurrentAccount,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostCurrentAccount = this.actions$.pipe(
    ofType(actions.CurrentAccountsActionTypes.RequestPostCurrentAccount),
    map((action: actions.SuccessPostCurrentAccount) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPostCurrentAccount(response)),
        catchError((error) => {
          return of(
            new actions.RequestFailCurrentAccounts(
              new RequestError(
                actions.CurrentAccountsActionTypes.RequestPostCurrentAccount,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutCurrentAccount = this.actions$.pipe(
    ofType(actions.CurrentAccountsActionTypes.RequestPutCurrentAccount),
    map((action: actions.SuccessPutCurrentAccount) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPutCurrentAccount(response)),
        catchError((error) =>
          of(
            new actions.RequestFailCurrentAccounts(
              new RequestError(
                actions.CurrentAccountsActionTypes.RequestPutCurrentAccount,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteCurrentAccount = this.actions$.pipe(
    ofType(actions.CurrentAccountsActionTypes.RequestDeleteCurrentAccount),
    map((action: actions.SuccessDeleteCurrentAccount) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDeleteCurrentAccount(response)),
        catchError((error) =>
          of(
            new actions.RequestFailCurrentAccounts(
              new RequestError(
                actions.CurrentAccountsActionTypes.RequestDeleteCurrentAccount,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteCurrentAccounts = this.actions$.pipe(
  //   ofType(actions.CurrentAccountsActionTypes.RequestBulkDeleteCurrentAccounts),
  //   map((action: actions.SuccessBulkDeleteCurrentAccounts) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteCurrentAccounts(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailCurrentAccounts(
  //             new RequestError(
  //               actions.CurrentAccountsActionTypes.RequestBulkDeleteCurrentAccounts,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyCurrentAccounts = this.actions$.pipe(
    ofType(
      actions.CurrentAccountsActionTypes.RequestGetEntirelyCurrentAccounts
    ),
    map((action: actions.SuccessGetEntirelyCurrentAccounts) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: CurrentAccountResponse) =>
            new actions.SuccessGetEntirelyCurrentAccounts(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCurrentAccounts(
              new RequestError(
                actions.CurrentAccountsActionTypes.RequestGetEntirelyCurrentAccounts,
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
    ofType(actions.CurrentAccountsActionTypes.RequestGetNew),
    map((action: actions.SuccessGetNew) => action.payload),
    switchMap(() => {
      return this.service.getNew().pipe(
        map((response: CurrentAccount) => new actions.SuccessGetNew(response)),
        catchError((error) =>
          of(
            new actions.RequestFailCurrentAccounts(
              new RequestError(
                actions.CurrentAccountsActionTypes.RequestGetNew,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetCurrentAccountsReceipts = this.actions$.pipe(
    ofType(
      actions.CurrentAccountsActionTypes.RequestGetCurrentAccountsReceipts
    ),
    map((action: actions.SuccessGetCurrentAccountsReceipts) => action.payload),
    switchMap((payload: any) => {
      return this.service
        .getCurrentAccountsReceipts(payload.id, payload.payload)
        .pipe(
          map(
            (response: any) =>
              new actions.SuccessGetCurrentAccountsReceipts(response)
          ),
          catchError((error) =>
            of(
              new actions.RequestFailCurrentAccounts(
                new RequestError(
                  actions.CurrentAccountsActionTypes.RequestGetCurrentAccountsReceipts,
                  error
                )
              )
            )
          )
        );
    })
  );

  @Effect()
  RequestGetCurrentAccountsReceipt = this.actions$.pipe(
    ofType(actions.CurrentAccountsActionTypes.RequestGetCurrentAccountsReceipt),
    map((action: actions.SuccessGetCurrentAccountsReceipt) => action.payload),
    switchMap((payload: any) => {
      return this.currentAccountsReceiptsService.getOne(+payload).pipe(
        map(
          (response: any) =>
            new actions.SuccessGetCurrentAccountsReceipt(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCurrentAccounts(
              new RequestError(
                actions.CurrentAccountsActionTypes.RequestGetCurrentAccountsReceipts,
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
    private service: CurrentAccountsService,
    private currentAccountsReceiptsService: CurrentAccountsReceiptsService
  ) {}
}
