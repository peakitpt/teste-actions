import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import {
  EntitySubscriptionsService,
  SubscriptionsService,
} from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './subscriptions.actions';
import { Subscription, SubscriptionResponse } from '../subscription.model';

@Injectable()
export class SubscriptionsEffects {
  @Effect()
  RequestGetAllSubscriptions = this.actions$.pipe(
    ofType(actions.SubscriptionsActionTypes.RequestGetAllSubscriptions),
    map((action: actions.SuccessGetAllSubscriptions) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: SubscriptionResponse) =>
            new actions.SuccessGetAllSubscriptions(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailSubscriptions(
              new RequestError(
                actions.SubscriptionsActionTypes.RequestGetAllSubscriptions,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestBulkDisableUsersSubscriptions = this.actions$.pipe(
    ofType(
      actions.SubscriptionsActionTypes.RequestBulkDisableUsersSubscriptions
    ),
    map(
      (action: actions.SuccessBulkDisableUsersSubscriptions) => action.payload
    ),
    switchMap((payload: number[]) => {
      return this.service.bulk_disable_users(payload).pipe(
        map((response) => {
          return new actions.SuccessBulkDisableUsersSubscriptions(response);
        }),
        catchError((error) => {
          return of(
            new actions.RequestFailSubscriptions(
              new RequestError(
                actions.SubscriptionsActionTypes.RequestBulkDisableUsersSubscriptions,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestBulkEnableUsersSubscriptions = this.actions$.pipe(
    ofType(
      actions.SubscriptionsActionTypes.RequestBulkEnableUsersSubscriptions
    ),
    map(
      (action: actions.SuccessBulkEnableUsersSubscriptions) => action.payload
    ),
    switchMap((payload: number[]) => {
      return this.service.bulk_enable_users(payload).pipe(
        map((response) => {
          return new actions.SuccessBulkEnableUsersSubscriptions(response);
        }),
        catchError((error) => {
          return of(
            new actions.RequestFailSubscriptions(
              new RequestError(
                actions.SubscriptionsActionTypes.RequestBulkEnableUsersSubscriptions,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestBulkDisableSubscriptions = this.actions$.pipe(
    ofType(actions.SubscriptionsActionTypes.RequestBulkDisableSubscriptions),
    map((action: actions.SuccessBulkDisableSubscriptions) => action.payload),
    switchMap((payload: number[]) => {
      return this.service.bulk_disable_subscriptions(payload).pipe(
        map((response) => {
          return new actions.SuccessBulkDisableSubscriptions(response);
        }),
        catchError((error) => {
          return of(
            new actions.RequestFailSubscriptions(
              new RequestError(
                actions.SubscriptionsActionTypes.RequestBulkDisableSubscriptions,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestGetEntirelySubscriptions = this.actions$.pipe(
    ofType(actions.SubscriptionsActionTypes.RequestGetEntirelySubscriptions),
    map((action: actions.SuccessGetEntirelySubscriptions) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: SubscriptionResponse) =>
            new actions.SuccessGetEntirelySubscriptions(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailSubscriptions(
              new RequestError(
                actions.SubscriptionsActionTypes.RequestGetEntirelySubscriptions,
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
    ofType(actions.SubscriptionsActionTypes.RequestPost),
    map((action: actions.SuccessPost) => action.payload),
    switchMap((payload) => {
      return this.subscriptionService.create(payload).pipe(
        map((response) => {
          return new actions.SuccessPost(response);
        }),
        catchError((error) => {
          return of(
            new actions.RequestFailSubscriptions(
              new RequestError(
                actions.SubscriptionsActionTypes.RequestPost,
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
    ofType(actions.SubscriptionsActionTypes.RequestGetNew),
    map((action: actions.SuccessGetNew) => action.payload),
    switchMap(() => {
      return this.subscriptionService.getNew().pipe(
        map((response: any) => new actions.SuccessGetNew(response)),
        catchError((error) =>
          of(
            new actions.RequestFailSubscriptions(
              new RequestError(
                actions.SubscriptionsActionTypes.RequestGetNew,
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
    private service: EntitySubscriptionsService,
    private subscriptionService: SubscriptionsService
  ) {}
}
