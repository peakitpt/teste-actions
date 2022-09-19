import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { CountriesService } from '@peakitpt/ui-kyrios-api';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import * as actions from './countries.actions';
import { Country, CountryResponse } from '../country.model';

@Injectable()
export class CountriesEffects {
  @Effect()
  RequestGetAllCountries = this.actions$.pipe(
    ofType(actions.CountriesActionTypes.RequestGetAllCountries),
    map((action: actions.SuccessGetAllCountries) => action.payload),
    switchMap(payload => {
      return this.service.getAll(payload).pipe(
        map(
          (response: CountryResponse) =>
            new actions.SuccessGetAllCountries(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFailCountries(
              new RequestError(
                actions.CountriesActionTypes.RequestGetAllCountries,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestGetCountry = this.actions$.pipe(
    ofType(actions.CountriesActionTypes.RequestGetCountry),
    map((action: actions.SuccessGetCountry) => action.payload),
    switchMap(payload => {
      return this.service.getOne(+payload).pipe(
        map((response: Country) => new actions.SuccessGetCountry(response)),
        catchError(error =>
          of(
            new actions.RequestFailCountries(
              new RequestError(
                actions.CountriesActionTypes.RequestGetCountry,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestPostCountry = this.actions$.pipe(
    ofType(actions.CountriesActionTypes.RequestPostCountry),
    map((action: actions.SuccessPostCountry) => action.payload),
    switchMap(payload => {
      return this.service.create(payload).pipe(
        map(response => new actions.SuccessPostCountry(response)),
        catchError(error => {
          return of(
            new actions.RequestFailCountries(
              new RequestError(
                actions.CountriesActionTypes.RequestPostCountry,
                error
              )
            )
          );
        })
      );
    })
  );

  @Effect()
  RequestPutCountry = this.actions$.pipe(
    ofType(actions.CountriesActionTypes.RequestPutCountry),
    map((action: actions.SuccessPutCountry) => action.payload),
    switchMap(payload => {
      return this.service.update(payload).pipe(
        map(response => new actions.SuccessPutCountry(response)),
        catchError(error =>
          of(
            new actions.RequestFailCountries(
              new RequestError(
                actions.CountriesActionTypes.RequestPutCountry,
                error
              )
            )
          )
        )
      );
    })
  );

  @Effect()
  RequestDeleteCountry = this.actions$.pipe(
    ofType(actions.CountriesActionTypes.RequestDeleteCountry),
    map((action: actions.SuccessDeleteCountry) => action.payload),
    switchMap(payload => {
      return this.service.delete(+payload).pipe(
        map(response => new actions.SuccessDeleteCountry(response)),
        catchError(error =>
          of(
            new actions.RequestFailCountries(
              new RequestError(
                actions.CountriesActionTypes.RequestDeleteCountry,
                error
              )
            )
          )
        )
      );
    })
  );

  // @Effect()
  // RequestBulkDeleteCountries = this.actions$.pipe(
  //   ofType(actions.CountriesActionTypes.RequestBulkDeleteCountries),
  //   map((action: actions.SuccessBulkDeleteCountries) => action.payload),
  //   switchMap(payload => {
  //     return this.service.bulkDelete(payload).pipe(
  //       map(response => {
  //         return new actions.SuccessBulkDeleteCountries(response);
  //       }),
  //       catchError(error => {
  //         return of(
  //           new actions.RequestFailCountries(
  //             new RequestError(
  //               actions.CountriesActionTypes.RequestBulkDeleteCountries,
  //               error
  //             )
  //           )
  //         );
  //       })
  //     );
  //   })
  // );

  @Effect()
  RequestGetEntirelyCountries = this.actions$.pipe(
    ofType(actions.CountriesActionTypes.RequestGetEntirelyCountries),
    map((action: actions.SuccessGetEntirelyCountries) => action.payload),
    switchMap(payload => {
      return this.service.getAll(payload).pipe(
        map(
          (response: CountryResponse) =>
            new actions.SuccessGetEntirelyCountries(response)
        ),
        catchError(error =>
          of(
            new actions.RequestFailCountries(
              new RequestError(
                actions.CountriesActionTypes.RequestGetEntirelyCountries,
                error
              )
            )
          )
        )
      );
    })
  );

  constructor(private actions$: Actions, private service: CountriesService) {}
}
