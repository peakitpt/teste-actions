import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { CatholicDirectoryPriestsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './catholic-directory-priests.actions';
import {
  CatholicDirectoryPriest,
  CatholicDirectoryPriestResponse,
} from '../catholic-directory-priest.model';

@Injectable()
export class CatholicDirectoryPriestsEffects {
  @Effect()
  RequestGetAllCatholicDirectoryPriests = this.actions$.pipe(
    ofType(
      actions.CatholicDirectoryPriestsActionTypes
        .RequestGetAllCatholicDirectoryPriests
    ),
    map(
      (action: actions.SuccessGetAllCatholicDirectoryPriests) => action.payload
    ),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: CatholicDirectoryPriestResponse) =>
            new actions.SuccessGetAllCatholicDirectoryPriests(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCatholicDirectoryPriests(
              new RequestError(
                actions.CatholicDirectoryPriestsActionTypes.RequestGetAllCatholicDirectoryPriests,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetCatholicDirectoryPriest = this.actions$.pipe(
    ofType(
      actions.CatholicDirectoryPriestsActionTypes
        .RequestGetCatholicDirectoryPriest
    ),
    map((action: actions.SuccessGetCatholicDirectoryPriest) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map(
          (response: CatholicDirectoryPriest) =>
            new actions.SuccessGetCatholicDirectoryPriest(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCatholicDirectoryPriests(
              new RequestError(
                actions.CatholicDirectoryPriestsActionTypes.RequestGetCatholicDirectoryPriest,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostCatholicDirectoryPriest = this.actions$.pipe(
    ofType(
      actions.CatholicDirectoryPriestsActionTypes
        .RequestPostCatholicDirectoryPriest
    ),
    map((action: actions.SuccessPostCatholicDirectoryPriest) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map(
          (response) => new actions.SuccessPostCatholicDirectoryPriest(response)
        ),
        catchError((error) => {
          return of(
            new actions.RequestFailCatholicDirectoryPriests(
              new RequestError(
                actions.CatholicDirectoryPriestsActionTypes.RequestPostCatholicDirectoryPriest,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutCatholicDirectoryPriest = this.actions$.pipe(
    ofType(
      actions.CatholicDirectoryPriestsActionTypes
        .RequestPutCatholicDirectoryPriest
    ),
    map((action: actions.SuccessPutCatholicDirectoryPriest) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map(
          (response) => new actions.SuccessPutCatholicDirectoryPriest(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCatholicDirectoryPriests(
              new RequestError(
                actions.CatholicDirectoryPriestsActionTypes.RequestPutCatholicDirectoryPriest,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteCatholicDirectoryPriest = this.actions$.pipe(
    ofType(
      actions.CatholicDirectoryPriestsActionTypes
        .RequestDeleteCatholicDirectoryPriest
    ),
    map(
      (action: actions.SuccessDeleteCatholicDirectoryPriest) => action.payload
    ),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map(
          (response) =>
            new actions.SuccessDeleteCatholicDirectoryPriest(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCatholicDirectoryPriests(
              new RequestError(
                actions.CatholicDirectoryPriestsActionTypes.RequestDeleteCatholicDirectoryPriest,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteCatholicDirectoryPriests = this.actions$.pipe(
  //   ofType(actions.CatholicDirectoryPriestsActionTypes.RequestBulkDeleteCatholicDirectoryPriests),
  //   map((action: actions.SuccessBulkDeleteCatholicDirectoryPriests) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteCatholicDirectoryPriests(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailCatholicDirectoryPriests(
  //             new RequestError(
  //               actions.CatholicDirectoryPriestsActionTypes.RequestBulkDeleteCatholicDirectoryPriests,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyCatholicDirectoryPriests = this.actions$.pipe(
    ofType(
      actions.CatholicDirectoryPriestsActionTypes
        .RequestGetEntirelyCatholicDirectoryPriests
    ),
    map(
      (action: actions.SuccessGetEntirelyCatholicDirectoryPriests) =>
        action.payload
    ),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: CatholicDirectoryPriestResponse) =>
            new actions.SuccessGetEntirelyCatholicDirectoryPriests(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCatholicDirectoryPriests(
              new RequestError(
                actions.CatholicDirectoryPriestsActionTypes.RequestGetEntirelyCatholicDirectoryPriests,
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
    private service: CatholicDirectoryPriestsService
  ) {}
}
