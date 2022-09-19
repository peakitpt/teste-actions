import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { MecsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './mecs.actions';
import { EntityMec, MECResponse } from '../mecs.model';

@Injectable()
export class MecsEffects {
  @Effect()
  RequestGetAll = this.actions$.pipe(
    ofType(actions.MecsActionTypes.RequestGetAll),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap((payload: any) => {
      return this.service.getAll(payload).pipe(
        map((response: MECResponse) => new actions.SuccessGetAll(response)),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(actions.MecsActionTypes.RequestGetAll, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGet = this.actions$.pipe(
    ofType(actions.MecsActionTypes.RequestGet),
    map((action: actions.SuccessGet) => action.payload),
    switchMap(payload => {
      return this.service.getOne(+payload).pipe(
        map((response: EntityMec) => new actions.SuccessGet(response)),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(actions.MecsActionTypes.RequestGet, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPost = this.actions$.pipe(
    ofType(actions.MecsActionTypes.RequestPost),
    map((action: actions.SuccessPost) => action.payload),
    switchMap(payload => {
      return this.service.create(payload).pipe(
        map(response => {
          return new actions.SuccessPost(response);
        }),
        catchError(error => {
          return of(
            new actions.RequestFail(
              new RequestError(actions.MecsActionTypes.RequestPost, error)
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPut = this.actions$.pipe(
    ofType(actions.MecsActionTypes.RequestPut),
    map((action: actions.SuccessPut) => action.payload),
    switchMap(payload => {
      return this.service.update(payload).pipe(
        map(response => new actions.SuccessPut(response)),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(actions.MecsActionTypes.RequestPut, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDelete = this.actions$.pipe(
    ofType(actions.MecsActionTypes.RequestDelete),
    map((action: actions.SuccessDelete) => action.payload),
    switchMap(payload => {
      return this.service.delete(payload).pipe(
        map(response => new actions.SuccessDelete(response)),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(actions.MecsActionTypes.RequestDelete, error)
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestDeleteFamily = this.actions$.pipe(
  //   ofType(actions.MecsActionTypes.RequestDeleteFamily),
  //   map((action: actions.SuccessDeleteFamily) => action.payload),
  //   switchMap(payload => {
  //     return this.service.delete(+payload).pipe(
  //       map(response => new actions.SuccessDeleteFamily(response)),
  //       catchError(error =>
  //         of(
  //           new actions.RequestFailFamilies(
  //             new RequestError(
  //               actions.MecsActionTypes.RequestDeleteFamily,
  //               error
  //             )
  //           )
  //         )
  //       )
  //     );
  //   })
  // );

  // @Effect()
  // RequestBulkDeleteFamilies = this.actions$.pipe(
  //   ofType(actions.MecsActionTypes.RequestBulkDeleteFamilies),
  //   map((action: actions.SuccessBulkDeleteFamilies) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteFamilies(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailFamilies(
  //             new RequestError(
  //               actions.MecsActionTypes.RequestBulkDeleteFamilies,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyMecs = this.actions$.pipe(
    ofType(actions.MecsActionTypes.RequestGetEntirelyMecs),
    map((action: actions.SuccessGetEntirelyMecs) => action.payload),
    switchMap(payload => {
      return this.service.getAll(payload).pipe(
        map(
          (response: MECResponse) =>
            new actions.SuccessGetEntirelyMecs(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.MecsActionTypes.RequestGetEntirelyMecs,
                error
              )
            )
          )
        )
      );
    })
  );

  constructor(private actions$: Actions, private service: MecsService) {}
}
