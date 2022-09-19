import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { DocumentsTypesService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './documents-types.actions';
import { DocumentsType, DocumentsTypeResponse } from '../documents-type.model';

@Injectable()
export class DocumentsTypesEffects {
  @Effect()
  RequestGetAllDocumentsTypes = this.actions$.pipe(
    ofType(actions.DocumentsTypesActionTypes.RequestGetAllDocumentsTypes),
    map((action: actions.SuccessGetAllDocumentsTypes) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: DocumentsTypeResponse) =>
            new actions.SuccessGetAllDocumentsTypes(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailDocumentsTypes(
              new RequestError(
                actions.DocumentsTypesActionTypes.RequestGetAllDocumentsTypes,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetDocumentsType = this.actions$.pipe(
    ofType(actions.DocumentsTypesActionTypes.RequestGetDocumentsType),
    map((action: actions.SuccessGetDocumentsType) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map(
          (response: DocumentsType) =>
            new actions.SuccessGetDocumentsType(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailDocumentsTypes(
              new RequestError(
                actions.DocumentsTypesActionTypes.RequestGetDocumentsType,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostDocumentsType = this.actions$.pipe(
    ofType(actions.DocumentsTypesActionTypes.RequestPostDocumentsType),
    map((action: actions.SuccessPostDocumentsType) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPostDocumentsType(response)),
        catchError((error) => {
          return of(
            new actions.RequestFailDocumentsTypes(
              new RequestError(
                actions.DocumentsTypesActionTypes.RequestPostDocumentsType,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutDocumentsType = this.actions$.pipe(
    ofType(actions.DocumentsTypesActionTypes.RequestPutDocumentsType),
    map((action: actions.SuccessPutDocumentsType) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPutDocumentsType(response)),
        catchError((error) =>
          of(
            new actions.RequestFailDocumentsTypes(
              new RequestError(
                actions.DocumentsTypesActionTypes.RequestPutDocumentsType,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteDocumentsType = this.actions$.pipe(
    ofType(actions.DocumentsTypesActionTypes.RequestDeleteDocumentsType),
    map((action: actions.SuccessDeleteDocumentsType) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDeleteDocumentsType(response)),
        catchError((error) =>
          of(
            new actions.RequestFailDocumentsTypes(
              new RequestError(
                actions.DocumentsTypesActionTypes.RequestDeleteDocumentsType,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteDocumentsTypes = this.actions$.pipe(
  //   ofType(actions.DocumentsTypesActionTypes.RequestBulkDeleteDocumentsTypes),
  //   map((action: actions.SuccessBulkDeleteDocumentsTypes) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteDocumentsTypes(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailDocumentsTypes(
  //             new RequestError(
  //               actions.DocumentsTypesActionTypes.RequestBulkDeleteDocumentsTypes,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyDocumentsTypes = this.actions$.pipe(
    ofType(actions.DocumentsTypesActionTypes.RequestGetEntirelyDocumentsTypes),
    map((action: actions.SuccessGetEntirelyDocumentsTypes) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: DocumentsTypeResponse) =>
            new actions.SuccessGetEntirelyDocumentsTypes(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailDocumentsTypes(
              new RequestError(
                actions.DocumentsTypesActionTypes.RequestGetEntirelyDocumentsTypes,
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
    private service: DocumentsTypesService
  ) {}
}
