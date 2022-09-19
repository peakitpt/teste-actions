import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { AcolytesService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './acolytes.actions';
import { EntityAcolyte } from '../../mecs/mecs.model';
import { AcolyteResponse } from '../acolytes.model';

@Injectable()
export class AcolytesEffects {
  @Effect()
  RequestGetAll = this.actions$.pipe(
    ofType(actions.AcolytesActionTypes.RequestGetAll),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap((payload: any) => {
      return this.service.getAll(payload).pipe(
        map((response: AcolyteResponse) => new actions.SuccessGetAll(response)),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(actions.AcolytesActionTypes.RequestGetAll, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGet = this.actions$.pipe(
    ofType(actions.AcolytesActionTypes.RequestGet),
    map((action: actions.SuccessGet) => action.payload),
    switchMap(payload => {
      return this.service.getOne(+payload).pipe(
        map((response: EntityAcolyte) => new actions.SuccessGet(response)),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(actions.AcolytesActionTypes.RequestGet, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPost = this.actions$.pipe(
    ofType(actions.AcolytesActionTypes.RequestPost),
    map((action: actions.SuccessPost) => action.payload),
    switchMap(payload => {
      return this.service.create(payload).pipe(
        map(response => {
          return new actions.SuccessPost(response);
        }),
        catchError(error => {
          return of(
            new actions.RequestFail(
              new RequestError(actions.AcolytesActionTypes.RequestPost, error)
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPut = this.actions$.pipe(
    ofType(actions.AcolytesActionTypes.RequestPut),
    map((action: actions.SuccessPut) => action.payload),
    switchMap(payload => {
      return this.service.update(payload).pipe(
        map(response => new actions.SuccessPut(response)),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(actions.AcolytesActionTypes.RequestPut, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDelete = this.actions$.pipe(
    ofType(actions.AcolytesActionTypes.RequestDelete),
    map((action: actions.SuccessDelete) => action.payload),
    switchMap(payload => {
      return this.service.delete(payload).pipe(
        map(response => new actions.SuccessDelete(response)),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(actions.AcolytesActionTypes.RequestDelete, error)
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestDeleteFamily = this.actions$.pipe(
  //   ofType(actions.AcolytesActionTypes.RequestDeleteFamily),
  //   map((action: actions.SuccessDeleteFamily) => action.payload),
  //   switchMap(payload => {
  //     return this.service.delete(+payload).pipe(
  //       map(response => new actions.SuccessDeleteFamily(response)),
  //       catchError(error =>
  //         of(
  //           new actions.RequestFailFamilies(
  //             new RequestError(
  //               actions.AcolytesActionTypes.RequestDeleteFamily,
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
  //   ofType(actions.AcolytesActionTypes.RequestBulkDeleteFamilies),
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
  //               actions.AcolytesActionTypes.RequestBulkDeleteFamilies,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyAcolytes = this.actions$.pipe(
    ofType(actions.AcolytesActionTypes.RequestGetEntirelyAcolytes),
    map((action: actions.SuccessGetEntirelyAcolytes) => action.payload),
    switchMap(payload => {
      return this.service.getAll(payload).pipe(
        map(
          (response: AcolyteResponse) =>
            new actions.SuccessGetEntirelyAcolytes(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.AcolytesActionTypes.RequestGetEntirelyAcolytes,
                error
              )
            )
          )
        )
      );
    })
  );

  constructor(private actions$: Actions, private service: AcolytesService) {}
}
