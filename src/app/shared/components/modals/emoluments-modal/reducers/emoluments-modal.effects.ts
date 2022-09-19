import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import {
  EmolumentsService,
  EmolumentsTypesService,
} from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './emoluments-modal.actions';
import { EmolumentsResponse } from '../emoluments-modal.model';

@Injectable()
export class EmolumentsModalEffects {
  @Effect()
  RequestGetAll = this.actions$.pipe(
    ofType(actions.EmolumentsActionTypes.RequestGetAll),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap((payload: any) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: EmolumentsResponse) => new actions.SuccessGetAll(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.EmolumentsActionTypes.RequestGetAll,
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
    ofType(actions.EmolumentsActionTypes.RequestSetSelected),
    map((action: actions.SuccessSetSelected) => action.payload),
    switchMap((payload: any) => {
      return of(new actions.SuccessSetSelected(payload));
    })
  );

  @Effect()
  RequestGetAllEmolumentTypes = this.actions$.pipe(
    ofType(actions.EmolumentsActionTypes.RequestGetAllEmolumentTypes),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap((payload: any) => {
      return this.emolumentTypesService.getAll(payload).pipe(
        map(
          (response: EmolumentsResponse) =>
            new actions.SuccessGetAllEmolumentTypes(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.EmolumentsActionTypes.RequestGetAllEmolumentTypes,
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
    private service: EmolumentsService,
    private emolumentTypesService: EmolumentsTypesService
  ) {}
}
