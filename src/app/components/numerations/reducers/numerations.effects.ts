import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { NumerationsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './numerations.actions';
import { Numeration, NumerationResponse } from '../numeration.model';

@Injectable()
export class NumerationsEffects {
  @Effect()
  RequestGetAllNumerations = this.actions$.pipe(
    ofType(actions.NumerationsActionTypes.RequestGetAllNumerations),
    map((action: actions.SuccessGetAllNumerations) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: NumerationResponse) =>
            new actions.SuccessGetAllNumerations(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailNumerations(
              new RequestError(
                actions.NumerationsActionTypes.RequestGetAllNumerations,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetNumeration = this.actions$.pipe(
    ofType(actions.NumerationsActionTypes.RequestGetNumeration),
    map((action: actions.SuccessGetNumeration) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map(
          (response: Numeration) => new actions.SuccessGetNumeration(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailNumerations(
              new RequestError(
                actions.NumerationsActionTypes.RequestGetNumeration,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostNumeration = this.actions$.pipe(
    ofType(actions.NumerationsActionTypes.RequestPostNumeration),
    map((action: actions.SuccessPostNumeration) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPostNumeration(response)),
        catchError((error) => {
          return of(
            new actions.RequestFailNumerations(
              new RequestError(
                actions.NumerationsActionTypes.RequestPostNumeration,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutNumeration = this.actions$.pipe(
    ofType(actions.NumerationsActionTypes.RequestPutNumeration),
    map((action: actions.SuccessPutNumeration) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPutNumeration(response)),
        catchError((error) =>
          of(
            new actions.RequestFailNumerations(
              new RequestError(
                actions.NumerationsActionTypes.RequestPutNumeration,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteNumeration = this.actions$.pipe(
    ofType(actions.NumerationsActionTypes.RequestDeleteNumeration),
    map((action: actions.SuccessDeleteNumeration) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDeleteNumeration(response)),
        catchError((error) =>
          of(
            new actions.RequestFailNumerations(
              new RequestError(
                actions.NumerationsActionTypes.RequestDeleteNumeration,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteNumerations = this.actions$.pipe(
  //   ofType(actions.NumerationsActionTypes.RequestBulkDeleteNumerations),
  //   map((action: actions.SuccessBulkDeleteNumerations) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteNumerations(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailNumerations(
  //             new RequestError(
  //               actions.NumerationsActionTypes.RequestBulkDeleteNumerations,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyNumerations = this.actions$.pipe(
    ofType(actions.NumerationsActionTypes.RequestGetEntirelyNumerations),
    map((action: actions.SuccessGetEntirelyNumerations) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: NumerationResponse) =>
            new actions.SuccessGetEntirelyNumerations(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailNumerations(
              new RequestError(
                actions.NumerationsActionTypes.RequestGetEntirelyNumerations,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetNewNumeration = this.actions$.pipe(
    ofType(actions.NumerationsActionTypes.RequestGetNewNumeration),
    map((action: actions.SuccessGetNewNumeration) => action.payload),
    switchMap(() => {
      return this.service.getNew().pipe(
        map(
          (response: Numeration) =>
            new actions.SuccessGetNewNumeration(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailNumerations(
              new RequestError(
                actions.NumerationsActionTypes.RequestGetNewNumeration,
                error
              )
            )
          )
        )
      );
    })
  );

  constructor(private actions$: Actions, private service: NumerationsService) {}
}
