import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { PastoralAgentsTypesService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './pastoral-agents-types.actions';
import {
  PastoralAgentsType,
  PastoralAgentsTypeResponse
} from '../pastoral-agents-type.model';

@Injectable()
export class PastoralAgentsTypesEffects {
  @Effect()
  RequestGetAllPastoralAgentsTypes = this.actions$.pipe(
    ofType(
      actions.PastoralAgentsTypesActionTypes.RequestGetAllPastoralAgentsTypes
    ),
    map((action: actions.SuccessGetAllPastoralAgentsTypes) => action.payload),
    switchMap(payload => {
      return this.service.getAll(payload).pipe(
        map(
          (response: PastoralAgentsTypeResponse) =>
            new actions.SuccessGetAllPastoralAgentsTypes(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFailPastoralAgentsTypes(
              new RequestError(
                actions.PastoralAgentsTypesActionTypes.RequestGetAllPastoralAgentsTypes,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetPastoralAgentsType = this.actions$.pipe(
    ofType(actions.PastoralAgentsTypesActionTypes.RequestGetPastoralAgentsType),
    map((action: actions.SuccessGetPastoralAgentsType) => action.payload),
    switchMap(payload => {
      return this.service.getOne(+payload).pipe(
        map(
          (response: PastoralAgentsType) =>
            new actions.SuccessGetPastoralAgentsType(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFailPastoralAgentsTypes(
              new RequestError(
                actions.PastoralAgentsTypesActionTypes.RequestGetPastoralAgentsType,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostPastoralAgentsType = this.actions$.pipe(
    ofType(
      actions.PastoralAgentsTypesActionTypes.RequestPostPastoralAgentsType
    ),
    map((action: actions.SuccessPostPastoralAgentsType) => action.payload),
    switchMap(payload => {
      return this.service.create(payload).pipe(
        map(response => new actions.SuccessPostPastoralAgentsType(response)),
        catchError(error => {
          return of(
            new actions.RequestFailPastoralAgentsTypes(
              new RequestError(
                actions.PastoralAgentsTypesActionTypes.RequestPostPastoralAgentsType,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutPastoralAgentsType = this.actions$.pipe(
    ofType(actions.PastoralAgentsTypesActionTypes.RequestPutPastoralAgentsType),
    map((action: actions.SuccessPutPastoralAgentsType) => action.payload),
    switchMap(payload => {
      return this.service.update(payload).pipe(
        map(response => new actions.SuccessPutPastoralAgentsType(response)),
        catchError(error =>
          of(
            new actions.RequestFailPastoralAgentsTypes(
              new RequestError(
                actions.PastoralAgentsTypesActionTypes.RequestPutPastoralAgentsType,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeletePastoralAgentsType = this.actions$.pipe(
    ofType(
      actions.PastoralAgentsTypesActionTypes.RequestDeletePastoralAgentsType
    ),
    map((action: actions.SuccessDeletePastoralAgentsType) => action.payload),
    switchMap(payload => {
      return this.service.delete(+payload).pipe(
        map(response => new actions.SuccessDeletePastoralAgentsType(response)),
        catchError(error =>
          of(
            new actions.RequestFailPastoralAgentsTypes(
              new RequestError(
                actions.PastoralAgentsTypesActionTypes.RequestDeletePastoralAgentsType,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeletePastoralAgentsTypes = this.actions$.pipe(
  //   ofType(actions.PastoralAgentsTypesActionTypes.RequestBulkDeletePastoralAgentsTypes),
  //   map((action: actions.SuccessBulkDeletePastoralAgentsTypes) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeletePastoralAgentsTypes(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailPastoralAgentsTypes(
  //             new RequestError(
  //               actions.PastoralAgentsTypesActionTypes.RequestBulkDeletePastoralAgentsTypes,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyPastoralAgentsTypes = this.actions$.pipe(
    ofType(
      actions.PastoralAgentsTypesActionTypes
        .RequestGetEntirelyPastoralAgentsTypes
    ),
    map(
      (action: actions.SuccessGetEntirelyPastoralAgentsTypes) => action.payload
    ),
    switchMap(payload => {
      return this.service.getAll(payload).pipe(
        map(
          (response: PastoralAgentsTypeResponse) =>
            new actions.SuccessGetEntirelyPastoralAgentsTypes(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFailPastoralAgentsTypes(
              new RequestError(
                actions.PastoralAgentsTypesActionTypes.RequestGetEntirelyPastoralAgentsTypes,
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
    private service: PastoralAgentsTypesService
  ) {}
}
