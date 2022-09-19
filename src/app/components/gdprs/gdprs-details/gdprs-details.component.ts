import { ActionsSubject } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { I18NextPipe } from 'angular-i18next';
import { SnackBarService, Tab } from '@peakitpt/ui-material';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { RequestPostSideNav } from 'src/app/components/base/reducers/base.actions';
import { environment } from 'src/environments/environment';
import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MenuHelperService } from 'src/app/components/base/services/menu-helper.service';
import { SideMenuInterface } from '../../base/base.component';

@Component({
  selector: 'kyr-gdprs-details',
  templateUrl: './gdprs-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class GDPRSDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'gdprs';
  appName = 'gdprs';

  @ViewChild('totalsTabTemplate') totalsTabTemplate: TemplateRef<any>;
  @ViewChild('graphicsTabTemplate') graphicsTabTemplate: TemplateRef<any>;

  isLoading: boolean;
  environment = environment;
  iFrameUrl: any;

  constructor(
    public store: Store<any>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public matDialog: MatDialog,
    public i18nextPipe: I18NextPipe,
    public http: HttpClient,
    public actionSubject: ActionsSubject,
    public snackBarService: SnackBarService,
    private titleService: Title,
    private menuHelperService: MenuHelperService,
    public sanitizer: DomSanitizer
  ) {
    super(
      store,
      router,
      route,
      sharedModule,
      matDialog,
      i18nextPipe,
      http,
      actionSubject,
      snackBarService
    );
  }

  ngOnInit() {
    this.iFrameUrl = this.getIFrameUrl();
    this.titleService.setTitle(
      `${environment.appName} | ${this.i18nextPipe.transform(
        this.modulePath + ':module.name_many'
      )}`
    );
  }

  ngAfterViewInit() {
    this.setSideNav();
    this.modal.open();
  }

  setSideNav() {
    this.subs.push(
      this.menuHelperService
        .createSideMenuInterface(
          this.appName,
          this.modulePath,
          null,
          null,
          null,
          false
        )
        .subscribe((r: SideMenuInterface) => {
          if (r) {
            this.store.dispatch(new RequestPostSideNav(r));
          }
        })
    );
  }

  closeModal() {
    this.modal.close();
  }

  getIFrameUrl() {
    const locale = localStorage.getItem('i18nextLng')
      ? localStorage.getItem('i18nextLng')
      : 'pt';
    return `https://www.kyrioschms.com/${locale}/gdpr`;
  }
}
