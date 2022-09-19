import { RequestPostLogIn } from './auth.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './auth.actions';
import { Store } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import { AuthService } from '@peakitpt/ui-kyrios-api';

@Injectable()
export class AuthEffects {
  @Effect()
  RequestPostLogIn = this.actions$.pipe(
    ofType(actions.AuthActionTypes.RequestPostLogIn),
    map((action: actions.SuccessPostLogIn) => action.payload),
    switchMap(payload => {
      return this.service.login(payload.email, payload.password).pipe(
        map(result => {
          localStorage.setItem('token', result.body.accessToken);
          localStorage.setItem('userId', result.body.id);
          localStorage.setItem('userTypeId', result.body.entity_type_id);
          localStorage.setItem('subscriptionId', result.body.entity_id);
          localStorage.setItem(
            'subscriptionTypeId',
            result.body.subscription_type_id
          );
          localStorage.setItem('fullname', result.body.fullname);
          return new actions.SuccessPostLogIn(result);
        }),
        catchError(error => {
          return of(
            new actions.RequestFailLogIn(
              new RequestError(actions.AuthActionTypes.RequestPostLogIn, error)
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestLogOut = this.actions$.pipe(
    ofType(actions.AuthActionTypes.RequestLogOut),
    map((action: actions.SuccessLogOut) => action.payload),
    map(result => {
      localStorage.removeItem('token');
      localStorage.removeItem('fullname');
      localStorage.removeItem('userId');
      localStorage.removeItem('userTypeId');
      localStorage.removeItem('userEntityId');
      localStorage.removeItem('subscriptionId');
      localStorage.removeItem('subscriptionTypeId');
      localStorage.removeItem('kyriosTheme');
      return new actions.SuccessLogOut(result);
    }),
    catchError(error => {
      return of(error);
    })
  );

  constructor(
    private store: Store<AuthState>,
    private actions$: Actions,
    private service: AuthService
  ) {}
}
