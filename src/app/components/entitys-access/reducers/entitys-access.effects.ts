import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { EntitysAccessService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './entitys-access.actions';
import { EntityAccess, EntityAccessResponse } from '../entity-access.model';

@Injectable()
export class EntitysAccessEffects {
  @Effect()
  RequestGetAllEntitysAccess = this.actions$.pipe(
    ofType(actions.EntitysAccessActionTypes.RequestGetAllEntitysAccess),
    map((action: actions.SuccessGetAllEntitysAccess) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: EntityAccessResponse) =>
            new actions.SuccessGetAllEntitysAccess(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailEntitysAccess(
              new RequestError(
                actions.EntitysAccessActionTypes.RequestGetAllEntitysAccess,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetEntityAccess = this.actions$.pipe(
    ofType(actions.EntitysAccessActionTypes.RequestGetEntityAccess),
    map((action: actions.SuccessGetEntityAccess) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map(
          (response: EntityAccess) =>
            new actions.SuccessGetEntityAccess(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailEntitysAccess(
              new RequestError(
                actions.EntitysAccessActionTypes.RequestGetEntityAccess,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteEntityAccess = this.actions$.pipe(
    ofType(actions.EntitysAccessActionTypes.RequestDeleteEntityAccess),
    map((action: actions.SuccessDeleteEntityAccess) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDeleteEntityAccess(response)),
        catchError((error) =>
          of(
            new actions.RequestFailEntitysAccess(
              new RequestError(
                actions.EntitysAccessActionTypes.RequestDeleteEntityAccess,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteEntitysAccess = this.actions$.pipe(
  //   ofType(actions.EntitysAccessActionTypes.RequestBulkDeleteEntitysAccess),
  //   map((action: actions.SuccessBulkDeleteEntitysAccess) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteEntitysAccess(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailEntitysAccess(
  //             new RequestError(
  //               actions.EntitysAccessActionTypes.RequestBulkDeleteEntitysAccess,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  constructor(
    private actions$: Actions,
    private service: EntitysAccessService
  ) {}
}
