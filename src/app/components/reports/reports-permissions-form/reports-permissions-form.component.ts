import {
  ReportingsPermissionsException,
  ReportPermition,
  TreeForm,
} from './../report.model';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { Report } from '../report.model';
import { ViewChild } from '@angular/core';
import { SnackBarService } from '@peakitpt/ui-material';
import { FormControl, FormGroup } from '@angular/forms';
import { ActionsSubject, Store } from '@ngrx/store';
import { State } from '../reducers/reports.reducer';
import { State as BaseState } from 'src/app/components/base/reducers/base.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormBuilder } from '@angular/forms';
import { I18NextPipe } from 'angular-i18next';
import { environment } from 'src/environments/environment';
import {
  ArchpristshipsService,
  BishopricsService,
  ChapelriesService,
  ReportingsPermissionsService,
  ReportsService,
  WorshipplacesService,
} from '@peakitpt/ui-kyrios-api';
import { ComplexTreeComponent } from '@peakitpt/ui-material/components/tree/complex-tree/complex-tree.component';

@Component({
  selector: 'kyr-reports-permissions-form',
  templateUrl: './reports-permissions-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ReportsPermissionsFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model: ReportPermition;
  model$: Observable<Report>;
  views$: Observable<any>;
  modulePath = 'reports';

  // Specific variables (Reports Permissions)
  ownReport = false;
  hideReportForm: FormControl = this.fb.control(false);

  permissionsColumns: any[] = [];
  permissionsDS: any[] = [];
  exceptionsList: number[] = [];
  treeReady = false;
  isSuperUser: boolean = false;
  @ViewChild('permissionsTree') permissionsTree: ComplexTreeComponent;

  // Search Variables
  searchForm: FormGroup;

  subscriptionsQueue: any = {
    need: {
      bishoprics: false,
      archpristships: false,
      chapelries: false,
      worshipplaces: false,
    },
    done: {
      bishoprics: false,
      archpristships: false,
      chapelries: false,
      worshipplaces: false,
    },
  };
  bishoprics = [];
  archpristships = [];
  worshipplaces = [];
  chapelries = [];

  constructor(
    public store: Store<State>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    private baseStore: Store<BaseState>,
    private reportsService: ReportsService,
    private reportsPermissionsService: ReportingsPermissionsService,
    private bishopricsService: BishopricsService,
    private archpristshipsService: ArchpristshipsService,
    private chapelriesService: ChapelriesService,
    private worshipplacesService: WorshipplacesService
  ) {
    super(
      store,
      router,
      route,
      sharedModule,
      fb,
      i18nextPipe,
      snackBarService,
      actionSubject
    );
  }

  ngOnInit() {
    this.sharedModule.logAccess(this.subs, this.modulePath, this.route);
    this.initializeForm();

    this.subs.push(
      this.route.params.subscribe((params) => {
        this.isLoading = true;

        if (params.id) {
          if (this.duplicateMode) {
            this.id = null;
          } else {
            this.id = +params.id;
          }

          this.getReportsPermissions();
        }
      })
    );
  }

  getReportsPermissions() {
    const payload = {
      query: {
        reporting_id: this.id.toString(),
      },
      limit: 'all',
    };
    const sub: Subscription = this.reportsPermissionsService
      .getPermissionByReport(this.id)
      .subscribe(
        (r) => {
          if (r) {
            this.ownReport =
              r.entity_id == localStorage.getItem('subscriptionId');

            this.setFormValues(r);
            if (this.ownReport) {
              this.fillExceptionsList(r);
              this.getChildrenSubscriptions();
            }
          }
          this.isLoading = false;
          sub.unsubscribe();
        },
        (err) => {
          const errorMessage = this.i18nextPipe.transform(
            'translation:message.error_401',
            { appName: environment.appName }
          );
          this.snackBarService.openSnackBar(
            errorMessage,
            this.sharedModule.ERROR_COLOR
          );
          this.isLoading = false;
          sub.unsubscribe();
        }
      );
  }

  fillExceptionsList(data: any) {
    this.exceptionsList = [];
    data.reporting.reportings_permissions_exceptions.forEach((exception) => {
      this.exceptionsList.push(exception.entity_id);
    });
  }

  getChildrenSubscriptions() {
    const subscriptionTypeId = localStorage.getItem('subscriptionTypeId');
    const subscriptionId = localStorage.getItem('subscriptionId');
    const payload: any = {
      query: {},
      limit: 'all',
    };
    // If user is a super user, go get all Subscriptions possible
    if (localStorage.getItem('userTypeId') == '4') {
      this.isSuperUser = true;
      this.getBishoprics(payload);
      this.getArchpristships(payload);
      this.getChapelries(payload);
      this.getWorshipplaces(payload);
    } else {
      // Not a Super User, get only Subscriptions children of your current subscription
      switch (subscriptionTypeId) {
        case '9': // Bichopric
          payload.query.diocese_id = subscriptionId;
          this.getArchpristships(payload);
          this.getChapelries(payload);
          this.getWorshipplaces(payload);
          break;
        case '10': // Archpriestship
          payload.query.archpriestship_id = subscriptionId;
          this.getChapelries(payload);
          this.getWorshipplaces(payload);
          break;
        case '2': // Chapelry
          payload.query.chapelry_id = subscriptionId;
          this.getWorshipplaces(payload);
          break;
        case '8': // Worshipplace
          break;
        default:
          break;
      }
    }
  }

  onAfterViewInit() {
    if (this.id) {
      this.buildPermissionsTableColumns();
    }
  }

  subscribeForSavingActions() {}

  initializeForm() {
    this.form = this.fb.group({
      id: [],
      entity: this.fb.group({
        entity_type_id: [],
        name: [],
      }),
      entity_id: [],
      reporting_id: [],
      reporting: this.fb.group({
        name: [],
        reportings_permissions_exceptions: [[]],
      }),
      can_write: [null],
      is_super_permission: [false],
    });

    this.searchForm = this.fb.group({
      bishoprics: [],
      archpristships: [],
      chapelries: [],
      worshipplaces: [],
    });
  }

  setFormValues(obj) {
    this.model = obj;
    super.setFormValues(obj);

    if (!this.ownReport) {
      this.setHideFormValues();
    }

    this.subs.push(
      this.form
        .get('is_super_permission')
        .valueChanges.subscribe((r) => this.onSubmit())
    );
  }

  onSubmit() {
    if (this.ownReport) {
      this.isSaving = true;
      this.exceptionsList = this.getExceptions(this.permissionsTree.getForm());
      this.form
        .get(['reporting', 'reportings_permissions_exceptions'])
        .setValue(this.exceptionsList);

      if (this.form.valid) {
        this.onFormValid();
      } else {
        this.isSaving = false;

        this.snackBarService.openSnackBar(
          this.i18nextPipe.transform('translation:message.form_errors'),
          this.sharedModule.ERROR_COLOR
        );
      }
    } else {
      this.changeHideStatus();
    }
  }

  onFormValid() {
    const sub: Subscription = this.reportsPermissionsService
      .updatePermissions(this.form.value)
      .subscribe((r) => {
        this.isSaving = false;
        this.snackBarService.openSnackBar(
          this.i18nextPipe.transform(
            `${this.modulePath}:message.permissions_save_success`
          ),
          this.sharedModule.SUCCESS_COLOR
        );
      });
  }

  // SHOW HIDE FUNCTIONS START -----------------------
  setHideFormValues() {
    this.model.reporting.reportings_permissions_exceptions.forEach(
      (element: ReportingsPermissionsException) => {
        if (element.entity_id === +localStorage.getItem('subscriptionId')) {
          this.hideReportForm.setValue(element.hide);
          return;
        }
      }
    );
  }

  changeHideStatus() {
    const payload = {
      hide: this.hideReportForm.value,
      reporting_id: this.model.reporting_id,
      entity_id: localStorage.getItem('subscriptionId'),
    };
    const sub: Subscription = this.reportsPermissionsService
      .changeHideStatus(this.id, payload)
      .subscribe(
        (r) => {
          this.isSaving = false;
          this.snackBarService.openSnackBar(
            this.i18nextPipe.transform(
              `${this.modulePath}:message.permissions_save_success`
            ),
            this.sharedModule.SUCCESS_COLOR
          );
          sub.unsubscribe();
          this.modal.close();
        },
        (err) => {
          this.isSaving = false;

          this.snackBarService.openSnackBar(
            this.i18nextPipe.transform('translation:message.form_errors'),
            this.sharedModule.ERROR_COLOR
          );
          sub.unsubscribe();
        }
      );
  }

  // SHOW HIDE FUNCTIONS END -----------------------

  // TREE FUNCTIONS START -----------------------
  private buildPermissionsTableColumns() {
    setTimeout(() => {
      this.permissionsColumns = [
        {
          id: 'can_read',
          label: this.i18nextPipe.transform(
            `${this.modulePath}:message.visible`
          ),
        },
      ];
    });
  }

  getBishoprics(payload) {
    this.subscriptionsQueue.need['bishoprics'] = true;
    const sub: Subscription = this.bishopricsService
      .getAll(payload)
      .subscribe((r) => {
        this.bishoprics = r.results;
        this.subscriptionsQueue.done['bishoprics'] = true;
        this.checkSubscriptionsQueueEnded();
        sub.unsubscribe();
      });
  }

  getArchpristships(payload) {
    this.subscriptionsQueue.need['archpristships'] = true;
    const sub: Subscription = this.archpristshipsService
      .getAll(payload)
      .subscribe((r) => {
        this.archpristships = r.results;
        this.subscriptionsQueue.done['archpristships'] = true;
        this.checkSubscriptionsQueueEnded();
        sub.unsubscribe();
      });
  }

  getChapelries(payload) {
    this.subscriptionsQueue.need['chapelries'] = true;
    const sub: Subscription = this.chapelriesService
      .getAll(payload)
      .subscribe((r) => {
        this.chapelries = r.results;
        this.subscriptionsQueue.done['chapelries'] = true;
        this.checkSubscriptionsQueueEnded();
        sub.unsubscribe();
      });
  }

  getWorshipplaces(payload) {
    this.subscriptionsQueue.need['worshipplaces'] = true;
    const sub: Subscription = this.worshipplacesService
      .getAll(payload)
      .subscribe((r) => {
        this.worshipplaces = r.results;
        this.subscriptionsQueue.done['worshipplaces'] = true;
        this.checkSubscriptionsQueueEnded();
        sub.unsubscribe();
      });
  }

  checkSubscriptionsQueueEnded() {
    this.isLoading = true;
    let finished = true;
    Object.keys(this.subscriptionsQueue.need).forEach((key) => {
      if (
        this.subscriptionsQueue.need[key] === true &&
        this.subscriptionsQueue.done[key] === false
      ) {
        finished = false;
        return;
      }
    });
    if (finished) {
      this.isLoading = false;
      this.permissionsDS = this.buildTreeModel();
      this.treeReady = true;
    }
  }

  buildTreeModel(): any[] {
    let parentObject = {};
    let childrenObject = {};
    let result = [];

    if (this.worshipplaces.length) {
      this.worshipplaces.forEach((worshipplace) => {
        if (parentObject[worshipplace.chapelry_id]) {
          parentObject[worshipplace.chapelry_id].push({
            can_read: !this.isEntityAnException(worshipplace.entity_id),
            label: worshipplace.entity_description,
            id: worshipplace.entity_id,
          });
        } else {
          parentObject[worshipplace.chapelry_id] = [
            {
              can_read: !this.isEntityAnException(worshipplace.entity_id),
              label: worshipplace.entity_description,
              id: worshipplace.entity_id,
            },
          ];
        }
      });
    }

    if (this.chapelries.length) {
      childrenObject = parentObject;
      parentObject = {};

      this.chapelries.forEach((chapelry) => {
        if (parentObject[chapelry.archpriestship_id]) {
          parentObject[chapelry.archpriestship_id].push({
            can_read: !this.isEntityAnException(chapelry.entity_id),
            label: chapelry.entity_description,
            id: chapelry.entity_id,
            children: childrenObject[chapelry.entity_id]
              ? childrenObject[chapelry.entity_id]
              : [],
          });
        } else {
          parentObject[chapelry.archpriestship_id] = [
            {
              can_read: !this.isEntityAnException(chapelry.entity_id),
              label: chapelry.entity_description,
              id: chapelry.entity_id,
              children: childrenObject[chapelry.entity_id]
                ? childrenObject[chapelry.entity_id]
                : [],
            },
          ];
        }
      });
    }

    if (this.archpristships.length) {
      childrenObject = parentObject;
      parentObject = {};

      this.archpristships.forEach((archpristchip) => {
        if (parentObject[archpristchip.diocese_id]) {
          parentObject[archpristchip.diocese_id].push({
            can_read: !this.isEntityAnException(archpristchip.entity_id),
            label: archpristchip.entity_description,
            id: archpristchip.entity_id,
            children: childrenObject[archpristchip.entity_id]
              ? childrenObject[archpristchip.entity_id]
              : [],
          });
        } else {
          parentObject[archpristchip.diocese_id] = [
            {
              can_read: !this.isEntityAnException(archpristchip.entity_id),
              label: archpristchip.entity_description,
              id: archpristchip.entity_id,
              children: childrenObject[archpristchip.entity_id]
                ? childrenObject[archpristchip.entity_id]
                : [],
            },
          ];
        }
      });
    }

    if (this.bishoprics.length) {
      childrenObject = parentObject;
      parentObject = {};

      this.bishoprics.forEach((bishopric) => {
        if (parentObject[bishopric.entity_id]) {
          parentObject[bishopric.entity_id].push({
            can_read: !this.isEntityAnException(bishopric.entity_id),
            label: bishopric.entity_description,
            id: bishopric.entity_id,
            children: childrenObject[bishopric.entity_id]
              ? childrenObject[bishopric.entity_id]
              : [],
          });
        } else {
          parentObject[bishopric.entity_id] = [
            {
              can_read: !this.isEntityAnException(bishopric.entity_id),
              label: bishopric.entity_description,
              id: bishopric.entity_id,
              children: childrenObject[bishopric.entity_id]
                ? childrenObject[bishopric.entity_id]
                : [],
            },
          ];
        }
      });
    }

    Object.keys(parentObject).forEach((key) => {
      parent = parentObject[key];
      result = result.concat(parent);
    });
    return result;
  }

  getExceptions(form: TreeForm[], result = []) {
    form.forEach((element) => {
      if (element.children?.length > 0) {
        if (!this.findATrueInChildren(element.children)) {
          result.push(element.id);
        }

        result.concat(this.getExceptions(element.children, result));
      }
      if (!element.can_read) {
        result.push(element.id);
      }
    });
    return result;
  }

  findATrueInChildren(list: TreeForm[]): boolean {
    let trueFound = false;
    for (let i of list) {
      if (i.can_read) {
        trueFound = true;
      }
    }
    return trueFound;
  }

  isEntityAnException(id: number) {
    return this.exceptionsList.includes(id);
  }

  onSearchTree() {
    this.treeReady = false;
    const payload: any = {
      query: {},
      limit: 'all',
    };
    if (this.searchForm.value.bishoprics) {
      this.subscriptionsQueue.done['bishoprics'] = false;
      payload.query.entity_description = this.searchForm.value.bishoprics;
      this.getBishoprics(payload);
    }
    if (this.searchForm.value.archpristships) {
      this.subscriptionsQueue.done['archpristships'] = false;
      payload.query.entity_description = this.searchForm.value.archpristships;
      this.getArchpristships(payload);
    }
    if (this.searchForm.value.chapelries) {
      this.subscriptionsQueue.done['chapelries'] = false;
      payload.query.entity_description = this.searchForm.value.chapelries;
      this.getChapelries(payload);
    }
    if (this.searchForm.value.worshipplaces) {
      this.subscriptionsQueue.done['worshipplaces'] = false;
      payload.query.entity_description = this.searchForm.value.worshipplaces;
      this.getWorshipplaces(payload);
    }
    if (
      !this.searchForm.value.bishoprics &&
      !this.searchForm.value.archpristships &&
      !this.searchForm.value.chapelries &&
      !this.searchForm.value.worshipplaces
    ) {
      this.getChildrenSubscriptions();
    }
  }

  onClearSearchTree() {
    this.searchForm.get('bishoprics').setValue(null);
    this.searchForm.get('archpristships').setValue(null);
    this.searchForm.get('chapelries').setValue(null);
    this.searchForm.get('worshipplaces').setValue(null);
    this.onSearchTree();
  }
  // TREE FUNCTIONS END -----------------------
}
