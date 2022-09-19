import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { SectionsService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './sections.actions';
import { Section, SectionResponse } from '../section.model';

@Injectable()
export class SectionsEffects {
  @Effect()
  RequestGetAllSections = this.actions$.pipe(
    ofType(actions.SectionsActionTypes.RequestGetAllSections),
    map((action: actions.SuccessGetAllSections) => action.payload),
    switchMap(payload => {
      return this.service.getAll(payload).pipe(
        map(
          (response: SectionResponse) =>
            new actions.SuccessGetAllSections(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFailSections(
              new RequestError(
                actions.SectionsActionTypes.RequestGetAllSections,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetSection = this.actions$.pipe(
    ofType(actions.SectionsActionTypes.RequestGetSection),
    map((action: actions.SuccessGetSection) => action.payload),
    switchMap(payload => {
      return this.service.getOne(+payload).pipe(
        map((response: Section) => new actions.SuccessGetSection(response)),
        catchError(error =>
          of(
            new actions.RequestFailSections(
              new RequestError(
                actions.SectionsActionTypes.RequestGetSection,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostSection = this.actions$.pipe(
    ofType(actions.SectionsActionTypes.RequestPostSection),
    map((action: actions.SuccessPostSection) => action.payload),
    switchMap(payload => {
      return this.service.create(payload).pipe(
        map(response => new actions.SuccessPostSection(response)),
        catchError(error => {
          return of(
            new actions.RequestFailSections(
              new RequestError(
                actions.SectionsActionTypes.RequestPostSection,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutSection = this.actions$.pipe(
    ofType(actions.SectionsActionTypes.RequestPutSection),
    map((action: actions.SuccessPutSection) => action.payload),
    switchMap(payload => {
      return this.service.update(payload).pipe(
        map(response => new actions.SuccessPutSection(response)),
        catchError(error =>
          of(
            new actions.RequestFailSections(
              new RequestError(
                actions.SectionsActionTypes.RequestPutSection,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteSection = this.actions$.pipe(
    ofType(actions.SectionsActionTypes.RequestDeleteSection),
    map((action: actions.SuccessDeleteSection) => action.payload),
    switchMap(payload => {
      return this.service.delete(+payload).pipe(
        map(response => new actions.SuccessDeleteSection(response)),
        catchError(error =>
          of(
            new actions.RequestFailSections(
              new RequestError(
                actions.SectionsActionTypes.RequestDeleteSection,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteSections = this.actions$.pipe(
  //   ofType(actions.SectionsActionTypes.RequestBulkDeleteSections),
  //   map((action: actions.SuccessBulkDeleteSections) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteSections(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailSections(
  //             new RequestError(
  //               actions.SectionsActionTypes.RequestBulkDeleteSections,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelySections = this.actions$.pipe(
    ofType(actions.SectionsActionTypes.RequestGetEntirelySections),
    map((action: actions.SuccessGetEntirelySections) => action.payload),
    switchMap(payload => {
      return this.service.getAll(payload).pipe(
        map(
          (response: SectionResponse) =>
            new actions.SuccessGetEntirelySections(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFailSections(
              new RequestError(
                actions.SectionsActionTypes.RequestGetEntirelySections,
                error
              )
            )
          )
        )
      );
    })
  );

  constructor(private actions$: Actions, private service: SectionsService) {}
}
