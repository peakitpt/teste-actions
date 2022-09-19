import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { CuriaAdministrativeProcessTypesService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './curia-administrative-process-types-modal.actions';
import { CuriaAdministrativeProcessTypesResponse } from '../curia-administrative-process-types-modal.model';

@Injectable()
export class CuriaAdministrativeProcessTypesModalEffects {
  @Effect()
  RequestGetAll = this.actions$.pipe(
    ofType(actions.CuriaAdministrativeProcessTypesActionTypes.RequestGetAll),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap((payload: any) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: CuriaAdministrativeProcessTypesResponse) =>
            new actions.SuccessGetAll(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.CuriaAdministrativeProcessTypesActionTypes.RequestGetAll,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestSetSelected = this.actions$.pipe(
    ofType(
      actions.CuriaAdministrativeProcessTypesActionTypes.RequestSetSelected
    ),
    map((action: actions.SuccessSetSelected) => action.payload),
    switchMap((payload: any) => {
      return of(new actions.SuccessSetSelected(payload));
    })
  );

  constructor(
    private actions$: Actions,
    private service: CuriaAdministrativeProcessTypesService
  ) {}
}
