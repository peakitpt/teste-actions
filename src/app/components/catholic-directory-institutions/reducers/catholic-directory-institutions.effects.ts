import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { CatholicDirectoryInstitutionsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './catholic-directory-institutions.actions';
import {
  CatholicDirectoryInstitution,
  CatholicDirectoryInstitutionResponse,
} from '../catholic-directory-institution.model';

@Injectable()
export class CatholicDirectoryInstitutionsEffects {
  @Effect()
  RequestGetAllCatholicDirectoryInstitutions = this.actions$.pipe(
    ofType(
      actions.CatholicDirectoryInstitutionsActionTypes
        .RequestGetAllCatholicDirectoryInstitutions
    ),
    map(
      (action: actions.SuccessGetAllCatholicDirectoryInstitutions) =>
        action.payload
    ),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: CatholicDirectoryInstitutionResponse) =>
            new actions.SuccessGetAllCatholicDirectoryInstitutions(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCatholicDirectoryInstitutions(
              new RequestError(
                actions.CatholicDirectoryInstitutionsActionTypes.RequestGetAllCatholicDirectoryInstitutions,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetCatholicDirectoryInstitution = this.actions$.pipe(
    ofType(
      actions.CatholicDirectoryInstitutionsActionTypes
        .RequestGetCatholicDirectoryInstitution
    ),
    map(
      (action: actions.SuccessGetCatholicDirectoryInstitution) => action.payload
    ),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map(
          (response: CatholicDirectoryInstitution) =>
            new actions.SuccessGetCatholicDirectoryInstitution(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCatholicDirectoryInstitutions(
              new RequestError(
                actions.CatholicDirectoryInstitutionsActionTypes.RequestGetCatholicDirectoryInstitution,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostCatholicDirectoryInstitution = this.actions$.pipe(
    ofType(
      actions.CatholicDirectoryInstitutionsActionTypes
        .RequestPostCatholicDirectoryInstitution
    ),
    map(
      (action: actions.SuccessPostCatholicDirectoryInstitution) =>
        action.payload
    ),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map(
          (response) =>
            new actions.SuccessPostCatholicDirectoryInstitution(response)
        ),
        catchError((error) => {
          return of(
            new actions.RequestFailCatholicDirectoryInstitutions(
              new RequestError(
                actions.CatholicDirectoryInstitutionsActionTypes.RequestPostCatholicDirectoryInstitution,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutCatholicDirectoryInstitution = this.actions$.pipe(
    ofType(
      actions.CatholicDirectoryInstitutionsActionTypes
        .RequestPutCatholicDirectoryInstitution
    ),
    map(
      (action: actions.SuccessPutCatholicDirectoryInstitution) => action.payload
    ),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map(
          (response) =>
            new actions.SuccessPutCatholicDirectoryInstitution(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCatholicDirectoryInstitutions(
              new RequestError(
                actions.CatholicDirectoryInstitutionsActionTypes.RequestPutCatholicDirectoryInstitution,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteCatholicDirectoryInstitution = this.actions$.pipe(
    ofType(
      actions.CatholicDirectoryInstitutionsActionTypes
        .RequestDeleteCatholicDirectoryInstitution
    ),
    map(
      (action: actions.SuccessDeleteCatholicDirectoryInstitution) =>
        action.payload
    ),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map(
          (response) =>
            new actions.SuccessDeleteCatholicDirectoryInstitution(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCatholicDirectoryInstitutions(
              new RequestError(
                actions.CatholicDirectoryInstitutionsActionTypes.RequestDeleteCatholicDirectoryInstitution,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteCatholicDirectoryInstitutions = this.actions$.pipe(
  //   ofType(actions.CatholicDirectoryInstitutionsActionTypes.RequestBulkDeleteCatholicDirectoryInstitutions),
  //   map((action: actions.SuccessBulkDeleteCatholicDirectoryInstitutions) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteCatholicDirectoryInstitutions(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailCatholicDirectoryInstitutions(
  //             new RequestError(
  //               actions.CatholicDirectoryInstitutionsActionTypes.RequestBulkDeleteCatholicDirectoryInstitutions,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyCatholicDirectoryInstitutions = this.actions$.pipe(
    ofType(
      actions.CatholicDirectoryInstitutionsActionTypes
        .RequestGetEntirelyCatholicDirectoryInstitutions
    ),
    map(
      (action: actions.SuccessGetEntirelyCatholicDirectoryInstitutions) =>
        action.payload
    ),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: CatholicDirectoryInstitutionResponse) =>
            new actions.SuccessGetEntirelyCatholicDirectoryInstitutions(
              response
            )
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCatholicDirectoryInstitutions(
              new RequestError(
                actions.CatholicDirectoryInstitutionsActionTypes.RequestGetEntirelyCatholicDirectoryInstitutions,
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
    private service: CatholicDirectoryInstitutionsService
  ) {}
}
