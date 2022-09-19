import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Subscription, throwError } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MemoizedSelector, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { isNull } from 'lodash';
import { get } from 'lodash';

export class RequestError {
  constructor(public type: string, public error: any) {}
}

export function ofError(actionType: string) {
  return filter(
    (error: RequestError) => isNull(error) || error.type === actionType
  );
}

interface HandleError {
  selector: MemoizedSelector<any, any>;
  form: FormGroup;
}

interface NetworkErrorArgs {
  error: HttpErrorResponse;
  options: HandleError;
}

export interface InvalidField {
  code: 'required' | 'string' | 'number' | 'empty';
  message: string;
  path: string[] | string;
}

@Injectable()
export class ErrorHandlingService {
  componentNetworkError = {
    422: ({ error, options }: NetworkErrorArgs) => {
      const { form } = options;
      const unprocessableFields = error.error.errors.reduce((acc, error) => {
        return {
          ...acc,
          [error.path || (!error.path && error.code)]: {
            path: `errors.${error.code}`,
            customValue: get(error, 'context.value', '')
          }
        };
      }, {});

      // tslint:disable-next-line: forin
      for (const field in unprocessableFields) {
        let fieldName = field;
        const fieldError = unprocessableFields[field].path;
        const customValue = unprocessableFields[field].customValue;
        const splitedField = field.split(',');
        let control = form.get(splitedField);

        if (!control && form.get(fieldName)) {
          control = form.get(fieldName);
        }
        if (control) {
          if (fieldError.includes('required')) {
            control.markAsTouched();
          }

          if (fieldError.includes('duplicate')) {
            fieldName = this.translate.instant(`field.${field}`);
            if (fieldName === `field.${field}`) {
              fieldName = field;
            }
          }

          control.setErrors({
            [fieldError]: { fieldName, customValue }
          });
        } else {
          console.error('Could not process field: ', splitedField);
        }
      }
    },
    409: ({ error, options }: NetworkErrorArgs) => {
      // Conflict
    }
  };

  globalNetworkError = {
    0: () => {
      window.navigator.onLine
        ? this.openSnackBar({ message: 'errors.server.offline' })
        : this.openSnackBar({ message: 'errors.browser.offline' });
    },
    404: () => {
      this.openSnackBar({ message: 'errors.not_found' });
    },
    500: () => {
      this.openSnackBar({ message: 'errors.server.error' });
    },
    400: () => {
      this.openSnackBar({ message: 'errors.malformed' });
    },
    401: () => {
      this.openSnackBar({ message: 'errors.unauthorized' });
      // this.store.dispatch(new SuccessSignout());
    },
    403: () => {
      this.openSnackBar({ message: 'errors.forbidden' });
      // this.store.dispatch(new RequestSignout());
    }
  };

  overrideGlobalNetworkError = {};

  constructor(
    private store: Store<any>,
    private translate: TranslateService
  ) {}

  handle = (options: HandleError): Subscription => {
    const { selector } = options;
    return this.store.select(selector).subscribe(error => {
      if (error instanceof RequestError) {
        error = error.error;
      }
      if (error instanceof HttpErrorResponse) {
        const { status } = error;
        if (status in this.componentNetworkError) {
          this.componentNetworkError[status]({ error, options });
        } else {
          console.error('No handler for network error', error);
        }
      }
    });
  }

  interceptApi = (error: any) => {
    if (error instanceof HttpErrorResponse) {
      const { status } = error;
      if (status in this.overrideGlobalNetworkError) {
        this.overrideGlobalNetworkError[status](this, { error });
      } else if (status in this.globalNetworkError) {
        this.globalNetworkError[status]({ error });
      }
    }
    this.overrideGlobalNetworkError = {};
    return throwError(error);
  }

  openSnackBar({ message, timeoutMs = 5000 }) {
    // this.overlay.open(SnackbarComponent, {
    //   labelText: this.translate.instant(message),
    //   timeoutMs
    // });
  }
}
