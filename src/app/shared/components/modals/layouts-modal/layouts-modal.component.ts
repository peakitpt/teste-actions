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
import {
  BaseModalListComponent,
  ListResponse,
} from '../base-modal-list-component';

import { getError, getLayouts } from './reducers/layouts-modal.selectors';
import * as actions from './reducers/layouts-modal.actions';
import { LayoutsResponse } from './layouts-modal.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { I18NextPipe } from 'angular-i18next';
import { FormBuilder } from '@angular/forms';
import { SnackBarService } from '@peakitpt/ui-material';
import { SubscriptionLayoutsService } from '@peakitpt/ui-kyrios-api';

@Component({
  selector: 'kyr-layouts-modal',
  templateUrl: './layouts-modal.component.html',
  styleUrls: ['../modal-list-styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutsModalComponent
  extends BaseModalListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modulePath = 'layouts';
  modelList$: Observable<LayoutsResponse>;

  selectorGetList = getLayouts;
  actionRequestGetAll = actions.RequestGetAll;
  selectorGetError = getError;
  actionRequestFail = actions.RequestFail;
  actionRequestSetSelected = actions.RequestSetSelected;

  @ViewChild('nameTemplate') nameTemplate: TemplateRef<any>;
  @ViewChild('validatedTemplate') validatedTemplate: TemplateRef<any>;

  subscriptionLayouts = [];

  constructor(
    public store: Store<any>,
    public router: Router,
    public route: ActivatedRoute,
    public i18nextPipe: I18NextPipe,
    public fb: FormBuilder,
    public snackBarService: SnackBarService,
    private subscriptionLayoutsService: SubscriptionLayoutsService
  ) {
    super(store, router, route, i18nextPipe, fb, snackBarService);
  }

  ngAfterViewInit() {
    this.tableColumns = this.setTableColumns();
    this.modal.open();
    this.subs.push(
      this.modal.modalClosed.subscribe(() => this.redirectToParentPage())
    );
    // We have to make sure this subscription has layout before going to get them
    this.checkSubscriptionsLayout();
  }

  setTableColumns(): any[] {
    return [
      {
        id: 'name',
        title: this.i18nextPipe.transform(`${this.modulePath}:model.name`),
        template: this.nameTemplate,
      },
    ];
  }

  buildForm() {
    this.form = this.fb.group({
      searchWord: [],
      searchFields: this.fb.group({
        filterName: this.fb.group({
          searchWordLabel: this.i18nextPipe.transform(
            `${this.modulePath}:model.name`
          ),
          value: null,
          mainField: true,
        }),
      }),
    });
  }

  checkSubscriptionsLayout() {
    this.subs.push(
      this.subscriptionLayoutsService.getAll().subscribe((r) => {
        if (r.results.length === 0) {
          this.snackBarService.openSnackBar(
            this.i18nextPipe.transform(
              `${this.modulePath}:message.no_subscription_layouts`
            )
          );
        } else {
          this.subscriptionLayouts = r.results;
          // If it has layouts get only the available ones
          this.getModelList();
        }
      })
    );
  }

  getModelList() {
    this.subs.push(
      this.modelList$.subscribe((response: ListResponse) => {
        this.total = response.total;
        // This is a messy way to do this, but this is an emergency
        // In the future the api needs to have an endpoint that only returns
        // the layouts available for that subscription
        this.dataSource.data = this.selectAvailableLayouts(response.results);
        this.isLoading = false;
      })
    );
  }

  selectAvailableLayouts(layouts = []) {
    const allLayouts = this.subscriptionLayouts;
    const res = [];

    layouts.forEach((layout) => {
      let addLayout = false;
      allLayouts.forEach((subLayout) => {
        if (layout.id === subLayout.layout.id) {
          addLayout = true;
        }
      });
      if (addLayout) {
        res.push(layout);
      }
    });

    return res;
  }
}
