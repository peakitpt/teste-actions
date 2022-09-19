import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '@peakitpt/ui-kyrios-api';
import { DialogComponent, SnackBarService } from '@peakitpt/ui-material';
import { I18NextPipe } from 'angular-i18next';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'kyr-reset-password',
  templateUrl: './reset-password.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ResetPasswordComponent
  extends ForgotPasswordComponent
  implements OnInit, AfterViewInit
{
  modulePath: string = 'change-password';
  @ViewChild('modal') modal: DialogComponent;

  hasResetPassworToken: boolean = false;
  passwordToken: string;
  errors: string[] = [];

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
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    super(
      i18nextPipe,
      fb,
      snackBarService,
      usersService,
      cookieService,
      sharedModule,
      activatedRoute
    );
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['reset_password_token']) {
        this.hasResetPassworToken = true;
        this.passwordToken = params['reset_password_token'];
        this.openModal();
      }
      this.initializeForm();
    });
  }

  openModal() {
    this.modal.open();
  }

  modalClose() {
    this.router.navigate(['.']);
  }

  initializeForm() {
    this.form = this.fb.group({
      utf8: '✓',
      _method: 'put',
      authenticity_token: this.cookieService.get('XSRF-TOKEN'),
      'user[reset_password_token]': this.passwordToken,
      'user[password]': [null, [Validators.required]],
      'user[password_confirmation]': [null, [Validators.required]],
    });
  }

  onSubmit() {
    let payload = '';
    Object.keys(this.form.value).forEach((key) => {
      payload += `${encodeURI(key)}=${encodeURI(this.form.value[key])}&`;
    });

    this.isLoading = true;
    const sub: Subscription = this.usersService
      .resetPassword(payload)
      .subscribe(
        (r) => {
          this.snackBarService.openSimpleSnackBar(
            this.i18nextPipe.transform(
              `${this.modulePath}:message.password_changed`
            ),
            null,
            5000
          );
          this.isLoading = false;
          sub.unsubscribe();
          this.modal.close();
        },
        (error) => {
          this.errors = [];
          Object.keys(error.error.errors).forEach((key: any) => {
            error.error.errors[key].forEach((i: string) => {
              this.errors.push(i);
            });
          });
          this.snackBarService.openSimpleSnackBar(
            this.i18nextPipe.transform(
              `${this.modulePath}:error.error_reseting_password`
            ),
            null,
            5000
          );

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
