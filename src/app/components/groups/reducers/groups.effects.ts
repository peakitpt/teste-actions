import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { GroupsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './groups.actions';
import { Group, GroupResponse } from '../group.model';

@Injectable()
export class GroupsEffects {
  @Effect()
  RequestGetAll = this.actions$.pipe(
    ofType(actions.GroupsActionTypes.RequestGetAll),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map((response: GroupResponse) => new actions.SuccessGetAll(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.GroupsActionTypes.RequestGetAll, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGet = this.actions$.pipe(
    ofType(actions.GroupsActionTypes.RequestGet),
    map((action: actions.SuccessGet) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map((response: Group) => new actions.SuccessGet(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.GroupsActionTypes.RequestGet, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPost = this.actions$.pipe(
    ofType(actions.GroupsActionTypes.RequestPost),
    map((action: actions.SuccessPost) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPost(response)),
        catchError((error) => {
          return of(
            new actions.RequestFail(
              new RequestError(actions.GroupsActionTypes.RequestPost, error)
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPut = this.actions$.pipe(
    ofType(actions.GroupsActionTypes.RequestPut),
    map((action: actions.SuccessPut) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPut(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.GroupsActionTypes.RequestPut, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDelete = this.actions$.pipe(
    ofType(actions.GroupsActionTypes.RequestDelete),
    map((action: actions.SuccessDelete) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDelete(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.GroupsActionTypes.RequestDelete, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestBulkDelete = this.actions$.pipe(
    ofType(actions.GroupsActionTypes.RequestBulkDelete),
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
                actions.GroupsActionTypes.RequestBulkDelete,
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
    ofType(actions.GroupsActionTypes.RequestGetEntirely),
    map((action: actions.SuccessGetEntirely) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: GroupResponse) => new actions.SuccessGetEntirely(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.GroupsActionTypes.RequestGetEntirely,
                error
              )
            )
          )
        )
      );
    })
  );

  constructor(private actions$: Actions, private service: GroupsService) {}
}
