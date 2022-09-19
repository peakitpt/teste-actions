import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './catechisms.actions';
import {
  Catechism,
  CatechismIndividualDocumentResponse,
  CatechismResponse,
  CatechismSession,
  CatechismSessionResponse,
} from '../catechism.model';
import {
  CatechismsIndividualDocumentsService,
  CatechismsService,
  CatechismsSessionsService,
  FileUploaderService,
} from '@peakitpt/ui-kyrios-api';

@Injectable()
export class CatechismsEffects {
  @Effect()
  RequestGetAll = this.actions$.pipe(
    ofType(actions.CatechismsActionTypes.RequestGetAll),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: CatechismResponse) => new actions.SuccessGetAll(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.CatechismsActionTypes.RequestGetAll,
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
    ofType(actions.CatechismsActionTypes.RequestGet),
    map((action: actions.SuccessGet) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map((response: Catechism) => new actions.SuccessGet(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.CatechismsActionTypes.RequestGet, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPost = this.actions$.pipe(
    ofType(actions.CatechismsActionTypes.RequestPost),
    map((action: actions.SuccessPost) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPost(response)),
        catchError((error) => {
          return of(
            new actions.RequestFail(
              new RequestError(actions.CatechismsActionTypes.RequestPost, error)
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPut = this.actions$.pipe(
    ofType(actions.CatechismsActionTypes.RequestPut),
    map((action: actions.SuccessPut) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPut(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.CatechismsActionTypes.RequestPut, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDelete = this.actions$.pipe(
    ofType(actions.CatechismsActionTypes.RequestDelete),
    map((action: actions.SuccessDelete) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDelete(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.CatechismsActionTypes.RequestDelete,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetEntirelyCatechisms = this.actions$.pipe(
    ofType(actions.CatechismsActionTypes.RequestGetEntirelyCatechisms),
    map((action: actions.SuccessGetEntirelyCatechisms) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: CatechismResponse) =>
            new actions.SuccessGetEntirelyCatechisms(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.CatechismsActionTypes.RequestGetEntirelyCatechisms,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPassGrade = this.actions$.pipe(
    ofType(actions.CatechismsActionTypes.RequestPassGrade),
    map((action: actions.SuccessPassGrade) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPassGrade(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.CatechismsActionTypes.RequestPassGrade,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestFinalize = this.actions$.pipe(
    ofType(actions.CatechismsActionTypes.RequestFinalize),
    map((action: actions.SuccessFinalize) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessFinalize(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.CatechismsActionTypes.RequestFinalize,
                error
              )
            )
          )
        )
      );
    })
  );

  // SESSIONS
  @Effect()
  RequestGetAllSessions = this.actions$.pipe(
    ofType(actions.CatechismsActionTypes.RequestGetAllSessions),
    map((action: actions.SuccessGetAllSessions) => action.payload),
    switchMap((payload) => {
      return this.sessionsService.getAll(payload).pipe(
        map((response: CatechismSessionResponse) => {
          return new actions.SuccessGetAllSessions(response);
        }),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.CatechismsActionTypes.RequestGetAllSessions,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetSession = this.actions$.pipe(
    ofType(actions.CatechismsActionTypes.RequestGetSession),
    map((action: actions.SuccessGetSession) => action.payload),
    switchMap((payload) => {
      return this.sessionsService
        .getOneSession(+payload['catechismId'], +payload['id'])
        .pipe(
          map(
            (response: CatechismSession) =>
              new actions.SuccessGetSession(response)
          ),
          catchError((error) =>
            of(
              new actions.RequestFail(
                new RequestError(
                  actions.CatechismsActionTypes.RequestGetSession,
                  error
                )
              )
            )
          )
        );
    })
  );

  @Effect()
  RequestPostSession = this.actions$.pipe(
    ofType(actions.CatechismsActionTypes.RequestPostSession),
    map((action: actions.SuccessPostSession) => action.payload),
    switchMap((payload) => {
      return this.sessionsService
        .createSession(+payload['catechismId'], payload['form'])
        .pipe(
          map((response) => new actions.SuccessPostSession(response)),
          catchError((error) => {
            return of(
              new actions.RequestFail(
                new RequestError(
                  actions.CatechismsActionTypes.RequestPostSession,
                  error
                )
              )
            );
          })
        );
    })
  );

  @Effect()
  RequestPutSession = this.actions$.pipe(
    ofType(actions.CatechismsActionTypes.RequestPutSession),
    map((action: actions.SuccessPutSession) => action.payload),
    switchMap((payload) => {
      return this.sessionsService
        .updateSession(+payload['catechismId'], payload['form'])
        .pipe(
          map((response) => new actions.SuccessPutSession(response)),
          catchError((error) =>
            of(
              new actions.RequestFail(
                new RequestError(
                  actions.CatechismsActionTypes.RequestPutSession,
                  error
                )
              )
            )
          )
        );
    })
  );

  @Effect()
  RequestDeleteSession = this.actions$.pipe(
    ofType(actions.CatechismsActionTypes.RequestDeleteSession),
    map((action: actions.SuccessDeleteSession) => action.payload),
    switchMap((payload) => {
      return this.sessionsService
        .deleteSession(+payload['catechismId'], +payload['id'])
        .pipe(
          map((response) => new actions.SuccessDeleteSession(response)),
          catchError((error) =>
            of(
              new actions.RequestFail(
                new RequestError(
                  actions.CatechismsActionTypes.RequestDeleteSession,
                  error
                )
              )
            )
          )
        );
    })
  );

  // INDIVIDUAL DOCUMENTS
  @Effect()
  RequestGetAllIndividualDocuments = this.actions$.pipe(
    ofType(actions.CatechismsActionTypes.RequestGetAllIndividualDocuments),
    map((action: actions.SuccessGetAllIndividualDocuments) => action.payload),
    switchMap((payload) => {
      return this.individualDocsService.getAll(payload).pipe(
        map(
          (response: CatechismIndividualDocumentResponse) =>
            new actions.SuccessGetAllIndividualDocuments(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.CatechismsActionTypes.RequestGetAllIndividualDocuments,
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
    private service: CatechismsService,
    private sessionsService: CatechismsSessionsService,
    private individualDocsService: CatechismsIndividualDocumentsService,
    private fileUploaderService: FileUploaderService
  ) {}
}
