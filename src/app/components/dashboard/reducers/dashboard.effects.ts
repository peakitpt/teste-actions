import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { DashboardService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './dashboard.actions';

@Injectable()
export class DashboardEffects {
  @Effect()
  RequestGetEntities = this.actions$.pipe(
    ofType(actions.DashboardActionTypes.RequestGetEntities),
    map((action: actions.SuccessGetEntities) => action.payload),
    switchMap((payload) => {
      return this.service.getEntitiesStatistics().pipe(
        map((response: any) => new actions.SuccessGetEntities(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.DashboardActionTypes.RequestGetEntities,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetBaptisms = this.actions$.pipe(
    ofType(actions.DashboardActionTypes.RequestGetBaptisms),
    map((action: actions.SuccessGetBaptisms) => action.payload),
    switchMap((payload) => {
      return this.service.getBaptismsStatistics().pipe(
        map((response: any) => new actions.SuccessGetBaptisms(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.DashboardActionTypes.RequestGetBaptisms,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetBaptismsCuria = this.actions$.pipe(
    ofType(actions.DashboardActionTypes.RequestGetBaptismsCuria),
    map((action: actions.SuccessGetBaptismsCuria) => action.payload),
    switchMap((payload) => {
      return this.service.getBaptismsCuriaStatistics().pipe(
        map((response: any) => new actions.SuccessGetBaptismsCuria(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.DashboardActionTypes.RequestGetBaptismsCuria,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetWeddings = this.actions$.pipe(
    ofType(actions.DashboardActionTypes.RequestGetWeddings),
    map((action: actions.SuccessGetWeddings) => action.payload),
    switchMap((payload) => {
      return this.service.getWeddingsStatistics().pipe(
        map((response: any) => new actions.SuccessGetWeddings(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.DashboardActionTypes.RequestGetWeddings,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetWeddingsCuria = this.actions$.pipe(
    ofType(actions.DashboardActionTypes.RequestGetWeddingsCuria),
    map((action: actions.SuccessGetWeddingsCuria) => action.payload),
    switchMap((payload) => {
      return this.service.getWeddingsCuriaStatistics().pipe(
        map((response: any) => new actions.SuccessGetWeddingsCuria(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.DashboardActionTypes.RequestGetWeddingsCuria,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetAccounting = this.actions$.pipe(
    ofType(actions.DashboardActionTypes.RequestGetAccounting),
    map((action: actions.SuccessGetAccounting) => action.payload),
    switchMap((payload) => {
      return this.service.getAccountingStatistics(payload).pipe(
        map((response: any) => new actions.SuccessGetAccounting(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.DashboardActionTypes.RequestGetAccounting,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetPendingProcesses = this.actions$.pipe(
    ofType(actions.DashboardActionTypes.RequestGetPendingProcesses),
    map((action: actions.SuccessGetPendingProcesses) => action.payload),
    switchMap((payload) => {
      return this.service.getPendingProcessesStatistics().pipe(
        map(
          (response: any) => new actions.SuccessGetPendingProcesses(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.DashboardActionTypes.RequestGetPendingProcesses,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetCuriaPendingProcesses = this.actions$.pipe(
    ofType(actions.DashboardActionTypes.RequestGetCuriaPendingProcesses),
    map((action: actions.SuccessGetCuriaPendingProcesses) => action.payload),
    switchMap((payload) => {
      return this.service.getCuriaPendingProcessesStatistics().pipe(
        map(
          (response: any) =>
            new actions.SuccessGetCuriaPendingProcesses(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.DashboardActionTypes.RequestGetCuriaPendingProcesses,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetLastProcesses = this.actions$.pipe(
    ofType(actions.DashboardActionTypes.RequestGetLastProcesses),
    map((action: actions.SuccessGetLastProcesses) => action.payload),
    switchMap((payload) => {
      return this.service.getLastProcessesStatistics().pipe(
        map((response: any) => new actions.SuccessGetLastProcesses(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.DashboardActionTypes.RequestGetLastProcesses,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetAlerts = this.actions$.pipe(
    ofType(actions.DashboardActionTypes.RequestGetAlerts),
    map((action: actions.SuccessGetAlerts) => action.payload),
    switchMap((payload) => {
      return this.service.getAlertsStatistics().pipe(
        map((response: any) => new actions.SuccessGetAlerts(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.DashboardActionTypes.RequestGetAlerts,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetPriestsChangesRequests = this.actions$.pipe(
    ofType(actions.DashboardActionTypes.RequestGetPriestsChangesRequests),
    map((action: actions.SuccessGetPriestsChangesRequests) => action.payload),
    switchMap((payload) => {
      return this.service.getPriestsChangesRequestsStatistics().pipe(
        map(
          (response: any) =>
            new actions.SuccessGetPriestsChangesRequests(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.DashboardActionTypes.RequestGetPriestsChangesRequests,
                error
              )
            )
          )
        )
      );
    })
  );

  constructor(private actions$: Actions, private service: DashboardService) {}
}
