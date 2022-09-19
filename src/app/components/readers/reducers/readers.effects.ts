import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ReadersService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './readers.actions';
import { EntityReader } from '../../mecs/mecs.model';
import { ReaderResponse } from '../readers.model';

@Injectable()
export class ReadersEffects {
  @Effect()
  RequestGetAll = this.actions$.pipe(
    ofType(actions.ReadersActionTypes.RequestGetAll),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap((payload: any) => {
      return this.service.getAll(payload).pipe(
        map((response: ReaderResponse) => new actions.SuccessGetAll(response)),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(actions.ReadersActionTypes.RequestGetAll, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGet = this.actions$.pipe(
    ofType(actions.ReadersActionTypes.RequestGet),
    map((action: actions.SuccessGet) => action.payload),
    switchMap(payload => {
      return this.service.getOne(+payload).pipe(
        map((response: EntityReader) => new actions.SuccessGet(response)),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(actions.ReadersActionTypes.RequestGet, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPost = this.actions$.pipe(
    ofType(actions.ReadersActionTypes.RequestPost),
    map((action: actions.SuccessPost) => action.payload),
    switchMap(payload => {
      return this.service.create(payload).pipe(
        map(response => {
          return new actions.SuccessPost(response);
        }),
        catchError(error => {
          return of(
            new actions.RequestFail(
              new RequestError(actions.ReadersActionTypes.RequestPost, error)
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPut = this.actions$.pipe(
    ofType(actions.ReadersActionTypes.RequestPut),
    map((action: actions.SuccessPut) => action.payload),
    switchMap(payload => {
      return this.service.update(payload).pipe(
        map(response => new actions.SuccessPut(response)),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(actions.ReadersActionTypes.RequestPut, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDelete = this.actions$.pipe(
    ofType(actions.ReadersActionTypes.RequestDelete),
    map((action: actions.SuccessDelete) => action.payload),
    switchMap(payload => {
      return this.service.delete(payload).pipe(
        map(response => new actions.SuccessDelete(response)),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(actions.ReadersActionTypes.RequestDelete, error)
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestDeleteFamily = this.actions$.pipe(
  //   ofType(actions.ReadersActionTypes.RequestDeleteFamily),
  //   map((action: actions.SuccessDeleteFamily) => action.payload),
  //   switchMap(payload => {
  //     return this.service.delete(+payload).pipe(
  //       map(response => new actions.SuccessDeleteFamily(response)),
  //       catchError(error =>
  //         of(
  //           new actions.RequestFailFamilies(
  //             new RequestError(
  //               actions.ReadersActionTypes.RequestDeleteFamily,
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
  //   ofType(actions.ReadersActionTypes.RequestBulkDeleteFamilies),
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
  //               actions.ReadersActionTypes.RequestBulkDeleteFamilies,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyReaders = this.actions$.pipe(
    ofType(actions.ReadersActionTypes.RequestGetEntirelyReaders),
    map((action: actions.SuccessGetEntirelyReaders) => action.payload),
    switchMap(payload => {
      return this.service.getAll(payload).pipe(
        map(
          (response: ReaderResponse) =>
            new actions.SuccessGetEntirelyReaders(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.ReadersActionTypes.RequestGetEntirelyReaders,
                error
              )
            )
          )
        )
      );
    })
  );

  constructor(private actions$: Actions, private service: ReadersService) {}
}
