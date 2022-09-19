import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/numerations-views.actions';
import { getNumerationsView } from '../reducers/numerations-views.selectors';
import { Observable } from 'rxjs';
import { NumerationsView } from '../numerations-view.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { I18NextPipe } from 'angular-i18next';
import { HttpClient } from '@angular/common/http';
import { ModulesService } from '@peakitpt/ui-kyrios-api';
import { SnackBarService } from '@peakitpt/ui-material';

@Component({
  selector: 'kyr-numerations-views-details',
  templateUrl: './numerations-views-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class NumerationsViewsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<NumerationsView>;
  returnUrl = '/numerations-views';
  modulePath = 'numerations-views';
  viewName = 'NumerationsView';

  selectorGetModel = getNumerationsView;
  actionRequestFail =
    actions.NumerationsViewsActionTypes.RequestFailNumerationsViews;
  actionRequestGetOne = actions.RequestGetNumerationsView;

  modules: any = {};

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
    private modulesService: ModulesService
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
    this.getModules();
  }

  getModules() {
    const payload = {
      use_translation: true,
      numerable: true,
      model: 'view_items/view',
    };
    this.subs.push(
      this.modulesService.getAll(payload).subscribe((r) => {
        r.results.forEach((module) => {
          this.modules[module.id] = module.name;
        });
      })
    );
  }
}
