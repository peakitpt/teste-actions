import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ReportsGroupsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './reports-groups.actions';
import { ReportsGroup, ReportsGroupResponse } from '../reports-group.model';

@Injectable()
export class ReportsGroupsEffects {
  @Effect()
  RequestGetAllReportsGroups = this.actions$.pipe(
    ofType(actions.ReportsGroupsActionTypes.RequestGetAllReportsGroups),
    map((action: actions.SuccessGetAllReportsGroups) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: ReportsGroupResponse) =>
            new actions.SuccessGetAllReportsGroups(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailReportsGroups(
              new RequestError(
                actions.ReportsGroupsActionTypes.RequestGetAllReportsGroups,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetReportsGroup = this.actions$.pipe(
    ofType(actions.ReportsGroupsActionTypes.RequestGetReportsGroup),
    map((action: actions.SuccessGetReportsGroup) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map(
          (response: ReportsGroup) =>
            new actions.SuccessGetReportsGroup(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailReportsGroups(
              new RequestError(
                actions.ReportsGroupsActionTypes.RequestGetReportsGroup,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostReportsGroup = this.actions$.pipe(
    ofType(actions.ReportsGroupsActionTypes.RequestPostReportsGroup),
    map((action: actions.SuccessPostReportsGroup) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPostReportsGroup(response)),
        catchError((error) => {
          return of(
            new actions.RequestFailReportsGroups(
              new RequestError(
                actions.ReportsGroupsActionTypes.RequestPostReportsGroup,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutReportsGroup = this.actions$.pipe(
    ofType(actions.ReportsGroupsActionTypes.RequestPutReportsGroup),
    map((action: actions.SuccessPutReportsGroup) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPutReportsGroup(response)),
        catchError((error) =>
          of(
            new actions.RequestFailReportsGroups(
              new RequestError(
                actions.ReportsGroupsActionTypes.RequestPutReportsGroup,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteReportsGroup = this.actions$.pipe(
    ofType(actions.ReportsGroupsActionTypes.RequestDeleteReportsGroup),
    map((action: actions.SuccessDeleteReportsGroup) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDeleteReportsGroup(response)),
        catchError((error) =>
          of(
            new actions.RequestFailReportsGroups(
              new RequestError(
                actions.ReportsGroupsActionTypes.RequestDeleteReportsGroup,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteReportsGroups = this.actions$.pipe(
  //   ofType(actions.ReportsGroupsActionTypes.RequestBulkDeleteReportsGroups),
  //   map((action: actions.SuccessBulkDeleteReportsGroups) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteReportsGroups(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailReportsGroups(
  //             new RequestError(
  //               actions.ReportsGroupsActionTypes.RequestBulkDeleteReportsGroups,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyReportsGroups = this.actions$.pipe(
    ofType(actions.ReportsGroupsActionTypes.RequestGetEntirelyReportsGroups),
    map((action: actions.SuccessGetEntirelyReportsGroups) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: ReportsGroupResponse) =>
            new actions.SuccessGetEntirelyReportsGroups(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailReportsGroups(
              new RequestError(
                actions.ReportsGroupsActionTypes.RequestGetEntirelyReportsGroups,
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
    private service: ReportsGroupsService
  ) {}
}
