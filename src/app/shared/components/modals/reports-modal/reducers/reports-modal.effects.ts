import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ReportsV1Service } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './reports-modal.actions';
import { ReportResponse } from '../reports-modal.model';

@Injectable()
export class ReportsModalEffects {
  @Effect()
  RequestGetAll = this.actions$.pipe(
    ofType(actions.ReportsActionTypes.RequestGetAll),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap((payload: any) => {
      return this.service.getAll(payload).pipe(
        map((response: ReportResponse) => new actions.SuccessGetAll(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.ReportsActionTypes.RequestGetAll, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestSetSelected = this.actions$.pipe(
    ofType(actions.ReportsActionTypes.RequestSetSelected),
    map((action: actions.SuccessSetSelected) => action.payload),
    switchMap((payload: any) => {
      return of(new actions.SuccessSetSelected(payload));
    })
  );

  constructor(private actions$: Actions, private service: ReportsV1Service) {}
}
