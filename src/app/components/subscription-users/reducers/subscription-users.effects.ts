import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { SubscriptionUsersService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './subscription-users.actions';
import {
  SubscriptionUser,
  SubscriptionUserResponse,
} from '../subscription-user.model';

@Injectable()
export class SubscriptionUsersEffects {
  @Effect()
  RequestGetAllSubscriptionUsers = this.actions$.pipe(
    ofType(actions.SubscriptionUsersActionTypes.RequestGetAllSubscriptionUsers),
    map((action: actions.SuccessGetAllSubscriptionUsers) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: SubscriptionUserResponse) =>
            new actions.SuccessGetAllSubscriptionUsers(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailSubscriptionUsers(
              new RequestError(
                actions.SubscriptionUsersActionTypes.RequestGetAllSubscriptionUsers,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetSubscriptionUser = this.actions$.pipe(
    ofType(actions.SubscriptionUsersActionTypes.RequestGetSubscriptionUser),
    map((action: actions.SuccessGetSubscriptionUser) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map(
          (response: SubscriptionUser) =>
            new actions.SuccessGetSubscriptionUser(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailSubscriptionUsers(
              new RequestError(
                actions.SubscriptionUsersActionTypes.RequestGetSubscriptionUser,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostSubscriptionUser = this.actions$.pipe(
    ofType(actions.SubscriptionUsersActionTypes.RequestPostSubscriptionUser),
    map((action: actions.SuccessPostSubscriptionUser) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPostSubscriptionUser(response)),
        catchError((error) => {
          return of(
            new actions.RequestFailSubscriptionUsers(
              new RequestError(
                actions.SubscriptionUsersActionTypes.RequestPostSubscriptionUser,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutSubscriptionUser = this.actions$.pipe(
    ofType(actions.SubscriptionUsersActionTypes.RequestPutSubscriptionUser),
    map((action: actions.SuccessPutSubscriptionUser) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPutSubscriptionUser(response)),
        catchError((error) =>
          of(
            new actions.RequestFailSubscriptionUsers(
              new RequestError(
                actions.SubscriptionUsersActionTypes.RequestPutSubscriptionUser,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteSubscriptionUser = this.actions$.pipe(
    ofType(actions.SubscriptionUsersActionTypes.RequestDeleteSubscriptionUser),
    map((action: actions.SuccessDeleteSubscriptionUser) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDeleteSubscriptionUser(response)),
        catchError((error) =>
          of(
            new actions.RequestFailSubscriptionUsers(
              new RequestError(
                actions.SubscriptionUsersActionTypes.RequestDeleteSubscriptionUser,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteSubscriptionUsers = this.actions$.pipe(
  //   ofType(actions.SubscriptionUsersActionTypes.RequestBulkDeleteSubscriptionUsers),
  //   map((action: actions.SuccessBulkDeleteSubscriptionUsers) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteSubscriptionUsers(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailSubscriptionUsers(
  //             new RequestError(
  //               actions.SubscriptionUsersActionTypes.RequestBulkDeleteSubscriptionUsers,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelySubscriptionUsers = this.actions$.pipe(
    ofType(
      actions.SubscriptionUsersActionTypes.RequestGetEntirelySubscriptionUsers
    ),
    map(
      (action: actions.SuccessGetEntirelySubscriptionUsers) => action.payload
    ),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: SubscriptionUserResponse) =>
            new actions.SuccessGetEntirelySubscriptionUsers(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailSubscriptionUsers(
              new RequestError(
                actions.SubscriptionUsersActionTypes.RequestGetEntirelySubscriptionUsers,
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
    private service: SubscriptionUsersService
  ) {}
}
