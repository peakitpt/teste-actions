import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { TreasuryLocationsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './treasury-locations.actions';
import {
  TreasuryLocation,
  TreasuryLocationResponse,
} from '../treasury-location.model';

@Injectable()
export class TreasuryLocationsEffects {
  @Effect()
  RequestGetAllTreasuryLocations = this.actions$.pipe(
    ofType(actions.TreasuryLocationsActionTypes.RequestGetAllTreasuryLocations),
    map((action: actions.SuccessGetAllTreasuryLocations) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: TreasuryLocationResponse) =>
            new actions.SuccessGetAllTreasuryLocations(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailTreasuryLocations(
              new RequestError(
                actions.TreasuryLocationsActionTypes.RequestGetAllTreasuryLocations,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetTreasuryLocation = this.actions$.pipe(
    ofType(actions.TreasuryLocationsActionTypes.RequestGetTreasuryLocation),
    map((action: actions.SuccessGetTreasuryLocation) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map(
          (response: TreasuryLocation) =>
            new actions.SuccessGetTreasuryLocation(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailTreasuryLocations(
              new RequestError(
                actions.TreasuryLocationsActionTypes.RequestGetTreasuryLocation,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostTreasuryLocation = this.actions$.pipe(
    ofType(actions.TreasuryLocationsActionTypes.RequestPostTreasuryLocation),
    map((action: actions.SuccessPostTreasuryLocation) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPostTreasuryLocation(response)),
        catchError((error) => {
          return of(
            new actions.RequestFailTreasuryLocations(
              new RequestError(
                actions.TreasuryLocationsActionTypes.RequestPostTreasuryLocation,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutTreasuryLocation = this.actions$.pipe(
    ofType(actions.TreasuryLocationsActionTypes.RequestPutTreasuryLocation),
    map((action: actions.SuccessPutTreasuryLocation) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPutTreasuryLocation(response)),
        catchError((error) =>
          of(
            new actions.RequestFailTreasuryLocations(
              new RequestError(
                actions.TreasuryLocationsActionTypes.RequestPutTreasuryLocation,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteTreasuryLocation = this.actions$.pipe(
    ofType(actions.TreasuryLocationsActionTypes.RequestDeleteTreasuryLocation),
    map((action: actions.SuccessDeleteTreasuryLocation) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDeleteTreasuryLocation(response)),
        catchError((error) =>
          of(
            new actions.RequestFailTreasuryLocations(
              new RequestError(
                actions.TreasuryLocationsActionTypes.RequestDeleteTreasuryLocation,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteTreasuryLocations = this.actions$.pipe(
  //   ofType(actions.TreasuryLocationsActionTypes.RequestBulkDeleteTreasuryLocations),
  //   map((action: actions.SuccessBulkDeleteTreasuryLocations) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteTreasuryLocations(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailTreasuryLocations(
  //             new RequestError(
  //               actions.TreasuryLocationsActionTypes.RequestBulkDeleteTreasuryLocations,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyTreasuryLocations = this.actions$.pipe(
    ofType(
      actions.TreasuryLocationsActionTypes.RequestGetEntirelyTreasuryLocations
    ),
    map(
      (action: actions.SuccessGetEntirelyTreasuryLocations) => action.payload
    ),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: TreasuryLocationResponse) =>
            new actions.SuccessGetEntirelyTreasuryLocations(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailTreasuryLocations(
              new RequestError(
                actions.TreasuryLocationsActionTypes.RequestGetEntirelyTreasuryLocations,
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
    private service: TreasuryLocationsService
  ) {}
}
