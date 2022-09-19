import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import {
  CurrentAccountsLinesService,
  ProfilePriestsService,
  NewsletterGroupSubscriptionsV1Service,
} from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './profile-priests.actions';
import {
  CurrentAccountLinesResponse,
  ProfilePriest,
  ProfilePriestResponse,
} from '../profile-priest.model';

@Injectable()
export class ProfilePriestsEffects {
  @Effect()
  RequestActivateDeactivateGroup = this.actions$.pipe(
    ofType(actions.ProfilePriestActionTypes.RequestActivateDeactivateGroup),
    map((action: actions.SuccessActivateDeactivateGroup) => action.payload),
    switchMap((payload) => {
      return this.groupsService.activateGroup(+payload).pipe(
        map(
          (response: CurrentAccountLinesResponse) =>
            new actions.SuccessActivateDeactivateGroup(response)
        ),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.ProfilePriestActionTypes.RequestActivateDeactivateGroup,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetAllGroups = this.actions$.pipe(
    ofType(actions.ProfilePriestActionTypes.RequestGetAllGroups),
    map((action: actions.SuccessGetAllGroups) => action.payload),
    switchMap((payload) => {
      return this.groupsService
        .getAll(payload, `&newsletter_entity_profile-priest_id=${payload.id}`)
        .pipe(
          map(
            (response: CurrentAccountLinesResponse) =>
              new actions.SuccessGetAllGroups(response)
          ),
          catchError((error) =>
            of(
              new actions.RequestFail(
                new RequestError(
                  actions.ProfilePriestActionTypes.RequestGetAllGroups,
                  error
                )
              )
            )
          )
        );
    })
  );

  @Effect()
  RequestGetAllCurrentAccountLinesCuria = this.actions$.pipe(
    ofType(
      actions.ProfilePriestActionTypes.RequestGetAllCurrentAccountLinesCuria
    ),
    map(
      (action: actions.SuccessGetAllCurrentAccountLinesCuria) => action.payload
    ),
    switchMap((payload) => {
      return this.serviceCurrentAccountsLines
        .getAll(payload, `&on_curia=true&priest_id=${payload.id}`)
        .pipe(
          map(
            (response: CurrentAccountLinesResponse) =>
              new actions.SuccessGetAllCurrentAccountLinesCuria(response)
          ),
          catchError((error) =>
            of(
              new actions.RequestFail(
                new RequestError(
                  actions.ProfilePriestActionTypes.RequestGetAllCurrentAccountLinesCuria,
                  error
                )
              )
            )
          )
        );
    })
  );

  @Effect()
  RequestGetAllCurrentAccountLinesProfilePriestlyFraternity = this.actions$.pipe(
    ofType(
      actions.ProfilePriestActionTypes
        .RequestGetAllCurrentAccountLinesProfilePriestlyFraternity
    ),
    map(
      (
        action: actions.SuccessGetAllCurrentAccountLinesProfilePriestlyFraternity
      ) => action.payload
    ),
    switchMap((payload) => {
      return this.serviceCurrentAccountsLines
        .getAll(payload, `&priest_id=${payload.id}`)
        .pipe(
          map(
            (response: CurrentAccountLinesResponse) =>
              new actions.SuccessGetAllCurrentAccountLinesProfilePriestlyFraternity(
                response
              )
          ),
          catchError((error) =>
            of(
              new actions.RequestFail(
                new RequestError(
                  actions.ProfilePriestActionTypes.RequestGetAllCurrentAccountLinesProfilePriestlyFraternity,
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
    ofType(actions.ProfilePriestActionTypes.RequestGet),
    map((action: actions.SuccessGet) => action.payload),
    switchMap((payload) => {
      return this.service.getOne(+payload).pipe(
        map((response: ProfilePriest) => new actions.SuccessGet(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.ProfilePriestActionTypes.RequestGet,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPut = this.actions$.pipe(
    ofType(actions.ProfilePriestActionTypes.RequestPut),
    map((action: actions.SuccessPut) => action.payload),
    switchMap((payload) => {
      return this.service.update(payload).pipe(
        map((response: any) => new actions.SuccessPut(response)),
        catchError((error) =>
          of(
            new actions.RequestFail(
              new RequestError(
                actions.ProfilePriestActionTypes.RequestPut,
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
    private service: ProfilePriestsService,
    private serviceCurrentAccountsLines: CurrentAccountsLinesService,
    private groupsService: NewsletterGroupSubscriptionsV1Service
  ) {}
}
