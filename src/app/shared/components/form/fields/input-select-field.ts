import { TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Selector, Store } from '@ngrx/store';
import { SnackBarService } from '@peakitpt/ui-material';
import { I18NextPipe } from 'angular-i18next';
import { Subscription } from 'rxjs';
import { SelectedModalRow } from 'src/app/shared/shared.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';

export class InputSelectField {
  type: string = 'input-select';
  label: string;
  form: any;
  required: boolean = false;
  name: string;
  router: Router;
  route: ActivatedRoute;
  leftTemplateContext: any;
  readonly: boolean = false;

  protected inputMenuOptions: any;
  subs: Subscription[];
  inputStore: Store;
  inputSelector: Selector<any, any>;
  modalName: string;
  storeName: string;

  i18nextPipe: I18NextPipe;
  isQuickInsertion: boolean = false;
  snackBarService: SnackBarService;
  sharedModule: SharedModule;
  detailsModule: string;
  modalParams: any = {};

  afectFieldId: string;
  afectFieldDescription: string;
  setAfectedFields: Function;

  public constructor(init?:Partial<InputSelectField>) {
    Object.assign(this, init);
    // this.setModal();
  }

  // protected openSelectionModal(
  //   modalName: string,
  //   inputName?: string,
  //   modalParams: any = {},
  //   modalTitle = ''
  // ) {
  //   this.router.navigate([modalName], {
  //     queryParams: {
  //       modalTitle,
  //       inputName,
  //       modalParams: btoa(JSON.stringify(modalParams)),
  //     },
  //     relativeTo: this.route,
  //     queryParamsHandling: 'merge',
  //   });
  // }

  // protected menuClick(event: string, inputName?: string) {
  //   switch (event) {
  //     case 'quick_insertion':
  //       this.router.navigate([`quick-insert-${this.modalName}`], { queryParams: { isQuickInsertion: true, inputNameQI: btoa("{}") }, relativeTo: this.route });
  //       break;

  //     case 'clear_modal':
  //       this.form.get(`${inputName}_id`).setValue(null, { emitEvent: true });
  //       this.form.get(`${inputName}_description`).setValue(null, { emitEvent: true });
  //       break;
        
  //     case 'view_selected':
  //       const id = this.form.get(`${inputName}_id`).value;
  //       this.openDetails(this.detailsModule, id);
  //     default:
  //       break;
  //   }
  // }

  // openDetails(modulePath: string, id: number, railsApp = false) {
  //   if (railsApp) {
  //     window.open(`${environment.railsAppUrl}/${modulePath}/${id}`, '_blank');
  //   } else {
  //     window.open(`${modulePath}/${id}/details`, '_blank');
  //   }
  // }

  // private setModal() {
  //   this.inputMenuOptions = this.defaultModalMenu(this.storeName);

  //   this.subs.push(
  //     this.inputStore
  //       .select(this.inputSelector)
  //       .subscribe((row: SelectedModalRow) => {
  //         if (row) {
  //           this.affectField(`${row.inputName}_id`, this.setModalId(row));
  //           this.affectField(`${row.inputName}_description`, this.setModalDescription(row));
  //         }
  //       })
  //   );
  // }

  setModalId(row: any) {
    return row.model.id;
  }

  setModalDescription(row: any) {
    return row.model.name;
  }

  // protected defaultModalMenu(
  //   menuIdentifier: string
  // ): Array<{ name: string; value: string; icon: string }> {
  //   const menu = [
  //     {
  //       name: this.i18nextPipe.transform('translation:action.clear'),
  //       value: `clear_modal`,
  //       icon: 'clear',
  //     },
  //     {
  //       name: this.i18nextPipe.transform('translation:action.view'),
  //       value: `view_selected`,
  //       icon: 'preview',
  //     },
  //   ];

  //   if (!this.isQuickInsertion) {
  //     // Avoids infinite quick insertion
  //     menu.push({
  //       name: this.i18nextPipe.transform('translation:action.quick_insertion'),
  //       value: `quick_insertion`,
  //       icon: 'add_circle_outline',
  //     });
  //   }

  //   return menu;
  // }

  // protected affectField(
  //   field: string,
  //   newValue: any,
  //   message?: string,
  //   emitEvent = true
  // ) {
  //   this.form.get(field).setValue(newValue, { emitEvent });
  //   if (message) {
  //     this.snackBarService.openSnackBar(message, this.sharedModule.WARN_COLOR);
  //   }
  // }
}