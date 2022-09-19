import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { CuriaAdministrativeProcessesService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './curia-administrative-processes.actions';
import {
  CuriaAdministrativeProcess,
  CuriaAdministrativeProcessResponse,
} from '../curia-administrative-process.model';

@Injectable()
export class CuriaAdministrativeProcessesEffects {
  @Effect()
  RequestGetAllCuriaAdministrativeProcesses = this.actions$.pipe(
    ofType(
      actions.CuriaAdministrativeProcessesActionTypes
        .RequestGetAllCuriaAdministrativeProcesses
    ),
    map(
      (action: actions.SuccessGetAllCuriaAdministrativeProcesses) =>
        action.payload
    ),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: CuriaAdministrativeProcessResponse) =>
            new actions.SuccessGetAllCuriaAdministrativeProcesses(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCuriaAdministrativeProcesses(
              new RequestError(
                actions.CuriaAdministrativeProcessesActionTypes.RequestGetAllCuriaAdministrativeProcesses,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetCuriaAdministrativeProcess = this.actions$.pipe(
    ofType(
      actions.CuriaAdministrativeProcessesActionTypes
        .RequestGetCuriaAdministrativeProcess
    ),
    map(
      (action: actions.SuccessGetCuriaAdministrativeProcess) => action.payload
    ),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map(
          (response: CuriaAdministrativeProcess) =>
            new actions.SuccessGetCuriaAdministrativeProcess(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCuriaAdministrativeProcesses(
              new RequestError(
                actions.CuriaAdministrativeProcessesActionTypes.RequestGetCuriaAdministrativeProcess,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostCuriaAdministrativeProcess = this.actions$.pipe(
    ofType(
      actions.CuriaAdministrativeProcessesActionTypes
        .RequestPostCuriaAdministrativeProcess
    ),
    map(
      (action: actions.SuccessPostCuriaAdministrativeProcess) => action.payload
    ),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map(
          (response) =>
            new actions.SuccessPostCuriaAdministrativeProcess(response)
        ),
        catchError((error) => {
          return of(
            new actions.RequestFailCuriaAdministrativeProcesses(
              new RequestError(
                actions.CuriaAdministrativeProcessesActionTypes.RequestPostCuriaAdministrativeProcess,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutCuriaAdministrativeProcess = this.actions$.pipe(
    ofType(
      actions.CuriaAdministrativeProcessesActionTypes
        .RequestPutCuriaAdministrativeProcess
    ),
    map(
      (action: actions.SuccessPutCuriaAdministrativeProcess) => action.payload
    ),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map(
          (response) =>
            new actions.SuccessPutCuriaAdministrativeProcess(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCuriaAdministrativeProcesses(
              new RequestError(
                actions.CuriaAdministrativeProcessesActionTypes.RequestPutCuriaAdministrativeProcess,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteCuriaAdministrativeProcess = this.actions$.pipe(
    ofType(
      actions.CuriaAdministrativeProcessesActionTypes
        .RequestDeleteCuriaAdministrativeProcess
    ),
    map(
      (action: actions.SuccessDeleteCuriaAdministrativeProcess) =>
        action.payload
    ),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map(
          (response) =>
            new actions.SuccessDeleteCuriaAdministrativeProcess(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCuriaAdministrativeProcesses(
              new RequestError(
                actions.CuriaAdministrativeProcessesActionTypes.RequestDeleteCuriaAdministrativeProcess,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteCuriaAdministrativeProcesses = this.actions$.pipe(
  //   ofType(actions.CuriaAdministrativeProcessesActionTypes.RequestBulkDeleteCuriaAdministrativeProcesses),
  //   map((action: actions.SuccessBulkDeleteCuriaAdministrativeProcesses) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteCuriaAdministrativeProcesses(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailCuriaAdministrativeProcesses(
  //             new RequestError(
  //               actions.CuriaAdministrativeProcessesActionTypes.RequestBulkDeleteCuriaAdministrativeProcesses,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyCuriaAdministrativeProcesses = this.actions$.pipe(
    ofType(
      actions.CuriaAdministrativeProcessesActionTypes
        .RequestGetEntirelyCuriaAdministrativeProcesses
    ),
    map(
      (action: actions.SuccessGetEntirelyCuriaAdministrativeProcesses) =>
        action.payload
    ),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: CuriaAdministrativeProcessResponse) =>
            new actions.SuccessGetEntirelyCuriaAdministrativeProcesses(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCuriaAdministrativeProcesses(
              new RequestError(
                actions.CuriaAdministrativeProcessesActionTypes.RequestGetEntirelyCuriaAdministrativeProcesses,
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
    ofType(actions.CuriaAdministrativeProcessesActionTypes.RequestGetNew),
    map((action: actions.SuccessGetNew) => action.payload),
    switchMap(() => {
      return this.service.getNew().pipe(
        map(
          (response: CuriaAdministrativeProcess) =>
            new actions.SuccessGetNew(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCuriaAdministrativeProcesses(
              new RequestError(
                actions.CuriaAdministrativeProcessesActionTypes.RequestGetNew,
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
    private service: CuriaAdministrativeProcessesService
  ) {}
}
