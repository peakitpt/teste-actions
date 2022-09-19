import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { CuriaMinistriesAndOrdersService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './curia-ministries-and-orders.actions';
import {
  CuriaMinistryAndOrder,
  CuriaMinistryAndOrderResponse,
} from '../curia-ministry-and-order.model';

@Injectable()
export class CuriaMinistriesAndOrdersEffects {
  @Effect()
  RequestGetAllCuriaMinistriesAndOrders = this.actions$.pipe(
    ofType(
      actions.CuriaMinistriesAndOrdersActionTypes
        .RequestGetAllCuriaMinistriesAndOrders
    ),
    map(
      (action: actions.SuccessGetAllCuriaMinistriesAndOrders) => action.payload
    ),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: CuriaMinistryAndOrderResponse) =>
            new actions.SuccessGetAllCuriaMinistriesAndOrders(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCuriaMinistriesAndOrders(
              new RequestError(
                actions.CuriaMinistriesAndOrdersActionTypes.RequestGetAllCuriaMinistriesAndOrders,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetCuriaMinistryAndOrder = this.actions$.pipe(
    ofType(
      actions.CuriaMinistriesAndOrdersActionTypes
        .RequestGetCuriaMinistryAndOrder
    ),
    map((action: actions.SuccessGetCuriaMinistryAndOrder) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map(
          (response: CuriaMinistryAndOrder) =>
            new actions.SuccessGetCuriaMinistryAndOrder(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCuriaMinistriesAndOrders(
              new RequestError(
                actions.CuriaMinistriesAndOrdersActionTypes.RequestGetCuriaMinistryAndOrder,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostCuriaMinistryAndOrder = this.actions$.pipe(
    ofType(
      actions.CuriaMinistriesAndOrdersActionTypes
        .RequestPostCuriaMinistryAndOrder
    ),
    map((action: actions.SuccessPostCuriaMinistryAndOrder) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map(
          (response) => new actions.SuccessPostCuriaMinistryAndOrder(response)
        ),
        catchError((error) => {
          return of(
            new actions.RequestFailCuriaMinistriesAndOrders(
              new RequestError(
                actions.CuriaMinistriesAndOrdersActionTypes.RequestPostCuriaMinistryAndOrder,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutCuriaMinistryAndOrder = this.actions$.pipe(
    ofType(
      actions.CuriaMinistriesAndOrdersActionTypes
        .RequestPutCuriaMinistryAndOrder
    ),
    map((action: actions.SuccessPutCuriaMinistryAndOrder) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map(
          (response) => new actions.SuccessPutCuriaMinistryAndOrder(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCuriaMinistriesAndOrders(
              new RequestError(
                actions.CuriaMinistriesAndOrdersActionTypes.RequestPutCuriaMinistryAndOrder,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteCuriaMinistryAndOrder = this.actions$.pipe(
    ofType(
      actions.CuriaMinistriesAndOrdersActionTypes
        .RequestDeleteCuriaMinistryAndOrder
    ),
    map((action: actions.SuccessDeleteCuriaMinistryAndOrder) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map(
          (response) => new actions.SuccessDeleteCuriaMinistryAndOrder(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCuriaMinistriesAndOrders(
              new RequestError(
                actions.CuriaMinistriesAndOrdersActionTypes.RequestDeleteCuriaMinistryAndOrder,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteCuriaMinistriesAndOrders = this.actions$.pipe(
  //   ofType(actions.CuriaMinistriesAndOrdersActionTypes.RequestBulkDeleteCuriaMinistriesAndOrders),
  //   map((action: actions.SuccessBulkDeleteCuriaMinistriesAndOrders) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteCuriaMinistriesAndOrders(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailCuriaMinistriesAndOrders(
  //             new RequestError(
  //               actions.CuriaMinistriesAndOrdersActionTypes.RequestBulkDeleteCuriaMinistriesAndOrders,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyCuriaMinistriesAndOrders = this.actions$.pipe(
    ofType(
      actions.CuriaMinistriesAndOrdersActionTypes
        .RequestGetEntirelyCuriaMinistriesAndOrders
    ),
    map(
      (action: actions.SuccessGetEntirelyCuriaMinistriesAndOrders) =>
        action.payload
    ),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: CuriaMinistryAndOrderResponse) =>
            new actions.SuccessGetEntirelyCuriaMinistriesAndOrders(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCuriaMinistriesAndOrders(
              new RequestError(
                actions.CuriaMinistriesAndOrdersActionTypes.RequestGetEntirelyCuriaMinistriesAndOrders,
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
    ofType(actions.CuriaMinistriesAndOrdersActionTypes.RequestGetNew),
    map((action: actions.SuccessGetNew) => action.payload),
    switchMap(() => {
      return this.service.getNew().pipe(
        map(
          (response: CuriaMinistryAndOrder) =>
            new actions.SuccessGetNew(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailCuriaMinistriesAndOrders(
              new RequestError(
                actions.CuriaMinistriesAndOrdersActionTypes.RequestGetNew,
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
    private service: CuriaMinistriesAndOrdersService
  ) {}
}
