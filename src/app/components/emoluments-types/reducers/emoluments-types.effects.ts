import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { EmolumentsTypesService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './emoluments-types.actions';
import { EmolumentType, EmolumentTypeResponse } from '../emoluments-type.model';

@Injectable()
export class EmolumentsTypesEffects {
  @Effect()
  RequestGetAllEmolumentsTypes = this.actions$.pipe(
    ofType(actions.EmolumentsTypesActionTypes.RequestGetAllEmolumentsTypes),
    map((action: actions.SuccessGetAllEmolumentsTypes) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: EmolumentTypeResponse) =>
            new actions.SuccessGetAllEmolumentsTypes(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailEmolumentsTypes(
              new RequestError(
                actions.EmolumentsTypesActionTypes.RequestGetAllEmolumentsTypes,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetEmolumentType = this.actions$.pipe(
    ofType(actions.EmolumentsTypesActionTypes.RequestGetEmolumentType),
    map((action: actions.SuccessGetEmolumentType) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map(
          (response: EmolumentType) =>
            new actions.SuccessGetEmolumentType(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailEmolumentsTypes(
              new RequestError(
                actions.EmolumentsTypesActionTypes.RequestGetEmolumentType,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostEmolumentType = this.actions$.pipe(
    ofType(actions.EmolumentsTypesActionTypes.RequestPostEmolumentType),
    map((action: actions.SuccessPostEmolumentType) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPostEmolumentType(response)),
        catchError((error) => {
          return of(
            new actions.RequestFailEmolumentsTypes(
              new RequestError(
                actions.EmolumentsTypesActionTypes.RequestPostEmolumentType,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutEmolumentType = this.actions$.pipe(
    ofType(actions.EmolumentsTypesActionTypes.RequestPutEmolumentType),
    map((action: actions.SuccessPutEmolumentType) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPutEmolumentType(response)),
        catchError((error) =>
          of(
            new actions.RequestFailEmolumentsTypes(
              new RequestError(
                actions.EmolumentsTypesActionTypes.RequestPutEmolumentType,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteEmolumentType = this.actions$.pipe(
    ofType(actions.EmolumentsTypesActionTypes.RequestDeleteEmolumentType),
    map((action: actions.SuccessDeleteEmolumentType) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDeleteEmolumentType(response)),
        catchError((error) =>
          of(
            new actions.RequestFailEmolumentsTypes(
              new RequestError(
                actions.EmolumentsTypesActionTypes.RequestDeleteEmolumentType,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteEmolumentsTypes = this.actions$.pipe(
  //   ofType(actions.EmolumentsTypesActionTypes.RequestBulkDeleteEmolumentsTypes),
  //   map((action: actions.SuccessBulkDeleteEmolumentsTypes) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteEmolumentsTypes(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailEmolumentsTypes(
  //             new RequestError(
  //               actions.EmolumentsTypesActionTypes.RequestBulkDeleteEmolumentsTypes,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyEmolumentsTypes = this.actions$.pipe(
    ofType(
      actions.EmolumentsTypesActionTypes.RequestGetEntirelyEmolumentsTypes
    ),
    map((action: actions.SuccessGetEntirelyEmolumentsTypes) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: EmolumentTypeResponse) =>
            new actions.SuccessGetEntirelyEmolumentsTypes(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailEmolumentsTypes(
              new RequestError(
                actions.EmolumentsTypesActionTypes.RequestGetEntirelyEmolumentsTypes,
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
    private service: EmolumentsTypesService
  ) {}
}
