import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { EmenusService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './emenus.actions';
import { Emenu, EmenuResponse } from '../emenu.model';

@Injectable()
export class EmenusEffects {
  @Effect()
  RequestGetAllEmenus = this.actions$.pipe(
    ofType(actions.EmenusActionTypes.RequestGetAllEmenus),
    map((action: actions.SuccessGetAllEmenus) => action.payload),
    switchMap(payload => {
      return this.service.getAll(payload).pipe(
        map(
          (response: EmenuResponse) => new actions.SuccessGetAllEmenus(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFailEmenus(
              new RequestError(
                actions.EmenusActionTypes.RequestGetAllEmenus,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetEmenu = this.actions$.pipe(
    ofType(actions.EmenusActionTypes.RequestGetEmenu),
    map((action: actions.SuccessGetEmenu) => action.payload),
    switchMap(payload => {
      return this.service.getOne(+payload).pipe(
        map((response: Emenu) => new actions.SuccessGetEmenu(response)),
        catchError(error =>
          of(
            new actions.RequestFailEmenus(
              new RequestError(actions.EmenusActionTypes.RequestGetEmenu, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostEmenu = this.actions$.pipe(
    ofType(actions.EmenusActionTypes.RequestPostEmenu),
    map((action: actions.SuccessPostEmenu) => action.payload),
    switchMap(payload => {
      return this.service.create(payload).pipe(
        map(response => new actions.SuccessPostEmenu(response)),
        catchError(error => {
          return of(
            new actions.RequestFailEmenus(
              new RequestError(
                actions.EmenusActionTypes.RequestPostEmenu,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutEmenu = this.actions$.pipe(
    ofType(actions.EmenusActionTypes.RequestPutEmenu),
    map((action: actions.SuccessPutEmenu) => action.payload),
    switchMap(payload => {
      return this.service.update(payload).pipe(
        map(response => new actions.SuccessPutEmenu(response)),
        catchError(error =>
          of(
            new actions.RequestFailEmenus(
              new RequestError(actions.EmenusActionTypes.RequestPutEmenu, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteEmenu = this.actions$.pipe(
    ofType(actions.EmenusActionTypes.RequestDeleteEmenu),
    map((action: actions.SuccessDeleteEmenu) => action.payload),
    switchMap(payload => {
      return this.service.delete(+payload).pipe(
        map(response => new actions.SuccessDeleteEmenu(response)),
        catchError(error =>
          of(
            new actions.RequestFailEmenus(
              new RequestError(
                actions.EmenusActionTypes.RequestDeleteEmenu,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteEmenus = this.actions$.pipe(
  //   ofType(actions.EmenusActionTypes.RequestBulkDeleteEmenus),
  //   map((action: actions.SuccessBulkDeleteEmenus) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteEmenus(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailEmenus(
  //             new RequestError(
  //               actions.EmenusActionTypes.RequestBulkDeleteEmenus,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyEmenus = this.actions$.pipe(
    ofType(actions.EmenusActionTypes.RequestGetEntirelyEmenus),
    map((action: actions.SuccessGetEntirelyEmenus) => action.payload),
    switchMap(payload => {
      return this.service.getAll(payload).pipe(
        map(
          (response: EmenuResponse) =>
            new actions.SuccessGetEntirelyEmenus(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFailEmenus(
              new RequestError(
                actions.EmenusActionTypes.RequestGetEntirelyEmenus,
                error
              )
            )
          )
        )
      );
    })
  );

  constructor(private actions$: Actions, private service: EmenusService) {}
}
