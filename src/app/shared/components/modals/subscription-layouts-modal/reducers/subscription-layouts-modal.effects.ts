import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { SubscriptionLayoutsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './subscription-layouts-modal.actions';
import { SubscriptionLayoutsResponse } from '../subscription-layouts-modal.model';

@Injectable()
export class SubscriptionLayoutsModalEffects {
  @Effect()
  RequestGetAll = this.actions$.pipe(
    ofType(actions.SubscriptionLayoutsActionTypes.RequestGetAll),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap((payload: any) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: SubscriptionLayoutsResponse) =>
            new actions.SuccessGetAll(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.SubscriptionLayoutsActionTypes.RequestGetAll,
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
    ofType(actions.SubscriptionLayoutsActionTypes.RequestSetSelected),
    map((action: actions.SuccessSetSelected) => action.payload),
    switchMap((payload: any) => {
      return of(new actions.SuccessSetSelected(payload));
    })
  );

  constructor(
    private actions$: Actions,
    private service: SubscriptionLayoutsService
  ) {}
}
