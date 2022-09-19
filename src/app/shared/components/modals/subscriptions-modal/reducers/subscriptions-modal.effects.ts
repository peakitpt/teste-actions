import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { SubscriptionsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './subscriptions-modal.actions';
import { SubscriptionsResponse } from '../subscriptions-modal.model';

@Injectable()
export class SubscriptionsModalEffects {
  @Effect()
  RequestGetAll = this.actions$.pipe(
    ofType(actions.SubscriptionsActionTypes.RequestGetAll),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap((payload: any) => {
      const id = localStorage.getItem('userId');
      const ekklesiaId = localStorage.getItem('subscriptionId');
      const options = {
        userId: id,
        EkklesiaId: ekklesiaId
      };
      return this.service.getSubscriptions(options).pipe(
        map(
          (response: SubscriptionsResponse) =>
            new actions.SuccessGetAll(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.SubscriptionsActionTypes.RequestGetAll,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestSetSelected = this.actions$.pipe(
    ofType(actions.SubscriptionsActionTypes.RequestSetSelected),
    map((action: actions.SuccessSetSelected) => action.payload),
    switchMap((payload: any) => {
      return of(new actions.SuccessSetSelected(payload));
    })
  );

  constructor(
    private actions$: Actions,
    private service: SubscriptionsService
  ) {}
}
