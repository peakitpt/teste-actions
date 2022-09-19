import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import {
  WebsiteconfigurationsService,
  FileManagerService,
} from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './websiteconfigurations.actions';
import { Websiteconfiguration } from '../websiteconfiguration.model';

@Injectable()
export class WebsiteconfigurationsEffects {
  @Effect()
  RequestGetWebsiteconfiguration = this.actions$.pipe(
    ofType(
      actions.WebsiteconfigurationsActionTypes.RequestGetWebsiteconfiguration
    ),
    map((action: actions.SuccessGetWebsiteconfiguration) => action.payload),
    switchMap((payload) => {
      return this.service.getOne().pipe(
        map(
          (response: Websiteconfiguration) =>
            new actions.SuccessGetWebsiteconfiguration(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailWebsiteconfigurations(
              new RequestError(
                actions.WebsiteconfigurationsActionTypes.RequestGetWebsiteconfiguration,
                'no_website_found'
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostWebsiteconfiguration = this.actions$.pipe(
    ofType(
      actions.WebsiteconfigurationsActionTypes.RequestPostWebsiteconfiguration
    ),
    map((action: actions.SuccessPostWebsiteconfiguration) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map(
          (response) => new actions.SuccessPostWebsiteconfiguration(response)
        ),
        catchError((error) => {
          return of(
            new actions.RequestFailWebsiteconfigurations(
              new RequestError(
                actions.WebsiteconfigurationsActionTypes.RequestPostWebsiteconfiguration,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutWebsiteconfiguration = this.actions$.pipe(
    ofType(
      actions.WebsiteconfigurationsActionTypes.RequestPutWebsiteconfiguration
    ),
    map((action: actions.SuccessPutWebsiteconfiguration) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPutWebsiteconfiguration(response)),
        catchError((error) =>
          of(
            new actions.RequestFailWebsiteconfigurations(
              new RequestError(
                actions.WebsiteconfigurationsActionTypes.RequestPutWebsiteconfiguration,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteWebsiteconfiguration = this.actions$.pipe(
    ofType(
      actions.WebsiteconfigurationsActionTypes.RequestDeleteWebsiteconfiguration
    ),
    map((action: actions.SuccessDeleteWebsiteconfiguration) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map(
          (response) => new actions.SuccessDeleteWebsiteconfiguration(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailWebsiteconfigurations(
              new RequestError(
                actions.WebsiteconfigurationsActionTypes.RequestDeleteWebsiteconfiguration,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostChapelryImage = this.actions$.pipe(
    ofType(actions.WebsiteconfigurationsActionTypes.RequestPostHeaderImage),
    map((action: actions.SuccessPostHeaderImage) => action.payload),
    switchMap((payload) => {
      return this.fileManagerService.upload(payload).pipe(
        map((response) => new actions.SuccessPostHeaderImage(response)),
        catchError((error) => {
          return of(
            new actions.RequestFailWebsiteconfigurations(
              new RequestError(
                actions.WebsiteconfigurationsActionTypes.RequestPostHeaderImage,
                error
              )
            )
          );
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    private service: WebsiteconfigurationsService,
    private fileManagerService: FileManagerService
  ) {}
}
