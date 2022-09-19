import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import * as actions from '../reducers/documents.actions';
import { getDocument } from '../reducers/documents.selectors';
import { Observable } from 'rxjs';
import { Document, DocumentsAttachment, Numeration } from '../document.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';
import { environment } from 'src/environments/environment';
import { ActionsSubject, Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { I18NextPipe } from 'angular-i18next';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from '@peakitpt/ui-material';
import {
  DocumentsService,
  EntitiesService,
  PersonsService,
} from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-documents-details',
  templateUrl: './documents-details.component.html',
  styleUrls: ['./documents-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentsDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<Document>;
  returnUrl = '/documents';
  modulePath = 'documents';
  viewName = 'Document';

  selectorGetModel = getDocument;
  actionRequestFail = actions.DocumentsActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;
  actionClearGet = actions.ClearGet;
  series = {};

  @ViewChild('mainTab') mainTab: TemplateRef<any>;
  @ViewChild('attachmentsTab') attachmentsTab: TemplateRef<any>;

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
    private documentsService: DocumentsService,
    private personsService: PersonsService,
    private entitiesService: EntitiesService
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
    this.sharedModule.logAccess(this.subs, this.modulePath, this.route);
    if (this.actionClearGet) {
      this.store.dispatch(new this.actionClearGet());
    }

    this.subs.push(
      this.route.params.subscribe((params) => {
        if (params.id) {
          this.id = +params.id;
          this.model$ = this.store.select(this.selectorGetModel);
          this.subs.push(
            this.model$.subscribe((model: any) => {
              if (model) {
                this.model = model;
                this.buildHeaderOptionsMenu();
                this.afterGetModel();
                this.getSeries();
              }
            })
          );
          this.store.dispatch(new this.actionRequestGetOne(+params.id));
        }
      })
    );

    // Manage Reports
    this.reportMenuOptionsModel = [];
    this.getReports();
    this.getSubscriptionReports();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    this.detailsTabs.push(
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.document'
        ),
        templateContent: this.mainTab,
      },
      {
        textLabel: this.i18nextPipe.transform(
          this.modulePath + ':tabs.attachments'
        ),
        templateContent: this.attachmentsTab,
      }
    );
  }

  buildHeaderOptionsMenu() {
    const menu = [
      {
        name: this.i18nextPipe.transform('translation:action.duplicate'),
        value: 'duplicate',
        icon: 'file_copy',
      },
    ];
    if (!this.model.block_remove) {
      menu.push({
        name: this.i18nextPipe.transform('translation:action.delete'),
        value: 'delete',
        icon: 'delete',
      });
    }
    this.headerOptionsMenu = menu;
  }

  openDetails(modulePath: string, id: number, railsApp = false) {
    this.subs.push(
      this.entitiesService.getOne(id).subscribe((result) => {
        const module = this.getEntityModule(result.entity_type_id);
        switch (module) {
          case 'persons':
            this.subs.push(
              this.personsService.getByEntityId(id).subscribe((result) => {
                super.openDetails(module, result.id, railsApp);
              })
            );
            break;
          default:
            super.openDetails(module, result.id, railsApp);
            break;
        }
      })
    );
  }

  private getSeries() {
    const payload = this.model;
    const subscription = this.documentsService
      .getDocumentsTypesForJS(payload)
      .subscribe((r) => {
        r.numerations.forEach((serie: Numeration) => {
          this.series[serie.id] = serie.serie;
          subscription.unsubscribe();
        });
      });
  }

  private getEntityModule(entity_type_id) {
    const dict = {
      2: 'chapelries',
      5: 'persons',
      8: 'worshipplaces',
      9: 'bishoprics',
      10: 'archpristships',
      11: 'priests',
    };
    return dict[entity_type_id];
  }

  getAttachmentUrl(attachment: DocumentsAttachment): string {
    if (attachment.attachment && attachment.attachment_name) {
      return `${environment.railsAppUrl}/filemanagers/download?f=${attachment.attachment}&fn=${attachment.attachment_name}`;
    }
    return '';
  }
}
