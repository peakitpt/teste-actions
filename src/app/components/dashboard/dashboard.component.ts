import {
  Component,
  AfterViewInit,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MenuHelperService } from '../base/services/menu-helper.service';
import { Store } from '@ngrx/store';
import { State } from '../base/reducers/base.reducer';
import * as DashboardState from './reducers/dashboard.reducer';
import * as PendingEntitiesState from '../pending-entities/reducers/pending-entities.reducer';
import * as PendingEntitiesSelectors from '../pending-entities/reducers/pending-entities.selectors';
import * as PendingEntitiesActions from '../pending-entities/reducers/pending-entities.actions';
import { RequestPostSideNav } from '../base/reducers/base.actions';
import { SideMenuInterface } from '../base/base.component';
import * as DashboardSelectors from './reducers/dashboard.selectors';
import * as DashboardActions from './reducers/dashboard.actions';
import { I18NextPipe } from 'angular-i18next';
import { TimelineEntry } from '@peakitpt/ui-material/components/timeline/timeline.component';
import * as moment from 'moment';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'kyr-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit, AfterViewInit {
  subs: Subscription[] = [];
  appName = 'dashboard';
  modulePath = 'dashboard';

  DASHBOARD_COLORS = {
    domain: [
      'rgb(110, 79, 245)',
      'rgb(253, 57, 149)',
      'rgb(52, 191, 163)',
      '#ffb822',
      '#959cb6',
      '#000000',
    ],
  };

  alerts: any;
  entities: any;
  baptisms: any;
  weddings: any;
  baptismsCuria: any;
  weddingsCuria: any;
  accountingStatisticsTop: any;
  accountingStatisticsBottom: any;
  accounting: any;
  pendingProcesses: any;
  curiaPendingProcesses: any;
  lastProcesses: any;
  priestsChangesRequests: any[] = [];
  priestsChangesRequestsTableColumns: any[] = [];

  accountingChartData: any;
  currentYear = new Date().getFullYear();

  showPendingEntities: boolean = false;

  constructor(
    private menuHelperService: MenuHelperService,
    private dashboardStore: Store<DashboardState.State>,
    public i18nextPipe: I18NextPipe,
    public sharedModule: SharedModule,
    private store: Store<State>,
    private titleService: Title,
    private router: Router,
    private pendingEntitiesStore: Store<PendingEntitiesState.State>
  ) {}

  ngOnInit() {
    this.titleService.setTitle(
      `${environment.appName} | ${this.i18nextPipe.transform(
        this.modulePath + ':module.name_many'
      )}`
    );
    this.dashboardStore.dispatch(new DashboardActions.RequestGetEntities(null));
    this.dashboardStore.dispatch(new DashboardActions.RequestGetBaptisms(null));
    this.dashboardStore.dispatch(
      new DashboardActions.RequestGetBaptismsCuria(null)
    );
    this.dashboardStore.dispatch(new DashboardActions.RequestGetWeddings(null));
    this.dashboardStore.dispatch(
      new DashboardActions.RequestGetWeddingsCuria(null)
    );
    this.dashboardStore.dispatch(
      new DashboardActions.RequestGetAccounting(this.currentYear)
    );
    this.dashboardStore.dispatch(
      new DashboardActions.RequestGetPendingProcesses(null)
    );
    this.dashboardStore.dispatch(
      new DashboardActions.RequestGetCuriaPendingProcesses(null)
    );
    this.dashboardStore.dispatch(
      new DashboardActions.RequestGetLastProcesses(null)
    );
    this.dashboardStore.dispatch(new DashboardActions.RequestGetAlerts(null));
    this.buildPriestsChangesRequestsTableColumns();
    this.dashboardStore.dispatch(
      new DashboardActions.RequestGetPriestsChangesRequests(null)
    );

    //pending entities
    this.pendingEntitiesStore.dispatch(
      new PendingEntitiesActions.RequestCountPendingEntity(null)
    );

    this.pendingEntitiesStore
      .select(PendingEntitiesSelectors.getCountPendingEntity)
      .subscribe((amount: any) => {
        if (amount && amount.pending > 0) {
          this.showPendingEntities = true;
        }
      });

    // load statistics
    this.dashboardStore
      .select(DashboardSelectors.getEntities)
      .subscribe((statistics: any) => {
        if (statistics) {
          this.entities = statistics.map((x) => ({
            name: this.i18nextPipe.transform('dashboard:' + x[0]),
            value: x[1],
          }));
        }
      });
    this.dashboardStore
      .select(DashboardSelectors.getBaptisms)
      .subscribe((statistics: any) => {
        if (statistics) {
          this.baptisms = statistics.map((x) => {
            return {
              name: this.i18nextPipe.transform(
                'dashboard:process_states.' +
                  (x.curia_status ? x.curia_status : 'no_state')
              ),
              value: x.total,
            };
          });
        }
      });
    this.dashboardStore
      .select(DashboardSelectors.getBaptismsCuria)
      .subscribe((statistics: any) => {
        if (statistics) {
          this.baptismsCuria = statistics.map((x) => {
            return {
              name: this.i18nextPipe.transform(
                'dashboard:process_states.' +
                  (x.curia_status ? x.curia_status : 'no_state')
              ),
              value: x.total,
            };
          });
        }
      });
    this.dashboardStore
      .select(DashboardSelectors.getWeddings)
      .subscribe((statistics: any) => {
        if (statistics) {
          this.weddings = statistics.map((x) => {
            return {
              name: this.i18nextPipe.transform(
                'dashboard:process_states.' +
                  (x.curia_status ? x.curia_status : 'no_state')
              ),
              value: x.total,
            };
          });
        }
      });
    this.dashboardStore
      .select(DashboardSelectors.getWeddingsCuria)
      .subscribe((statistics: any) => {
        if (statistics) {
          this.weddingsCuria = statistics.map((x) => {
            return {
              name: this.i18nextPipe.transform(
                'dashboard:process_states.' +
                  (x.curia_status ? x.curia_status : 'no_state')
              ),
              value: x.total,
            };
          });
        }
      });
    this.dashboardStore
      .select(DashboardSelectors.getAccounting)
      .subscribe((statistics: any) => {
        if (statistics) {
          this.accounting = statistics;
          const months = this.sharedModule.getMonths();
          const currentYearSeries = [
            { value: 0, name: months[0].label },
            { value: 0, name: months[1].label },
            { value: 0, name: months[2].label },
            { value: 0, name: months[3].label },
            { value: 0, name: months[4].label },
            { value: 0, name: months[5].label },
            { value: 0, name: months[6].label },
            { value: 0, name: months[7].label },
            { value: 0, name: months[8].label },
            { value: 0, name: months[9].label },
            { value: 0, name: months[10].label },
            { value: 0, name: months[11].label },
          ];
          const pastYearSeries = [
            { value: 0, name: months[0].label },
            { value: 0, name: months[1].label },
            { value: 0, name: months[2].label },
            { value: 0, name: months[3].label },
            { value: 0, name: months[4].label },
            { value: 0, name: months[5].label },
            { value: 0, name: months[6].label },
            { value: 0, name: months[7].label },
            { value: 0, name: months[8].label },
            { value: 0, name: months[9].label },
            { value: 0, name: months[10].label },
            { value: 0, name: months[11].label },
          ];
          statistics.currentYear.forEach((value) => {
            currentYearSeries[value[2] - 1].value = value[0];
          });
          statistics.pastYear.forEach((value) => {
            pastYearSeries[value[2] - 1].value = value[0];
          });
          this.accountingChartData = [
            {
              name: this.currentYear,
              series: currentYearSeries,
            },
            {
              name: this.currentYear - 1,
              series: pastYearSeries,
            },
          ];
          this.accountingStatisticsTop = [
            {
              name: this.i18nextPipe.transform(
                'dashboard:accounting.total_year',
                { year: this.currentYear }
              ),
              value: statistics.totalCurrentYear + '€',
            },
            {
              name: this.i18nextPipe.transform(
                'dashboard:accounting.date_analysis'
              ),
              value: moment().format('DD/MM/YYYY HH:mm'),
            },
          ];
          this.accountingStatisticsBottom = [
            {
              name: this.i18nextPipe.transform(
                'dashboard:accounting.total_year',
                { year: this.currentYear - 1 }
              ),
              value: statistics.totalPastYear + '€',
            },
            {
              name: this.i18nextPipe.transform(
                'dashboard:accounting.diference_years'
              ),
              value: statistics.yearsDiference + '%',
            },
          ];
        }
      });
    this.dashboardStore
      .select(DashboardSelectors.getPendingProcesses)
      .subscribe((statistics: any) => {
        if (statistics) {
          this.pendingProcesses = statistics.map((process: string[]) => {
            const entry: TimelineEntry = {
              expand: true,
              header: {
                text: this.i18nextPipe.transform('dashboard:' + process[0]),
              }, // process type
              content: {
                text:
                  process[2] + // entity_desc
                  ' - ' +
                  this.i18nextPipe.transform(
                    'dashboard:process_states.' + process[3]
                  ), // status
                href: `${this.getProcessUrl(process)}/details`,
              },
              dot: {
                size: 20,
                class: 'accent',
              },
              side: moment(process[4]).format('DD/MM/YYYY'),
            };
            return entry;
          });
        }
      });
    this.dashboardStore
      .select(DashboardSelectors.getCuriaPendingProcesses)
      .subscribe((statistics: any) => {
        if (statistics) {
          this.curiaPendingProcesses = statistics.map((process: string[]) => {
            const entry: TimelineEntry = {
              expand: true,
              header: {
                text: this.i18nextPipe.transform('dashboard:' + process[0]),
              }, // process type
              content: {
                text:
                  process[2] + // entity_desc
                  ' - ' +
                  this.i18nextPipe.transform(
                    'dashboard:process_states.' + process[3]
                  ), // status
                href: `${this.getProcessUrl(process)}/details`,
              },
              dot: {
                size: 20,
                class: 'accent',
              },
              side: moment(process[4]).format('DD/MM/YYYY'),
            };
            return entry;
          });
        }
      });
    this.dashboardStore
      .select(DashboardSelectors.getLastProcesses)
      .subscribe((statistics: any) => {
        if (statistics) {
          this.lastProcesses = statistics.map((x) => ({
            name: this.i18nextPipe.transform('dashboard:' + x[0]),
            value: x[1],
          }));
        }
      });
    this.dashboardStore
      .select(DashboardSelectors.getAlerts)
      .subscribe((statistics: any) => {
        if (statistics) {
          this.alerts = statistics.map((x) => {
            const title = x.title ? x.title + '<br/>' : '';
            return {
              ...x,
              text: title + x.message,
            };
          });
        }
      });

    this.dashboardStore
      .select(DashboardSelectors.getPriestsChangesRequests)
      .subscribe((r: any) => {
        if (r) {
          this.priestsChangesRequests = r.results;
        }
      });
  }

  getProcessUrl(process: string[]) {
    return process[6].replace(environment.railsAppUrl, '').replace(/_/gi, '-');
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setSideNav();
    });
  }

  navigate(module: string) {
    return environment.railsAppUrl + '/' + module;
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

  buildPriestsChangesRequestsTableColumns() {
    this.priestsChangesRequestsTableColumns = [
      {
        id: 'entity__name',
        title: this.i18nextPipe.transform(`priests:model.entity__name`),
      },
      {
        id: 'clergy_type_description',
        title: this.i18nextPipe.transform(
          `priests:model.clergy_type_description`
        ),
      },
      {
        id: 'changes_request',
        title: this.i18nextPipe.transform(`priests:model.changes_request`),
      },
    ];
  }

  goToPriestsChangesRequests(event) {
    this.router.navigate(['priests', event.id, 'edit']);
  }
}
