import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';

import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as actions from '../reducers/users.actions';
import { getUser } from '../reducers/users.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { User } from '../user.model';
import { ofType } from '@ngrx/effects';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';

@Component({
  selector: 'kyr-users-change-password',
  templateUrl: './users-change-password.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class UsersChangePasswordComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<User>;
  modulePath = 'users';

  selectorGetModel = getUser;
  actionRequestFail = actions.UsersActionTypes.RequestFailUsers;
  actionRequestGetAll = actions.RequestGetAllUsers;
  actionRequestGetOne = actions.RequestGetUser;
  actionRequestPut = actions.RequestChangeUserPassword;
  actionSuccessPut = actions.UsersActionTypes.SuccessChangeUserPassword;

  visibility = {
    passwordVisible: 'password',
    repeatPasswordVisible: 'password',
  };

  initializeForm() {
    this.form = this.fb.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required],
      repeat_password: [null, Validators.required],
      user_id: [null],
    });
  }

  onAfterViewInit() {
    this.clearModalInputs();
  }

  subscribeForSavingActions() {
    // Subscribe for creating/updating actions
    this.subs.push(
      this.actionSubject
        .pipe(ofType(this.actionRequestFail, this.actionSuccessPut))
        .subscribe((result: any) => {
          this.isSaving = false;
          if (result.payload instanceof RequestError) {
            this.snackBarService.openSnackBar(
              result.payload.error.error,
              this.sharedModule.ERROR_COLOR,
              5000
            );
          } else {
            this.isLoading = true;

            this.snackBarService.openSnackBar(
              this.i18nextPipe.transform(
                `${this.modulePath}:message.save_success`
              ),
              this.sharedModule.SUCCESS_COLOR
            );
            this.modal.close();
          }
        })
    );
  }

  onFormValid(payload = this.form.getRawValue()) {
    if (this.form.value.id) {
      this.store.dispatch(new this.actionRequestPut(payload));
    }
  }

  togglePasswordVisible(variable) {
    if (this.visibility[variable] === 'password') {
      this.visibility[variable] = 'text';
    } else {
      this.visibility[variable] = 'password';
    }
  }
}
