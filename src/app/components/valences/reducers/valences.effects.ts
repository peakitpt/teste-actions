import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ValencesService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './valences.actions';
import { Valence, ValenceResponse } from '../valence.model';

@Injectable()
export class ValencesEffects {
  @Effect()
  RequestGetAllValences = this.actions$.pipe(
    ofType(actions.ValencesActionTypes.RequestGetAllValences),
    map((action: actions.SuccessGetAllValences) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: ValenceResponse) =>
            new actions.SuccessGetAllValences(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailValences(
              new RequestError(
                actions.ValencesActionTypes.RequestGetAllValences,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetValence = this.actions$.pipe(
    ofType(actions.ValencesActionTypes.RequestGetValence),
    map((action: actions.SuccessGetValence) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map((response: Valence) => new actions.SuccessGetValence(response)),
        catchError((error) =>
          of(
            new actions.RequestFailValences(
              new RequestError(
                actions.ValencesActionTypes.RequestGetValence,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostValence = this.actions$.pipe(
    ofType(actions.ValencesActionTypes.RequestPostValence),
    map((action: actions.SuccessPostValence) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPostValence(response)),
        catchError((error) => {
          return of(
            new actions.RequestFailValences(
              new RequestError(
                actions.ValencesActionTypes.RequestPostValence,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutValence = this.actions$.pipe(
    ofType(actions.ValencesActionTypes.RequestPutValence),
    map((action: actions.SuccessPutValence) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPutValence(response)),
        catchError((error) =>
          of(
            new actions.RequestFailValences(
              new RequestError(
                actions.ValencesActionTypes.RequestPutValence,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteValence = this.actions$.pipe(
    ofType(actions.ValencesActionTypes.RequestDeleteValence),
    map((action: actions.SuccessDeleteValence) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDeleteValence(response)),
        catchError((error) =>
          of(
            new actions.RequestFailValences(
              new RequestError(
                actions.ValencesActionTypes.RequestDeleteValence,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteValences = this.actions$.pipe(
  //   ofType(actions.ValencesActionTypes.RequestBulkDeleteValences),
  //   map((action: actions.SuccessBulkDeleteValences) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteValences(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailValences(
  //             new RequestError(
  //               actions.ValencesActionTypes.RequestBulkDeleteValences,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyValences = this.actions$.pipe(
    ofType(actions.ValencesActionTypes.RequestGetEntirelyValences),
    map((action: actions.SuccessGetEntirelyValences) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: ValenceResponse) =>
            new actions.SuccessGetEntirelyValences(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailValences(
              new RequestError(
                actions.ValencesActionTypes.RequestGetEntirelyValences,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetNewValence = this.actions$.pipe(
    ofType(actions.ValencesActionTypes.RequestGetNewValence),
    map((action: actions.SuccessGetNewValence) => action.payload),
    switchMap(() => {
      return this.service.getNew().pipe(
        map((response: Valence) => new actions.SuccessGetNewValence(response)),
        catchError((error) =>
          of(
            new actions.RequestFailValences(
              new RequestError(
                actions.ValencesActionTypes.RequestGetNewValence,
                error
              )
            )
          )
        )
      );
    })
  );

  constructor(private actions$: Actions, private service: ValencesService) {}
}
