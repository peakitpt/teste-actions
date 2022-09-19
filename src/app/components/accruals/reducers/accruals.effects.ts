import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { AccrualsAccrualsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './accruals.actions';
import { Accrual, AccrualResponse } from '../accrual.model';

@Injectable()
export class AccrualsEffects {
  @Effect()
  RequestGetAllAccruals = this.actions$.pipe(
    ofType(actions.AccrualsActionTypes.RequestGetAllAccruals),
    map((action: actions.SuccessGetAllAccruals) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: AccrualResponse) =>
            new actions.SuccessGetAllAccruals(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailAccruals(
              new RequestError(
                actions.AccrualsActionTypes.RequestGetAllAccruals,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetAccrual = this.actions$.pipe(
    ofType(actions.AccrualsActionTypes.RequestGetAccrual),
    map((action: actions.SuccessGetAccrual) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map((response: Accrual) => new actions.SuccessGetAccrual(response)),
        catchError((error) =>
          of(
            new actions.RequestFailAccruals(
              new RequestError(
                actions.AccrualsActionTypes.RequestGetAccrual,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostAccrual = this.actions$.pipe(
    ofType(actions.AccrualsActionTypes.RequestPostAccrual),
    map((action: actions.SuccessPostAccrual) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPostAccrual(response)),
        catchError((error) => {
          return of(
            new actions.RequestFailAccruals(
              new RequestError(
                actions.AccrualsActionTypes.RequestPostAccrual,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutAccrual = this.actions$.pipe(
    ofType(actions.AccrualsActionTypes.RequestPutAccrual),
    map((action: actions.SuccessPutAccrual) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPutAccrual(response)),
        catchError((error) =>
          of(
            new actions.RequestFailAccruals(
              new RequestError(
                actions.AccrualsActionTypes.RequestPutAccrual,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteAccrual = this.actions$.pipe(
    ofType(actions.AccrualsActionTypes.RequestDeleteAccrual),
    map((action: actions.SuccessDeleteAccrual) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDeleteAccrual(response)),
        catchError((error) =>
          of(
            new actions.RequestFailAccruals(
              new RequestError(
                actions.AccrualsActionTypes.RequestDeleteAccrual,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteAccruals = this.actions$.pipe(
  //   ofType(actions.AccrualsActionTypes.RequestBulkDeleteAccruals),
  //   map((action: actions.SuccessBulkDeleteAccruals) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteAccruals(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailAccruals(
  //             new RequestError(
  //               actions.AccrualsActionTypes.RequestBulkDeleteAccruals,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyAccruals = this.actions$.pipe(
    ofType(actions.AccrualsActionTypes.RequestGetEntirelyAccruals),
    map((action: actions.SuccessGetEntirelyAccruals) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: AccrualResponse) =>
            new actions.SuccessGetEntirelyAccruals(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailAccruals(
              new RequestError(
                actions.AccrualsActionTypes.RequestGetEntirelyAccruals,
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
    ofType(actions.AccrualsActionTypes.RequestGetNew),
    map((action: actions.SuccessGetNew) => action.payload),
    switchMap(() => {
      return this.service.getNew().pipe(
        map((response: Accrual) => new actions.SuccessGetNew(response)),
        catchError((error) =>
          of(
            new actions.RequestFailAccruals(
              new RequestError(actions.AccrualsActionTypes.RequestGetNew, error)
            )
          )
        )
      );
    })
  );

  constructor(
    private actions$: Actions,
    private service: AccrualsAccrualsService
  ) {}
}
