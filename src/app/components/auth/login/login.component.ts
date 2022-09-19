import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  TemplateRef,
  HostListener,
  OnDestroy,
  Inject,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';
import { Observable, Subscription } from 'rxjs';
import { getLogin, getError } from '../reducers/auth.selectors';
import { RequestPostLogIn } from './../reducers/auth.actions';
import { SnackBarService } from '@peakitpt/ui-material';
import {
  I18NextPipe,
  I18NEXT_SERVICE,
  ITranslationService,
} from 'angular-i18next';
import { CountryList } from '../../base/base.component';
import { OverlayContainer } from '@angular/cdk/overlay';
import { SharedModule } from 'src/app/shared/shared.module';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ChangePasswordComponent } from '../../change-password/change-password.component';

@Component({
  selector: 'kyr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  environment = environment;
  tabs: any[] = [];
  sliders: any;
  loginForm: FormGroup;
  registerForm: FormGroup;
  welcomeMessage: string;

  innerWidth: any;

  @ViewChild('loginTemplate', { static: false })
  loginTemplate: TemplateRef<any>;
  @ViewChild('registerTemplate', { static: false })
  registerTemplate: TemplateRef<any>;
  @ViewChild('slider1', { static: false }) slider1: TemplateRef<any>;
  @ViewChild('slider2', { static: false }) slider2: TemplateRef<any>;
  // @ViewChild('failLoginSnackBar', { static: false })
  // failLoginSnackBar: SnackBarComponent;

  @ViewChild('forgotPasswordModal')
  forgotPasswordModal: ChangePasswordComponent;

  auth$: Observable<any>;
  authError$: Observable<any>;
  authSub: Subscription;
  authSubError: Subscription;

  @HostBinding('class') componentCssClass;

  currentYear: number = new Date().getFullYear();

  countryList: CountryList[] = [
    { countryCode: 'pt', languageCode: 'pt', description: 'Português' },
    { countryCode: 'es', languageCode: 'es', description: 'Español' },
    { countryCode: 'gb', languageCode: 'en', description: 'English UK' },
  ];

  languageFlag = {
    pt: 'pt',
    es: 'es',
    en: 'gb',
  };
  language = localStorage.getItem('i18nextLng')
    ? localStorage.getItem('i18nextLng')
    : navigator.language;
  languageForm = new FormControl(this.languageFlag[this.language]);

  constructor(
    private fb: FormBuilder,
    private store: Store<AuthState>,
    private snackBarService: SnackBarService,
    private sharedModule: SharedModule,
    private i18NextPipe: I18NextPipe,
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
    private overlayContainer: OverlayContainer,
    private titleService: Title
  ) {
    this.loginForm = this.fb.group({
      email: [null, Validators.pattern(this.sharedModule.PATTERN_EMAIL)],
      password: [null],
      remember: [true],
    });

    this.registerForm = this.fb.group({
      email: [],
      password: [],
      passwordConfirm: [],
    });
  }

  ngOnInit() {
    this.titleService.setTitle(
      `${environment.appName} | ${this.i18NextPipe.transform(
        'login:welcome_to_chms',
        {
          appName: environment.appName,
        }
      )}`
    );

    this.innerWidth = window.innerWidth;
    this.auth$ = this.store.select(getLogin);
    this.authError$ = this.store.select(getError);

    this.componentCssClass = localStorage.getItem('kyriosTheme')
      ? localStorage.getItem('kyriosTheme')
      : 'kyrios-theme-light';
    this.setOverlayTheme();

    this.authSub = this.auth$.subscribe((r) => {
      if (r?.payload?.ok) {
        // this.router.navigate(['dashboard']);
        location.href = r.payload.body.redirect_url;
      }
    });

    this.authSubError = this.authError$.subscribe((r) => {
      if (r) {
        this.snackBarService.openSnackBar(
          this.i18NextPipe.transform('login:login_fail_message'),
          this.sharedModule.ERROR_COLOR
        );
      }
    });

    this.languageForm.valueChanges.subscribe((country) => {
      this.changeLanguage(country);
    });
  }

  @HostListener('window:resize', ['$event'])
  ngOnResize(event) {
    this.innerWidth = window.innerWidth;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.tabs = [
        {
          textLabel: this.i18NextPipe.transform('login:login'),
          templateContent: this.loginTemplate,
        },
        // {
        //   textLabel: this.i18NextPipe.transform('login:register'),
        //   templateContent: this.registerTemplate
        // }
      ];

      this.sliders = [
        {
          hideOverlay: false,
          image: 'null',
          data: null,
          template: this.slider1,
        },
        // {
        //   hideOverlay: true,
        //   data: null,
        //   template: this.slider2,
        // },
      ];
    });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
    this.authSubError.unsubscribe();
  }

  login() {
    this.store.dispatch(new RequestPostLogIn(this.loginForm.value));
  }

  setOverlayTheme() {
    this.overlayContainer
      .getContainerElement()
      .classList.add(this.componentCssClass);
  }

  changeLanguage(lang: string) {
    if (lang !== this.i18NextService.language) {
      this.i18NextService.changeLanguage(lang).then((x) => {
        this.updateState(lang);
        document.location.reload();
      });
    }
  }

  private updateState(lang: string) {
    this.language = lang;
  }

  openForgotPasswordModal() {
    this.forgotPasswordModal.openModal();
  }
}
