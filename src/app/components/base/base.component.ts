import { getSideNav, getUserInfo } from './reducers/base.selectors';
import { Observable, Subscription } from 'rxjs';
import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  AfterViewInit,
  Inject,
  OnDestroy,
  HostListener,
  HostBinding,
} from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from './reducers/base.reducer';
import {
  ITranslationService,
  I18NEXT_SERVICE,
  I18NextPipe,
} from 'angular-i18next';
import { Router } from '@angular/router';
import { RequestLogOut } from '../auth/reducers/auth.actions';
import { OverlayContainer } from '@angular/cdk/overlay';
import { version } from '../../../../package.json';
import { environment } from 'src/environments/environment';
import { MenuHelperService } from './services/menu-helper.service';
import { PermissionsService } from '@peakitpt/ui-kyrios-api';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'kyr-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  environment = environment;
  subs: Subscription[] = [];
  topbarSearchForm: FormGroup;
  sideNavOpen = true;
  currentSubscriptionType: number = +localStorage.getItem('subscriptionTypeId');
  currentUserType: number = +localStorage.getItem('userTypeId');
  userFullName = localStorage.getItem('fullname');
  currentUser: any;
  currentVersion: string;

  sidenavData$: Observable<any>;
  sidenavData: any;
  canEditEntity: boolean = false;

  innerWidth: any;
  sidenavHasBackDrop = false;
  sidenavStartMode = 'side';

  languageFlag = {
    pt: 'pt',
    es: 'es',
    en: 'gb',
  };

  countryList: CountryList[] = [
    { countryCode: 'pt', languageCode: 'pt', description: 'Português' },
    { countryCode: 'es', languageCode: 'es', description: 'Español' },
    { countryCode: 'gb', languageCode: 'en', description: 'English UK' },
  ];

  entityDictionary = {
    2: 'chapelry',
    8: 'worship_place',
    9: 'bishopric',
    10: 'archpriestship',
    13: 'institution',
  };

  language = localStorage.getItem('i18nextLng');
  languageForm = new FormControl(this.languageFlag[this.language]);

  @ViewChild('toolbarTitleTemplate') toolbarTitleTemplate: TemplateRef<any>;
  @ViewChild('searchLeftTemplate') searchLeftTemplate: TemplateRef<any>;
  @ViewChild('searchRightTemplate') searchRightTemplate: TemplateRef<any>;

  @ViewChild('profileTemplate') profileTemplate: TemplateRef<any>;
  @ViewChild('optionsGridTemplate') optionsGridTemplate: TemplateRef<any>;
  @ViewChild('messagesTemplate') messagesTemplate: TemplateRef<any>;
  @ViewChild('helpTemplate') helpTemplate: TemplateRef<any>;
  @ViewChild('smallSearchTemplate') smallSearchTemplate: TemplateRef<any>;

  @ViewChild('changePasswordModal')
  changePasswordModal: ChangePasswordComponent;

  @HostBinding('class') componentCssClass;

  topbarModel: any;
  helpMenuModel = [
    {
      name: this.i18NextPipe.transform('translation:help.help'),
      icon: 'help',
      value: 'help',
    },
    {
      name: this.i18NextPipe.transform('translation:help.updates'),
      icon: 'update',
      value: 'update',
    },
    { isSeparator: true },
    {
      name: this.i18NextPipe.transform(
        'translation:help.utilization_terms_policy'
      ),
      value: 'utilization_terms_policy',
    },
    { isSeparator: true },
    {
      name: this.i18NextPipe.transform('translation:help.send_comments'),
      icon: 'message',
      value: 'send_comment',
    },
    {
      name: this.i18NextPipe.transform('translation:help.ask_for_help'),
      icon: 'live_help',
      value: 'ask_for_help',
    },
  ];
  subscriptions: any;

  constructor(
    private fb: FormBuilder,
    private store: Store<State>,
    private router: Router,
    private i18NextPipe: I18NextPipe,
    private overlayContainer: OverlayContainer,
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService,
    private menuHelperService: MenuHelperService,
    private permissionsService: PermissionsService
  ) {
    this.topbarSearchForm = this.fb.group({
      searchWord: [],
      hiddenSearchWord: [],
    });

    this.currentVersion = version;
  }

  ngOnInit() {
    this.componentCssClass = localStorage.getItem('kyriosTheme')
      ? localStorage.getItem('kyriosTheme')
      : 'kyrios-theme-light';
    this.setOverlayTheme();
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 959) {
      this.sideNavOpen = false;
      this.sidenavHasBackDrop = true;
      this.sidenavStartMode = 'over';
    }

    this.languageForm.valueChanges.subscribe((country) => {
      this.changeLanguage(country);
    });
    this.i18NextService.events.initialized.subscribe((e) => {
      if (e) {
        this.updateState(this.i18NextService.language);
      }
    });
    this.getCurrentUser();
    this.menuHelperService.setSideNavOpen(this.sideNavOpen);
    this.checkCanEditEntity();
  }

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }

  @HostListener('window:resize', ['$event'])
  ngOnResize(event) {
    this.innerWidth = window.innerWidth;

    if (this.innerWidth < 959) {
      this.sideNavOpen = false;
      this.sidenavHasBackDrop = true;
      this.sidenavStartMode = 'over';
    } else {
      this.sideNavOpen = true;
      this.sidenavHasBackDrop = false;
      this.sidenavStartMode = 'side';
    }
    this.menuHelperService.setSideNavOpen(this.sideNavOpen);
  }

  get currentTheme() {
    if (localStorage.getItem('kyriosTheme') === null) {
      localStorage.setItem('kyriosTheme', 'kyrios-theme-light');
    }

    return localStorage.getItem('kyriosTheme')
      ? localStorage.getItem('kyriosTheme')
      : 'kyrios-theme-light';
  }

  getFirstPage(module) {
    if (module.page) {
      return module.page;
    }
    if (module.submenu) {
      module.submenu.forEach((i) => {
        if (i.page) {
          return i.page;
        }
      });
    }
    return null;
  }

  onSetTheme(theme: string) {
    if (theme === 'kyrios-theme-dark' || theme === undefined) {
      this.overlayContainer
        .getContainerElement()
        .classList.remove('kyrios-theme-dark');
      this.componentCssClass = 'kyrios-theme-light';
      localStorage.setItem('kyriosTheme', 'kyrios-theme-light');
      this.overlayContainer
        .getContainerElement()
        .classList.add('kyrios-theme-light');
    } else {
      this.overlayContainer
        .getContainerElement()
        .classList.remove('kyrios-theme-light');
      this.componentCssClass = 'kyrios-theme-dark';
      localStorage.setItem('kyriosTheme', 'kyrios-theme-dark');
      this.overlayContainer
        .getContainerElement()
        .classList.add('kyrios-theme-dark');
    }
  }

  onChangePassword() {
    // window.location.href = environment.railsAppUrl + '/users/edit';
    this.changePasswordModal.openModal();
  }

  setOverlayTheme() {
    this.overlayContainer
      .getContainerElement()
      .classList.add(this.componentCssClass);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.sidenavData$ = this.store.select(getSideNav);
      this.sidenavData$.subscribe((r) => {
        if (r) {
          this.sidenavData = r;
        }
      });

      this.topbarModel = [
        {
          template: this.smallSearchTemplate,
        },
        {
          template: this.helpTemplate,
        },
        // {
        //   icon: 'share',
        //   color: 'grey',
        // },
        {
          template: this.messagesTemplate,
        },
        {
          template: this.optionsGridTemplate,
        },
        {
          template: this.profileTemplate,
        },
      ];
    });
  }

  toggleSideNav() {
    this.sideNavOpen = !this.sideNavOpen;
    this.menuHelperService.setSideNavOpen(this.sideNavOpen);
  }

  sidenavButtonClick(button: SideNavButton) {
    if (button.altUrl !== null) {
      window.location.href = button.altUrl;
    } else {
      if (button.url) {
        this.navigateTo(button.url);
      }
    }
  }

  navigateTo(url: string) {
    if (url) {
      this.router.navigate([url]);
    }
  }

  redirectThenNavigateTo(url: string) {
    if (url) {
      this.router
        .navigateByUrl('redirect', { skipLocationChange: true })
        .then(() => {
          this.router.navigate([url]);
        });
    }
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

  getCurrentUser() {
    this.subs.push(
      this.store.select(getUserInfo).subscribe((user: any) => {
        if (user) {
          this.currentUser = user.payload.user;
        }
      })
    );
  }

  logout() {
    this.store.dispatch(new RequestLogOut());
    this.onSetTheme('kyrios-theme-dark');

    localStorage.removeItem('token');
    localStorage.removeItem('fullname');
    localStorage.removeItem('userId');
    localStorage.removeItem('userTypeId');
    localStorage.removeItem('userEntityId');
    localStorage.removeItem('subscriptionId');
    localStorage.removeItem('subscriptionTypeId');
    localStorage.removeItem('currentSubscription');
    localStorage.removeItem('kyriosTheme');
    window.location.href = `${environment.railsAppUrl}/users/logout`;
  }

  checkCanEditEntity() {
    const userId = localStorage.getItem('userId');
    let viewName = null;
    switch (this.currentSubscriptionType) {
      case 2:
        viewName = 'Chapelry';
        break;
      case 8:
        viewName = 'Worshipplace';
        break;
      case 9:
        viewName = 'Bishopric';
        break;
      case 10:
        viewName = 'Archpristship';
        break;
      default:
    }
    if (viewName !== null) {
      this.permissionsService
        .checkUserPermission(userId, viewName)
        .subscribe((r) => {
          if (r.has_module_permission) {
            this.canEditEntity = r.has_module_permission;
          } else {
            this.canEditEntity = false;
          }
        });
    } else {
      this.canEditEntity = false;
    }
  }

  editEntity() {
    const subscriptionEntityId = +localStorage.getItem('subscriptionId');
    switch (this.currentSubscriptionType) {
      case 2:
        this.router.navigate(['chapelries', subscriptionEntityId, 'edit']);
        break;
      case 8:
        this.router.navigate(['worshipplaces', subscriptionEntityId, 'edit']);
        break;
      case 9:
        this.router.navigate(['bishoprics', subscriptionEntityId, 'edit']);
        break;
      case 10:
        this.router.navigate(['archpristships', subscriptionEntityId, 'edit']);
        break;
      default:
    }
  }

  editPriest(id: number) {
    // window.location.href = `${environment.railsAppUrl}/profile_priests/${id}/edit`;
    this.router.navigate(['profile-priests', id]);
  }

  goToSettings() {
    this.router.navigate(['subscription-settings']);
  }

  helpMenuClick(event) {
    switch (event) {
      case 'help':
        window.location.href = 'http://support.kyrioschms.com/';
        break;
      case 'update':
        window.location.href = 'http://support.kyrioschms.com/changelog/';
        break;
      case 'utilization_terms_policy':
        window.location.href =
          'http://support.kyrioschms.com/termos-e-politica-de-utilizacao/';
        break;
      case 'send_comment':
        window.location.href = 'http://support.kyrioschms.com/comentarios/';
        break;
      case 'ask_for_help':
        window.location.href = 'http://support.kyrioschms.com/ajuda/';
        break;
      default:
    }
  }
}

export interface Alert {
  imageSrc?: string;
  title: string;
  preview: string;
  date: string;
}

export interface Message {
  imageSrc?: string;
  title: string;
  preview: string;
  date: string;
}

export interface AppModuleBox {
  imageSrc: string;
  title: string;
  route: string;
  name?: string;
  altUrl?: any;
}

export interface CountryList {
  countryCode: string;
  languageCode: string;
  description: string;
}

export interface SearchLineFieldsOption {
  label: string;
  value: string | number | boolean;
}

export interface SearchLineFields {
  type: 'text' | 'date_picker' | 'checkbox' | 'select';
  control: string;
  appearance?: 'legacy' | 'standard' | 'fill' | 'outline';
  label?: string;
  searchWordLabel: string; // Field used to fill the search word spot
  placeholder?: string;
  options?: SearchLineFieldsOption[];
  initialValue?: any;
  mainField?: boolean;
}

export interface SearchLine {
  title: string;
  fields: SearchLineFields[];
}

export interface SideNavButton {
  type: 'button' | 'separator';
  icon?: string;
  title?: string;
  url?: string;
  routerLink?: string;
  blank?: boolean;
  end?: string | number;
  color?: 'primary' | 'warn' | 'accent' | string;
  hoverColor?: string;
  hoverBackgroundColor?: string;
  backgroundColor?: string;
  active?: boolean;
  altUrl?: string; // Remove this after adding all modules
}
export interface SideMenuInterface {
  pageTitle: string;
  searchFormStructure: SearchLine[];
  mainButton: string;
  mainButtonUrl: string;
  searchFunctionAction?: any;
  sidenavButtonStructure: SideNavButton[];
  searchFormTemplate?: string;
}
