import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  TemplateRef,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { BaseModalListComponent } from '../base-modal-list-component';

import {
  getParishioners,
  getError,
} from './reducers/parishioners-modal.selectors';
import * as actions from './reducers/parishioners-modal.actions';
import { ParishionersResponse } from './parishioners-modal.model';
import { ParishionersService } from '@peakitpt/ui-kyrios-api';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { FormBuilder } from '@angular/forms';
import { SnackBarService } from '@peakitpt/ui-material';

@Component({
  selector: 'kyr-parishioners-modal',
  templateUrl: './parishioners-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ParishionersModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'parishioners';
  modelList$: Observable<ParishionersResponse>;

  selectorGetList = getParishioners;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionRequestSetSelected = actions.RequestSetSelected;

  queryStringParams: any = {
    modal: true,
    except_users: true,
    entity_type: null,
    documents: null,
    format: 'json',
  };
  hasBirthDate: boolean = false;
  @ViewChild('birthDateTemplate')
  birthDateTemplate: TemplateRef<any>;

  entityEkklesiaLocationOptions = [];

  constructor(
    public store: Store<any>,
    public router: Router,
    public route: ActivatedRoute,
    public i18nextPipe: I18NextPipe,
    public fb: FormBuilder,
    public snackBarService: SnackBarService,
    private parishionerService: ParishionersService
  ) {
    super(store, router, route, i18nextPipe, fb, snackBarService);
  }

  ngAfterViewInit() {
    this.setEntityEkklesiaLocationOptions();
    super.ngAfterViewInit();
  }

  setTableColumns(): any[] {
    const columns = [
      {
        id: 'name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.name`),
      },
      {
        id: 'id',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.id`),
      },
      {
        id: 'entity_type__name',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity_type__name`
        ),
        template: null,
      },
      {
        id: 'taxpayer',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.taxpayer`),
      },
      {
        id: 'address',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.address`),
      },
      {
        id: 'complete_relation',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.complete_relation`
        ),
      },
    ];

    if (
      ['persons_name_place_birth_date'].includes(
        this.queryStringParams['serialize']
      )
    ) {
      columns.push({
        id: 'entity__birth_date',
        title: this.i18nextPipe.transform(
          `${this.modulePath}:model.entity__birth_date`
        ),
        template: this.birthDateTemplate,
      });

      this.hasBirthDate = true;
    }

    return columns;
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        name: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.name`
          ),
          value: null,
        }),
        id: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.id`
          ),
          value: null,
        }),
        complete_relation: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.complete_relation`
          ),
          value: null,
          mainField: true,
        }),
        address: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.address`
          ),
          value: null,
        }),
        taxpayer: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.taxpayer`
          ),
          value: null,
        }),
        diocese_id: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.diocese_id`
          ),
          value: null,
        }),
        birth_date_start: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.birth_date_start`
          ),
          value: null,
        }),
        birth_date_end: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.birth_date_end`
          ),
          value: null,
        }),
      }),
    });
  }

  setEntityEkklesiaLocationOptions() {
    this.entityEkklesiaLocationOptions = [
      {
        label: '',
        value: null,
      },
    ];
    this.subs.push(
      this.parishionerService.getBishoprics().subscribe((r) => {
        this.entityEkklesiaLocationOptions =
          this.entityEkklesiaLocationOptions.concat(r);
      })
    );
  }
}
