import { SearchForms } from './../base-components/advanced-search/search-forms';
import { Injectable } from '@angular/core';
import {
  SideMenuInterface,
  SearchLine,
} from 'src/app/components/base/base.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from 'src/app/components/base/reducers/base.reducer';
import { getMenu } from 'src/app/components/base/reducers/base.selectors';
import { I18NextPipe } from 'angular-i18next';
import { SuccessGetMenu } from '../reducers/base.actions';
import { Menu } from './menu.model';

@Injectable({
  providedIn: 'root',
})
export class MenuHelperService {
  searchForms = SearchForms;
  sideNavOpen: boolean;

  constructor(private store: Store<State>, private i18nextPipe: I18NextPipe) {}

  public getAppModuleIcons() {
    return {
      dashboard: 'home',
      archive: 'archive',
      sacraments: 'book',
      catechisms: 'school',
      processes: 'file_copy',
      treasury: 'euro',
      accounting: 'functions',
      accruals: 'money',
      cms: 'language',
      newsletter: 'mark_email_unread',
      dms: 'article',
      catholic_directory: 'menu_book',
      reporting: 'assessment',
      places: 'place',
      subscription_admin: 'admin_panel_settings',
      admin: 'engineering',
      settings: 'settings',
      gdprs: 'privacy_tip',
      help: 'help',
    };
  }

  public getSubModuleIcons() {
    return {
      // archive
      persons: 'person',
      families: 'family_restroom',
      deaths: 'airline_seat_flat',
      'mass-intentions': 'event',
      mecs: 'account_circle',
      acolytes: 'account_circle',
      readers: 'account_circle',
      'pastoral-agents': 'account_circle',
      priests: 'people',
      institutions: 'account_balance',

      // sacraments
      weddings: 'wc',
      baptisms: 'child_care',
      chrisms: 'person',
      catechumens: 'person',
      'curia-baptisms': 'child_care',
      'curia-weddings': 'wc',
      'curia-ministries-and-orders': 'gavel',

      // catechisms
      catechisms: 'school',

      // processes
      'curia-secretariats': 'sticky_note_2',
      'curia-administrative-processes': 'how_to_reg',
      'curia-economic-councils': 'local_atm',
      'curia-provisions': 'inventory_2',
      nominations: 'attribution',

      // treasury
      documents: 'article',
      'current-accounts': 'account_balance_wallet',
      'documents-types': 'toc',
      'treasury-locations': 'account_balance',

      // accounting
      'accounting-exercises': 'event',
      'accounting-chart-accounts': 'account_balance_wallet',
      'accounting-journals': 'book',
      'accounting-transaction-document-types': 'description',
      'accounting-cost-centers': 'account_balance',
      'accounting-transactions': 'north_east',
      'accounting-balance-sheets': 'payments',
      'accounting-transaction-lines': 'savings',
      'accounting-taxonomy-codes': 'subject',
      'accounting-transaction-types': 'sync_alt',
      'bishopric-integrated-views': 'preview',

      // accruals
      accruals: 'money',
      'accruals-processments': 'rule',
      'accruals-types': 'subject',

      // cms
      contents: 'content_copy',
      events: 'event',
      sections: 'featured_video',
      emenus: 'menu',
      websiteconfigurations: 'build',

      // newsletter
      newsletters: 'alternate_email',
      'text-messages': 'sms',
      'newsletters-layouts': 'featured_play_list',
      'newsletter-subscriptions': 'list_alt',
      'newsletter-group-subscriptions': 'grading',

      // dms
      gestdocuments: 'article',

      // catholic_directory
      'catholic-directory-priests': 'people',
      'catholic-directory-institutions': 'account_balance',

      // reporting
      reports: 'table_view',
      'subscription-statistics': 'bar_chart',
      'admin-statistics': 'query_stats',
      'reports-views': 'library_books',
      reportmanagments: 'construction',

      // places
      countries: 'public',
      bishoprics: 'account_balance',
      archpristships: 'account_balance',
      chapelries: 'account_balance',
      worshipplaces: 'account_balance',
      valences: 'account_balance',

      // subscription_admin
      subscription_users: 'groups',

      // admin
      users: 'people',
      subscriptions: 'holiday_village',
      module_documentation_links: 'info',

      // settings
      numerations: 'format_list_numbered',
      curia_functions: 'task_alt',
      groups: 'groups',
      emoluments: 'attach_money',
      formations: 'military_tech',
      patrons: 'accessibility_new',
      'relationship-degrees': 'account_tree',
      'new-records-importer': 'import_export',

      // help
      help: 'help',
    };
  }

  createSideMenuInterface(
    appName: string,
    moduleName: string = null,
    searchFunctionAction: any = null,
    searchFormStructure: SearchLine[] = [],
    searchFormTemplate?: string,
    addMainButton: boolean | string = true
  ): Observable<SideMenuInterface> {
    return this.store.select(getMenu).pipe(
      map((menus: SuccessGetMenu) => {
        if (menus) {
          const sidenavButtonStructure = [];

          const currentMenu = menus.payload.menu.find(
            (submenu: Menu) => submenu.name === appName
          );

          let mainButton: string = null;
          let mainButtonUrl: string = null;
          if (moduleName && addMainButton) {
            mainButton = `${this.i18nextPipe.transform(
              'translation:action.add'
            )} ${this.i18nextPipe.transform(
              `${moduleName}:module.name_singular`
            )}`;

            mainButtonUrl = `${moduleName}/new`;
            if (typeof addMainButton === 'string') {
              mainButtonUrl = addMainButton;
            }
          }

          if (currentMenu?.submenu) {
            currentMenu.submenu.forEach((subMenu: Menu) => {
              let menuName = subMenu.menu_label.replace(/_/gi, '-');
              // Remove this after adding all modules
              if (menuName === 'reports-views') {
                menuName = 'reports';
              }
              // ----
              sidenavButtonStructure.push({
                type: 'button',
                icon:
                  this.getSubModuleIcons()[subMenu.menu_label] ||
                  'chevron_right',
                title: this.i18nextPipe.transform(
                  `${menuName}:module.name_many`
                ),
                url: menuName,
                active: menuName === moduleName,
                altUrl: this.getAlternativeUrl(subMenu), // Remove this after adding all modules
              });
            });
          }

          // Specific to dashboard!
          if (currentMenu?.submenu === undefined) {
            const dashboardIcons = this.getAppModuleIcons();
            menus.payload.menu.forEach((menu: Menu) => {
              const menuName = menu.menu_label.replace(/_/gi, '-');
              sidenavButtonStructure.push({
                type: 'button',
                icon: dashboardIcons[menu.menu_label]
                  ? dashboardIcons[menu.menu_label]
                  : 'chevron_right',
                title: this.i18nextPipe.transform(
                  `dashboard:module.${menuName}`
                ),
                url: menu.submenu ? menu.submenu[0]?.name : menuName,
                active: menuName === moduleName,
                altUrl:
                  menuName === 'dashboard'
                    ? null
                    : this.getAlternativeUrl(menu), // Remove this after adding all modules
              });
            });
          } else {
            // If we are not in the main page, add the dashboard button
            sidenavButtonStructure.unshift(
              {
                active: false,
                altUrl: null,
                icon: 'home',
                title: 'Dashboard',
                type: 'button',
                url: 'dashboard',
              },
              {
                type: 'separator',
              }
            );
          }

          return {
            pageTitle: this.i18nextPipe.transform(
              `translation:apps.${appName}`
            ),
            searchFormStructure,
            searchFunctionAction,
            mainButton,
            mainButtonUrl,
            sidenavButtonStructure,
            searchFormTemplate,
          } as SideMenuInterface;
        }
      })
    );
  }

  getSearchForm(name: string) {
    return this.searchForms[name];
  }

  getAlternativeUrl(module): string {
    const url = module.submenu?.length
      ? module.submenu[0].menu_url
      : module.menu_url;
    return url && url.startsWith('http') ? url : null;
  }

  setSideNavOpen(value: boolean) {
    this.sideNavOpen = value;
  }

  getSideNavOpen(): boolean {
    return this.sideNavOpen;
  }
}
