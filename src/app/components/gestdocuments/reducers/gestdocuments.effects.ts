import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { GestdocumentsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './gestdocuments.actions';
import { Gestdocument, GestdocumentResponse } from '../gestdocument.model';

@Injectable()
export class GestdocumentsEffects {
  @Effect()
  RequestGetAll = this.actions$.pipe(
    ofType(actions.GestdocumentsActionTypes.RequestGetAll),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: GestdocumentResponse) =>
            new actions.SuccessGetAll(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.GestdocumentsActionTypes.RequestGetAll,
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
    ofType(actions.GestdocumentsActionTypes.RequestGet),
    map((action: actions.SuccessGet) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map((response: Gestdocument) => new actions.SuccessGet(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.GestdocumentsActionTypes.RequestGet,
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
    ofType(actions.GestdocumentsActionTypes.RequestPost),
    map((action: actions.SuccessPost) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPost(response)),
        catchError((error) => {
          return of(
            new actions.RequestFail(
              new RequestError(
                actions.GestdocumentsActionTypes.RequestPost,
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
    ofType(actions.GestdocumentsActionTypes.RequestPut),
    map((action: actions.SuccessPut) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPut(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.GestdocumentsActionTypes.RequestPut,
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
    ofType(actions.GestdocumentsActionTypes.RequestDelete),
    map((action: actions.SuccessDelete) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDelete(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.GestdocumentsActionTypes.RequestDelete,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestBulkDelete = this.actions$.pipe(
    ofType(actions.GestdocumentsActionTypes.RequestBulkDelete),
    map((action: actions.SuccessBulkDelete) => action.payload),
    switchMap((payload) => {
      return this.service.bulkDelete(payload).pipe(
        map((response) => {
          return new actions.SuccessBulkDelete(response);
        }),
        catchError((error) => {
          return of(
            new actions.RequestFail(
              new RequestError(
                actions.GestdocumentsActionTypes.RequestBulkDelete,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestGetEntirely = this.actions$.pipe(
    ofType(actions.GestdocumentsActionTypes.RequestGetEntirely),
    map((action: actions.SuccessGetEntirely) => {
      return { payload: action.payload, isDetailsList: action.isDetailsList };
    }),
    switchMap((payload) => {
      return this.service.getAll(payload.payload).pipe(
        map(
          (response: GestdocumentResponse) =>
            new actions.SuccessGetEntirely(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.GestdocumentsActionTypes.RequestGetEntirely,
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
    private service: GestdocumentsService
  ) {}
}
