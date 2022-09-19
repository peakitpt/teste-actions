import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppModuleBox } from '../../base.component';
import { Store } from '@ngrx/store';
import { State } from '../../reducers/base.reducer';
import { Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { getMenu } from '../../reducers/base.selectors';
import { RequestGetMenu } from '../../reducers/base.actions';
import { MenuHelperService } from '../../services/menu-helper.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'kyr-modules-menu',
  templateUrl: './modules-menu.component.html',
  styleUrls: ['./modules-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModulesMenuComponent implements OnInit, OnDestroy {
  appModuleIcons: any;

  menu$: Observable<any>;
  menuSub: Subscription;

  environment = environment;
  appModules: AppModuleBox[] = [];

  constructor(
    private store: Store<State>,
    private router: Router,
    private i18NextPipe: I18NextPipe,
    private menuHelperService: MenuHelperService
  ) {
    this.appModuleIcons = this.menuHelperService.getAppModuleIcons();
  }

  ngOnInit() {
    this.setMenu();
  }

  redirectThenNavigateTo(module: AppModuleBox) {
    if (module) {
      if (module.altUrl !== null) {
        window.location.href = module.altUrl;
      } else {
        this.router
          .navigateByUrl('redirect', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([module.route]);
          });
      }
    }
  }

  setMenu() {
    this.menu$ = this.store.select(getMenu);

    this.store.dispatch(new RequestGetMenu(localStorage.getItem('userId')));

    this.menuSub = this.menu$.subscribe((r) => {
      if (r?.payload) {
        this.appModules = [];
        r.payload.menu.forEach((module) => {
          this.appModules.push({
            imageSrc: module.name,
            title: this.i18NextPipe.transform(
              `translation:apps.${module.name}`
            ),
            route: this.getFirstSubModule(module),
            name: module.name,
            altUrl: this.menuHelperService.getAlternativeUrl(module), // Remove this after adding all modules
          });
        });
      }
    });
  }

  get currentTheme() {
    if (localStorage.getItem('kyriosTheme') === null) {
      localStorage.setItem('kyriosTheme', 'kyrios-theme-light');
    }

    return localStorage.getItem('kyriosTheme')
      ? localStorage.getItem('kyriosTheme')
      : 'kyrios-theme-light';
  }

  private getFirstSubModule(module): string {
    if (module.submenu?.length > 0) {
      // Remove this after adding all modules
      if (module.submenu[0].name === 'reports_views') {
        return 'reports';
      }
      // ----

      return module.submenu[0].name.split('_').join('-');
    }
    return module.name.split('_').join('-');
  }

  ngOnDestroy() {
    this.menuSub.unsubscribe();
  }
}
