import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { AccrualsTypesService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './accruals-types.actions';
import { AccrualsType, AccrualsTypeResponse } from '../accruals-type.model';

@Injectable()
export class AccrualTypesEffects {
  @Effect()
  RequestGetAllAccrualTypes = this.actions$.pipe(
    ofType(actions.AccrualTypesActionTypes.RequestGetAllAccrualTypes),
    map((action: actions.SuccessGetAllAccrualTypes) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: AccrualsTypeResponse) =>
            new actions.SuccessGetAllAccrualTypes(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailAccrualTypes(
              new RequestError(
                actions.AccrualTypesActionTypes.RequestGetAllAccrualTypes,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetAccrualType = this.actions$.pipe(
    ofType(actions.AccrualTypesActionTypes.RequestGetAccrualType),
    map((action: actions.SuccessGetAccrualType) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map(
          (response: AccrualsType) =>
            new actions.SuccessGetAccrualType(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailAccrualTypes(
              new RequestError(
                actions.AccrualTypesActionTypes.RequestGetAccrualType,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostAccrualType = this.actions$.pipe(
    ofType(actions.AccrualTypesActionTypes.RequestPostAccrualType),
    map((action: actions.SuccessPostAccrualType) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPostAccrualType(response)),
        catchError((error) => {
          return of(
            new actions.RequestFailAccrualTypes(
              new RequestError(
                actions.AccrualTypesActionTypes.RequestPostAccrualType,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutAccrualType = this.actions$.pipe(
    ofType(actions.AccrualTypesActionTypes.RequestPutAccrualType),
    map((action: actions.SuccessPutAccrualType) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPutAccrualType(response)),
        catchError((error) =>
          of(
            new actions.RequestFailAccrualTypes(
              new RequestError(
                actions.AccrualTypesActionTypes.RequestPutAccrualType,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteAccrualType = this.actions$.pipe(
    ofType(actions.AccrualTypesActionTypes.RequestDeleteAccrualType),
    map((action: actions.SuccessDeleteAccrualType) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDeleteAccrualType(response)),
        catchError((error) =>
          of(
            new actions.RequestFailAccrualTypes(
              new RequestError(
                actions.AccrualTypesActionTypes.RequestDeleteAccrualType,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteAccrualTypes = this.actions$.pipe(
  //   ofType(actions.AccrualTypesActionTypes.RequestBulkDeleteAccrualTypes),
  //   map((action: actions.SuccessBulkDeleteAccrualTypes) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteAccrualTypes(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailAccrualTypes(
  //             new RequestError(
  //               actions.AccrualTypesActionTypes.RequestBulkDeleteAccrualTypes,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyAccrualTypes = this.actions$.pipe(
    ofType(actions.AccrualTypesActionTypes.RequestGetEntirelyAccrualTypes),
    map((action: actions.SuccessGetEntirelyAccrualTypes) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: AccrualsTypeResponse) =>
            new actions.SuccessGetEntirelyAccrualTypes(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailAccrualTypes(
              new RequestError(
                actions.AccrualTypesActionTypes.RequestGetEntirelyAccrualTypes,
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
    ofType(actions.AccrualTypesActionTypes.RequestGetNew),
    map((action: actions.SuccessGetNew) => action.payload),
    switchMap(() => {
      return this.service.getNew().pipe(
        map((response: AccrualsType) => new actions.SuccessGetNew(response)),
        catchError((error) =>
          of(
            new actions.RequestFailAccrualTypes(
              new RequestError(
                actions.AccrualTypesActionTypes.RequestGetNew,
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
    private service: AccrualsTypesService
  ) {}
}
