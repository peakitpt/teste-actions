import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { FormationTypesService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './formation-types.actions';
import { FormationType, FormationTypeResponse } from '../formation-type.model';

@Injectable()
export class FormationTypesEffects {
  @Effect()
  RequestGetAllFormationTypes = this.actions$.pipe(
    ofType(actions.FormationTypesActionTypes.RequestGetAllFormationTypes),
    map((action: actions.SuccessGetAllFormationTypes) => action.payload),
    switchMap(payload => {
      return this.service.getAll(payload).pipe(
        map(
          (response: FormationTypeResponse) =>
            new actions.SuccessGetAllFormationTypes(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFailFormationTypes(
              new RequestError(
                actions.FormationTypesActionTypes.RequestGetAllFormationTypes,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetFormationType = this.actions$.pipe(
    ofType(actions.FormationTypesActionTypes.RequestGetFormationType),
    map((action: actions.SuccessGetFormationType) => action.payload),
    switchMap(payload => {
      return this.service.getOne(+payload).pipe(
        map(
          (response: FormationType) =>
            new actions.SuccessGetFormationType(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFailFormationTypes(
              new RequestError(
                actions.FormationTypesActionTypes.RequestGetFormationType,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostFormationType = this.actions$.pipe(
    ofType(actions.FormationTypesActionTypes.RequestPostFormationType),
    map((action: actions.SuccessPostFormationType) => action.payload),
    switchMap(payload => {
      return this.service.create(payload).pipe(
        map(response => new actions.SuccessPostFormationType(response)),
        catchError(error => {
          return of(
            new actions.RequestFailFormationTypes(
              new RequestError(
                actions.FormationTypesActionTypes.RequestPostFormationType,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutFormationType = this.actions$.pipe(
    ofType(actions.FormationTypesActionTypes.RequestPutFormationType),
    map((action: actions.SuccessPutFormationType) => action.payload),
    switchMap(payload => {
      return this.service.update(payload).pipe(
        map(response => new actions.SuccessPutFormationType(response)),
        catchError(error =>
          of(
            new actions.RequestFailFormationTypes(
              new RequestError(
                actions.FormationTypesActionTypes.RequestPutFormationType,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteFormationType = this.actions$.pipe(
    ofType(actions.FormationTypesActionTypes.RequestDeleteFormationType),
    map((action: actions.SuccessDeleteFormationType) => action.payload),
    switchMap(payload => {
      return this.service.delete(+payload).pipe(
        map(response => new actions.SuccessDeleteFormationType(response)),
        catchError(error =>
          of(
            new actions.RequestFailFormationTypes(
              new RequestError(
                actions.FormationTypesActionTypes.RequestDeleteFormationType,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteFormationTypes = this.actions$.pipe(
  //   ofType(actions.FormationTypesActionTypes.RequestBulkDeleteFormationTypes),
  //   map((action: actions.SuccessBulkDeleteFormationTypes) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteFormationTypes(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailFormationTypes(
  //             new RequestError(
  //               actions.FormationTypesActionTypes.RequestBulkDeleteFormationTypes,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyFormationTypes = this.actions$.pipe(
    ofType(actions.FormationTypesActionTypes.RequestGetEntirelyFormationTypes),
    map((action: actions.SuccessGetEntirelyFormationTypes) => action.payload),
    switchMap(payload => {
      return this.service.getAll(payload).pipe(
        map(
          (response: FormationTypeResponse) =>
            new actions.SuccessGetEntirelyFormationTypes(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFailFormationTypes(
              new RequestError(
                actions.FormationTypesActionTypes.RequestGetEntirelyFormationTypes,
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
    private service: FormationTypesService
  ) {}
}
