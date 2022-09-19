import { OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { DialogComponent, SnackBarService } from '@peakitpt/ui-material';
import { Store, Selector, ActionsSubject } from '@ngrx/store';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { I18NextPipe } from 'angular-i18next';
import { ofType } from '@ngrx/effects';
import { RequestError } from 'src/app/shared/reducers/error-handling.service';
import { environment } from 'src/environments/environment';
import { SharedModule } from '../shared.module';

export class BaseDeleteComponent implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<any[]>;
  modelList: any[] = [];
  modulePath: string;
  returnUrl: string[] = [];
  subs: Subscription[] = [];
  isLoading = true;
  isSaving = false;

  // Selectors & actions
  selectorGetModel: Selector<any, any>;
  selectorGetSelected: Selector<any, any[]>;
  actionRequestFail: any;
  actionRequestGetAll: any;
  actionRequestGetOne: any;
  actionRequestDelete: any;
  actionSuccessDelete: any;
  // Selectors & actions END

  @ViewChild('modal') modal: DialogComponent;

  constructor(
    public store: Store<any>,
    public router: Router,
    public route: ActivatedRoute,
    public matDialog: MatDialog,
    public i18nextPipe: I18NextPipe,
    public snackBarService: SnackBarService,
    public actionSubject: ActionsSubject,
    public sharedModule: SharedModule
  ) {}

  ngOnInit() {
    this.isLoading = true;

    this.subs.push(
      // Get the parent URL so we can return to it after closing the modal and access the Item ID
      this.route.parent.paramMap.subscribe((parentParams: any) => {
        if (Object.keys(parentParams.params).includes('id')) {
          // Set the returnUrl from parent URL
          this.constructReturlUrl(parentParams);

          // Get the Item to delete
          this.store.dispatch(
            new this.actionRequestGetOne(+parentParams.params.id)
          );
          this.subs.push(
            this.store.select(this.selectorGetModel).subscribe((obj: any) => {
              if (obj) {
                this.modelList = [obj];
                this.isLoading = false;
              }
            })
          );
        } else {
          // Get the list's selected objects to delete
          this.modelList$ = this.store.select(this.selectorGetSelected);
          this.subs.push(
            this.modelList$.subscribe((modelList: any[]) => {
              this.modelList = modelList;
              if (modelList && modelList.length) {
                this.isLoading = false;
              }
            })
          );
        }
      })
    );
  }

  constructReturlUrl(parentParams: any) {
    this.returnUrl.push(parentParams.params.id);
    this.route.parent.snapshot.url.forEach((urlSegment: UrlSegment) => {
      this.appendToReturnUrl(urlSegment);
    });
  }

  appendToReturnUrl(urlSegment: UrlSegment) {
    if (urlSegment.path === 'edit') {
      this.returnUrl.push('edit');
    }
    if (urlSegment.path === 'details') {
      this.returnUrl.push('details');
    }
  }

  ngAfterViewInit() {
    this.subscribeForDeleteAction();
    this.modal.open();
  }

  ngOnDestroy() {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
    this.modal.close();
  }

  subscribeForDeleteAction() {
    // Subscribe for creating/updating actions
    this.subs.push(
      this.actionSubject
        .pipe(ofType(this.actionRequestFail, this.actionSuccessDelete))
        .subscribe((result: any) => {
          this.isSaving = false;
          if (result.payload instanceof RequestError) {
            this.isSaving = false;
            let errorMessage = this.i18nextPipe.transform(
              'translation:message.error_401',
              {
                appName: environment.appName,
              }
            );

            if (
              result.payload.error.status === 401 &&
              'message' in result.payload.error
            ) {
              errorMessage = result.payload.error.error.message;
            }

            this.snackBarService.openSnackBar(
              errorMessage,
              this.sharedModule.ERROR_COLOR
            );
          } else {
            this.onDeleteSuccess();
          }
        })
    );
  }

  onDeleteSuccess(
    closeAll = true,
    deleteSuccessMsg = `${this.modulePath}:message.delete_success`
  ) {
    this.isLoading = true;
    this.isSaving = false;

    this.snackBarService.openSnackBar(
      this.i18nextPipe.transform(deleteSuccessMsg),
      this.sharedModule.SUCCESS_COLOR
    );

    this.returnUrl = [this.modulePath];
    closeAll ? this.matDialog.closeAll() : this.modalClose();
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  modalClose() {
    this.router.navigate(this.returnUrl);
  }

  delete() {
    this.isSaving = true;

    const ids = this.modelList.map((obj: any) => obj.id);
    ids.forEach((id: number) => {
      this.store.dispatch(new this.actionRequestDelete(id));
    });
  }
}
