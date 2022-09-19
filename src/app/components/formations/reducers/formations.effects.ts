import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { FormationsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './formations.actions';
import { Formation, FormationResponse } from '../formation.model';

@Injectable()
export class FormationsEffects {
  @Effect()
  RequestGetAllFormations = this.actions$.pipe(
    ofType(actions.FormationsActionTypes.RequestGetAllFormations),
    map((action: actions.SuccessGetAllFormations) => action.payload),
    switchMap(payload => {
      return this.service.getAll(payload).pipe(
        map(
          (response: FormationResponse) =>
            new actions.SuccessGetAllFormations(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFailFormations(
              new RequestError(
                actions.FormationsActionTypes.RequestGetAllFormations,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetFormation = this.actions$.pipe(
    ofType(actions.FormationsActionTypes.RequestGetFormation),
    map((action: actions.SuccessGetFormation) => action.payload),
    switchMap(payload => {
      return this.service.getOne(+payload).pipe(
        map((response: Formation) => new actions.SuccessGetFormation(response)),
        catchError(error =>
          of(
            new actions.RequestFailFormations(
              new RequestError(
                actions.FormationsActionTypes.RequestGetFormation,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostFormation = this.actions$.pipe(
    ofType(actions.FormationsActionTypes.RequestPostFormation),
    map((action: actions.SuccessPostFormation) => action.payload),
    switchMap(payload => {
      return this.service.create(payload).pipe(
        map(response => new actions.SuccessPostFormation(response)),
        catchError(error => {
          return of(
            new actions.RequestFailFormations(
              new RequestError(
                actions.FormationsActionTypes.RequestPostFormation,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutFormation = this.actions$.pipe(
    ofType(actions.FormationsActionTypes.RequestPutFormation),
    map((action: actions.SuccessPutFormation) => action.payload),
    switchMap(payload => {
      return this.service.update(payload).pipe(
        map(response => new actions.SuccessPutFormation(response)),
        catchError(error =>
          of(
            new actions.RequestFailFormations(
              new RequestError(
                actions.FormationsActionTypes.RequestPutFormation,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteFormation = this.actions$.pipe(
    ofType(actions.FormationsActionTypes.RequestDeleteFormation),
    map((action: actions.SuccessDeleteFormation) => action.payload),
    switchMap(payload => {
      return this.service.delete(+payload).pipe(
        map(response => new actions.SuccessDeleteFormation(response)),
        catchError(error =>
          of(
            new actions.RequestFailFormations(
              new RequestError(
                actions.FormationsActionTypes.RequestDeleteFormation,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteFormations = this.actions$.pipe(
  //   ofType(actions.FormationsActionTypes.RequestBulkDeleteFormations),
  //   map((action: actions.SuccessBulkDeleteFormations) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteFormations(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailFormations(
  //             new RequestError(
  //               actions.FormationsActionTypes.RequestBulkDeleteFormations,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyFormations = this.actions$.pipe(
    ofType(actions.FormationsActionTypes.RequestGetEntirelyFormations),
    map((action: actions.SuccessGetEntirelyFormations) => action.payload),
    switchMap(payload => {
      return this.service.getAll(payload).pipe(
        map(
          (response: FormationResponse) =>
            new actions.SuccessGetEntirelyFormations(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFailFormations(
              new RequestError(
                actions.FormationsActionTypes.RequestGetEntirelyFormations,
                error
              )
            )
          )
        )
      );
    })
  );

  constructor(private actions$: Actions, private service: FormationsService) {}
}
