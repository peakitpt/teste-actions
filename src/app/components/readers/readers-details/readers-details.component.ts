import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import * as actions from '../reducers/readers.actions';
import { getReader } from '../reducers/readers.selectors';
import { Observable } from 'rxjs';

import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import { ActionsSubject, Store } from '@ngrx/store';
import { ReadersService } from '@peakitpt/ui-kyrios-api';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { I18NextPipe } from 'angular-i18next';
import { HttpClient } from '@angular/common/http';
import { EntityReader } from '../../mecs/mecs.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { SnackBarService } from '@peakitpt/ui-material';

@Component({
  selector: 'kyr-readers-details',
  templateUrl: './readers-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ReadersDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<EntityReader>;
  model: any;
  returnUrl = '/readers';
  modulePath = 'readers';
  viewName = 'Readers';

  detailsTabs: any[] = [];
  readerLinesColumns: any[] = [];
  readerFormationsColumns: any[] = [];
  selectorGetModel = getReader;
  actionRequestFail = actions.ReadersActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;

  @ViewChild('personalDataTemplate') personalDataTemplate: TemplateRef<any>;
  @ViewChild('categoriesTemplate') categoriesTemplate: TemplateRef<any>;
  @ViewChild('readerTemplate') readerTemplate: TemplateRef<any>;
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
    private readersService: ReadersService
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
      })
    );

    this.subs.push(
      this.model$.subscribe((model) => {
        this.model = model;
        this.setDetailsTabs();
        if (
          this.model &&
          this.detailsTabs.length < 4 &&
          ((this.model.entities_readers_formations &&
            this.model.entities_readers_formations.length) ||
            (this.model.entities_readers_lines &&
              this.model.entities_readers_lines.length))
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
    this.readerLinesColumns = [
      {
        id: 'renewal_date',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.entities_readers_lines.renewal_date'
        ),
        filter: false,
        template: this.renewalDateTemplate,
        sortable: false,
      },
    ];
    this.readerFormationsColumns = [
      {
        id: 'formation_description',
        title: this.i18nextPipe.transform(
          this.modulePath +
            ':model.entities_readers_formations.formation_description'
        ),
        filter: false,
        sortable: false,
      },
      {
        id: 'formation_date',
        title: this.i18nextPipe.transform(
          this.modulePath + ':model.entities_readers_formations.formation_date'
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
        textLabel: this.i18nextPipe.transform(this.modulePath + ':tabs.reader'),
        templateContent: this.readerTemplate,
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
          this.readersService.generateCard(
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
