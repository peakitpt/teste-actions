import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import {
  FileManagerService,
  AdminStatisticsService,
} from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './admin-statistics.actions';
import { AdminStatistic } from '../admin-statistic.model';

@Injectable()
export class AdminStatisticsEffects {
  @Effect()
  RequestGetAdminStatistic = this.actions$.pipe(
    ofType(actions.AdminStatisticsActionTypes.RequestGetAdminStatistic),
    map((action: actions.SuccessGetAdminStatistic) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(null).pipe(
        map(
          (response: AdminStatistic) =>
            new actions.SuccessGetAdminStatistic(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailAdminStatistics(
              new RequestError(
                actions.AdminStatisticsActionTypes.RequestDeleteAdminStatistic,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostAdminStatistic = this.actions$.pipe(
    ofType(actions.AdminStatisticsActionTypes.RequestPostAdminStatistic),
    map((action: actions.SuccessPostAdminStatistic) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPostAdminStatistic(response)),
        catchError((error) => {
          return of(
            new actions.RequestFailAdminStatistics(
              new RequestError(
                actions.AdminStatisticsActionTypes.RequestPostAdminStatistic,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutAdminStatistic = this.actions$.pipe(
    ofType(actions.AdminStatisticsActionTypes.RequestPutAdminStatistic),
    map((action: actions.SuccessPutAdminStatistic) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPutAdminStatistic(response)),
        catchError((error) =>
          of(
            new actions.RequestFailAdminStatistics(
              new RequestError(
                actions.AdminStatisticsActionTypes.RequestPutAdminStatistic,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteAdminStatistic = this.actions$.pipe(
    ofType(actions.AdminStatisticsActionTypes.RequestDeleteAdminStatistic),
    map((action: actions.SuccessDeleteAdminStatistic) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDeleteAdminStatistic(response)),
        catchError((error) =>
          of(
            new actions.RequestFailAdminStatistics(
              new RequestError(
                actions.AdminStatisticsActionTypes.RequestDeleteAdminStatistic,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetNew = this.actions$.pipe(
    ofType(actions.AdminStatisticsActionTypes.RequestGetNew),
    map((action: actions.SuccessGetNew) => action.payload),
    switchMap((payload) => {
      return this.service.getNew().pipe(
        map((response: AdminStatistic) => new actions.SuccessGetNew(response)),
        catchError((error) =>
          of(
            new actions.RequestFailAdminStatistics(
              new RequestError(
                actions.AdminStatisticsActionTypes.RequestDeleteAdminStatistic,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostUploadFile = this.actions$.pipe(
    ofType(actions.AdminStatisticsActionTypes.RequestPostUploadFile),
    map((action: actions.SuccessPostUploadFile) => action.payload),
    switchMap((payload) => {
      return this.fileManagerService.upload(payload).pipe(
        map((response) => new actions.SuccessPostUploadFile(response)),
        catchError((error) => {
          return of(
            new actions.RequestFailAdminStatistics(
              new RequestError(
                actions.AdminStatisticsActionTypes.RequestDeleteAdminStatistic,
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
    private service: AdminStatisticsService,
    private fileManagerService: FileManagerService
  ) {}
}
