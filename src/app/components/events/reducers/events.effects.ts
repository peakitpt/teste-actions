import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { EventsService, FileUploaderService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './events.actions';
import { Event, EventResponse } from '../event.model';

@Injectable()
export class EventsEffects {
  @Effect()
  RequestGetAllEvents = this.actions$.pipe(
    ofType(actions.EventsActionTypes.RequestGetAllEvents),
    map((action: actions.SuccessGetAllEvents) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: EventResponse) => new actions.SuccessGetAllEvents(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailEvents(
              new RequestError(
                actions.EventsActionTypes.RequestGetAllEvents,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetEvent = this.actions$.pipe(
    ofType(actions.EventsActionTypes.RequestGetEvent),
    map((action: actions.SuccessGetEvent) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map((response: Event) => new actions.SuccessGetEvent(response)),
        catchError((error) =>
          of(
            new actions.RequestFailEvents(
              new RequestError(actions.EventsActionTypes.RequestGetEvent, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostEvent = this.actions$.pipe(
    ofType(actions.EventsActionTypes.RequestPostEvent),
    map((action: actions.SuccessPostEvent) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPostEvent(response)),
        catchError((error) => {
          return of(
            new actions.RequestFailEvents(
              new RequestError(
                actions.EventsActionTypes.RequestPostEvent,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPostEventImage = this.actions$.pipe(
    ofType(actions.EventsActionTypes.RequestPostEventImage),
    map((action: actions.SuccessPostEventImage) => action.payload),
    switchMap((payload) => {
      return this.fileUploaderService.upload(payload).pipe(
        map((response) => new actions.SuccessPostEventImage(response)),
        catchError((error) => {
          return of(
            new actions.RequestFailEvents(
              new RequestError(
                actions.EventsActionTypes.RequestPostEventImage,
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
    ofType(actions.EventsActionTypes.RequestPostContentFile),
    map((action: actions.SuccessPostContentFile) => action.payload),
    switchMap((payload) => {
      return this.fileUploaderService.upload(payload).pipe(
        map((response) => new actions.SuccessPostContentFile(response)),
        catchError((error) => {
          return of(
            new actions.RequestFailEvents(
              new RequestError(
                actions.EventsActionTypes.RequestPostContentFile,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutEvent = this.actions$.pipe(
    ofType(actions.EventsActionTypes.RequestPutEvent),
    map((action: actions.SuccessPutEvent) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPutEvent(response)),
        catchError((error) =>
          of(
            new actions.RequestFailEvents(
              new RequestError(actions.EventsActionTypes.RequestPutEvent, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteEvent = this.actions$.pipe(
    ofType(actions.EventsActionTypes.RequestDeleteEvent),
    map((action: actions.SuccessDeleteEvent) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDeleteEvent(response)),
        catchError((error) =>
          of(
            new actions.RequestFailEvents(
              new RequestError(
                actions.EventsActionTypes.RequestDeleteEvent,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteEvents = this.actions$.pipe(
  //   ofType(actions.EventsActionTypes.RequestBulkDeleteEvents),
  //   map((action: actions.SuccessBulkDeleteEvents) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteEvents(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailEvents(
  //             new RequestError(
  //               actions.EventsActionTypes.RequestBulkDeleteEvents,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyEvents = this.actions$.pipe(
    ofType(actions.EventsActionTypes.RequestGetEntirelyEvents),
    map((action: actions.SuccessGetEntirelyEvents) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: EventResponse) =>
            new actions.SuccessGetEntirelyEvents(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailEvents(
              new RequestError(
                actions.EventsActionTypes.RequestGetEntirelyEvents,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestNotifyEvents = this.actions$.pipe(
    ofType(actions.EventsActionTypes.RequestNotifyEvents),
    map((action: actions.SuccessNotifyEvents) => action.payload),
    switchMap((payload) => {
      return this.service.notifyRegistrations(payload).pipe(
        map(
          (response: EventResponse) => new actions.SuccessNotifyEvents(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailEvents(
              new RequestError(
                actions.EventsActionTypes.RequestNotifyEvents,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetRegistrationHistory = this.actions$.pipe(
    ofType(actions.EventsActionTypes.RequestGetRegistrationHistory),
    map((action: actions.SuccessGetRegistrationHistory) => action.payload),
    switchMap((payload) => {
      return this.service.registrationHistory(payload).pipe(
        map(
          (response: EventResponse) =>
            new actions.SuccessGetRegistrationHistory(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFailEvents(
              new RequestError(
                actions.EventsActionTypes.RequestGetRegistrationHistory,
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
    private service: EventsService,
    private fileUploaderService: FileUploaderService
  ) {}
}
