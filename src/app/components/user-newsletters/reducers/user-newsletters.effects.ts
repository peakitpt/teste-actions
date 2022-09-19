import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { NewsletterReadStatusesService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './user-newsletters.actions';
import {
  UserNewsletter,
  UserNewsletterResponse
} from '../user-newsletter.model';

@Injectable()
export class UserNewslettersEffects {
  @Effect()
  RequestGetAllUserNewsletters = this.actions$.pipe(
    ofType(actions.UserNewslettersActionTypes.RequestGetAllUserNewsletters),
    map((action: actions.SuccessGetAllUserNewsletters) => action.payload),
    switchMap(payload => {
      return this.service.getAll(payload).pipe(
        map(
          (response: UserNewsletterResponse) =>
            new actions.SuccessGetAllUserNewsletters(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFailUserNewsletters(
              new RequestError(
                actions.UserNewslettersActionTypes.RequestGetAllUserNewsletters,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetUserNewsletter = this.actions$.pipe(
    ofType(actions.UserNewslettersActionTypes.RequestGetUserNewsletter),
    map((action: actions.SuccessGetUserNewsletter) => action.payload),
    switchMap(payload => {
      return this.service.getOne(+payload).pipe(
        map(
          (response: UserNewsletter) =>
            new actions.SuccessGetUserNewsletter(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFailUserNewsletters(
              new RequestError(
                actions.UserNewslettersActionTypes.RequestGetUserNewsletter,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostUserNewsletter = this.actions$.pipe(
    ofType(actions.UserNewslettersActionTypes.RequestPostUserNewsletter),
    map((action: actions.SuccessPostUserNewsletter) => action.payload),
    switchMap(payload => {
      return this.service.create(payload).pipe(
        map(response => new actions.SuccessPostUserNewsletter(response)),
        catchError(error => {
          return of(
            new actions.RequestFailUserNewsletters(
              new RequestError(
                actions.UserNewslettersActionTypes.RequestPostUserNewsletter,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutUserNewsletter = this.actions$.pipe(
    ofType(actions.UserNewslettersActionTypes.RequestPutUserNewsletter),
    map((action: actions.SuccessPutUserNewsletter) => action.payload),
    switchMap(payload => {
      return this.service.update(payload).pipe(
        map(response => new actions.SuccessPutUserNewsletter(response)),
        catchError(error =>
          of(
            new actions.RequestFailUserNewsletters(
              new RequestError(
                actions.UserNewslettersActionTypes.RequestPutUserNewsletter,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteUserNewsletter = this.actions$.pipe(
    ofType(actions.UserNewslettersActionTypes.RequestDeleteUserNewsletter),
    map((action: actions.SuccessDeleteUserNewsletter) => action.payload),
    switchMap(payload => {
      return this.service.delete(+payload).pipe(
        map(response => new actions.SuccessDeleteUserNewsletter(response)),
        catchError(error =>
          of(
            new actions.RequestFailUserNewsletters(
              new RequestError(
                actions.UserNewslettersActionTypes.RequestDeleteUserNewsletter,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteUserNewsletters = this.actions$.pipe(
  //   ofType(actions.UserNewslettersActionTypes.RequestBulkDeleteUserNewsletters),
  //   map((action: actions.SuccessBulkDeleteUserNewsletters) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteUserNewsletters(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailUserNewsletters(
  //             new RequestError(
  //               actions.UserNewslettersActionTypes.RequestBulkDeleteUserNewsletters,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyUserNewsletters = this.actions$.pipe(
    ofType(
      actions.UserNewslettersActionTypes.RequestGetEntirelyUserNewsletters
    ),
    map((action: actions.SuccessGetEntirelyUserNewsletters) => action.payload),
    switchMap(payload => {
      return this.service.getAll(payload).pipe(
        map(
          (response: UserNewsletterResponse) =>
            new actions.SuccessGetEntirelyUserNewsletters(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFailUserNewsletters(
              new RequestError(
                actions.UserNewslettersActionTypes.RequestGetEntirelyUserNewsletters,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestToggleUserNewsletter = this.actions$.pipe(
    ofType(actions.UserNewslettersActionTypes.RequestToggleUserNewsletter),
    map((action: actions.SuccessToggleUserNewsletter) => action.payload),
    switchMap(payload => {
      return this.service.toggleStatus(+payload).pipe(
        map(
          (response: UserNewsletter) =>
            new actions.SuccessToggleUserNewsletter(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFailUserNewsletters(
              new RequestError(
                actions.UserNewslettersActionTypes.RequestToggleUserNewsletter,
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
    private service: NewsletterReadStatusesService
  ) {}
}
