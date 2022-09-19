import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { CuriaEconomicCouncilsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './curia-economic-councils.actions';
import {
  CuriaEconomicCouncil,
  CuriaEconomicCouncilResponse,
} from '../curia-economic-council.model';

@Injectable()
export class CuriaEconomicCouncilsEffects {
  @Effect()
  RequestGetAllCuriaEconomicCouncils = this.actions$.pipe(
    ofType(
      actions.CuriaEconomicCouncilsActionTypes
        .RequestGetAllCuriaEconomicCouncils
    ),
    map((action: actions.SuccessGetAllCuriaEconomicCouncils) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: CuriaEconomicCouncilResponse) =>
            new actions.SuccessGetAllCuriaEconomicCouncils(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCuriaEconomicCouncils(
              new RequestError(
                actions.CuriaEconomicCouncilsActionTypes.RequestGetAllCuriaEconomicCouncils,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetCuriaEconomicCouncil = this.actions$.pipe(
    ofType(
      actions.CuriaEconomicCouncilsActionTypes.RequestGetCuriaEconomicCouncil
    ),
    map((action: actions.SuccessGetCuriaEconomicCouncil) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map(
          (response: CuriaEconomicCouncil) =>
            new actions.SuccessGetCuriaEconomicCouncil(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCuriaEconomicCouncils(
              new RequestError(
                actions.CuriaEconomicCouncilsActionTypes.RequestGetCuriaEconomicCouncil,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostCuriaEconomicCouncil = this.actions$.pipe(
    ofType(
      actions.CuriaEconomicCouncilsActionTypes.RequestPostCuriaEconomicCouncil
    ),
    map((action: actions.SuccessPostCuriaEconomicCouncil) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map(
          (response) => new actions.SuccessPostCuriaEconomicCouncil(response)
        ),
        catchError((error) => {
          return of(
            new actions.RequestFailCuriaEconomicCouncils(
              new RequestError(
                actions.CuriaEconomicCouncilsActionTypes.RequestPostCuriaEconomicCouncil,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutCuriaEconomicCouncil = this.actions$.pipe(
    ofType(
      actions.CuriaEconomicCouncilsActionTypes.RequestPutCuriaEconomicCouncil
    ),
    map((action: actions.SuccessPutCuriaEconomicCouncil) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPutCuriaEconomicCouncil(response)),
        catchError((error) =>
          of(
            new actions.RequestFailCuriaEconomicCouncils(
              new RequestError(
                actions.CuriaEconomicCouncilsActionTypes.RequestPutCuriaEconomicCouncil,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteCuriaEconomicCouncil = this.actions$.pipe(
    ofType(
      actions.CuriaEconomicCouncilsActionTypes.RequestDeleteCuriaEconomicCouncil
    ),
    map((action: actions.SuccessDeleteCuriaEconomicCouncil) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map(
          (response) => new actions.SuccessDeleteCuriaEconomicCouncil(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCuriaEconomicCouncils(
              new RequestError(
                actions.CuriaEconomicCouncilsActionTypes.RequestDeleteCuriaEconomicCouncil,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteCuriaEconomicCouncils = this.actions$.pipe(
  //   ofType(actions.CuriaEconomicCouncilsActionTypes.RequestBulkDeleteCuriaEconomicCouncils),
  //   map((action: actions.SuccessBulkDeleteCuriaEconomicCouncils) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteCuriaEconomicCouncils(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailCuriaEconomicCouncils(
  //             new RequestError(
  //               actions.CuriaEconomicCouncilsActionTypes.RequestBulkDeleteCuriaEconomicCouncils,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyCuriaEconomicCouncils = this.actions$.pipe(
    ofType(
      actions.CuriaEconomicCouncilsActionTypes
        .RequestGetEntirelyCuriaEconomicCouncils
    ),
    map(
      (action: actions.SuccessGetEntirelyCuriaEconomicCouncils) =>
        action.payload
    ),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: CuriaEconomicCouncilResponse) =>
            new actions.SuccessGetEntirelyCuriaEconomicCouncils(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCuriaEconomicCouncils(
              new RequestError(
                actions.CuriaEconomicCouncilsActionTypes.RequestGetEntirelyCuriaEconomicCouncils,
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
    ofType(actions.CuriaEconomicCouncilsActionTypes.RequestGetNew),
    map((action: actions.SuccessGetNew) => action.payload),
    switchMap(() => {
      return this.service.getNew().pipe(
        map(
          (response: CuriaEconomicCouncil) =>
            new actions.SuccessGetNew(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCuriaEconomicCouncils(
              new RequestError(
                actions.CuriaEconomicCouncilsActionTypes.RequestGetNew,
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
    private service: CuriaEconomicCouncilsService
  ) {}
}
