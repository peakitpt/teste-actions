import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import * as actions from '../reducers/acolytes.actions';
import { getAcolyte } from '../reducers/acolytes.selectors';
import { Observable } from 'rxjs';

import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import { ActionsSubject, Store } from '@ngrx/store';
import { AcolytesService } from '@peakitpt/ui-kyrios-api';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { I18NextPipe } from 'angular-i18next';
import { HttpClient } from '@angular/common/http';
import { EntityAcolyte } from '../../mecs/mecs.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { SnackBarService } from '@peakitpt/ui-material';

@Component({
  selector: 'kyr-acolytes-details',
  templateUrl: './acolytes-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AcolytesDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<EntityAcolyte>;
  model: any;
  returnUrl = '/acolytes';
  modulePath = 'acolytes';
  viewName = 'Acolytes';

  detailsTabs: any[] = [];
  acolyteLinesColumns: any[] = [];
  acolyteFormationsColumns: any[] = [];
  selectorGetModel = getAcolyte;
  actionRequestFail = actions.AcolytesActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;

  @ViewChild('personalDataTemplate') personalDataTemplate: TemplateRef<any>;
  @ViewChild('categoriesTemplate') categoriesTemplate: TemplateRef<any>;
  @ViewChild('acolyteTemplate') acolyteTemplate: TemplateRef<any>;
  @ViewChild('formationsTemplate') formationsTemplate: TemplateRef<any>;
  @ViewChild('renewalDateTemplate') renewalDateTemplate: TemplateRef<any>;
  @ViewChild('formationDateTemplate') formationDateTemplate: TemplateRef<any>;

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
    private acolytesService: AcolytesService
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

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.subs.push(
      this.model$.subscribe((model) => {
        this.model = model;
        this.setDetailsTabs();
        if (
          this.model &&
          this.detailsTabs.length < 4 &&
          ((this.model.entities_acolytes_formations &&
            this.model.entities_acolytes_formations.length) ||
            (this.model.entities_acolytes_lines &&
              this.model.entities_acolytes_lines.length))
        ) {
          this.detailsTabs.push({
            textLabel: this.i18nextPipe.transform(
              this.modulePath + ':tabs.formations'
            ),
            templateContent: this.formationsTemplate,
          });
        }
      })
    );
    this.acolyteLinesColumns = [
      {
        id: 'renewal_date',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.entities_acolytes_lines.renewal_date'
        ),
        filter: false,
        template: this.renewalDateTemplate,
        sortable: false,
      },
    ];
    this.acolyteFormationsColumns = [
      {
        id: 'formation_description',
        title: this.i18nextPipe.transform(
          this.modulePath +
            ':model.entities_acolytes_formations.formation_description'
        ),
        filter: false,
        sortable: false,
      },
      {
        id: 'formation_date',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.entities_acolytes_formations.formation_date'
        ),
        filter: false,
        template: this.formationDateTemplate,
        sortable: false,
      },
    ];
  }

  setDetailsTabs() {
    this.detailsTabs = [
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.personal-data'
        ),
        templateContent: this.personalDataTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.categories'
        ),
        templateContent: this.categoriesTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.acolyte'
        ),
        templateContent: this.acolyteTemplate,
      },
    ];
  }

  buildHeaderOptionsMenu() {
    this.headerOptionsMenu = [
      {
        name: this.i18nextPipe.transform(
          this.modulePath + ':action.generate_card'
        ),
        value: 'generate_card',
        icon: 'credit_card',
      },
      {
        name: this.i18nextPipe.transform('translation:action.duplicate'),
        value: 'duplicate',
        icon: 'file_copy',
      },
      {
        name: this.i18nextPipe.transform('translation:action.delete'),
        value: 'delete',
        icon: 'delete',
      },
    ];
  }

  menuClick(event: any, data: any) {
    switch (event) {
      case 'generate_card':
        if (this.id) {
          this.acolytesService.generateCard(
            this.id,
            +localStorage.getItem('subscriptionId'),
            localStorage.getItem('token')
          );
        }
        break;
      default:
        super.menuClick(event, data);
        break;
    }
  }
}
