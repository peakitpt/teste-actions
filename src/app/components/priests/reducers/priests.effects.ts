import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { CurrentAccountsLinesService, Priestsv1Service, NewsletterGroupSubscriptionsV1Service } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './priests.actions';
import { CurrentAccountLinesResponse, Priest, PriestResponse } from '../priest.model';

@Injectable()
export class PriestsEffects {
  @Effect()
  RequestActivateDeactivateGroup = this.actions$.pipe(
    ofType(actions.PriestActionTypes.RequestActivateDeactivateGroup),
    map((action: actions.SuccessActivateDeactivateGroup) => action.payload),
    switchMap((payload) => {
      return this.groupsService.activateGroup(+payload).pipe(
        map((response: CurrentAccountLinesResponse) => new actions.SuccessActivateDeactivateGroup(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.PriestActionTypes.RequestActivateDeactivateGroup, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetAllGroups = this.actions$.pipe(
    ofType(actions.PriestActionTypes.RequestGetAllGroups),
    map((action: actions.SuccessGetAllGroups) => action.payload),
    switchMap((payload) => {
      return this.groupsService.getAll(payload, `&newsletter_entity_priest_id=${payload.id}`).pipe(
        map((response: CurrentAccountLinesResponse) => new actions.SuccessGetAllGroups(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.PriestActionTypes.RequestGetAllGroups, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetAllCurrentAccountLinesCuria = this.actions$.pipe(
    ofType(actions.PriestActionTypes.RequestGetAllCurrentAccountLinesCuria),
    map((action: actions.SuccessGetAllCurrentAccountLinesCuria) => action.payload),
    switchMap((payload) => {
      return this.serviceCurrentAccountsLines.getAll(payload, `&on_curia=true&priest_id=${payload.id}`).pipe(
        map((response: CurrentAccountLinesResponse) => new actions.SuccessGetAllCurrentAccountLinesCuria(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.PriestActionTypes.RequestGetAllCurrentAccountLinesCuria, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetAllCurrentAccountLinesPriestlyFraternity = this.actions$.pipe(
    ofType(actions.PriestActionTypes.RequestGetAllCurrentAccountLinesPriestlyFraternity),
    map((action: actions.SuccessGetAllCurrentAccountLinesPriestlyFraternity) => action.payload),
    switchMap((payload) => {
      return this.serviceCurrentAccountsLines.getAll(payload, `&priest_id=${payload.id}`).pipe(
        map((response: CurrentAccountLinesResponse) => new actions.SuccessGetAllCurrentAccountLinesPriestlyFraternity(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.PriestActionTypes.RequestGetAllCurrentAccountLinesPriestlyFraternity, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetAll = this.actions$.pipe(
    ofType(actions.PriestActionTypes.RequestGetAll),
    map((action: actions.SuccessGetAll) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map((response: PriestResponse) => new actions.SuccessGetAll(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.PriestActionTypes.RequestGetAll, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGet = this.actions$.pipe(
    ofType(actions.PriestActionTypes.RequestGet),
    map((action: actions.SuccessGet) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map((response: Priest) => new actions.SuccessGet(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.PriestActionTypes.RequestGet, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPost = this.actions$.pipe(
    ofType(actions.PriestActionTypes.RequestPost),
    map((action: actions.SuccessPost) => action.payload),
    switchMap((payload) => {
      return this.service.create(payload).pipe(
        map((response) => new actions.SuccessPost(response)),
        catchError((error) => {
          return of(
            new actions.RequestFail(
              new RequestError(actions.PriestActionTypes.RequestPost, error)
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPut = this.actions$.pipe(
    ofType(actions.PriestActionTypes.RequestPut),
    map((action: actions.SuccessPut) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response) => new actions.SuccessPut(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.PriestActionTypes.RequestPut, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDelete = this.actions$.pipe(
    ofType(actions.PriestActionTypes.RequestDelete),
    map((action: actions.SuccessDelete) => action.payload),
    switchMap((payload) => {
      return this.service.delete(+payload).pipe(
        map((response) => new actions.SuccessDelete(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(actions.PriestActionTypes.RequestDelete, error)
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestBulkDelete = this.actions$.pipe(
    ofType(actions.PriestActionTypes.RequestBulkDelete),
    map((action: actions.SuccessBulkDelete) => action.payload),
    switchMap((payload) => {
      return this.service.bulkDelete(payload).pipe(
        map((response) => {
          return new actions.SuccessBulkDelete(response);
        }),
        catchError((error) => {
          return of(
            new actions.RequestFail(
              new RequestError(
                actions.PriestActionTypes.RequestBulkDelete,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestGetEntirely = this.actions$.pipe(
    ofType(actions.PriestActionTypes.RequestGetEntirely),
    map((action: actions.SuccessGetEntirely) => action.payload),
    switchMap((payload) => {
      return this.service.getAll(payload).pipe(
        map(
          (response: PriestResponse) => new actions.SuccessGetEntirely(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.PriestActionTypes.RequestGetEntirely,
                error
              )
            )
          )
        )
      );
    })
  );

  constructor(private actions$: Actions, private service: Priestsv1Service, private serviceCurrentAccountsLines: CurrentAccountsLinesService, private groupsService: NewsletterGroupSubscriptionsV1Service) {}
}
