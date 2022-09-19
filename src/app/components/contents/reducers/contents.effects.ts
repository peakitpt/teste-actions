import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { ContentsService, FileUploaderService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './contents.actions';
import { Content, ContentResponse } from '../content.model';

@Injectable()
export class ContentsEffects {
  @Effect()
  RequestGetAllContents = this.actions$.pipe(
    ofType(actions.ContentsActionTypes.RequestGetAllContents),
    map((action: actions.SuccessGetAllContents) => action.payload),
    switchMap(payload => {
      return this.service.getAll(payload).pipe(
        map(
          (response: ContentResponse) =>
            new actions.SuccessGetAllContents(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFailContents(
              new RequestError(
                actions.ContentsActionTypes.RequestGetAllContents,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetContent = this.actions$.pipe(
    ofType(actions.ContentsActionTypes.RequestGetContent),
    map((action: actions.SuccessGetContent) => action.payload),
    switchMap(payload => {
      return this.service.getOne(+payload).pipe(
        map((response: Content) => new actions.SuccessGetContent(response)),
        catchError(error =>
          of(
            new actions.RequestFailContents(
              new RequestError(
                actions.ContentsActionTypes.RequestGetContent,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostContent = this.actions$.pipe(
    ofType(actions.ContentsActionTypes.RequestPostContent),
    map((action: actions.SuccessPostContent) => action.payload),
    switchMap(payload => {
      return this.service.create(payload).pipe(
        map(response => new actions.SuccessPostContent(response)),
        catchError(error => {
          return of(
            new actions.RequestFailContents(
              new RequestError(
                actions.ContentsActionTypes.RequestPostContent,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPostContentImage = this.actions$.pipe(
    ofType(actions.ContentsActionTypes.RequestPostContentImage),
    map((action: actions.SuccessPostContentImage) => action.payload),
    switchMap(payload => {
      return this.fileUploaderService.upload(payload).pipe(
        map(response => new actions.SuccessPostContentImage(response)),
        catchError(error => {
          return of(
            new actions.RequestFailContents(
              new RequestError(
                actions.ContentsActionTypes.RequestPostContentImage,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPostContentFile = this.actions$.pipe(
    ofType(actions.ContentsActionTypes.RequestPostContentFile),
    map((action: actions.SuccessPostContentFile) => action.payload),
    switchMap(payload => {
      return this.fileUploaderService.upload(payload).pipe(
        map(response => new actions.SuccessPostContentFile(response)),
        catchError(error => {
          return of(
            new actions.RequestFailContents(
              new RequestError(
                actions.ContentsActionTypes.RequestPostContentFile,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutContent = this.actions$.pipe(
    ofType(actions.ContentsActionTypes.RequestPutContent),
    map((action: actions.SuccessPutContent) => action.payload),
    switchMap(payload => {
      return this.service.update(payload).pipe(
        map(response => new actions.SuccessPutContent(response)),
        catchError(error =>
          of(
            new actions.RequestFailContents(
              new RequestError(
                actions.ContentsActionTypes.RequestPutContent,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteContent = this.actions$.pipe(
    ofType(actions.ContentsActionTypes.RequestDeleteContent),
    map((action: actions.SuccessDeleteContent) => action.payload),
    switchMap(payload => {
      return this.service.delete(+payload).pipe(
        map(response => new actions.SuccessDeleteContent(response)),
        catchError(error =>
          of(
            new actions.RequestFailContents(
              new RequestError(
                actions.ContentsActionTypes.RequestDeleteContent,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteContents = this.actions$.pipe(
  //   ofType(actions.ContentsActionTypes.RequestBulkDeleteContents),
  //   map((action: actions.SuccessBulkDeleteContents) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteContents(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailContents(
  //             new RequestError(
  //               actions.ContentsActionTypes.RequestBulkDeleteContents,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyContents = this.actions$.pipe(
    ofType(actions.ContentsActionTypes.RequestGetEntirelyContents),
    map((action: actions.SuccessGetEntirelyContents) => action.payload),
    switchMap(payload => {
      return this.service.getAll(payload).pipe(
        map(
          (response: ContentResponse) =>
            new actions.SuccessGetEntirelyContents(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFailContents(
              new RequestError(
                actions.ContentsActionTypes.RequestGetEntirelyContents,
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
    private service: ContentsService,
    private fileUploaderService: FileUploaderService
  ) {}
}
