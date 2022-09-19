import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './base.actions';
import {
  PermissionsService,
  SubscriptionsService,
  NewsletterReadStatusesService,
  EntitiesAccessService
} from '@peakitpt/ui-kyrios-api';

@Injectable()
export class SideNavEffects {
  @Effect()
  RequestGetSideNav = this.actions$.pipe(
    ofType(actions.SideNavActionTypes.RequestGetSideNav),
    map((action: actions.SuccessGetSideNav) => action),
    switchMap(payload => {
      return of(new actions.SuccessGetSideNav());
    })
  );

  @Effect()
  RequestPostSideNav = this.actions$.pipe(
    ofType(actions.SideNavActionTypes.RequestPostSideNav),
    map((action: actions.SuccessPostSideNav) => action.payload),
    switchMap(payload => {
      return of(new actions.SuccessPostSideNav(payload));
    })
  );

  @Effect()
  RequestGetMenu = this.actions$.pipe(
    ofType(actions.SideNavActionTypes.RequestGetMenu),
    map((action: actions.SuccessGetMenu) => action.payload),
    switchMap(payload => {
      return this.service.getMenu(payload).pipe(
        map(result => {
          return new actions.SuccessGetMenu(result);
        }),
        catchError(error => {
          return of('Error Getting Menu', error);
        })
      );
    })
  );

  @Effect()
  RequestGetSubscriptions = this.actions$.pipe(
    ofType(actions.SideNavActionTypes.RequestGetSubscriptions),
    map((action: actions.SuccessGetSubscriptions) => action.payload),
    switchMap(payload => {
      return this.subscriptionsService.getSubscriptions(payload).pipe(
        map(result => {
          return new actions.SuccessGetSubscriptions(result);
        }),
        catchError(error => {
          return of('Error Getting Subscriptions', error);
        })
      );
    })
  );

  @Effect()
  RequestGetAllSubscriptions = this.actions$.pipe(
    ofType(actions.SideNavActionTypes.RequestGetAllSubscriptions),
    map((action: actions.SuccessGetAllSubscriptions) => action.payload),
    switchMap(payload => {
      return this.subscriptionsService.getSubscriptions(payload).pipe(
        map(result => {
          return new actions.SuccessGetAllSubscriptions(result);
        }),
        catchError(error => {
          return of('Error Getting Subscriptions', error);
        })
      );
    })
  );

  @Effect()
  RequestChangeSubscriptions = this.actions$.pipe(
    ofType(actions.SideNavActionTypes.RequestChangeSubscriptions),
    map((action: actions.SuccessChangeSubscriptions) => action.payload),
    switchMap(payload => {
      return this.subscriptionsService
        .changeSubscription(payload.ekklesiaId)
        .pipe(
          map(result => {
            localStorage.setItem('subscriptionId', payload.id);
            return new actions.SuccessChangeSubscriptions(payload);
          }),
          catchError(error => {
            return of('Error Changing Subscriptions', error);
          })
        );
    })
  );

  @Effect()
  RequestGetAllNewsletters = this.actions$.pipe(
    ofType(actions.SideNavActionTypes.RequestGetAllNewsletters),
    map((action: actions.SuccessGetAllNewsletters) => action.payload),
    switchMap(payload => {
      return this.newslettersService.getAll(payload).pipe(
        map(
          (newsletters: any) =>
            new actions.SuccessGetAllNewsletters(newsletters)
        ),
        catchError(error =>
          of(
            new actions.RequestFailSideNav(
              new RequestError(
                actions.SideNavActionTypes.RequestGetAllNewsletters,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetNewsletter = this.actions$.pipe(
    ofType(actions.SideNavActionTypes.RequestGetNewsletter),
    map((action: actions.SuccessGetNewsletter) => action.payload),
    switchMap(payload => {
      return this.newslettersService.getOne(+payload).pipe(
        map((newsletter: any) => new actions.SuccessGetNewsletter(newsletter)),
        catchError(error =>
          of(
            new actions.RequestFailSideNav(
              new RequestError(
                actions.SideNavActionTypes.RequestGetNewsletter,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetSearch = this.actions$.pipe(
    ofType(actions.SideNavActionTypes.RequestGetSearch),
    map((action: actions.SuccessGetSideNav) => action),
    switchMap(payload => {
      return of(new actions.SuccessGetSearch());
    })
  );

  @Effect()
  RequestPostSearch = this.actions$.pipe(
    ofType(actions.SideNavActionTypes.RequestPostSearch),
    map((action: actions.SuccessPostSideNav) => action.payload),
    switchMap(payload => {
      return of(new actions.SuccessPostSearch(payload));
    })
  );

  @Effect()
  RequestUserInfo = this.actions$.pipe(
    ofType(actions.SideNavActionTypes.RequestUserInfo),
    map((action: actions.SuccessUserInfo) => action.payload),
    switchMap(payload => {
      return this.permissionsService.getCurrentUserInfo().pipe(
        map(result => {
          return new actions.SuccessUserInfo(result);
        })
      );
    })
  );

  @Effect()
  RequestPredefineSubscription = this.actions$.pipe(
    ofType(actions.SideNavActionTypes.RequestPredefineSubscription),
    map((action: actions.SuccessPredefineSubscription) => action.payload),
    switchMap(payload => {
      return this.entitiesAccessService.predefine(+payload).pipe(
        map(
          (response: any) => new actions.SuccessPredefineSubscription(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFailSideNav(
              new RequestError(
                actions.SideNavActionTypes.RequestPredefineSubscription,
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
    private service: PermissionsService,
    private subscriptionsService: SubscriptionsService,
    private permissionsService: PermissionsService,
    private newslettersService: NewsletterReadStatusesService,
    private entitiesAccessService: EntitiesAccessService
  ) {}
}
