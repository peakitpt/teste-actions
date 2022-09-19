import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { AccountingTransactionDocumentTypesService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './accounting-transaction-document-types.actions';
import {
  AccountingTransactionDocumentType,
  AccountingTransactionDocumentTypeResponse,
} from '../accounting-transaction-document-type.model';

@Injectable()
export class AccountingTransactionDocumentTypesEffects {
  @Effect()
  RequestGetAllAccountingTransactionDocumentTypes = this.actions$.pipe(
    ofType(
      actions.AccountingTransactionDocumentTypesActionTypes
        .RequestGetAllAccountingTransactionDocumentTypes
    ),
    map(
      (action: actions.SuccessGetAllAccountingTransactionDocumentTypes) =>
        action.payload
    ),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: AccountingTransactionDocumentTypeResponse) =>
            new actions.SuccessGetAllAccountingTransactionDocumentTypes(
              response
            )
        ),
        catchError((error) =>
          of(
            new actions.RequestFailAccountingTransactionDocumentTypes(
              new RequestError(
                actions.AccountingTransactionDocumentTypesActionTypes.RequestGetAllAccountingTransactionDocumentTypes,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetAccountingTransactionDocumentType = this.actions$.pipe(
    ofType(
      actions.AccountingTransactionDocumentTypesActionTypes
        .RequestGetAccountingTransactionDocumentType
    ),
    map(
      (action: actions.SuccessGetAccountingTransactionDocumentType) =>
        action.payload
    ),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map(
          (response: AccountingTransactionDocumentType) =>
            new actions.SuccessGetAccountingTransactionDocumentType(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailAccountingTransactionDocumentTypes(
              new RequestError(
                actions.AccountingTransactionDocumentTypesActionTypes.RequestGetAccountingTransactionDocumentType,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostAccountingTransactionDocumentType = this.actions$.pipe(
    ofType(
      actions.AccountingTransactionDocumentTypesActionTypes
        .RequestPostAccountingTransactionDocumentType
    ),
    map(
      (action: actions.SuccessPostAccountingTransactionDocumentType) =>
        action.payload
    ),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map(
          (response) =>
            new actions.SuccessPostAccountingTransactionDocumentType(response)
        ),
        catchError((error) => {
          return of(
            new actions.RequestFailAccountingTransactionDocumentTypes(
              new RequestError(
                actions.AccountingTransactionDocumentTypesActionTypes.RequestPostAccountingTransactionDocumentType,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutAccountingTransactionDocumentType = this.actions$.pipe(
    ofType(
      actions.AccountingTransactionDocumentTypesActionTypes
        .RequestPutAccountingTransactionDocumentType
    ),
    map(
      (action: actions.SuccessPutAccountingTransactionDocumentType) =>
        action.payload
    ),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map(
          (response) =>
            new actions.SuccessPutAccountingTransactionDocumentType(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailAccountingTransactionDocumentTypes(
              new RequestError(
                actions.AccountingTransactionDocumentTypesActionTypes.RequestPutAccountingTransactionDocumentType,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteAccountingTransactionDocumentType = this.actions$.pipe(
    ofType(
      actions.AccountingTransactionDocumentTypesActionTypes
        .RequestDeleteAccountingTransactionDocumentType
    ),
    map(
      (action: actions.SuccessDeleteAccountingTransactionDocumentType) =>
        action.payload
    ),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map(
          (response) =>
            new actions.SuccessDeleteAccountingTransactionDocumentType(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailAccountingTransactionDocumentTypes(
              new RequestError(
                actions.AccountingTransactionDocumentTypesActionTypes.RequestDeleteAccountingTransactionDocumentType,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteAccountingTransactionDocumentTypes = this.actions$.pipe(
  //   ofType(actions.AccountingTransactionDocumentTypesActionTypes.RequestBulkDeleteAccountingTransactionDocumentTypes),
  //   map((action: actions.SuccessBulkDeleteAccountingTransactionDocumentTypes) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteAccountingTransactionDocumentTypes(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailAccountingTransactionDocumentTypes(
  //             new RequestError(
  //               actions.AccountingTransactionDocumentTypesActionTypes.RequestBulkDeleteAccountingTransactionDocumentTypes,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyAccountingTransactionDocumentTypes = this.actions$.pipe(
    ofType(
      actions.AccountingTransactionDocumentTypesActionTypes
        .RequestGetEntirelyAccountingTransactionDocumentTypes
    ),
    map(
      (action: actions.SuccessGetEntirelyAccountingTransactionDocumentTypes) =>
        action.payload
    ),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: AccountingTransactionDocumentTypeResponse) =>
            new actions.SuccessGetEntirelyAccountingTransactionDocumentTypes(
              response
            )
        ),
        catchError((error) =>
          of(
            new actions.RequestFailAccountingTransactionDocumentTypes(
              new RequestError(
                actions.AccountingTransactionDocumentTypesActionTypes.RequestGetEntirelyAccountingTransactionDocumentTypes,
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
    ofType(actions.AccountingTransactionDocumentTypesActionTypes.RequestGetNew),
    map((action: actions.SuccessGetNew) => action.payload),
    switchMap(() => {
      return this.service.getNew().pipe(
        map(
          (response: AccountingTransactionDocumentType) =>
            new actions.SuccessGetNew(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailAccountingTransactionDocumentTypes(
              new RequestError(
                actions.AccountingTransactionDocumentTypesActionTypes.RequestGetNew,
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
    private service: AccountingTransactionDocumentTypesService
  ) {}
}
