import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { CuriaBaptismsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './curia-baptisms.actions';
import { CuriaBaptism, CuriaBaptismResponse } from '../curia-baptism.model';

@Injectable()
export class CuriaBaptismsEffects {
  @Effect()
  RequestGetAll = this.actions$.pipe(
    ofType(actions.CuriaBaptismsActionTypes.RequestGetAll),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: CuriaBaptismResponse) =>
            new actions.SuccessGetAll(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.CuriaBaptismsActionTypes.RequestGetAll,
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
    ofType(actions.CuriaBaptismsActionTypes.RequestGet),
    map((action: actions.SuccessGet) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map((response: CuriaBaptism) => new actions.SuccessGet(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.CuriaBaptismsActionTypes.RequestGet,
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
    ofType(actions.CuriaBaptismsActionTypes.RequestPost),
    map((action: actions.SuccessPost) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPost(response)),
        catchError((error) => {
          return of(
            new actions.RequestFail(
              new RequestError(
                actions.CuriaBaptismsActionTypes.RequestPost,
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
    ofType(actions.CuriaBaptismsActionTypes.RequestPut),
    map((action: actions.SuccessPut) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPut(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.CuriaBaptismsActionTypes.RequestPut,
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
    ofType(actions.CuriaBaptismsActionTypes.RequestDelete),
    map((action: actions.SuccessDelete) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDelete(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.CuriaBaptismsActionTypes.RequestDelete,
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
    ofType(actions.CuriaBaptismsActionTypes.RequestBulkDelete),
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
                actions.CuriaBaptismsActionTypes.RequestBulkDelete,
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
    ofType(actions.CuriaBaptismsActionTypes.RequestGetEntirely),
    map((action: actions.SuccessGetEntirely) => {
      return { payload: action.payload, isDetailsList: action.isDetailsList };
    }),
    switchMap((payload) => {
      return this.service.getAll(payload.payload).pipe(
        map(
          (response: CuriaBaptismResponse) =>
            new actions.SuccessGetEntirely(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.CuriaBaptismsActionTypes.RequestGetEntirely,
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
    ofType(actions.CuriaBaptismsActionTypes.RequestSaveAndGenerateDocument),
    map((action: actions.SuccessSaveAndGenerateDocument) => action.payload),
    switchMap((payload) => {
      return this.service.saveAndGenerateDocument(payload as any).pipe(
        map((response) => new actions.SuccessSaveAndGenerateDocument(response)),
        catchError((error) =>
          of(
            new actions.RequestFailSaveAndGenerateDocument(
              new RequestError(
                actions.CuriaBaptismsActionTypes.RequestSaveAndGenerateDocument,
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
    ofType(actions.CuriaBaptismsActionTypes.RequestSendToCuria),
    map((action: actions.SuccessSendToCuria) => action.payload),
    switchMap((payload) => {
      return this.service.sendToCuria(payload).pipe(
        map((response) => new actions.SuccessSendToCuria(response)),
        catchError((error) => {
          return of(
            new actions.RequestFail(
              new RequestError(
                actions.CuriaBaptismsActionTypes.RequestSendToCuria,
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
    ofType(actions.CuriaBaptismsActionTypes.RequestGetNew),
    map((action: actions.SuccessGetNew) => action.payload),
    switchMap(() => {
      return this.service.getNew().pipe(
        map((response: CuriaBaptism) => new actions.SuccessGetNew(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.CuriaBaptismsActionTypes.RequestGetNew,
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
    private service: CuriaBaptismsService
  ) {}
}
