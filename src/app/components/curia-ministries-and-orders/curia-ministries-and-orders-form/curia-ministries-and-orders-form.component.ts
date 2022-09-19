import { ActionsSubject } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { State } from '../reducers/curia-ministries-and-orders.reducer';
import { Observable, timer } from 'rxjs';
import { I18NextPipe } from 'angular-i18next';
import * as actions from '../reducers/curia-ministries-and-orders.actions';
import { SnackBarService, TableDataSource } from '@peakitpt/ui-material';
import { getCuriaMinistryAndOrder } from '../reducers/curia-ministries-and-orders.selectors';
import {
  BaseFormComponent,
  ModalMenuOption,
} from 'src/app/shared/components/base-form-component';
import {
  CuriaMinistriesAndOrderAttachment,
  CuriaMinistryAndOrder,
} from '../curia-ministry-and-order.model';
import { SharedModule } from 'src/app/shared/shared.module';

import { State as PriestsV1State } from 'src/app/shared/components/modals/priests-v1-modal/reducers/priests-v1-modal.reducer';
import { getPriestsV1Selected } from 'src/app/shared/components/modals/priests-v1-modal/reducers/priests-v1-modal.selectors';
import { State as EmolumentsState } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.reducer';
import { getEmolumentsSelected } from 'src/app/shared/components/modals/emoluments-modal/reducers/emoluments-modal.selectors';
import { State as CuriaFunctionsState } from 'src/app/shared/components/modals/curia-functions-modal/reducers/curia-functions-modal.reducer';
import { getCuriaFunctionsSelected } from 'src/app/shared/components/modals/curia-functions-modal/reducers/curia-functions-modal.selectors';
import { State as WorshipplacesState } from 'src/app/shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.reducer';
import { getWorshipplacesSelected } from 'src/app/shared/components/modals/worshipplaces-modal/reducers/worshipplaces-modal.selectors';
import { State as ParishionersState } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.reducer';
import { getParishionersSelected } from 'src/app/shared/components/modals/parishioners-modal/reducers/parishioners-modal.selectors';
import { State as PersonsState } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.reducer';
import { getPersonsSelected } from 'src/app/shared/components/modals/persons-modal/reducers/persons-modal.selectors';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { FileManagerService } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-curia-ministries-and-orders-form',
  templateUrl: './curia-ministries-and-orders-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CuriaMinistriesAndOrdersFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<CuriaMinistryAndOrder>;
  modulePath = 'curia-ministries-and-orders';
  preFillWithNew = true;

  selectorGetModel = getCuriaMinistryAndOrder;
  actionRequestFail =
    actions.CuriaMinistriesAndOrdersActionTypes
      .RequestFailCuriaMinistriesAndOrders;
  actionRequestGetAll = actions.RequestGetAllCuriaMinistriesAndOrders;
  actionRequestGetOne = actions.RequestGetCuriaMinistryAndOrder;
  actionRequestPut = actions.RequestPutCuriaMinistryAndOrder;
  actionSuccessPut =
    actions.CuriaMinistriesAndOrdersActionTypes.SuccessPutCuriaMinistryAndOrder;
  actionRequestPost = actions.RequestPostCuriaMinistryAndOrder;
  actionSuccessPost =
    actions.CuriaMinistriesAndOrdersActionTypes
      .SuccessPostCuriaMinistryAndOrder;
  actionRequestGetNew = actions.RequestGetNew;

  /* This specific's component fields */
  emolumentsMenuOptions: ModalMenuOption[] = [];
  parishionersMenuOptions: ModalMenuOption[] = [];
  worshipplacesMenuOptions: ModalMenuOption[] = [];
  priestsMenuOptions: ModalMenuOption[] = [];
  curiaFunctionsMenuOptions: ModalMenuOption[] = [];
  footerOptionsMenu: Array<{ name: string; value: string; icon: string }> = [];

  saveAndGenerateDoc = false;

  attachmentsColumns: any[] = [];
  attachmentsFormArray: FormArray = new FormArray([]); // The controls that manipulate the TableDataSource
  attachmentsDS: TableDataSource<any> = new TableDataSource([]); // The data that feeds the table

  @ViewChild('mainTabTemplate') mainTabTemplate: TemplateRef<any>;
  @ViewChild('attachmentsTabTemplate') attachmentsTabTemplate: TemplateRef<any>;

  @ViewChild('deleteAttachmentTemplate')
  deleteAttachmentTemplate: TemplateRef<any>;
  @ViewChild('attachmentTemplate')
  attachmentTemplate: TemplateRef<any>;
  @ViewChild('attachmentDescriptionTemplate')
  attachmentDescriptionTemplate: TemplateRef<any>;

  queryStringParams = {
    serialize: 'parishioners_name_type_complete_relation_taxpayer_address',
    except_users: 'true',
  };

  constructor(
    public store: Store<State>,
    public router: Router,
    public route: ActivatedRoute,
    public sharedModule: SharedModule,
    public fb: FormBuilder,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    public fileManagerService: FileManagerService,
    private emolumentsStore: Store<EmolumentsState>,
    private priestsStore: Store<PriestsV1State>,
    private curiaFunctionsStore: Store<CuriaFunctionsState>,
    private worshipplacesStore: Store<WorshipplacesState>,
    private parishionersStore: Store<ParishionersState>,
    private personsStore: Store<PersonsState>
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
    super.ngOnInit();
    this.setEmolumentsModal();
    this.setParishionersModal();
    this.setWorshipplacesModal();
    this.setPriestsModal();
    this.setCuriaFunctionsModal();
    this.setPersonsModal();
  }

  initializeForm() {
    this.form = this.fb.group({
      archive: [],
      created_at: [],
      created_by_user_id: [],
      curia_ministries_and_order_attachments: this.fb.array([]),
      date: [],
      deleted: [false],
      deleted_by_user_id: [],
      delivery_term: [],
      dispatch: [],
      document_date: [],
      document_entity_description: [],
      document_entity_id: [],
      emolument_description: [],
      emolument_id: [],
      entity_description: [],
      entity_ekklesia_location_id: [],
      entity_id: [],
      entity_priest_id: [],
      function_description: [],
      function_id: [],
      hours: [
        null,
        [
          Validators.pattern(this.sharedModule.PATTERN_HOUR),
          Validators.minLength(5),
          Validators.maxLength(5),
        ],
      ],
      id: [],
      place_description: [],
      place_id: [],
      receipt_id: [],
      serie_number: [],
      subscriber1_description: [],
      subscriber1_entity_priest_id: [],
      subscriber1_id: [],
      subscriber2_description: [],
      subscriber2_entity_priest_id: [],
      subscriber2_id: [],
      tax: [],
      type_id: [],
      updated_at: [],
      updated_by_user_id: [],
    });
  }

  setFormValues(obj: any) {
    super.setFormValues(obj);
    this.constructFooterMenu();
    this.setInnerTable(
      obj.curia_ministries_and_order_attachments,
      this.attachmentsFormArray,
      this.attachmentsDS
    );
  }

  onAfterViewInit() {
    this.formTabs = [
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.ministries_and_orders`
        ),
        templateContent: this.mainTabTemplate,
      },
      {
        textLabel: this.i18nextPipe.transform(
          `${this.modulePath}:tabs.attachments_tab`
        ),
        templateContent: this.attachmentsTabTemplate,
      },
    ];

    this.clearModalInputs();
    this.buildSubTablesColumns();
  }

  onSaveSuccess(result: any) {
    this.isLoading = true;

    this.snackBarService.openSnackBar(
      this.i18nextPipe.transform(`${this.modulePath}:message.save_success`),
      this.sharedModule.SUCCESS_COLOR
    );

    if (this.isQuickInsertion) {
      // Code used for Quick Insertions
      this.store.dispatch(
        new this.actionRequestSetSelected({
          inputName: this.route.snapshot.queryParamMap.get('inputNameQI'),
          model: result.payload,
        } as SelectedModalRow)
      );
      this.modal.close();
    } else {
      // Not quick inserting
      if (this.saveAndNew) {
        this.saveAndNew = false;
        this.isLoading = false;
        this.modal.close();
        this.router.navigate([this.modulePath]).then(() => {
          timer(500).subscribe(() => {
            this.router.navigate([this.modulePath, 'new']);
          });
        });
      } else if (this.blockChainClosing) {
        this.isLoading = false;
        this.blockChainClosing = false;
      } else if (this.saveAndGenerateDoc) {
        this.saveAndGenerateDoc = false;
        this.modal.close();
        this.navigate(`/${this.modulePath}/${this.id}/emit_document`);
      } else if (result.payload.id) {
        this.modal.close();
        this.router.navigate([this.modulePath, result.payload.id, 'details']);
      } else {
        this.modal.close();
      }
    }
  }

  clearModalInputs() {
    [
      'entity_id',
      'entity_description',
      'entity_priest_id',
      'entity_ekklesia_location_id',
      'function_id',
      'function_description',
      'subscriber1_id',
      'subscriber1_description',
      'subscriber1_entity_priest_id',
      'place_id',
      'place_description',
      'subscriber2_id',
      'subscriber2_description',
      'subscriber2_entity_priest_id',
      'subscriber2_id',
      'document_entity_description',
      'document_entity_id',
    ].forEach((field: string) => this.affectField(field, null));
  }

  menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'clear_emolument_modal':
        this.affectField(`tax`, null);
      case 'clear_parishioner_modal':
      case 'clear_worshipplace_modal':
      case 'clear_priest_modal':
        switch (inputName) {
          case 'subscriber1':
          case 'subscriber2':
            this.affectField(`${inputName}_entity_priest_id`, null);
            this.affectField(`${inputName}_id`, null);
            this.affectField(`${inputName}_description`, null);
            break;
          case 'entity':
            this.affectField(`${inputName}_id`, null);
            this.affectField(`${inputName}_description`, null);
            this.affectField(`${inputName}_entity_priest_id`, null);
            this.affectField(`${inputName}_ekklesia_location_id`, null);
            break;
          default:
            break;
        }
      case 'clear_curia-functions_modal':
        if (inputName) {
          this.affectField(`${inputName}_id`, null);
          this.affectField(`${inputName}_description`, null);
        }
        break;
      case 'view_selected_emolument':
      case 'view_selected_worshipplace':
        if (inputName) {
          const id = this.form.get(`${inputName}_id`).value;
          if (id) {
            if (event.includes('emolument')) {
              this.openDetails('emoluments', id);
            } else if (event.includes('worshipplace')) {
              this.openDetails('worshipplaces', id);
            }
          }
        }
        break;
      case 'quick_insertion_parishioner':
        this.openQuickInsertionModal('quick-insert-persons-modal', inputName);
        break;
      case 'quick_insertion_emolument':
        this.openQuickInsertionModal(
          'quick-insert-emoluments-modal',
          inputName
        );
        break;
      case 'quick_insertion_worshipplace':
        this.openQuickInsertionModal(
          'quick-insert-worshipplaces-modal',
          inputName
        );
        break;
      case 'save_generate_document':
        this.saveAndGenerateDoc = true;
        this.onSubmit();
        break;
      default:
        super.menuClick(event, inputName);
        break;
    }
  }

  onFormValid() {
    if (this.validateAttachments()) {
      super.onFormValid();
    } else {
      this.savingError(
        this.i18nextPipe.transform(
          `${this.modulePath}:message.error_invalid_attachments`
        )
      );
    }
  }

  onSubmit() {
    this.isSaving = true;
    this.uploadAttachments(this.attachmentsFormArray, this.attachmentsDS);
  }

  private setEmolumentsModal() {
    this.emolumentsMenuOptions = this.defaultModalMenu('emolument');

    this.subs.push(
      this.emolumentsStore
        .select(getEmolumentsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            switch (row.inputName) {
              case 'emolument':
                this.affectField(`tax`, row.model.value);
              default:
                this.affectField(`${row.inputName}_id`, row.model.id);
                this.affectField(
                  `${row.inputName}_description`,
                  row.model.description_short
                );
                break;
            }
          }
        })
    );
  }

  private setParishionersModal() {
    this.parishionersMenuOptions = this.defaultModalMenu('parishioner');

    // This always removes the VIEW option
    if (this.parishionersMenuOptions.length > 1) {
      this.parishionersMenuOptions.splice(1, 1);
    }

    this.subs.push(
      this.parishionersStore
        .select(getParishionersSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.affectField(`${row.inputName}_id`, row.model.id);
            this.affectField(
              `${row.inputName}_description`,
              row.model.complete_relation
            );
          }
        })
    );
  }

  private setPersonsModal() {
    this.subs.push(
      this.personsStore
        .select(getPersonsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.affectField(`${row.inputName}_id`, row.model.entity.id);
            this.affectField(
              `${row.inputName}_description`,
              row.model.entity.name
            );
          }
        })
    );
  }

  private setWorshipplacesModal() {
    this.worshipplacesMenuOptions = this.defaultModalMenu('worshipplace');

    this.subs.push(
      this.worshipplacesStore
        .select(getWorshipplacesSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.affectField(`${row.inputName}_id`, row.model.id);
            this.affectField(
              `${row.inputName}_description`,
              row.model.complete_relation
            );
          }
        })
    );
  }

  private setPriestsModal() {
    this.priestsMenuOptions = [this.defaultModalMenu('priest')[0]];

    this.subs.push(
      this.priestsStore
        .select(getPriestsV1Selected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            switch (row.inputName) {
              case 'subscriber1':
              case 'subscriber2':
                this.affectField(
                  `${row.inputName}_entity_priest_id`,
                  row.model.id
                );
                this.affectField(`${row.inputName}_id`, row.model.entity_id);
                this.affectField(
                  `${row.inputName}_description`,
                  `${row.model.entity__name}`
                );
                break;
              case 'entity':
                this.affectField(`${row.inputName}_id`, row.model.entity_id);
                this.affectField(
                  `${row.inputName}_description`,
                  `${row.model.entity__name}`
                );
                this.affectField(
                  `${row.inputName}_entity_priest_id`,
                  row.model.id
                );
                this.affectField(
                  `${row.inputName}_ekklesia_location_id`,
                  row.model.entity.entity_ekklesia_location_id
                );
                break;
              default:
                this.affectField(`${row.inputName}_id`, row.model.entity.id);
                this.affectField(
                  `${row.inputName}_description`,
                  `${row.model.entity.name}`
                );
                break;
            }
          }
        })
    );
  }

  private setCuriaFunctionsModal() {
    this.curiaFunctionsMenuOptions = [
      this.defaultModalMenu('curia-functions')[0],
    ];

    this.subs.push(
      this.curiaFunctionsStore
        .select(getCuriaFunctionsSelected)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            this.affectField(`${row.inputName}_id`, row.model.id);
            this.affectField(`${row.inputName}_description`, row.model.name);
          }
        })
    );
  }

  private constructFooterMenu() {
    if (this.model?.id && !this.model?.document_id) {
      this.footerOptionsMenu.push({
        name: this.i18nextPipe.transform(
          'translation:action.save_generate_document'
        ),
        value: 'save_generate_document',
        icon: 'save',
      });
    }
  }

  private buildSubTablesColumns() {
    setTimeout(() => {
      this.attachmentsColumns = [
        {
          id: 'delete-btn',
          sortable: false,
          template: this.deleteAttachmentTemplate,
          width: '30px',
        },
        {
          id: 'attachment_name',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.attachment`
          ),
          sortable: false,
          template: this.attachmentTemplate,
        },
        {
          id: 'description',
          title: this.i18nextPipe.transform(
            `${this.modulePath}:model.description`
          ),
          sortable: false,
          template: this.attachmentDescriptionTemplate,
        },
      ];
    });
  }

  private validateAttachments(): boolean {
    let attachmentsValid = true;

    this.form.setControl(
      'curia_ministries_and_order_attachments',
      this.fb.array(this.attachmentsFormArray.value)
    );

    this.form.value.curia_ministries_and_order_attachments
      .filter(
        (obj: CuriaMinistriesAndOrderAttachment) =>
          !obj.hasOwnProperty('_destroy')
      )
      .forEach((obj: CuriaMinistriesAndOrderAttachment) => {
        if (!obj.attachment || !obj.attachment_name) {
          attachmentsValid = false;
        }
      });

    return attachmentsValid;
  }
}
