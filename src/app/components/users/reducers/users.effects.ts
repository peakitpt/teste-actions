import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UsersService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './users.actions';
import { User, UserResponse } from '../user.model';

@Injectable()
export class UsersEffects {
  @Effect()
  RequestGetAllUsers = this.actions$.pipe(
    ofType(actions.UsersActionTypes.RequestGetAllUsers),
    map((action: actions.SuccessGetAllUsers) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: UserResponse) => new actions.SuccessGetAllUsers(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailUsers(
              new RequestError(
                actions.UsersActionTypes.RequestGetAllUsers,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetUser = this.actions$.pipe(
    ofType(actions.UsersActionTypes.RequestGetUser),
    map((action: actions.SuccessGetUser) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map((response: User) => new actions.SuccessGetUser(response)),
        catchError((error) =>
          of(
            new actions.RequestFailUsers(
              new RequestError(actions.UsersActionTypes.RequestGetUser, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostUser = this.actions$.pipe(
    ofType(actions.UsersActionTypes.RequestPostUser),
    map((action: actions.SuccessPostUser) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPostUser(response)),
        catchError((error) => {
          return of(
            new actions.RequestFailUsers(
              new RequestError(actions.UsersActionTypes.RequestPostUser, error)
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutUser = this.actions$.pipe(
    ofType(actions.UsersActionTypes.RequestPutUser),
    map((action: actions.SuccessPutUser) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPutUser(response)),
        catchError((error) =>
          of(
            new actions.RequestFailUsers(
              new RequestError(actions.UsersActionTypes.RequestPutUser, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteUser = this.actions$.pipe(
    ofType(actions.UsersActionTypes.RequestDeleteUser),
    map((action: actions.SuccessDeleteUser) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDeleteUser(response)),
        catchError((error) =>
          of(
            new actions.RequestFailUsers(
              new RequestError(
                actions.UsersActionTypes.RequestDeleteUser,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteUsers = this.actions$.pipe(
  //   ofType(actions.UsersActionTypes.RequestBulkDeleteUsers),
  //   map((action: actions.SuccessBulkDeleteUsers) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteUsers(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailUsers(
  //             new RequestError(
  //               actions.UsersActionTypes.RequestBulkDeleteUsers,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyUsers = this.actions$.pipe(
    ofType(actions.UsersActionTypes.RequestGetEntirelyUsers),
    map((action: actions.SuccessGetEntirelyUsers) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: UserResponse) =>
            new actions.SuccessGetEntirelyUsers(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailUsers(
              new RequestError(
                actions.UsersActionTypes.RequestGetEntirelyUsers,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestChangeUserPassword = this.actions$.pipe(
    ofType(actions.UsersActionTypes.RequestChangeUserPassword),
    map((action: actions.SuccessChangeUserPassword) => action.payload),
    switchMap((payload) => {
      return this.service.changeUserPassword(payload).pipe(
        map((response) => new actions.SuccessChangeUserPassword(response)),
        catchError((error) =>
          of(
            new actions.RequestFailUsers(
              new RequestError(
                actions.UsersActionTypes.RequestChangeUserPassword,
                error
              )
            )
          )
        )
      );
    })
  );

  constructor(private actions$: Actions, private service: UsersService) {}
}
