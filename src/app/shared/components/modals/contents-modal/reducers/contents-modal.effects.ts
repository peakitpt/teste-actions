import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ContentsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './contents-modal.actions';
import { ContentsResponse } from '../contents-modal.model';

@Injectable()
export class ContentsModalEffects {
  @Effect()
  RequestGetAll = this.actions$.pipe(
    ofType(actions.ContentsActionTypes.RequestGetAll),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap((payload: any) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: ContentsResponse) => new actions.SuccessGetAll(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(actions.ContentsActionTypes.RequestGetAll, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestSetSelected = this.actions$.pipe(
    ofType(actions.ContentsActionTypes.RequestSetSelected),
    map((action: actions.SuccessSetSelected) => action.payload),
    switchMap((payload: any) => {
      return of(new actions.SuccessSetSelected(payload));
    })
  );

  constructor(private actions$: Actions, private service: ContentsService) {}
}
