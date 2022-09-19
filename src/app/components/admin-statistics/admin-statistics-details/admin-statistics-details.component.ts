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

import { Observable } from 'rxjs';
import { I18NextPipe } from 'angular-i18next';
import * as actions from '../reducers/admin-statistics.actions';
import { SnackBarService, Tab } from '@peakitpt/ui-material';
import { getAdminStatistic } from '../reducers/admin-statistics.selectors';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Title } from '@angular/platform-browser';
import { MenuHelperService } from '../../base/services/menu-helper.service';
import { SideMenuInterface } from '../../base/base.component';
import { RequestPostSideNav } from 'src/app/components/base/reducers/base.actions';
import { environment } from 'src/environments/environment';
import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { KpisRequest } from '../admin-statistic.model';
import { AdminStatisticsService } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-admin-statistics-details',
  templateUrl: './admin-statistics-details.component.html',
  styleUrls: ['./admin-statistics.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminStatisticsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy {
  model$: Observable<any>;
  modulePath = 'admin-statistics';
  appName = 'reporting';

  selectorGetModel = getAdminStatistic;
  actionRequestFail =
    actions.AdminStatisticsActionTypes.RequestFailAdminStatistics;
  actionRequestGetOne = actions.RequestGetAdminStatistic;
  actionRequestPut = actions.RequestPutAdminStatistic;
  actionSuccessPut =
    actions.AdminStatisticsActionTypes.SuccessPutAdminStatistic;
  actionRequestPost = actions.RequestPostAdminStatistic;
  actionSuccessPost =
    actions.AdminStatisticsActionTypes.SuccessPostAdminStatistic;
  actionRequestGetNew = actions.RequestGetNew;

  @ViewChild('totalsTabTemplate') totalsTabTemplate: TemplateRef<any>;
  @ViewChild('graphicsTabTemplate') graphicsTabTemplate: TemplateRef<any>;

  tabs: Tab[] = [];
  isLoading: boolean;
  environment = environment;

  kpisRequests: KpisRequest[] = [
    {
      view: 'users',
      params: {
        admin: true,
        id: 0,
        kpis: 'KpiUsers',
      },
    },
    {
      view: 'users',
      params: {
        admin: true,
        id: 0,
        kpis: 'KpiSignedUsers',
        wlogins: true,
      },
    },
    {
      view: 'users',
      params: {
        admin: true,
        id: 0,
        kpis: 'KpiSignedUsersLastMonth',
        wloginslm: true,
      },
    },
    {
      view: 'websiteconfigurations',
      params: {
        admin: true,
        id: 0,
        kpis: 'KpiWebsiteconfigurations',
      },
    },
    {
      view: 'parishioners',
      params: {
        admin: true,
        id: 0,
        kpis: 'KpiUsers',
      },
    },
    {
      view: 'families',
      params: {
        admin: true,
        id: 0,
        kpis: 'KpiFamilies',
      },
    },
    {
      view: 'catechisms',
      params: {
        admin: true,
        id: 0,
        kpis: 'KpiCatechisms',
      },
    },
    {
      view: 'deaths',
      params: {
        admin: true,
        id: 0,
        kpis: 'KpiObitos',
      },
    },
    {
      view: 'mass_intentions',
      params: {
        admin: true,
        id: 0,
        kpis: 'KpiMassIntentions',
      },
    },
    {
      view: 'weddings',
      params: {
        admin: true,
        id: 0,
        kpis: 'KpiCasamentos',
      },
    },
    {
      view: 'curia_weddings',
      params: {
        admin: true,
        id: 0,
        kpis: 'KpiCuriaWeddings',
      },
    },
    {
      view: 'baptisms',
      params: {
        admin: true,
        id: 0,
        kpis: 'KpiBatizados',
      },
    },
    {
      view: 'curia_baptisms',
      params: {
        admin: true,
        id: 0,
        kpis: 'KpiCuriaBaptisms',
      },
    },
    {
      view: 'chrisms',
      params: {
        admin: true,
        id: 0,
        kpis: 'KpiChrisms',
      },
    },
    {
      view: 'catechumens',
      params: {
        admin: true,
        id: 0,
        kpis: 'KpiCatechumens',
      },
    },
  ];
  kpisResults: any = {};
  userAccessesPerDay: any[] = [];
  userAccessesPerDayReady: boolean = false;
  DASHBOARD_COLORS = {
    domain: ['#959cb6'],
  };

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
    private adminStatisticService: AdminStatisticsService
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
    super.ngOnInit();
    this.getAdminStatistics();
    this.getUserAccessesPerDay();

    this.titleService.setTitle(
      `${environment.appName} | ${this.i18nextPipe.transform(
        this.modulePath + ':module.name_many'
      )}`
    );
  }

  ngAfterViewInit() {
    this.setTabs();
    this.setSideNav();
    super.ngAfterViewInit();
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

  setTabs() {
    this.tabs = [
      {
        textLabel: this.i18nextPipe.transform(this.modulePath + ':tabs.totals'),
        templateContent: this.totalsTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.graphics'
        ),
        templateContent: this.graphicsTabTemplate,
      },
    ];
  }

  getAdminStatistics() {
    this.kpisRequests.forEach((request: KpisRequest) => {
      this.subs.push(
        this.adminStatisticService
          .getkpis(request.view, request.params)
          .subscribe((r) => {
            if (this.kpisResults[request.view]) {
              r.results.forEach((result) => {
                this.kpisResults[request.view].push(result);
              });
            } else {
              this.kpisResults[request.view] = r.results;
            }
          })
      );
    });
  }

  getUserAccessesPerDay() {
    const params = {
      highcharts: 'user_accesses_per_day',
    };
    this.subs.push(
      this.adminStatisticService
        .getUserAccessesPerDay(params)
        .subscribe((r) => {
          r.user_accesses_per_day.forEach((element) => {
            this.userAccessesPerDay.push({
              name: element.x,
              value: element.y,
            });
          });
          this.userAccessesPerDayReady = true;
        })
    );
  }
}
