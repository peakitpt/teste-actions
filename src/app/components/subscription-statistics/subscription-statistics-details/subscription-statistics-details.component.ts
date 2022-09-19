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
import * as actions from '../reducers/subscription-statistics.actions';
import { SnackBarService, Tab } from '@peakitpt/ui-material';
import { getSubscriptionStatistic } from '../reducers/subscription-statistics.selectors';
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
import { KpisRequest } from '../subscription-statistic.model';
import { SubscriptionStatisticsService } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-subscription-statistics-details',
  templateUrl: './subscription-statistics-details.component.html',
  styleUrls: ['./subscription-statistics-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SubscriptionStatisticsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy {
  model$: Observable<any>;
  modulePath = 'subscription-statistics';
  appName = 'reporting';

  selectorGetModel = getSubscriptionStatistic;
  actionRequestFail =
    actions.SubscriptionStatisticsActionTypes.RequestFailSubscriptionStatistics;
  actionRequestGetOne = actions.RequestGetSubscriptionStatistic;
  actionRequestPut = actions.RequestPutSubscriptionStatistic;
  actionSuccessPut =
    actions.SubscriptionStatisticsActionTypes.SuccessPutSubscriptionStatistic;
  actionRequestPost = actions.RequestPostSubscriptionStatistic;
  actionSuccessPost =
    actions.SubscriptionStatisticsActionTypes.SuccessPostSubscriptionStatistic;
  actionRequestGetNew = actions.RequestGetNew;

  @ViewChild('totalsTabTemplate') totalsTabTemplate: TemplateRef<any>;
  @ViewChild('graphicsTabTemplate') graphicsTabTemplate: TemplateRef<any>;

  isLoading: boolean;
  environment = environment;

  kpisRequests: KpisRequest[] = [
    {
      view: 'parishioners',
      link: 'persons',
      params: {
        id: 0,
        kpis: 'KpiUsers',
      },
    },
    {
      view: 'families',
      link: 'families',
      params: {
        id: 0,
        kpis: 'KpiFamilies',
      },
    },
    {
      view: 'catechisms',
      link: 'catechisms',
      params: {
        id: 0,
        kpis: 'KpiCatechisms',
      },
    },
    {
      view: 'deaths',
      link: 'deaths',
      params: {
        id: 0,
        kpis: 'KpiObitos',
      },
    },
    {
      view: 'mass_intentions',
      link: 'mass-intentions',
      params: {
        id: 0,
        kpis: 'KpiMassIntentions',
      },
    },
    {
      view: 'weddings',
      link: 'weddings',
      params: {
        id: 0,
        kpis: 'KpiCasamentos',
      },
    },
    {
      view: 'baptisms',
      link: 'baptisms',
      params: {
        id: 0,
        kpis: 'KpiBatizados',
      },
    },
    {
      view: 'chrisms',
      link: 'chrisms',
      params: {
        id: 0,
        kpis: 'KpiChrisms',
      },
    },
    {
      view: 'catechumens',
      link: 'catechumens',
      params: {
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
    private subscriptionStatisticService: SubscriptionStatisticsService
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
    this.getSubscriptionStatistics();

    this.titleService.setTitle(
      `${environment.appName} | ${this.i18nextPipe.transform(
        this.modulePath + ':module.name_many'
      )}`
    );
  }

  ngAfterViewInit() {
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

  getSubscriptionStatistics() {
    this.kpisRequests.forEach((request: KpisRequest) => {
      this.subs.push(
        this.subscriptionStatisticService
          .getkpis(request.view, request.params)
          .subscribe((r: any) => {
            r.results['link'] = request.link;
            if (this.kpisResults[request.view]) {
              r.results.forEach((result: any) => {
                this.kpisResults[request.view].push(result);
              });
            } else {
              this.kpisResults[request.view] = r.results;
            }
          })
      );
    });
  }

  openNewTab(link: string) {
    window.open(link, '_blank');
  }
}
