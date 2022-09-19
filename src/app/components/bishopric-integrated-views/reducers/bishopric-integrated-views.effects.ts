import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import {
  BishopricIntegratedViewsService,
  FileManagerService,
} from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './bishopric-integrated-views.actions';
import {
  BishopricIntegratedView,
  BishopricIntegratedViewResponse,
} from '../bishopric-integrated-view.model';

@Injectable()
export class BishopricIntegratedViewsEffects {
  @Effect()
  RequestGetAll = this.actions$.pipe(
    ofType(actions.BishopricIntegratedViewsActionTypes.RequestGetAll),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap((payload: any) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: BishopricIntegratedViewResponse) =>
            new actions.SuccessGetAll(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.BishopricIntegratedViewsActionTypes.RequestGetAll,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGet = this.actions$.pipe(
    ofType(actions.BishopricIntegratedViewsActionTypes.RequestGet),
    map((action: actions.SuccessGet) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map(
          (response: BishopricIntegratedView) =>
            new actions.SuccessGet(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.BishopricIntegratedViewsActionTypes.RequestGet,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetEntirelyBishopricIntegratedViews = this.actions$.pipe(
    ofType(
      actions.BishopricIntegratedViewsActionTypes
        .RequestGetEntirelyBishopricIntegratedViews
    ),
    map(
      (action: actions.SuccessGetEntirelyBishopricIntegratedViews) =>
        action.payload
    ),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: BishopricIntegratedViewResponse) =>
            new actions.SuccessGetEntirelyBishopricIntegratedViews(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.BishopricIntegratedViewsActionTypes.RequestGetEntirelyBishopricIntegratedViews,
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
    private service: BishopricIntegratedViewsService,
    private fileManagerService: FileManagerService
  ) {}
}
