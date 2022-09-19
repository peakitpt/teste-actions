import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { CuriaSecretariatTypesService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './curia-secretariat-types.actions';
import {
  CuriaSecretariatType,
  CuriaSecretariatTypeResponse,
} from '../curia-secretariat-type.model';

@Injectable()
export class CuriaSecretariatTypesEffects {
  @Effect()
  RequestGetAll = this.actions$.pipe(
    ofType(actions.CuriaSecretariatTypesActionTypes.RequestGetAll),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: CuriaSecretariatTypeResponse) =>
            new actions.SuccessGetAll(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.CuriaSecretariatTypesActionTypes.RequestGetAll,
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
    ofType(actions.CuriaSecretariatTypesActionTypes.RequestGet),
    map((action: actions.SuccessGet) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map(
          (response: CuriaSecretariatType) => new actions.SuccessGet(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.CuriaSecretariatTypesActionTypes.RequestGet,
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
    ofType(actions.CuriaSecretariatTypesActionTypes.RequestPost),
    map((action: actions.SuccessPost) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPost(response)),
        catchError((error) => {
          return of(
            new actions.RequestFail(
              new RequestError(
                actions.CuriaSecretariatTypesActionTypes.RequestPost,
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
    ofType(actions.CuriaSecretariatTypesActionTypes.RequestPut),
    map((action: actions.SuccessPut) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPut(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.CuriaSecretariatTypesActionTypes.RequestPut,
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
    ofType(actions.CuriaSecretariatTypesActionTypes.RequestDelete),
    map((action: actions.SuccessDelete) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDelete(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.CuriaSecretariatTypesActionTypes.RequestDelete,
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
    ofType(actions.CuriaSecretariatTypesActionTypes.RequestBulkDelete),
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
                actions.CuriaSecretariatTypesActionTypes.RequestBulkDelete,
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
    ofType(actions.CuriaSecretariatTypesActionTypes.RequestGetEntirely),
    map((action: actions.SuccessGetEntirely) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: CuriaSecretariatTypeResponse) =>
            new actions.SuccessGetEntirely(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.CuriaSecretariatTypesActionTypes.RequestGetEntirely,
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
    private service: CuriaSecretariatTypesService
  ) {}
}
