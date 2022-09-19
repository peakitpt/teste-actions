import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { CuriaSecretariatsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './curia-secretariats.actions';
import {
  CuriaSecretariat,
  CuriaSecretariatResponse,
} from '../curia-secretariat.model';

@Injectable()
export class CuriaSecretariatsEffects {
  @Effect()
  RequestGetAllCuriaSecretariats = this.actions$.pipe(
    ofType(actions.CuriaSecretariatsActionTypes.RequestGetAllCuriaSecretariats),
    map((action: actions.SuccessGetAllCuriaSecretariats) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: CuriaSecretariatResponse) =>
            new actions.SuccessGetAllCuriaSecretariats(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCuriaSecretariats(
              new RequestError(
                actions.CuriaSecretariatsActionTypes.RequestGetAllCuriaSecretariats,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetCuriaSecretariat = this.actions$.pipe(
    ofType(actions.CuriaSecretariatsActionTypes.RequestGetCuriaSecretariat),
    map((action: actions.SuccessGetCuriaSecretariat) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map(
          (response: CuriaSecretariat) =>
            new actions.SuccessGetCuriaSecretariat(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCuriaSecretariats(
              new RequestError(
                actions.CuriaSecretariatsActionTypes.RequestGetCuriaSecretariat,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostCuriaSecretariat = this.actions$.pipe(
    ofType(actions.CuriaSecretariatsActionTypes.RequestPostCuriaSecretariat),
    map((action: actions.SuccessPostCuriaSecretariat) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPostCuriaSecretariat(response)),
        catchError((error) => {
          return of(
            new actions.RequestFailCuriaSecretariats(
              new RequestError(
                actions.CuriaSecretariatsActionTypes.RequestPostCuriaSecretariat,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutCuriaSecretariat = this.actions$.pipe(
    ofType(actions.CuriaSecretariatsActionTypes.RequestPutCuriaSecretariat),
    map((action: actions.SuccessPutCuriaSecretariat) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPutCuriaSecretariat(response)),
        catchError((error) =>
          of(
            new actions.RequestFailCuriaSecretariats(
              new RequestError(
                actions.CuriaSecretariatsActionTypes.RequestPutCuriaSecretariat,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteCuriaSecretariat = this.actions$.pipe(
    ofType(actions.CuriaSecretariatsActionTypes.RequestDeleteCuriaSecretariat),
    map((action: actions.SuccessDeleteCuriaSecretariat) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDeleteCuriaSecretariat(response)),
        catchError((error) =>
          of(
            new actions.RequestFailCuriaSecretariats(
              new RequestError(
                actions.CuriaSecretariatsActionTypes.RequestDeleteCuriaSecretariat,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteCuriaSecretariats = this.actions$.pipe(
  //   ofType(actions.CuriaSecretariatsActionTypes.RequestBulkDeleteCuriaSecretariats),
  //   map((action: actions.SuccessBulkDeleteCuriaSecretariats) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteCuriaSecretariats(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailCuriaSecretariats(
  //             new RequestError(
  //               actions.CuriaSecretariatsActionTypes.RequestBulkDeleteCuriaSecretariats,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyCuriaSecretariats = this.actions$.pipe(
    ofType(
      actions.CuriaSecretariatsActionTypes.RequestGetEntirelyCuriaSecretariats
    ),
    map(
      (action: actions.SuccessGetEntirelyCuriaSecretariats) => action.payload
    ),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: CuriaSecretariatResponse) =>
            new actions.SuccessGetEntirelyCuriaSecretariats(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCuriaSecretariats(
              new RequestError(
                actions.CuriaSecretariatsActionTypes.RequestGetEntirelyCuriaSecretariats,
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
    ofType(actions.CuriaSecretariatsActionTypes.RequestGetNew),
    map((action: actions.SuccessGetNew) => action.payload),
    switchMap(() => {
      return this.service.getNew().pipe(
        map(
          (response: CuriaSecretariat) => new actions.SuccessGetNew(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCuriaSecretariats(
              new RequestError(
                actions.CuriaSecretariatsActionTypes.RequestGetNew,
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
    private service: CuriaSecretariatsService
  ) {}
}
