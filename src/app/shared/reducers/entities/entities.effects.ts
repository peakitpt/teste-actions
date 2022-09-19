import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { EntitiesService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './entities.actions';
import { Entity } from './entity.model';

@Injectable()
export class EntitiesEffects {
  @Effect()
  RequestGet = this.actions$.pipe(
    ofType(actions.EntitiesActionTypes.RequestGet),
    map((action: actions.SuccessGet) => action.payload),
    switchMap(payload => {
      return this.service.getOne(+payload).pipe(
        map((response: Entity) => new actions.SuccessGet(response)),
        catchError(error =>
          of(
            new actions.RequestFail(
              new RequestError(actions.EntitiesActionTypes.RequestGet, error)
            )
          )
        )
      );
    })
  );

  constructor(private actions$: Actions, private service: EntitiesService) {}
}
