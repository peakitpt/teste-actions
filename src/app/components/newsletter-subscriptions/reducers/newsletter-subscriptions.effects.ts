import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { NewsletterSubscriptionsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './newsletter-subscriptions.actions';
import { NewsletterSubscriptionResponse } from '../newsletter-subscription.model';

@Injectable()
export class NewsletterSubscriptionsEffects {
  @Effect()
  RequestGetAll = this.actions$.pipe(
    ofType(actions.NewsletterSubscriptionsActionTypes.RequestGetAll),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: NewsletterSubscriptionResponse) =>
            new actions.SuccessGetAll(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.NewsletterSubscriptionsActionTypes.RequestGetAll,
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
    ofType(actions.NewsletterSubscriptionsActionTypes.RequestToggle),
    map((action: actions.SuccessToggle) => action.payload),
    switchMap((payload) => {
      return this.service.activate(payload).pipe(
        map((response) => {
          return new actions.SuccessToggle(response);
        }),
        catchError((error) =>
          of(
            new actions.RequestFailToggle(
              new RequestError(
                actions.NewsletterSubscriptionsActionTypes.RequestToggle,
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
    private service: NewsletterSubscriptionsService
  ) {}
}
