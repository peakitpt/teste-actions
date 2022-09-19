import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { AccrualsProcessmentsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './accruals-processments.actions';
import {
  AccrualsProcessment,
  AccrualsProcessmentResponse,
} from '../accruals-processment.model';

@Injectable()
export class AccrualsProcessmentsEffects {
  @Effect()
  RequestGetAllAccrualsProcessments = this.actions$.pipe(
    ofType(
      actions.AccrualsProcessmentsActionTypes.RequestGetAllAccrualsProcessments
    ),
    map((action: actions.SuccessGetAllAccrualsProcessments) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: AccrualsProcessmentResponse) =>
            new actions.SuccessGetAllAccrualsProcessments(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailAccrualsProcessments(
              new RequestError(
                actions.AccrualsProcessmentsActionTypes.RequestGetAllAccrualsProcessments,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostProcessAccrual = this.actions$.pipe(
    ofType(actions.AccrualsProcessmentsActionTypes.RequestPostProcessAccrual),
    map((action: actions.SuccessPostProcessAccrual) => action.payload),
    switchMap((payload) => {
      return this.service.processAccruals(payload).pipe(
        map((response) => new actions.SuccessPostProcessAccrual(response)),
        catchError((error) => {
          return of(
            new actions.RequestFailAccrualsProcessments(
              new RequestError(
                actions.AccrualsProcessmentsActionTypes.RequestPostProcessAccrual,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestGetEntirelyAccrualsProcessments = this.actions$.pipe(
    ofType(
      actions.AccrualsProcessmentsActionTypes
        .RequestGetEntirelyAccrualsProcessments
    ),
    map(
      (action: actions.SuccessGetEntirelyAccrualsProcessments) => action.payload
    ),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: AccrualsProcessmentResponse) =>
            new actions.SuccessGetEntirelyAccrualsProcessments(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailAccrualsProcessments(
              new RequestError(
                actions.AccrualsProcessmentsActionTypes.RequestGetEntirelyAccrualsProcessments,
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
    private service: AccrualsProcessmentsService
  ) {}
}
