import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { I18NextPipe } from 'angular-i18next';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormBuilder } from '@angular/forms';
import { ofType } from '@ngrx/effects';
import { SnackBarService } from '@peakitpt/ui-material';

import { Catechism } from '../catechism.model';
import { State } from '../reducers/catechisms.reducer';
import * as actions from 'src/app/components/catechisms/reducers/catechisms.actions';
import { getCatechism } from '../reducers/catechisms.selectors';

@Component({
  selector: 'kyr-catechisms-details',
  templateUrl: './catechisms-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CatechismsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<Catechism>;
  model: Catechism;
  returnUrl = '/catechisms';
  modulePath = 'catechisms';
  viewName = 'Catechism';

  selectorGetModel = getCatechism;
  actionRequestFail = actions.CatechismsActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
  actionClearGet = actions.ClearGet;

  @ViewChild('catechismTabTemplate') catechismTabTemplate: TemplateRef<any>;
  @ViewChild('sessionsTabTemplate') sessionsTabTemplate: TemplateRef<any>;
  @ViewChild('transfersTabTemplate') transfersTabTemplate: TemplateRef<any>;
  @ViewChild('individualDocsTabTemplate')
  individualDocsTabTemplate: TemplateRef<any>;

  /* This specific's component fields */
  isSaving = false;

  openPassingGradeModal = false;
  openPassingGradeFinalizeModal = false;
  openFinalizeModal = false;

  passYear = false;
  finalize = false;

  constructor(
    public store: Store<State>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public matDialog: MatDialog,
    public i18nextPipe: I18NextPipe,
    public http: HttpClient,
    public actionSubject: ActionsSubject,
    public snackBarService: SnackBarService,
    private fb: FormBuilder
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

  afterGetModel() {
    super.afterGetModel();
    this.addMenuOptions();
    this.addTabs();
  }

  menuClick(event: any, data: any) {
    switch (event) {
      case 'passing_grade':
        this.openPassingGradeModal = true;
        break;
      case 'passing_grade_finalize':
        this.openPassingGradeFinalizeModal = true;
        break;
      case 'finalize':
        this.openFinalizeModal = true;
        break;
      default:
        super.menuClick(event, data);
        break;
    }
  }

  navigate(route: string) {
    if (this.passYear) {
      this.router.navigate([route], {
        queryParams: {
          passYear: this.passYear,
          finalize: this.finalize,
        },
      });
    } else {
      super.navigate(route);
    }
  }

  openDetailsReport(file: any) {
    const url = `${environment.railsAppUrl}/catechisms/${this.model.id}/printpdf?format=pdf&file=${file.filePath}`;
    window.open(url);
  }

  // THIS FORM SPECIFIC FUNCTIONS [START]
  private addTabs() {
    this.detailsTabs = [
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.catechism`
        ),
        templateContent: this.catechismTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.sessions`
        ),
        templateContent: this.sessionsTabTemplate,
      },
    ];

    if (this.model?.catechisms_transfers_attributes?.length) {
      this.detailsTabs.push({
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.transfers`
        ),
        templateContent: this.transfersTabTemplate,
      });
    }

    this.detailsTabs.push({
      textLabel: this.i18nextPipe.transform(
        `${this.modulePath}:tabs.individual_docs`
      ),
      templateContent: this.individualDocsTabTemplate,
    });
  }

  private addMenuOptions() {
    const catechismOptions: Array<{
      name?: string;
      value?: string;
      icon?: string;
      isSeparator?: boolean;
    }> = [];

    let addPassingGrade = false;
    let addPassingGradeFinalize = false;
    let addFinalize = false;

    if (
      this.model.year < 10 &&
      !this.model.passing_year_created &&
      !this.headerOptionsMenu.some((o: any) => o.value === 'passing_grade')
    ) {
      addPassingGrade = true;
      catechismOptions.push({
        name: this.i18nextPipe.transform(
          `${this.modulePath}:action.passing_grade`
        ),
        value: 'passing_grade',
        icon: 'library_add',
      });
    }

    if (
      this.model.year < 10 &&
      !this.model.finalized &&
      !this.model.passing_year_created &&
      !this.headerOptionsMenu.some(
        (o: any) => o.value === 'passing_grade_finalize'
      )
    ) {
      addPassingGradeFinalize = true;
      catechismOptions.push({
        name: this.i18nextPipe.transform(
          `${this.modulePath}:action.passing_grade_finalize`
        ),
        value: 'passing_grade_finalize',
        icon: 'library_add_check',
      });
    }

    if (
      !this.model.finalized &&
      !this.headerOptionsMenu.some((o: any) => o.value === 'finalize')
    ) {
      addFinalize = true;
      catechismOptions.push({
        name: this.i18nextPipe.transform(`${this.modulePath}:action.finalize`),
        value: 'finalize',
        icon: 'lock',
      });
    }

    if (
      (addPassingGrade || addPassingGradeFinalize || addFinalize) &&
      !this.headerOptionsMenu.some((o: any) => o.isSeparator === true)
    ) {
      catechismOptions.push({
        isSeparator: true,
      });
    }

    this.headerOptionsMenu = catechismOptions.concat(this.headerOptionsMenu);
  }

  closeConfirmationModal(event: {
    action: string;
    passYear: boolean;
    finalize: boolean;
    saveWhenStudentExistsOnAnotherCatechism: boolean;
    saveWithMissingSponsors: boolean;
  }) {
    this.passYear = event.passYear;
    this.finalize = event.finalize;

    if (!this.passYear && this.finalize) {
      this.isSaving = true;
      this.finalizeCatechism();
    } else if (this.passYear || this.finalize) {
      this.returnUrl = `/${this.modulePath}/${this.id}/duplicate`;
      this.modal.close();
    }
    this.openPassingGradeModal = false;
    this.openPassingGradeFinalizeModal = false;
    this.openFinalizeModal = false;
  }

  private finalizeCatechism() {
    const baseCatechismForm = this.fb.group({
      id: [this.model.id],
      finalized: [true],
    });
    let finalizeSub$: Subscription;
    finalizeSub$ = this.actionSubject
      .pipe(ofType(actions.CatechismsActionTypes.SuccessFinalize))
      .subscribe((r: actions.SuccessFinalize) => {
        if (r?.payload) {
          if (finalizeSub$) {
            finalizeSub$.unsubscribe();
          }
          this.model = r.payload;

          const filterhHeaderMenu = this.headerOptionsMenu.filter(
            (o: any) => !o.value?.includes('finalize')
          );
          this.headerOptionsMenu = [...filterhHeaderMenu];

          this.isSaving = false;

          this.snackBarService.openSnackBar(
            this.i18nextPipe.transform(
              `${this.modulePath}:message.finalized_success`
            ),
            this.sharedModule.SUCCESS_COLOR
          );
        }
      });

    this.store.dispatch(
      new actions.RequestFinalize(baseCatechismForm.getRawValue())
    );
  }
  // THIS FORM SPECIFIC FUNCTIONS [END]
}
