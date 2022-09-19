import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ReportingsPermissionsService } from '@peakitpt/ui-kyrios-api';
import { ViewsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './reports-permissions.actions';
import {
  ReportPermission,
  ReportPermissionResponse
} from '../report-permission.model';

@Injectable()
export class ReportsPermissionsEffects {
  @Effect()
  RequestGetAllReportsPermissions = this.actions$.pipe(
    ofType(
      actions.ReportsPermissionsActionTypes.RequestGetAllReportsPermissions
    ),
    map((action: actions.SuccessGetAllReportsPermissions) => action.payload),
    switchMap(payload => {
      return this.service.getAll(payload).pipe(
        map(
          (response: ReportPermissionResponse) =>
            new actions.SuccessGetAllReportsPermissions(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFailReportsPermissions(
              new RequestError(
                actions.ReportsPermissionsActionTypes.RequestGetAllReportsPermissions,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetReport = this.actions$.pipe(
    ofType(actions.ReportsPermissionsActionTypes.RequestGetReport),
    map((action: actions.SuccessGetReport) => action.payload),
    switchMap(payload => {
      return this.service.getOne(+payload).pipe(
        map(
          (response: ReportPermission) => new actions.SuccessGetReport(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFailReportsPermissions(
              new RequestError(
                actions.ReportsPermissionsActionTypes.RequestGetReport,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostReport = this.actions$.pipe(
    ofType(actions.ReportsPermissionsActionTypes.RequestPostReport),
    map((action: actions.SuccessPostReport) => action.payload),
    switchMap(payload => {
      return this.service.create(payload).pipe(
        map(response => new actions.SuccessPostReport(response)),
        catchError(error => {
          return of(
            new actions.RequestFailReportsPermissions(
              new RequestError(
                actions.ReportsPermissionsActionTypes.RequestPostReport,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutReport = this.actions$.pipe(
    ofType(actions.ReportsPermissionsActionTypes.RequestPutReport),
    map((action: actions.SuccessPutReport) => action.payload),
    switchMap(payload => {
      return this.service.update(payload).pipe(
        map(response => new actions.SuccessPutReport(response)),
        catchError(error =>
          of(
            new actions.RequestFailReportsPermissions(
              new RequestError(
                actions.ReportsPermissionsActionTypes.RequestPutReport,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestUpdateReportPermission = this.actions$.pipe(
    ofType(actions.ReportsPermissionsActionTypes.RequestUpdateReportPermission),
    map((action: actions.SuccessUpdateReportPermission) => action.payload),
    switchMap(payload => {
      return this.service.updatePermissions(payload).pipe(
        map(response => new actions.SuccessUpdateReportPermission(response)),
        catchError(error =>
          of(
            new actions.RequestFailReportsPermissions(
              new RequestError(
                actions.ReportsPermissionsActionTypes.RequestUpdateReportPermission,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteReport = this.actions$.pipe(
    ofType(actions.ReportsPermissionsActionTypes.RequestDeleteReport),
    map((action: actions.SuccessDeleteReport) => action.payload),
    switchMap(payload => {
      return this.service.delete(+payload).pipe(
        map(response => new actions.SuccessDeleteReport(response)),
        catchError(error =>
          of(
            new actions.RequestFailReportsPermissions(
              new RequestError(
                actions.ReportsPermissionsActionTypes.RequestDeleteReport,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteReportsPermissions = this.actions$.pipe(
  //   ofType(actions.ReportsPermissionsActionTypes.RequestBulkDeleteReportsPermissions),
  //   map((action: actions.SuccessBulkDeleteReportsPermissions) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteReportsPermissions(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailReportsPermissions(
  //             new RequestError(
  //               actions.ReportsPermissionsActionTypes.RequestBulkDeleteReportsPermissions,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  constructor(
    private actions$: Actions,
    private service: ReportingsPermissionsService,
    private viewsService: ViewsService
  ) {}
}
