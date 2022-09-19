import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import {
  FileManagerService,
  ReportmanagmentsService,
} from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './reportmanagments.actions';
import { Reportmanagment } from '../reportmanagment.model';

@Injectable()
export class ReportmanagmentsEffects {
  @Effect()
  RequestGetAll = this.actions$.pipe(
    ofType(actions.ReportmanagmentsActionTypes.RequestGetAll),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap(() => {
      return this.service.getAll().pipe(
        map((response: any) => {
          return new actions.SuccessGetReportmanagment(response);
        }),
        catchError((error) =>
          of(
            new actions.RequestFailReportmanagments(
              new RequestError(
                actions.ReportmanagmentsActionTypes.RequestDeleteReportmanagment,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetReportmanagment = this.actions$.pipe(
    ofType(actions.ReportmanagmentsActionTypes.RequestGetReportmanagment),
    map((action: actions.SuccessGetReportmanagment) => action.payload),
    switchMap((payload: any) => {
      return this.service.getOne(payload).pipe(
        map(
          (response: Reportmanagment) =>
            new actions.SuccessGetReportmanagment(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailReportmanagments(
              new RequestError(
                actions.ReportmanagmentsActionTypes.RequestDeleteReportmanagment,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostReportmanagment = this.actions$.pipe(
    ofType(actions.ReportmanagmentsActionTypes.RequestPostReportmanagment),
    map((action: actions.SuccessPostReportmanagment) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPostReportmanagment(response)),
        catchError((error) => {
          return of(
            new actions.RequestFailReportmanagments(
              new RequestError(
                actions.ReportmanagmentsActionTypes.RequestPostReportmanagment,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutReportmanagment = this.actions$.pipe(
    ofType(actions.ReportmanagmentsActionTypes.RequestPutReportmanagment),
    map((action: actions.SuccessPutReportmanagment) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPutReportmanagment(response)),
        catchError((error) =>
          of(
            new actions.RequestFailReportmanagments(
              new RequestError(
                actions.ReportmanagmentsActionTypes.RequestPutReportmanagment,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteReportmanagment = this.actions$.pipe(
    ofType(actions.ReportmanagmentsActionTypes.RequestDeleteReportmanagment),
    map((action: actions.SuccessDeleteReportmanagment) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDeleteReportmanagment(response)),
        catchError((error) =>
          of(
            new actions.RequestFailReportmanagments(
              new RequestError(
                actions.ReportmanagmentsActionTypes.RequestDeleteReportmanagment,
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
    ofType(actions.ReportmanagmentsActionTypes.RequestGetNew),
    map((action: actions.SuccessGetNew) => action.payload),
    switchMap((payload) => {
      return this.service.getNew().pipe(
        map((response: Reportmanagment) => new actions.SuccessGetNew(response)),
        catchError((error) =>
          of(
            new actions.RequestFailReportmanagments(
              new RequestError(
                actions.ReportmanagmentsActionTypes.RequestDeleteReportmanagment,
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
    ofType(actions.ReportmanagmentsActionTypes.RequestPostUploadFile),
    map((action: actions.SuccessPostUploadFile) => action.payload),
    switchMap((payload) => {
      return this.fileManagerService.upload(payload).pipe(
        map((response) => new actions.SuccessPostUploadFile(response)),
        catchError((error) => {
          return of(
            new actions.RequestFailReportmanagments(
              new RequestError(
                actions.ReportmanagmentsActionTypes.RequestDeleteReportmanagment,
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
    private service: ReportmanagmentsService,
    private fileManagerService: FileManagerService
  ) {}
}
