import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { NewsletterGroupSubscriptionsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './newsletter-group-subscriptions.actions';
import {
  NewsletterGroupSubscription,
  NewsletterGroupSubscriptionResponse,
} from '../newsletter-group-subscription.model';

@Injectable()
export class NewsletterGroupSubscriptionsEffects {
  @Effect()
  RequestGetAll = this.actions$.pipe(
    ofType(actions.NewsletterGroupSubscriptionsActionTypes.RequestGetAll),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: NewsletterGroupSubscriptionResponse) =>
            new actions.SuccessGetAll(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.NewsletterGroupSubscriptionsActionTypes.RequestGetAll,
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
    ofType(actions.NewsletterGroupSubscriptionsActionTypes.RequestGet),
    map((action: actions.SuccessGet) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map(
          (response: NewsletterGroupSubscription) =>
            new actions.SuccessGet(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.NewsletterGroupSubscriptionsActionTypes.RequestGet,
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
    ofType(actions.NewsletterGroupSubscriptionsActionTypes.RequestPost),
    map((action: actions.SuccessPost) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPost(response)),
        catchError((error) => {
          return of(
            new actions.RequestFail(
              new RequestError(
                actions.NewsletterGroupSubscriptionsActionTypes.RequestPost,
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
    ofType(actions.NewsletterGroupSubscriptionsActionTypes.RequestPut),
    map((action: actions.SuccessPut) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPut(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.NewsletterGroupSubscriptionsActionTypes.RequestPut,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestToggle = this.actions$.pipe(
    ofType(actions.NewsletterGroupSubscriptionsActionTypes.RequestToggle),
    map((action: actions.SuccessToggle) => action.payload),
    switchMap((payload) => {
      return this.service.toggleStatus(+payload).pipe(
        map((response) => new actions.SuccessToggle(response)),
        catchError((error) =>
          of(
            new actions.RequestFailToggle(
              new RequestError(
                actions.NewsletterGroupSubscriptionsActionTypes.RequestToggle,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetEntirely = this.actions$.pipe(
    ofType(actions.NewsletterGroupSubscriptionsActionTypes.RequestGetEntirely),
    map((action: actions.SuccessGetEntirely) => {
      return { payload: action.payload, isDetailsList: action.isDetailsList };
    }),
    switchMap((payload) => {
      return this.service.getAll(payload.payload).pipe(
        map(
          (response: NewsletterGroupSubscriptionResponse) =>
            new actions.SuccessGetEntirely(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.NewsletterGroupSubscriptionsActionTypes.RequestGetEntirely,
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
    private service: NewsletterGroupSubscriptionsService
  ) {}
}
