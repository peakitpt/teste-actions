import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ParishionerProcessesService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './parishioner-processes.actions';
import { ParishionerProcessResponse } from '../parishioner-process.model';

@Injectable()
export class ParishionerProcessesEffects {
  @Effect()
  RequestGetAllParishionerProcesses = this.actions$.pipe(
    ofType(
      actions.ParishionerProcessesActionTypes.RequestGetAllParishionerProcesses
    ),
    map((action: any) => {
      return action;
    }),
    switchMap((payload) => {
      return this.service
        .getParishionerProcess(payload.id, payload.payload)
        .pipe(
          map(
            (response: ParishionerProcessResponse) =>
              new actions.SuccessGetAllParishionerProcesses(response)
          ),
          catchError((error) =>
            of(
              new actions.RequestFailParishionerProcesses(
                new RequestError(
                  actions.ParishionerProcessesActionTypes.RequestGetAllParishionerProcesses,
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
    private service: ParishionerProcessesService
  ) {}
}
