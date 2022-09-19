import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { FamiliesV1Service, FamiliesV2Service } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './families.actions';
import { Family, FamilyResponse } from '../family.model';

@Injectable()
export class FamiliesEffects {
  @Effect()
  RequestGetAll = this.actions$.pipe(
    ofType(actions.FamiliesActionTypes.RequestGetAll),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap((payload: any) => {
      return this.service.getAll(payload).pipe(
        map((response: FamilyResponse) => new actions.SuccessGetAll(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.FamiliesActionTypes.RequestGetAll, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGet = this.actions$.pipe(
    ofType(actions.FamiliesActionTypes.RequestGet),
    map((action: actions.SuccessGet) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map((response: Family) => new actions.SuccessGet(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.FamiliesActionTypes.RequestGet, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPost = this.actions$.pipe(
    ofType(actions.FamiliesActionTypes.RequestPost),
    map((action: actions.SuccessPost) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPost(response)),
        catchError((error) => {
          return of(
            new actions.RequestFail(
              new RequestError(actions.FamiliesActionTypes.RequestPost, error)
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPut = this.actions$.pipe(
    ofType(actions.FamiliesActionTypes.RequestPut),
    map((action: actions.SuccessPut) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPut(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.FamiliesActionTypes.RequestPut, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDelete = this.actions$.pipe(
    ofType(actions.FamiliesActionTypes.RequestDelete),
    map((action: actions.SuccessDelete) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDelete(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.FamiliesActionTypes.RequestDelete, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestBulkDelete = this.actions$.pipe(
    ofType(actions.FamiliesActionTypes.RequestBulkDelete),
    map((action: actions.SuccessBulkDelete) => action.payload),
    switchMap((payload) => {
      return this.service.bulkDelete(payload).pipe(
        map((response) => new actions.SuccessBulkDelete(response)),
        catchError((error) => {
          return of(
            new actions.RequestFail(
              new RequestError(
                actions.FamiliesActionTypes.RequestBulkDelete,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestGetEntirelyFamilies = this.actions$.pipe(
    ofType(actions.FamiliesActionTypes.RequestGetEntirelyFamilies),
    map((action: actions.SuccessGetEntirelyFamilies) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: FamilyResponse) =>
            new actions.SuccessGetEntirelyFamilies(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.FamiliesActionTypes.RequestGetEntirelyFamilies,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetEntityFamilies = this.actions$.pipe(
    ofType(actions.FamiliesActionTypes.RequestGetEntityFamilies),
    map((action: actions.SuccessGetEntityFamilies) => action.payload),
    switchMap((payload) => {
      return this.serviceV2.getEntityFamilies(+payload).pipe(
        map(
          (response: Array<{ id: number; name: string }>) =>
            new actions.SuccessGetEntityFamilies(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.FamiliesActionTypes.RequestGetEntityFamilies,
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
    private service: FamiliesV1Service,
    private serviceV2: FamiliesV2Service
  ) {}
}
