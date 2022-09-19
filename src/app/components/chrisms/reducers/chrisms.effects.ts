import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import {
  ChrismsEntitiesService,
  ChrismsService,
  ReportsService,
  SubscriptionReportsService,
} from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './chrisms.actions';
import { Chrism, ChrismResponse, ChrismEntity } from '../chrism.model';
import { ReportResponse } from '../../reports/report.model';

@Injectable()
export class ChrismsEffects {
  @Effect()
  RequestGetAll = this.actions$.pipe(
    ofType(actions.ChrismsActionTypes.RequestGetAll),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map((response: ChrismResponse) => new actions.SuccessGetAll(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.ChrismsActionTypes.RequestGetAll, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGet = this.actions$.pipe(
    ofType(actions.ChrismsActionTypes.RequestGet),
    map((action: actions.SuccessGet) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map((response: Chrism) => new actions.SuccessGet(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.ChrismsActionTypes.RequestGet, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPost = this.actions$.pipe(
    ofType(actions.ChrismsActionTypes.RequestPost),
    map((action: actions.SuccessPost) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPost(response)),
        catchError((error) => {
          return of(
            new actions.RequestFail(
              new RequestError(actions.ChrismsActionTypes.RequestPost, error)
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPut = this.actions$.pipe(
    ofType(actions.ChrismsActionTypes.RequestPut),
    map((action: actions.SuccessPut) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPut(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.ChrismsActionTypes.RequestPut, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDelete = this.actions$.pipe(
    ofType(actions.ChrismsActionTypes.RequestDelete),
    map((action: actions.SuccessDelete) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDelete(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.ChrismsActionTypes.RequestDelete, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestBulkDelete = this.actions$.pipe(
    ofType(actions.ChrismsActionTypes.RequestBulkDelete),
    map((action: actions.SuccessBulkDelete) => action.payload),
    switchMap((payload) => {
      return this.service.bulkDelete(payload).pipe(
        map((response) => {
          return new actions.SuccessBulkDelete(response);
        }),
        catchError((error) => {
          return of(
            new actions.RequestFail(
              new RequestError(
                actions.ChrismsActionTypes.RequestBulkDelete,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestGetEntirely = this.actions$.pipe(
    ofType(actions.ChrismsActionTypes.RequestGetEntirely),
    map((action: actions.SuccessGetEntirely) => {
      return { payload: action.payload, isDetailsList: action.isDetailsList };
    }),
    switchMap((payload) => {
      return this.service.getAll(payload.payload).pipe(
        map(
          (response: ChrismResponse) => new actions.SuccessGetEntirely(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.ChrismsActionTypes.RequestGetEntirely,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetChrismEntitiesFormReports = this.actions$.pipe(
    ofType(actions.ChrismsActionTypes.RequestGetChrismEntitiesFormReports),
    map(
      (action: actions.SuccessGetChrismEntitiesFormReports) => action.payload
    ),
    switchMap((payload) => {
      return this.reportsService.getAll(payload).pipe(
        map(
          (response: ReportResponse) =>
            new actions.SuccessGetChrismEntitiesFormReports(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailChrismEntitiesReports(
              new RequestError(
                actions.ChrismsActionTypes.RequestGetChrismEntitiesFormReports,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetChrismEntitiesFormSubscriptionReports = this.actions$.pipe(
    ofType(
      actions.ChrismsActionTypes.RequestGetChrismEntitiesFormSubscriptionReports
    ),
    map(
      (action: actions.SuccessGetChrismEntitiesFormSubscriptionReports) =>
        action.payload
    ),
    switchMap((payload) => {
      return this.susbcriptionReportsService
        .getViewSubscriptionReports(payload)
        .pipe(
          map(
            (response: ReportResponse) =>
              new actions.SuccessGetChrismEntitiesFormSubscriptionReports(
                response
              )
          ),
          catchError((error) =>
            of(
              new actions.RequestFailChrismEntitiesReports(
                new RequestError(
                  actions.ChrismsActionTypes.RequestGetChrismEntitiesFormSubscriptionReports,
                  error
                )
              )
            )
          )
        );
    })
  );

  @Effect()
  RequestSaveAndGenerateDocument = this.actions$.pipe(
    ofType(actions.ChrismsActionTypes.RequestSaveAndGenerateDocument),
    map((action: actions.SuccessSaveAndGenerateDocument) => action.payload),
    switchMap((payload) => {
      return this.chrismsEntitiesService
        .saveAndGenerateDocument(payload as ChrismEntity)
        .pipe(
          map(
            (response) => new actions.SuccessSaveAndGenerateDocument(response)
          ),
          catchError((error) =>
            of(
              new actions.RequestFailSaveAndGenerateDocument(
                new RequestError(
                  actions.ChrismsActionTypes.RequestSaveAndGenerateDocument,
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
    private service: ChrismsService,
    private chrismsEntitiesService: ChrismsEntitiesService,
    private reportsService: ReportsService,
    private susbcriptionReportsService: SubscriptionReportsService
  ) {}
}
