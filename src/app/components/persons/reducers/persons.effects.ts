import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { FileUploaderService, PersonsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './persons.actions';
import { EntityPerson, EntityPersonResponse } from '../person.model';

@Injectable()
export class PersonsEffects {
  @Effect()
  RequestGetAll = this.actions$.pipe(
    ofType(actions.PersonsActionTypes.RequestGetAll),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: EntityPersonResponse) =>
            new actions.SuccessGetAll(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.PersonsActionTypes.RequestGetAll, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGet = this.actions$.pipe(
    ofType(actions.PersonsActionTypes.RequestGet),
    map((action: actions.SuccessGet) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map((response: EntityPerson) => new actions.SuccessGet(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.PersonsActionTypes.RequestGet, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPost = this.actions$.pipe(
    ofType(actions.PersonsActionTypes.RequestPost),
    map((action: actions.SuccessPost) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPost(response)),
        catchError((error) => {
          return of(
            new actions.RequestFail(
              new RequestError(actions.PersonsActionTypes.RequestPost, error)
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPut = this.actions$.pipe(
    ofType(actions.PersonsActionTypes.RequestPut),
    map((action: actions.SuccessPut) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPut(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.PersonsActionTypes.RequestPut, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDelete = this.actions$.pipe(
    ofType(actions.PersonsActionTypes.RequestDelete),
    map((action: actions.SuccessDelete) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDelete(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.PersonsActionTypes.RequestDelete, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestBulkDelete = this.actions$.pipe(
    ofType(actions.PersonsActionTypes.RequestBulkDelete),
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
                actions.PersonsActionTypes.RequestBulkDelete,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestGetByEntityId = this.actions$.pipe(
    ofType(actions.PersonsActionTypes.RequestGetByEntityId),
    map((action: actions.SuccessGetByEntityId) => action.payload),
    switchMap((payload) => {
      return this.service.getByEntityId(+payload).pipe(
        map((response) => new actions.SuccessGetByEntityId(response)),
        catchError((error) => {
          return of(
            new actions.RequestFail(
              new RequestError(
                actions.PersonsActionTypes.RequestGetByEntityId,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestCheckExistance = this.actions$.pipe(
    ofType(actions.PersonsActionTypes.RequestCheckExistance),
    map((action: actions.SuccessCheckExistance) => action.payload),
    switchMap((payload: any) => {
      return this.service
        .checkExistance(payload.id, payload.name, payload.taxpayer)
        .pipe(
          map((response) => new actions.SuccessCheckExistance(response)),
          catchError((error) => {
            return of(
              new actions.RequestFail(
                new RequestError(
                  actions.PersonsActionTypes.RequestCheckExistance,
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
    ofType(actions.PersonsActionTypes.RequestGetEntirely),
    map((action: actions.SuccessGetEntirely) => {
      return { payload: action.payload, isDetailsList: action.isDetailsList };
    }),
    switchMap((payload) => {
      return this.service.getAll(payload.payload).pipe(
        map(
          (response: EntityPersonResponse) =>
            new actions.SuccessGetEntirely(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.PersonsActionTypes.RequestGetEntirely,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostImage = this.actions$.pipe(
    ofType(actions.PersonsActionTypes.RequestPostImage),
    map((action: actions.SuccessPostImage) => action.payload),
    switchMap((payload) => {
      return this.fileUploaderService.upload(payload).pipe(
        map((response) => new actions.SuccessPostImage(response)),
        catchError((error) => {
          return of(
            new actions.RequestFail(
              new RequestError(
                actions.PersonsActionTypes.RequestPostImage,
                error
              )
            )
          );
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private service: PersonsService,
    private fileUploaderService: FileUploaderService
  ) {}
}
