import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import {
  PersonsService,
  PendingEntitiesService,
} from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './pending-entities.actions';
import {
  CountPendingEntities,
  PendingEntityEntity,
  PendingEntityResponse,
} from '../pending-entity.model';
import { Entity } from 'src/app/shared/reducers/entities/entity.model';

@Injectable()
export class PendingEntitiesEffects {
  @Effect()
  RequestGetAll = this.actions$.pipe(
    ofType(actions.PendingEntitiesActionTypes.RequestGetAll),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: PendingEntityResponse) =>
            new actions.SuccessGetAll(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.PendingEntitiesActionTypes.RequestGetAll,
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
    ofType(actions.PendingEntitiesActionTypes.RequestGet),
    map((action: actions.SuccessGet) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map(
          (response: PendingEntityEntity) => new actions.SuccessGet(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.PendingEntitiesActionTypes.RequestGet,
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
    ofType(actions.PendingEntitiesActionTypes.RequestPost),
    map((action: actions.SuccessPost) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPost(response)),
        catchError((error) => {
          return of(
            new actions.RequestFail(
              new RequestError(
                actions.PendingEntitiesActionTypes.RequestPost,
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
    ofType(actions.PendingEntitiesActionTypes.RequestPut),
    map((action: actions.SuccessPut) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPut(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.PendingEntitiesActionTypes.RequestPut,
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
    ofType(actions.PendingEntitiesActionTypes.RequestDelete),
    map((action: actions.SuccessDelete) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDelete(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.PendingEntitiesActionTypes.RequestDelete,
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
    ofType(actions.PendingEntitiesActionTypes.RequestBulkDelete),
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
                actions.PendingEntitiesActionTypes.RequestBulkDelete,
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
    ofType(actions.PendingEntitiesActionTypes.RequestGetByEntityId),
    map((action: actions.SuccessGetByEntityId) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map((response) => new actions.SuccessGetByEntityId(response)),
        catchError((error) => {
          return of(
            new actions.RequestFail(
              new RequestError(
                actions.PendingEntitiesActionTypes.RequestGetByEntityId,
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
    ofType(actions.PendingEntitiesActionTypes.RequestGetEntirely),
    map((action: actions.SuccessGetEntirely) => {
      return { payload: action.payload, isDetailsList: action.isDetailsList };
    }),
    switchMap((payload) => {
      return this.service.getAll(payload.payload).pipe(
        map(
          (response: PendingEntityResponse) =>
            new actions.SuccessGetEntirely(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.PendingEntitiesActionTypes.RequestGetEntirely,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RejectOne = this.actions$.pipe(
    ofType(actions.PendingEntitiesActionTypes.RequestRejectPendingEntity),
    map((action: actions.SuccessRejectPendingEntity) => {
      return action.payload;
    }),
    switchMap((payload) => {
      return this.service.rejectPendingEntity(payload).pipe(
        map(
          (response: PendingEntityEntity) =>
            new actions.SuccessRejectPendingEntity(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.PendingEntitiesActionTypes.RequestRejectPendingEntity,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  AcceptOne = this.actions$.pipe(
    ofType(actions.PendingEntitiesActionTypes.RequestAcceptPendingEntity),
    map((action: actions.SuccessAcceptPendingEntity) => {
      return action.payload;
    }),
    switchMap((payload) => {
      return this.service.acceptPendingEntity(payload).pipe(
        map(
          (response: PendingEntityEntity) =>
            new actions.SuccessAcceptPendingEntity(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.PendingEntitiesActionTypes.RequestAcceptPendingEntity,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  CountPendingEntities = this.actions$.pipe(
    ofType(actions.PendingEntitiesActionTypes.RequestCountPendingEntity),
    map((action: actions.SuccessCountPendingEntity) => {
      return action.payload;
    }),
    switchMap((payload) => {
      return this.service.pendingEntityStatusCount().pipe(
        map(
          (response: CountPendingEntities) =>
            new actions.SuccessCountPendingEntity(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.PendingEntitiesActionTypes.RequestCountPendingEntity,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  SimilarEntities = this.actions$.pipe(
    ofType(actions.PendingEntitiesActionTypes.RequestSimilarEntity),
    map((action: actions.SuccessSimilarEntity) => {
      return action.payload;
    }),
    switchMap((payload) => {
      return this.service.pendingEntitySimilarEntities(payload).pipe(
        map((response: Entity[]) => new actions.SuccessSimilarEntity(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.PendingEntitiesActionTypes.RequestSimilarEntity,
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
    private service: PendingEntitiesService
  ) {}
}
