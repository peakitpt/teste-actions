import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { CuriaProvisionsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './curia-provisions.actions';
import {
  CuriaProvision,
  CuriaProvisionResponse,
} from '../curia-provision.model';

@Injectable()
export class CuriaProvisionsEffects {
  @Effect()
  RequestGetAllCuriaProvisions = this.actions$.pipe(
    ofType(actions.CuriaProvisionsActionTypes.RequestGetAllCuriaProvisions),
    map((action: actions.SuccessGetAllCuriaProvisions) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: CuriaProvisionResponse) =>
            new actions.SuccessGetAllCuriaProvisions(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCuriaProvisions(
              new RequestError(
                actions.CuriaProvisionsActionTypes.RequestGetAllCuriaProvisions,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetCuriaProvision = this.actions$.pipe(
    ofType(actions.CuriaProvisionsActionTypes.RequestGetCuriaProvision),
    map((action: actions.SuccessGetCuriaProvision) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map(
          (response: CuriaProvision) =>
            new actions.SuccessGetCuriaProvision(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCuriaProvisions(
              new RequestError(
                actions.CuriaProvisionsActionTypes.RequestGetCuriaProvision,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostCuriaProvision = this.actions$.pipe(
    ofType(actions.CuriaProvisionsActionTypes.RequestPostCuriaProvision),
    map((action: actions.SuccessPostCuriaProvision) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPostCuriaProvision(response)),
        catchError((error) => {
          return of(
            new actions.RequestFailCuriaProvisions(
              new RequestError(
                actions.CuriaProvisionsActionTypes.RequestPostCuriaProvision,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutCuriaProvision = this.actions$.pipe(
    ofType(actions.CuriaProvisionsActionTypes.RequestPutCuriaProvision),
    map((action: actions.SuccessPutCuriaProvision) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPutCuriaProvision(response)),
        catchError((error) =>
          of(
            new actions.RequestFailCuriaProvisions(
              new RequestError(
                actions.CuriaProvisionsActionTypes.RequestPutCuriaProvision,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteCuriaProvision = this.actions$.pipe(
    ofType(actions.CuriaProvisionsActionTypes.RequestDeleteCuriaProvision),
    map((action: actions.SuccessDeleteCuriaProvision) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDeleteCuriaProvision(response)),
        catchError((error) =>
          of(
            new actions.RequestFailCuriaProvisions(
              new RequestError(
                actions.CuriaProvisionsActionTypes.RequestDeleteCuriaProvision,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteCuriaProvisions = this.actions$.pipe(
  //   ofType(actions.CuriaProvisionsActionTypes.RequestBulkDeleteCuriaProvisions),
  //   map((action: actions.SuccessBulkDeleteCuriaProvisions) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteCuriaProvisions(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailCuriaProvisions(
  //             new RequestError(
  //               actions.CuriaProvisionsActionTypes.RequestBulkDeleteCuriaProvisions,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyCuriaProvisions = this.actions$.pipe(
    ofType(
      actions.CuriaProvisionsActionTypes.RequestGetEntirelyCuriaProvisions
    ),
    map((action: actions.SuccessGetEntirelyCuriaProvisions) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: CuriaProvisionResponse) =>
            new actions.SuccessGetEntirelyCuriaProvisions(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCuriaProvisions(
              new RequestError(
                actions.CuriaProvisionsActionTypes.RequestGetEntirelyCuriaProvisions,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetNew = this.actions$.pipe(
    ofType(actions.CuriaProvisionsActionTypes.RequestGetNew),
    map((action: actions.SuccessGetNew) => action.payload),
    switchMap(() => {
      return this.service.getNew().pipe(
        map((response: CuriaProvision) => new actions.SuccessGetNew(response)),
        catchError((error) =>
          of(
            new actions.RequestFailCuriaProvisions(
              new RequestError(
                actions.CuriaProvisionsActionTypes.RequestGetNew,
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
    private service: CuriaProvisionsService
  ) {}
}
