import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ParishionersService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './parishioners-modal.actions';
import { ParishionersResponse } from '../parishioners-modal.model';

@Injectable()
export class ParishionersModalEffects {
  @Effect()
  RequestGetAll = this.actions$.pipe(
    ofType(actions.ParishionersActionTypes.RequestGetAll),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap((payload: any) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: ParishionersResponse) =>
            new actions.SuccessGetAll(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.ParishionersActionTypes.RequestGetAll,
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
    ofType(actions.ParishionersActionTypes.RequestSetSelected),
    map((action: actions.SuccessSetSelected) => action.payload),
    switchMap((payload: any) => {
      return of(new actions.SuccessSetSelected(payload));
    })
  );

  constructor(
    private actions$: Actions,
    private service: ParishionersService
  ) {}
}
