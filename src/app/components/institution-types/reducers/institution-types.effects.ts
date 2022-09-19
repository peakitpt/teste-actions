import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { InstitutionTypesService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './institution-types.actions';
import { InstitutionType, InstitutionTypeResponse } from '../institution-type.model';

@Injectable()
export class InstitutionTypesEffects {
  @Effect()
  RequestGetAll = this.actions$.pipe(
    ofType(actions.InstitutionTypeActionTypes.RequestGetAll),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map((response: InstitutionTypeResponse) => new actions.SuccessGetAll(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.InstitutionTypeActionTypes.RequestGetAll, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGet = this.actions$.pipe(
    ofType(actions.InstitutionTypeActionTypes.RequestGet),
    map((action: actions.SuccessGet) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map((response: InstitutionType) => new actions.SuccessGet(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.InstitutionTypeActionTypes.RequestGet, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPost = this.actions$.pipe(
    ofType(actions.InstitutionTypeActionTypes.RequestPost),
    map((action: actions.SuccessPost) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPost(response)),
        catchError((error) => {
          return of(
            new actions.RequestFail(
              new RequestError(actions.InstitutionTypeActionTypes.RequestPost, error)
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPut = this.actions$.pipe(
    ofType(actions.InstitutionTypeActionTypes.RequestPut),
    map((action: actions.SuccessPut) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPut(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.InstitutionTypeActionTypes.RequestPut, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDelete = this.actions$.pipe(
    ofType(actions.InstitutionTypeActionTypes.RequestDelete),
    map((action: actions.SuccessDelete) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDelete(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.InstitutionTypeActionTypes.RequestDelete, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestBulkDelete = this.actions$.pipe(
    ofType(actions.InstitutionTypeActionTypes.RequestBulkDelete),
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
                actions.InstitutionTypeActionTypes.RequestBulkDelete,
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
    ofType(actions.InstitutionTypeActionTypes.RequestGetEntirely),
    map((action: actions.SuccessGetEntirely) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: InstitutionTypeResponse) => new actions.SuccessGetEntirely(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.InstitutionTypeActionTypes.RequestGetEntirely,
                error
              )
            )
          )
        )
      );
    })
  );

  constructor(private actions$: Actions, private service: InstitutionTypesService) {}
}
