import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { GroupsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './groups-modal.actions';
import { GroupResponse } from '../groups-modal.model';

@Injectable()
export class GroupsModalEffects {
  @Effect()
  RequestGetAll = this.actions$.pipe(
    ofType(actions.GroupsActionTypes.RequestGetAll),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap((payload: any) => {
      return this.service.getAll(payload).pipe(
        map((response: GroupResponse) => new actions.SuccessGetAll(response)),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(actions.GroupsActionTypes.RequestGetAll, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestSetSelected = this.actions$.pipe(
    ofType(actions.GroupsActionTypes.RequestSetSelected),
    map((action: actions.SuccessSetSelected) => action.payload),
    switchMap((payload: any) => {
      return of(new actions.SuccessSetSelected(payload));
    })
  );

  constructor(private actions$: Actions, private service: GroupsService) {}
}
