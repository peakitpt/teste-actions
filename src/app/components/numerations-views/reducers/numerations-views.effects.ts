import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { NumerationsViewsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './numerations-views.actions';
import {
  NumerationsView,
  NumerationsViewResponse,
} from '../numerations-view.model';

@Injectable()
export class NumerationsViewsEffects {
  @Effect()
  RequestGetAllNumerationsViews = this.actions$.pipe(
    ofType(actions.NumerationsViewsActionTypes.RequestGetAllNumerationsViews),
    map((action: actions.SuccessGetAllNumerationsViews) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: NumerationsViewResponse) =>
            new actions.SuccessGetAllNumerationsViews(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailNumerationsViews(
              new RequestError(
                actions.NumerationsViewsActionTypes.RequestGetAllNumerationsViews,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetNumerationsView = this.actions$.pipe(
    ofType(actions.NumerationsViewsActionTypes.RequestGetNumerationsView),
    map((action: actions.SuccessGetNumerationsView) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map(
          (response: NumerationsView) =>
            new actions.SuccessGetNumerationsView(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailNumerationsViews(
              new RequestError(
                actions.NumerationsViewsActionTypes.RequestGetNumerationsView,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostNumerationsView = this.actions$.pipe(
    ofType(actions.NumerationsViewsActionTypes.RequestPostNumerationsView),
    map((action: actions.SuccessPostNumerationsView) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPostNumerationsView(response)),
        catchError((error) => {
          return of(
            new actions.RequestFailNumerationsViews(
              new RequestError(
                actions.NumerationsViewsActionTypes.RequestPostNumerationsView,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutNumerationsView = this.actions$.pipe(
    ofType(actions.NumerationsViewsActionTypes.RequestPutNumerationsView),
    map((action: actions.SuccessPutNumerationsView) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPutNumerationsView(response)),
        catchError((error) =>
          of(
            new actions.RequestFailNumerationsViews(
              new RequestError(
                actions.NumerationsViewsActionTypes.RequestPutNumerationsView,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteNumerationsView = this.actions$.pipe(
    ofType(actions.NumerationsViewsActionTypes.RequestDeleteNumerationsView),
    map((action: actions.SuccessDeleteNumerationsView) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDeleteNumerationsView(response)),
        catchError((error) =>
          of(
            new actions.RequestFailNumerationsViews(
              new RequestError(
                actions.NumerationsViewsActionTypes.RequestDeleteNumerationsView,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteNumerationsViews = this.actions$.pipe(
  //   ofType(actions.NumerationsViewsActionTypes.RequestBulkDeleteNumerationsViews),
  //   map((action: actions.SuccessBulkDeleteNumerationsViews) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteNumerationsViews(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailNumerationsViews(
  //             new RequestError(
  //               actions.NumerationsViewsActionTypes.RequestBulkDeleteNumerationsViews,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyNumerationsViews = this.actions$.pipe(
    ofType(
      actions.NumerationsViewsActionTypes.RequestGetEntirelyNumerationsViews
    ),
    map((action: actions.SuccessGetEntirelyNumerationsViews) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: NumerationsViewResponse) =>
            new actions.SuccessGetEntirelyNumerationsViews(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailNumerationsViews(
              new RequestError(
                actions.NumerationsViewsActionTypes.RequestGetEntirelyNumerationsViews,
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
    private service: NumerationsViewsService
  ) {}
}
