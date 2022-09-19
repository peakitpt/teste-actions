import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  TemplateRef,
} from '@angular/core';

import { Validators, FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import * as actions from '../reducers/emenus.actions';
import { getEmenu } from '../reducers/emenus.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { Emenu } from '../emenu.model';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { TableDataSource, SnackBarService } from '@peakitpt/ui-material';
import { Store, ActionsSubject } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18NextPipe } from 'angular-i18next';

import { State } from '../reducers/emenus.reducer';
import { State as ContentsState } from 'src/app/shared/components/modals/contents-modal/reducers/contents-modal.reducer';
import { getContentsSelected } from 'src/app/shared/components/modals/contents-modal/reducers/contents-modal.selectors';
import { State as SectionsState } from 'src/app/shared/components/modals/sections-modal/reducers/sections-modal.reducer';
import { getSectionsSelected } from 'src/app/shared/components/modals/sections-modal/reducers/sections-modal.selectors';
import { State as LayoutsState } from 'src/app/shared/components/modals/layouts-modal/reducers/layouts-modal.reducer';
import { getLayoutsSelected } from 'src/app/shared/components/modals/layouts-modal/reducers/layouts-modal.selectors';
import { SubscriptionLayoutsService } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-emenus-form',
  templateUrl: './emenus-form.component.html',
})
export class EmenusFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy {
  model$: Observable<Emenu>;
  modulePath = 'emenus';

  selectorGetModel = getEmenu;
  actionRequestFail = actions.EmenusActionTypes.RequestFailEmenus;
  actionRequestGetAll = actions.RequestGetAllEmenus;
  actionRequestGetOne = actions.RequestGetEmenu;
  actionRequestPut = actions.RequestPutEmenu;
  actionSuccessPut = actions.EmenusActionTypes.SuccessPutEmenu;
  actionRequestPost = actions.RequestPostEmenu;
  actionSuccessPost = actions.EmenusActionTypes.SuccessPostEmenu;

  @ViewChild('deleteTemplate') deleteTemplate: TemplateRef<any>;
  @ViewChild('orderTemplate') orderTemplate: TemplateRef<any>;
  @ViewChild('titleTemplate') titleTemplate: TemplateRef<any>;
  @ViewChild('contentSectionUrlTemplate')
  contentSectionUrlTemplate: TemplateRef<any>;
  @ViewChild('typeTemplate') typeTemplate: TemplateRef<any>;
  @ViewChild('layoutTemplate') layoutTemplate: TemplateRef<any>;

  model: any;
  typeOptions: any[];
  contentsMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  sectionsMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  templatesMenuOptions: Array<{
    name: string;
    value: string;
    icon: string;
  }> = [];
  childMenusColumns: any[] = [];
  childMenusDS: TableDataSource<any> = new TableDataSource([]);
  childMenusFormArray: FormArray = new FormArray([]);
  newChildMenu = {
    order_nr: null,
    title: null,
    emenu_type: null,
    url: null,
    content_id: null,
    content_description: null,
    template_id: null,
    template_description: null,
    section_id: null,
    section_description: null,
    father_id: this.id ? this.id : null,
    _destroy: false,
  };

  optionsNoDeleteMenu = [
    {
      name: this.i18nextPipe.transform('translation:action.duplicate'),
      value: 'duplicate',
      icon: 'file_copy',
    },
  ];
  hasSubscriptionLayouts = false;

  constructor(
    public store: Store<State>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    private contentsStore: Store<ContentsState>,
    private sectionsStore: Store<SectionsState>,
    private layoutsStore: Store<LayoutsState>,
    private subscriptionLayoutsService: SubscriptionLayoutsService
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

  initializeForm() {
    this.form = this.fb.group({
      id: [],
      title: [null, Validators.required],
      emenu_type: [],
      url: [],
      child_menus: this.fb.array([]),
      child_menus_attributes: this.fb.array([]),
      content_description: [],
      content_id: [],
      order_nr: [],
      section_description: [],
      section_id: [],
      template_description: [],
      template_id: [],
    });

    this.childMenusFormArray = this.form.controls.child_menus as FormArray;
  }

  ngOnInit() {
    super.ngOnInit();
    this.setContentsModal();
    this.setSectionsModal();
    this.setLayoutsModal();
    this.setTypeOptions();
    this.checkSubscriptionsLayout();
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);
    this.model = obj;
    this.setChildMenus(obj.child_menus);
  }

  onAfterViewInit() {
    this.clearModalInputs();
    this.buildchildMenusTableColumns();
  }

  menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'save_new':
        this.saveAndNew = true;
        this.onSubmit();
        break;
      case 'delete': {
        if (this.id) {
          this.router.navigate([this.modulePath, this.id, 'edit', 'delete']);
        }
        break;
      }
      case 'clear_content_modal': {
        if (inputName) {
          if (inputName.includes('#')) {
            // Table's modal
            const tableIndex = this.getInputNameIndex(inputName);

            this.childMenusFormArray
              .get([tableIndex, 'content_id'])
              .setValue(null);
            this.childMenusFormArray
              .get([tableIndex, 'content_description'])
              .setValue(null);
          } else {
            // Form's modal
            this.form.get(`${inputName}_id`).setValue(null);
            this.form.get(`${inputName}_description`).setValue(null);
          }
        }
        break;
      }
      case 'view_selected_content': {
        if (inputName) {
          let id: number;

          if (inputName.includes('#')) {
            // Table's modal
            id = this.childMenusFormArray.get([
              this.getInputNameIndex(inputName),
              'content_id',
            ]).value;
          } else {
            // Form's modal
            id = this.form.get(`${inputName}_id`).value;
          }

          if (id) {
            this.openDetails('contents', id);
          }
        }
        break;
      }
      case 'clear_section_modal': {
        if (inputName) {
          if (inputName.includes('#')) {
            // Table's modal
            const tableIndex = this.getInputNameIndex(inputName);

            this.childMenusFormArray
              .get([tableIndex, 'section_id'])
              .setValue(null);
            this.childMenusFormArray
              .get([tableIndex, 'section_description'])
              .setValue(null);
          } else {
            // Form's modal
            this.form.get(`${inputName}_id`).setValue(null);
            this.form.get(`${inputName}_description`).setValue(null);
          }
        }
        break;
      }
      case 'view_selected_section': {
        if (inputName) {
          let id: number;

          if (inputName.includes('#')) {
            // Table's modal
            id = this.childMenusFormArray.get([
              this.getInputNameIndex(inputName),
              'section_id',
            ]).value;
          } else {
            // Form's modal
            id = this.form.get(`${inputName}_id`).value;
          }

          if (id) {
            this.openDetails('sections', id);
          }
        }
        break;
      }
      case 'clear_subscription-layout_modal': {
        if (inputName) {
          if (inputName.includes('#')) {
            // Table's modal
            const tableIndex = this.getInputNameIndex(inputName);

            this.childMenusFormArray
              .get([tableIndex, 'template_id'])
              .setValue(null);
            this.childMenusFormArray
              .get([tableIndex, 'template_description'])
              .setValue(null);
          } else {
            // Form's modal
            this.form.get(`${inputName}_id`).setValue(null);
            this.form.get(`${inputName}_description`).setValue(null);
          }
        }
        break;
      }
      case 'quick_insertion_content': {
        this.openQuickInsertionModal('quick-insert-contents-modal', inputName);
      }
      default: {
        break;
      }
    }
  }

  onFormValid() {
    this.form.setControl(
      'child_menus_attributes',
      this.fb.array(
        this.childMenusFormArray.value.sort((a, b) => {
          return +a.order_nr > +b.order_nr ? 1 : -1;
        })
      )
    );
    this.form.setControl(
      'child_menus',
      this.fb.array(
        this.childMenusFormArray.value.sort((a, b) => {
          return +a.order_nr > +b.order_nr ? 1 : -1;
        })
      )
    );

    if (this.form.value.id) {
      this.store.dispatch(new this.actionRequestPut(this.form.value));
    } else {
      this.store.dispatch(new this.actionRequestPost(this.form.value));
    }
  }

  // THIS FORM SPECIFIC FUNCTIONS [START]
  private setChildMenus(childMenus: Emenu[] = []) {
    this.childMenusFormArray.clear();
    this.childMenusDS.data = this.childMenusFormArray.value;
    if (childMenus?.length) {
      childMenus.forEach((menu: Emenu) => {
        this.addTableLine(menu, this.childMenusFormArray, this.childMenusDS);
      });
    }
  }

  private setContentsModal() {
    this.contentsMenuOptions = this.defaultModalMenu('content');

    // When a row is selected
    this.subs.push(
      this.contentsStore
        .select(getContentsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            if (!row.inputName.includes('#')) {
              this.form.get(`${row.inputName}_id`).setValue(row.model.id);
              this.form
                .get(`${row.inputName}_description`)
                .setValue(row.model.title);
            } else {
              this.updateTableValues(
                this.getInputNameIndex(row.inputName),
                this.childMenusFormArray,
                this.childMenusDS,
                [
                  {
                    control: 'content_id',
                    value: row.model.id,
                  },
                  {
                    control: 'content_description',
                    value: row.model.title,
                  },
                ]
              );
            }
          }
        })
    );
  }

  private setSectionsModal() {
    this.sectionsMenuOptions = this.defaultModalMenu('section');

    // When a row is selected
    this.subs.push(
      this.sectionsStore
        .select(getSectionsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            if (!row.inputName.includes('#')) {
              this.form.get(`${row.inputName}_id`).setValue(row.model.id);
              this.form
                .get(`${row.inputName}_description`)
                .setValue(row.model.description);
            } else {
              this.updateTableValues(
                this.getInputNameIndex(row.inputName),
                this.childMenusFormArray,
                this.childMenusDS,
                [
                  {
                    control: 'section_id',
                    value: row.model.id,
                  },
                  {
                    control: 'section_description',
                    value: row.model.description,
                  },
                ]
              );
            }
          }
        })
    );
  }

  private setLayoutsModal() {
    this.templatesMenuOptions = this.defaultModalMenu('subscription-layout');

    // When a row is selected
    this.subs.push(
      this.layoutsStore
        .select(getLayoutsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            if (!row.inputName.includes('#')) {
              this.form.get(`${row.inputName}_id`).setValue(row.model.id);
              this.form
                .get(`${row.inputName}_description`)
                .setValue(row.model.name);
            } else {
              this.updateTableValues(
                this.getInputNameIndex(row.inputName),
                this.childMenusFormArray,
                this.childMenusDS,
                [
                  {
                    control: 'template_id',
                    value: row.model.id,
                  },
                  {
                    control: 'template_description',
                    value: row.model.name,
                  },
                ]
              );
            }
          }
        })
    );
  }

  private buildchildMenusTableColumns() {
    setTimeout(() => {
      this.childMenusColumns = [
        {
          id: 'delete-btn',
          sortable: false,
          template: this.deleteTemplate,
        },
        {
          id: 'order',
          title:
            this.i18nextPipe.transform(`${this.modulePath}:model.order`) + ' *',
          sortable: false,
          template: this.orderTemplate,
          width: '75px',
        },
        {
          id: 'title',
          title:
            this.i18nextPipe.transform(`${this.modulePath}:model.title`) + ' *',
          sortable: false,
          template: this.titleTemplate,
        },
        {
          id: 'emenu_type',
          title:
            this.i18nextPipe.transform(`${this.modulePath}:model.emenu_type`) +
            ' *',
          sortable: false,
          template: this.typeTemplate,
        },
        {
          id: 'contentSectionUrl',
          title:
            this.i18nextPipe.transform(`${this.modulePath}:model.url`) +
            ' | ' +
            this.i18nextPipe.transform(`${this.modulePath}:model.content`) +
            ' | ' +
            this.i18nextPipe.transform(`${this.modulePath}:model.section`),
          sortable: false,
          template: this.contentSectionUrlTemplate,
        },
        {
          id: 'layout',
          title: this.i18nextPipe.transform(`${this.modulePath}:model.layout`),
          sortable: false,
          template: this.layoutTemplate,
        },
      ];
    });
  }

  clearModalInputs() {
    this.form.get('content_description').setValue(null);
    this.form.get('content_id').setValue(null);
    this.form.get('section_description').setValue(null);
    this.form.get('section_id').setValue(null);
    this.form.get('template_description').setValue(null);
    this.form.get('template_id').setValue(null);
  }

  checkSubscriptionsLayout() {
    this.subs.push(
      this.subscriptionLayoutsService.getAll().subscribe((r) => {
        if (r.results.length === 0) {
          this.hasSubscriptionLayouts = false;
          this.snackBarService.openSnackBar(
            this.i18nextPipe.transform(
              `${this.modulePath}:message.no_subscription_layouts`
            ),
            this.sharedModule.ERROR_COLOR,
            5000
          );
        } else {
          this.hasSubscriptionLayouts = true;
        }
      })
    );
  }

  setTypeOptions() {
    this.typeOptions = [
      {
        value: 'url',
        label: this.i18nextPipe.transform(`${this.modulePath}:model.url`),
      },
      {
        value: 'content',
        label: this.i18nextPipe.transform(`${this.modulePath}:model.content`),
      },
      {
        value: 'section',
        label: this.i18nextPipe.transform(`${this.modulePath}:model.section`),
      },
    ];
  }
}
