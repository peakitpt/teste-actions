import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@peakitpt/ui-kyrios-api';
import { DialogComponent, SnackBarService } from '@peakitpt/ui-material';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'kyr-change-password',
  templateUrl: './change-password.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ChangePasswordComponent implements OnInit {
  modulePath: string = 'change-password';
  @ViewChild('modal') modal: DialogComponent;

  form: FormGroup;

  visibility = {
    currentPasswordVisible: 'password',
    passwordVisible: 'password',
    passwordConfirmationVisible: 'password',
  };

  constructor(
    public i18nextPipe: I18NextPipe,
    public fb: FormBuilder,
    public snackBarService: SnackBarService,
    private authService: AuthService,
    public http: HttpClient,
    public sharedModule: SharedModule
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  openModal() {
    this.modal.open();
  }

  modalClose() {}

  initializeForm() {
    this.form = this.fb.group({
      current_password: [null, Validators.required],
      password: [null, Validators.required],
      password_confirmation: [null, Validators.required],
    });
  }

  onSubmit() {
    if (
      this.form.value['password'] !== this.form.value['password_confirmation']
    ) {
      this.snackBarService.openSimpleSnackBar(
        this.i18nextPipe.transform(
          `${this.modulePath}:error.passwords_not_equal`
        )
      );
      return;
    }

    let payload = this.form.value;

    this.authService.changeOwnPassword(payload).subscribe(
      (r) => {
        this.snackBarService.openSnackBar(
          this.i18nextPipe.transform(
            `${this.modulePath}:message.password_changed`
          ),
          this.sharedModule.SUCCESS_COLOR
        );
        this.modal.close();
      },
      (error) => {
        this.snackBarService.openSnackBar(
          this.i18nextPipe.transform(`${this.modulePath}:error.error_changing`),
          this.sharedModule.ERROR_COLOR
        );
      }
    );
  }

  togglePasswordVisible(variable) {
    if (this.visibility[variable] === 'password') {
      this.visibility[variable] = 'text';
    } else {
      this.visibility[variable] = 'password';
    }
  }
}
