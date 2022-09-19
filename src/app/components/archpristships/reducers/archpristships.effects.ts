import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ArchpristshipsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './archpristships.actions';
import { Archpristship, ArchpristshipResponse } from '../archpristship.model';

@Injectable()
export class ArchpristshipsEffects {
  @Effect()
  RequestGetAll = this.actions$.pipe(
    ofType(actions.ArchpristshipsActionTypes.RequestGetAll),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap((payload: any) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: ArchpristshipResponse) =>
            new actions.SuccessGetAll(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.ArchpristshipsActionTypes.RequestGetAll,
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
    ofType(actions.ArchpristshipsActionTypes.RequestGet),
    map((action: actions.SuccessGet) => action.payload),
    switchMap(payload => {
      return this.service.getOne(+payload).pipe(
        map((response: Archpristship) => new actions.SuccessGet(response)),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.ArchpristshipsActionTypes.RequestGet,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPost = this.actions$.pipe(
    ofType(actions.ArchpristshipsActionTypes.RequestPost),
    map((action: actions.SuccessPost) => action.payload),
    switchMap(payload => {
      return this.service.create(payload).pipe(
        map(response => {
          return new actions.SuccessPost(response);
        }),
        catchError(error => {
          return of(
            new actions.RequestFail(
              new RequestError(
                actions.ArchpristshipsActionTypes.RequestPost,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPut = this.actions$.pipe(
    ofType(actions.ArchpristshipsActionTypes.RequestPut),
    map((action: actions.SuccessPut) => action.payload),
    switchMap(payload => {
      return this.service.update(payload).pipe(
        map(response => new actions.SuccessPut(response)),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.ArchpristshipsActionTypes.RequestPut,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDelete = this.actions$.pipe(
    ofType(actions.ArchpristshipsActionTypes.RequestDelete),
    map((action: actions.SuccessDelete) => action.payload),
    switchMap(payload => {
      return this.service.delete(payload).pipe(
        map(response => new actions.SuccessDelete(response)),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.ArchpristshipsActionTypes.RequestDelete,
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
  //   ofType(actions.ArchpristshipsActionTypes.RequestDeleteFamily),
  //   map((action: actions.SuccessDeleteFamily) => action.payload),
  //   switchMap(payload => {
  //     return this.service.delete(+payload).pipe(
  //       map(response => new actions.SuccessDeleteFamily(response)),
  //       catchError(error =>
  //         of(
  //           new actions.RequestFailFamilies(
  //             new RequestError(
  //               actions.ArchpristshipsActionTypes.RequestDeleteFamily,
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
  //   ofType(actions.ArchpristshipsActionTypes.RequestBulkDeleteFamilies),
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
  //               actions.ArchpristshipsActionTypes.RequestBulkDeleteFamilies,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyArchpristships = this.actions$.pipe(
    ofType(actions.ArchpristshipsActionTypes.RequestGetEntirelyArchpristships),
    map((action: actions.SuccessGetEntirelyArchpristships) => action.payload),
    switchMap(payload => {
      return this.service.getAll(payload).pipe(
        map(
          (response: ArchpristshipResponse) =>
            new actions.SuccessGetEntirelyArchpristships(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.ArchpristshipsActionTypes.RequestGetEntirelyArchpristships,
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
    private service: ArchpristshipsService
  ) {}
}
