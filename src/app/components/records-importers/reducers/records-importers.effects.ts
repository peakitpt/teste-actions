import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import {
  FileManagerService,
  RecordsImportersService,
} from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './records-importers.actions';
import { RecordsImporter } from '../records-importer.model';

@Injectable()
export class RecordsImportersEffects {
  @Effect()
  RequestGetRecordsImporter = this.actions$.pipe(
    ofType(actions.RecordsImportersActionTypes.RequestGetRecordsImporter),
    map((action: actions.SuccessGetRecordsImporter) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(null).pipe(
        map(
          (response: RecordsImporter) =>
            new actions.SuccessGetRecordsImporter(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailRecordsImporters(
              new RequestError(
                actions.RecordsImportersActionTypes.RequestDeleteRecordsImporter,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostRecordsImporter = this.actions$.pipe(
    ofType(actions.RecordsImportersActionTypes.RequestPostRecordsImporter),
    map((action: actions.SuccessPostRecordsImporter) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPostRecordsImporter(response)),
        catchError((error) => {
          return of(
            new actions.RequestFailRecordsImporters(
              new RequestError(
                actions.RecordsImportersActionTypes.RequestPostRecordsImporter,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutRecordsImporter = this.actions$.pipe(
    ofType(actions.RecordsImportersActionTypes.RequestPutRecordsImporter),
    map((action: actions.SuccessPutRecordsImporter) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPutRecordsImporter(response)),
        catchError((error) =>
          of(
            new actions.RequestFailRecordsImporters(
              new RequestError(
                actions.RecordsImportersActionTypes.RequestPutRecordsImporter,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteRecordsImporter = this.actions$.pipe(
    ofType(actions.RecordsImportersActionTypes.RequestDeleteRecordsImporter),
    map((action: actions.SuccessDeleteRecordsImporter) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDeleteRecordsImporter(response)),
        catchError((error) =>
          of(
            new actions.RequestFailRecordsImporters(
              new RequestError(
                actions.RecordsImportersActionTypes.RequestDeleteRecordsImporter,
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
    ofType(actions.RecordsImportersActionTypes.RequestGetNew),
    map((action: actions.SuccessGetNew) => action.payload),
    switchMap((payload) => {
      return this.service.getNew().pipe(
        map((response: RecordsImporter) => new actions.SuccessGetNew(response)),
        catchError((error) =>
          of(
            new actions.RequestFailRecordsImporters(
              new RequestError(
                actions.RecordsImportersActionTypes.RequestDeleteRecordsImporter,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostUploadFile = this.actions$.pipe(
    ofType(actions.RecordsImportersActionTypes.RequestPostUploadFile),
    map((action: actions.SuccessPostUploadFile) => action.payload),
    switchMap((payload) => {
      return this.fileManagerService.upload(payload).pipe(
        map((response) => new actions.SuccessPostUploadFile(response)),
        catchError((error) => {
          return of(
            new actions.RequestFailRecordsImporters(
              new RequestError(
                actions.RecordsImportersActionTypes.RequestDeleteRecordsImporter,
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
    private service: RecordsImportersService,
    private fileManagerService: FileManagerService
  ) {}
}
