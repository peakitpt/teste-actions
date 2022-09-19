import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ReportsGroupersService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './reports-groupers.actions';
import {
  ReportsGrouper,
  ReportsGrouperResponse,
} from '../reports-grouper.model';

@Injectable()
export class ReportsGroupersEffects {
  @Effect()
  RequestGetAllReportsGroupers = this.actions$.pipe(
    ofType(actions.ReportsGroupersActionTypes.RequestGetAllReportsGroupers),
    map((action: actions.SuccessGetAllReportsGroupers) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: ReportsGrouperResponse) =>
            new actions.SuccessGetAllReportsGroupers(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailReportsGroupers(
              new RequestError(
                actions.ReportsGroupersActionTypes.RequestGetAllReportsGroupers,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetReportsGrouper = this.actions$.pipe(
    ofType(actions.ReportsGroupersActionTypes.RequestGetReportsGrouper),
    map((action: actions.SuccessGetReportsGrouper) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map(
          (response: ReportsGrouper) =>
            new actions.SuccessGetReportsGrouper(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailReportsGroupers(
              new RequestError(
                actions.ReportsGroupersActionTypes.RequestGetReportsGrouper,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostReportsGrouper = this.actions$.pipe(
    ofType(actions.ReportsGroupersActionTypes.RequestPostReportsGrouper),
    map((action: actions.SuccessPostReportsGrouper) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPostReportsGrouper(response)),
        catchError((error) => {
          return of(
            new actions.RequestFailReportsGroupers(
              new RequestError(
                actions.ReportsGroupersActionTypes.RequestPostReportsGrouper,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutReportsGrouper = this.actions$.pipe(
    ofType(actions.ReportsGroupersActionTypes.RequestPutReportsGrouper),
    map((action: actions.SuccessPutReportsGrouper) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPutReportsGrouper(response)),
        catchError((error) =>
          of(
            new actions.RequestFailReportsGroupers(
              new RequestError(
                actions.ReportsGroupersActionTypes.RequestPutReportsGrouper,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteReportsGrouper = this.actions$.pipe(
    ofType(actions.ReportsGroupersActionTypes.RequestDeleteReportsGrouper),
    map((action: actions.SuccessDeleteReportsGrouper) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDeleteReportsGrouper(response)),
        catchError((error) =>
          of(
            new actions.RequestFailReportsGroupers(
              new RequestError(
                actions.ReportsGroupersActionTypes.RequestDeleteReportsGrouper,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteReportsGroupers = this.actions$.pipe(
  //   ofType(actions.ReportsGroupersActionTypes.RequestBulkDeleteReportsGroupers),
  //   map((action: actions.SuccessBulkDeleteReportsGroupers) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteReportsGroupers(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailReportsGroupers(
  //             new RequestError(
  //               actions.ReportsGroupersActionTypes.RequestBulkDeleteReportsGroupers,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyReportsGroupers = this.actions$.pipe(
    ofType(
      actions.ReportsGroupersActionTypes.RequestGetEntirelyReportsGroupers
    ),
    map((action: actions.SuccessGetEntirelyReportsGroupers) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: ReportsGrouperResponse) =>
            new actions.SuccessGetEntirelyReportsGroupers(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailReportsGroupers(
              new RequestError(
                actions.ReportsGroupersActionTypes.RequestGetEntirelyReportsGroupers,
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
    private service: ReportsGroupersService
  ) {}
}
