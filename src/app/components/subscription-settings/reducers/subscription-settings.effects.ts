import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import {
  SubscriptionSettingsService,
  SubscriptionSettingsV2Service,
} from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './subscription-settings.actions';
import { SubscriptionSetting } from '../subscription-setting.model';

@Injectable()
export class SubscriptionSettingsEffects {
  @Effect()
  RequestGetFromSubscriptionSetting = this.actions$.pipe(
    ofType(
      actions.SubscriptionSettingsActionTypes.RequestGetFromSubscriptionSetting
    ),
    map((action: actions.SuccessGetFromSubscriptionSetting) => action.payload),
    switchMap((payload) => {
      return this.serviceV2.getFromSubscription().pipe(
        map(
          (response) => new actions.SuccessGetFromSubscriptionSetting(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailSubscriptionSettings(
              new RequestError(
                actions.SubscriptionSettingsActionTypes.RequestGetFromSubscriptionSetting,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetSubscriptionSetting = this.actions$.pipe(
    ofType(
      actions.SubscriptionSettingsActionTypes.RequestGetSubscriptionSetting
    ),
    map((action: actions.SuccessGetSubscriptionSetting) => action.payload),
    switchMap(() => {
      return this.serviceV2.getOne().pipe(
        map(
          (response: SubscriptionSetting) =>
            new actions.SuccessGetSubscriptionSetting(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailSubscriptionSettings(
              new RequestError(
                actions.SubscriptionSettingsActionTypes.RequestGetSubscriptionSetting,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostSubscriptionSetting = this.actions$.pipe(
    ofType(
      actions.SubscriptionSettingsActionTypes.RequestPostSubscriptionSetting
    ),
    map((action: actions.SuccessPostSubscriptionSetting) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPostSubscriptionSetting(response)),
        catchError((error) => {
          return of(
            new actions.RequestFailSubscriptionSettings(
              new RequestError(
                actions.SubscriptionSettingsActionTypes.RequestPostSubscriptionSetting,
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
    private service: SubscriptionSettingsService,
    private serviceV2: SubscriptionSettingsV2Service
  ) {}
}
