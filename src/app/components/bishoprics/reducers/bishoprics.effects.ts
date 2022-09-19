import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { BishopricsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './bishoprics.actions';
import { Bishopric, BishopricResponse } from '../bishopric.model';

@Injectable()
export class BishopricsEffects {
  @Effect()
  RequestGetAll = this.actions$.pipe(
    ofType(actions.BishopricsActionTypes.RequestGetAll),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap((payload: any) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: BishopricResponse) => new actions.SuccessGetAll(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.BishopricsActionTypes.RequestGetAll,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGet = this.actions$.pipe(
    ofType(actions.BishopricsActionTypes.RequestGet),
    map((action: actions.SuccessGet) => action.payload),
    switchMap(payload => {
      return this.service.getOne(+payload).pipe(
        map((response: Bishopric) => new actions.SuccessGet(response)),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(actions.BishopricsActionTypes.RequestGet, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPost = this.actions$.pipe(
    ofType(actions.BishopricsActionTypes.RequestPost),
    map((action: actions.SuccessPost) => action.payload),
    switchMap(payload => {
      return this.service.create(payload).pipe(
        map(response => {
          return new actions.SuccessPost(response);
        }),
        catchError(error => {
          return of(
            new actions.RequestFail(
              new RequestError(actions.BishopricsActionTypes.RequestPost, error)
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPut = this.actions$.pipe(
    ofType(actions.BishopricsActionTypes.RequestPut),
    map((action: actions.SuccessPut) => action.payload),
    switchMap(payload => {
      return this.service.update(payload).pipe(
        map(response => new actions.SuccessPut(response)),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(actions.BishopricsActionTypes.RequestPut, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDelete = this.actions$.pipe(
    ofType(actions.BishopricsActionTypes.RequestDelete),
    map((action: actions.SuccessDelete) => action.payload),
    switchMap(payload => {
      return this.service.delete(payload).pipe(
        map(response => new actions.SuccessDelete(response)),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.BishopricsActionTypes.RequestDelete,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestDeleteFamily = this.actions$.pipe(
  //   ofType(actions.BishopricsActionTypes.RequestDeleteFamily),
  //   map((action: actions.SuccessDeleteFamily) => action.payload),
  //   switchMap(payload => {
  //     return this.service.delete(+payload).pipe(
  //       map(response => new actions.SuccessDeleteFamily(response)),
  //       catchError(error =>
  //         of(
  //           new actions.RequestFailFamilies(
  //             new RequestError(
  //               actions.BishopricsActionTypes.RequestDeleteFamily,
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
  //   ofType(actions.BishopricsActionTypes.RequestBulkDeleteFamilies),
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
  //               actions.BishopricsActionTypes.RequestBulkDeleteFamilies,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyBishoprics = this.actions$.pipe(
    ofType(actions.BishopricsActionTypes.RequestGetEntirelyBishoprics),
    map((action: actions.SuccessGetEntirelyBishoprics) => action.payload),
    switchMap(payload => {
      return this.service.getAll(payload).pipe(
        map(
          (response: BishopricResponse) =>
            new actions.SuccessGetEntirelyBishoprics(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.BishopricsActionTypes.RequestGetEntirelyBishoprics,
                error
              )
            )
          )
        )
      );
    })
  );

  constructor(private actions$: Actions, private service: BishopricsService) {}
}
