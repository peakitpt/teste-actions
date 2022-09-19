import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import {
  FileManagerService,
  SubscriptionStatisticsService,
} from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './subscription-statistics.actions';
import { SubscriptionStatistic } from '../subscription-statistic.model';

@Injectable()
export class SubscriptionStatisticsEffects {
  @Effect()
  RequestGetSubscriptionStatistic = this.actions$.pipe(
    ofType(
      actions.SubscriptionStatisticsActionTypes.RequestGetSubscriptionStatistic
    ),
    map((action: actions.SuccessGetSubscriptionStatistic) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(null).pipe(
        map(
          (response: SubscriptionStatistic) =>
            new actions.SuccessGetSubscriptionStatistic(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailSubscriptionStatistics(
              new RequestError(
                actions.SubscriptionStatisticsActionTypes.RequestDeleteSubscriptionStatistic,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostSubscriptionStatistic = this.actions$.pipe(
    ofType(
      actions.SubscriptionStatisticsActionTypes.RequestPostSubscriptionStatistic
    ),
    map((action: actions.SuccessPostSubscriptionStatistic) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map(
          (response) => new actions.SuccessPostSubscriptionStatistic(response)
        ),
        catchError((error) => {
          return of(
            new actions.RequestFailSubscriptionStatistics(
              new RequestError(
                actions.SubscriptionStatisticsActionTypes.RequestPostSubscriptionStatistic,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutSubscriptionStatistic = this.actions$.pipe(
    ofType(
      actions.SubscriptionStatisticsActionTypes.RequestPutSubscriptionStatistic
    ),
    map((action: actions.SuccessPutSubscriptionStatistic) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map(
          (response) => new actions.SuccessPutSubscriptionStatistic(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailSubscriptionStatistics(
              new RequestError(
                actions.SubscriptionStatisticsActionTypes.RequestPutSubscriptionStatistic,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteSubscriptionStatistic = this.actions$.pipe(
    ofType(
      actions.SubscriptionStatisticsActionTypes
        .RequestDeleteSubscriptionStatistic
    ),
    map((action: actions.SuccessDeleteSubscriptionStatistic) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map(
          (response) => new actions.SuccessDeleteSubscriptionStatistic(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailSubscriptionStatistics(
              new RequestError(
                actions.SubscriptionStatisticsActionTypes.RequestDeleteSubscriptionStatistic,
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
    ofType(actions.SubscriptionStatisticsActionTypes.RequestGetNew),
    map((action: actions.SuccessGetNew) => action.payload),
    switchMap((payload) => {
      return this.service.getNew().pipe(
        map(
          (response: SubscriptionStatistic) =>
            new actions.SuccessGetNew(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailSubscriptionStatistics(
              new RequestError(
                actions.SubscriptionStatisticsActionTypes.RequestDeleteSubscriptionStatistic,
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
    ofType(actions.SubscriptionStatisticsActionTypes.RequestPostUploadFile),
    map((action: actions.SuccessPostUploadFile) => action.payload),
    switchMap((payload) => {
      return this.fileManagerService.upload(payload).pipe(
        map((response) => new actions.SuccessPostUploadFile(response)),
        catchError((error) => {
          return of(
            new actions.RequestFailSubscriptionStatistics(
              new RequestError(
                actions.SubscriptionStatisticsActionTypes.RequestDeleteSubscriptionStatistic,
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
    private service: SubscriptionStatisticsService,
    private fileManagerService: FileManagerService
  ) {}
}
