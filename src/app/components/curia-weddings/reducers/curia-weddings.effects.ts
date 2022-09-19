import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { CuriaWeddingsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './curia-weddings.actions';
import { CuriaWedding, CuriaWeddingResponse } from '../curia-wedding.model';

@Injectable()
export class CuriaWeddingsEffects {
  @Effect()
  RequestGetAll = this.actions$.pipe(
    ofType(actions.CuriaWeddingsActionTypes.RequestGetAll),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: CuriaWeddingResponse) =>
            new actions.SuccessGetAll(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.CuriaWeddingsActionTypes.RequestGetAll,
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
    ofType(actions.CuriaWeddingsActionTypes.RequestGet),
    map((action: actions.SuccessGet) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map((response: CuriaWedding) => new actions.SuccessGet(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.CuriaWeddingsActionTypes.RequestGet,
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
    ofType(actions.CuriaWeddingsActionTypes.RequestPost),
    map((action: actions.SuccessPost) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPost(response)),
        catchError((error) => {
          return of(
            new actions.RequestFail(
              new RequestError(
                actions.CuriaWeddingsActionTypes.RequestPost,
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
    ofType(actions.CuriaWeddingsActionTypes.RequestPut),
    map((action: actions.SuccessPut) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPut(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.CuriaWeddingsActionTypes.RequestPut,
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
    ofType(actions.CuriaWeddingsActionTypes.RequestDelete),
    map((action: actions.SuccessDelete) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDelete(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.CuriaWeddingsActionTypes.RequestDelete,
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
    ofType(actions.CuriaWeddingsActionTypes.RequestBulkDelete),
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
                actions.CuriaWeddingsActionTypes.RequestBulkDelete,
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
    ofType(actions.CuriaWeddingsActionTypes.RequestGetEntirely),
    map((action: actions.SuccessGetEntirely) => {
      return { payload: action.payload, isDetailsList: action.isDetailsList };
    }),
    switchMap((payload) => {
      return this.service.getAll(payload.payload).pipe(
        map(
          (response: CuriaWeddingResponse) =>
            new actions.SuccessGetEntirely(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.CuriaWeddingsActionTypes.RequestGetEntirely,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestSaveAndGenerateDocument = this.actions$.pipe(
    ofType(actions.CuriaWeddingsActionTypes.RequestSaveAndGenerateDocument),
    map((action: actions.SuccessSaveAndGenerateDocument) => action.payload),
    switchMap((payload) => {
      return this.service.saveAndGenerateDocument(payload as any).pipe(
        map((response) => new actions.SuccessSaveAndGenerateDocument(response)),
        catchError((error) =>
          of(
            new actions.RequestFailSaveAndGenerateDocument(
              new RequestError(
                actions.CuriaWeddingsActionTypes.RequestSaveAndGenerateDocument,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestSendToCuria = this.actions$.pipe(
    ofType(actions.CuriaWeddingsActionTypes.RequestSendToCuria),
    map((action: actions.SuccessSendToCuria) => action.payload),
    switchMap((payload) => {
      return this.service.sendToCuria(payload).pipe(
        map((response) => new actions.SuccessSendToCuria(response)),
        catchError((error) => {
          return of(
            new actions.RequestFail(
              new RequestError(
                actions.CuriaWeddingsActionTypes.RequestSendToCuria,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestGetNew = this.actions$.pipe(
    ofType(actions.CuriaWeddingsActionTypes.RequestGetNew),
    map((action: actions.SuccessGetNew) => action.payload),
    switchMap(() => {
      return this.service.getNew().pipe(
        map((response: CuriaWedding) => new actions.SuccessGetNew(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.CuriaWeddingsActionTypes.RequestGetNew,
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
    private service: CuriaWeddingsService
  ) {}
}
