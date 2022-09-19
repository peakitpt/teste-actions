import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '@peakitpt/ui-kyrios-api';
import { DialogComponent, SnackBarService } from '@peakitpt/ui-material';
import { I18NextPipe } from 'angular-i18next';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'kyr-forgot-password',
  templateUrl: './forgot-password.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ForgotPasswordComponent implements OnInit, AfterViewInit {
  modulePath: string = 'change-password';
  @ViewChild('modal') modal: DialogComponent;

  isLoading: boolean = false;
  form: FormGroup;
  environment = environment;

  constructor(
    public i18nextPipe: I18NextPipe,
    public fb: FormBuilder,
    public snackBarService: SnackBarService,
    public usersService: UsersService,
    public cookieService: CookieService,
    public sharedModule: SharedModule,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  ngAfterViewInit() {}

  openModal() {
    this.modal.open();
  }

  modalClose() {}

  initializeForm() {
    this.form = this.fb.group({
      utf8: '✓',
      authenticity_token: this.cookieService.get('XSRF-TOKEN'),
      'user[email]': [
        null,
        [
          Validators.required,
          Validators.pattern(this.sharedModule.PATTERN_EMAIL),
        ],
      ],
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      this.snackBarService.openSimpleSnackBar(
        this.i18nextPipe.transform(`${this.modulePath}:error.invalid_email`),
        null,
        5000
      );
      return;
    }

    let payload = '';
    Object.keys(this.form.value).forEach((key) => {
      payload += `${encodeURI(key)}=${encodeURI(this.form.value[key])}&`;
    });

    this.isLoading = true;
    const sub: Subscription = this.usersService
      .askResetPassword(payload)
      .subscribe(
        (r) => {
          this.snackBarService.openSimpleSnackBar(
            this.i18nextPipe.transform(`${this.modulePath}:message.email_sent`),
            null,
            5000
          );
          this.isLoading = false;
          sub.unsubscribe();
        },
        (error) => {
          if (error?.error?.errors?.email[0]) {
            this.snackBarService.openSimpleSnackBar(
              error.error.errors.email[0],
              null,
              5000
            );
          } else {
            this.snackBarService.openSimpleSnackBar(
              this.i18nextPipe.transform(
                `${this.modulePath}:error.error_sending_email`
              ),
              null,
              5000
            );
          }
          this.isLoading = false;
          sub.unsubscribe();
        }
      );
  }

  get currentTheme() {
    if (localStorage.getItem('kyriosTheme') === null) {
      localStorage.setItem('kyriosTheme', 'kyrios-theme-light');
    }

    return localStorage.getItem('kyriosTheme')
      ? localStorage.getItem('kyriosTheme')
      : 'kyrios-theme-light';
  }
}
