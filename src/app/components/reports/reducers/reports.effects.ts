import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import {
  ReportsService,
  SubscriptionReportsService
} from '@peakitpt/ui-kyrios-api';
import { ViewsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './reports.actions';
import { Report, ReportResponse } from '../report.model';

@Injectable()
export class ReportsEffects {
  @Effect()
  RequestGetAllReports = this.actions$.pipe(
    ofType(actions.ReportsActionTypes.RequestGetAllReports),
    map((action: actions.SuccessGetAllReports) => action.payload),
    switchMap(payload => {
      return this.service.getAll(payload).pipe(
        map(
          (response: ReportResponse) =>
            new actions.SuccessGetAllReports(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFailReports(
              new RequestError(
                actions.ReportsActionTypes.RequestGetAllReports,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetListReports = this.actions$.pipe(
    ofType(actions.ReportsActionTypes.RequestGetListReports),
    map((action: actions.SuccessGetListReports) => action.payload),
    switchMap(payload => {
      return this.service.getAll(payload).pipe(
        map(
          (response: ReportResponse) =>
            new actions.SuccessGetListReports(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFailReports(
              new RequestError(
                actions.ReportsActionTypes.RequestGetListReports,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetFormReports = this.actions$.pipe(
    ofType(actions.ReportsActionTypes.RequestGetFormReports),
    map((action: actions.SuccessGetFormReports) => action.payload),
    switchMap(payload => {
      return this.service.getAll(payload).pipe(
        map(
          (response: ReportResponse) =>
            new actions.SuccessGetFormReports(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFailReports(
              new RequestError(
                actions.ReportsActionTypes.RequestGetFormReports,
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
    ofType(actions.ReportsActionTypes.RequestGetReport),
    map((action: actions.SuccessGetReport) => action.payload),
    switchMap(payload => {
      return this.service.getOne(+payload).pipe(
        map((response: Report) => new actions.SuccessGetReport(response)),
        catchError(error =>
          of(
            new actions.RequestFailReports(
              new RequestError(
                actions.ReportsActionTypes.RequestGetReport,
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
    ofType(actions.ReportsActionTypes.RequestPostReport),
    map((action: actions.SuccessPostReport) => action.payload),
    switchMap(payload => {
      return this.service.create(payload).pipe(
        map((response: any) => new actions.SuccessPostReport(response)),
        catchError(error => {
          return of(
            new actions.RequestFailReports(
              new RequestError(
                actions.ReportsActionTypes.RequestPostReport,
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
    ofType(actions.ReportsActionTypes.RequestPutReport),
    map((action: actions.SuccessPutReport) => action.payload),
    switchMap(payload => {
      return this.service.updateWithFile(payload.id, payload.payload).pipe(
        map((response: any) => new actions.SuccessPutReport(response)),
        catchError(error =>
          of(
            new actions.RequestFailReports(
              new RequestError(
                actions.ReportsActionTypes.RequestPutReport,
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
    ofType(actions.ReportsActionTypes.RequestDeleteReport),
    map((action: actions.SuccessDeleteReport) => action.payload),
    switchMap(payload => {
      return this.service.delete(+payload).pipe(
        map((response: any) => new actions.SuccessDeleteReport(response)),
        catchError(error =>
          of(
            new actions.RequestFailReports(
              new RequestError(
                actions.ReportsActionTypes.RequestDeleteReport,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetAllViews = this.actions$.pipe(
    ofType(actions.ReportsActionTypes.RequestGetAllViews),
    map((action: actions.SuccessGetAllViews) => action.payload),
    switchMap(payload => {
      return this.viewsService.getAll(payload).pipe(
        map(
          (response: ReportResponse) => new actions.SuccessGetAllViews(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFailReports(
              new RequestError(
                actions.ReportsActionTypes.RequestGetAllViews,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetListSubscriptionReports = this.actions$.pipe(
    ofType(actions.ReportsActionTypes.RequestGetListSubscriptionReports),
    map((action: actions.SuccessGetListSubscriptionReports) => action.payload),
    switchMap(payload => {
      return this.susbcriptionReportsService
        .getViewSubscriptionReports(payload)
        .pipe(
          map(
            (response: ReportResponse) =>
              new actions.SuccessGetListSubscriptionReports(response)
          ),
          catchError(error =>
            of(
              new actions.RequestFailReports(
                new RequestError(
                  actions.ReportsActionTypes.RequestGetListSubscriptionReports,
                  error
                )
              )
            )
          )
        );
    })
  );

  @Effect()
  RequestGetFormSubscriptionReports = this.actions$.pipe(
    ofType(actions.ReportsActionTypes.RequestGetFormSubscriptionReports),
    map((action: actions.SuccessGetFormSubscriptionReports) => action.payload),
    switchMap(payload => {
      return this.susbcriptionReportsService
        .getViewSubscriptionReports(payload)
        .pipe(
          map(
            (response: ReportResponse) =>
              new actions.SuccessGetFormSubscriptionReports(response)
          ),
          catchError(error =>
            of(
              new actions.RequestFailReports(
                new RequestError(
                  actions.ReportsActionTypes.RequestGetFormSubscriptionReports,
                  error
                )
              )
            )
          )
        );
    })
  );

  // @Effect()
  // RequestBulkDeleteReports = this.actions$.pipe(
  //   ofType(actions.ReportsActionTypes.RequestBulkDeleteReports),
  //   map((action: actions.SuccessBulkDeleteReports) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteReports(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailReports(
  //             new RequestError(
  //               actions.ReportsActionTypes.RequestBulkDeleteReports,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyReports = this.actions$.pipe(
    ofType(actions.ReportsActionTypes.RequestGetEntirelyReports),
    map((action: actions.SuccessGetEntirelyReports) => action.payload),
    switchMap(payload => {
      return this.service.getAll(payload).pipe(
        map(
          (response: ReportResponse) =>
            new actions.SuccessGetEntirelyReports(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFailReports(
              new RequestError(
                actions.ReportsActionTypes.RequestGetEntirelyReports,
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
    private service: ReportsService,
    private susbcriptionReportsService: SubscriptionReportsService,
    private viewsService: ViewsService
  ) {}
}
