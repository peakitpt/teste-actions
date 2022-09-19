import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { EmolumentsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './emoluments.actions';
import { Emolument, EmolumentResponse } from '../emolument.model';

@Injectable()
export class EmolumentsEffects {
  @Effect()
  RequestGetAllEmoluments = this.actions$.pipe(
    ofType(actions.EmolumentsActionTypes.RequestGetAllEmoluments),
    map((action: actions.SuccessGetAllEmoluments) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: EmolumentResponse) =>
            new actions.SuccessGetAllEmoluments(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailEmoluments(
              new RequestError(
                actions.EmolumentsActionTypes.RequestGetAllEmoluments,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetEmolument = this.actions$.pipe(
    ofType(actions.EmolumentsActionTypes.RequestGetEmolument),
    map((action: actions.SuccessGetEmolument) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map((response: Emolument) => new actions.SuccessGetEmolument(response)),
        catchError((error) =>
          of(
            new actions.RequestFailEmoluments(
              new RequestError(
                actions.EmolumentsActionTypes.RequestGetEmolument,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostEmolument = this.actions$.pipe(
    ofType(actions.EmolumentsActionTypes.RequestPostEmolument),
    map((action: actions.SuccessPostEmolument) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPostEmolument(response)),
        catchError((error) => {
          return of(
            new actions.RequestFailEmoluments(
              new RequestError(
                actions.EmolumentsActionTypes.RequestPostEmolument,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutEmolument = this.actions$.pipe(
    ofType(actions.EmolumentsActionTypes.RequestPutEmolument),
    map((action: actions.SuccessPutEmolument) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPutEmolument(response)),
        catchError((error) =>
          of(
            new actions.RequestFailEmoluments(
              new RequestError(
                actions.EmolumentsActionTypes.RequestPutEmolument,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteEmolument = this.actions$.pipe(
    ofType(actions.EmolumentsActionTypes.RequestDeleteEmolument),
    map((action: actions.SuccessDeleteEmolument) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDeleteEmolument(response)),
        catchError((error) =>
          of(
            new actions.RequestFailEmoluments(
              new RequestError(
                actions.EmolumentsActionTypes.RequestDeleteEmolument,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteEmoluments = this.actions$.pipe(
  //   ofType(actions.EmolumentsActionTypes.RequestBulkDeleteEmoluments),
  //   map((action: actions.SuccessBulkDeleteEmoluments) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteEmoluments(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailEmoluments(
  //             new RequestError(
  //               actions.EmolumentsActionTypes.RequestBulkDeleteEmoluments,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyEmoluments = this.actions$.pipe(
    ofType(actions.EmolumentsActionTypes.RequestGetEntirelyEmoluments),
    map((action: actions.SuccessGetEntirelyEmoluments) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: EmolumentResponse) =>
            new actions.SuccessGetEntirelyEmoluments(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailEmoluments(
              new RequestError(
                actions.EmolumentsActionTypes.RequestGetEntirelyEmoluments,
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
    ofType(actions.EmolumentsActionTypes.RequestGetNew),
    map((action: actions.SuccessGetNew) => action.payload),
    switchMap(() => {
      return this.service.getNew().pipe(
        map((response: Emolument) => new actions.SuccessGetNew(response)),
        catchError((error) =>
          of(
            new actions.RequestFailEmoluments(
              new RequestError(
                actions.EmolumentsActionTypes.RequestGetNew,
                error
              )
            )
          )
        )
      );
    })
  );

  constructor(private actions$: Actions, private service: EmolumentsService) {}
}
