import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Selector, Store } from '@ngrx/store';
import { SnackBarService } from '@peakitpt/ui-material';
import { I18NextPipe } from 'angular-i18next';
import { Subscription } from 'rxjs';
import { SelectedModalRow } from 'src/app/shared/shared.model';
// import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'kyr-input-select-field',
  templateUrl: './input-select-field.component.html',
})
export class InputSelectFieldComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() name: string;
  @Input() customClass: string;
  @Input() readonly: boolean = false;
  @Input() label: string;
  @Input() form: FormControl;

  @Input() modalParams: any = {};
  @Input() leftTemplateContext: any = {};
  @Input() inputMenuOptions: any = [];
  @Input() modalName: string;
  @Input() inputStore: Store;
  @Input() inputSelector: Selector<any, any>;
  @Input() storeName: string;
  @Input() isQuickInsertion: boolean = false;
  @Input() detailsModule: string;
  private subs: Subscription[] = [];
  @Input() setModalId: Function = (row: any) => {
    return row.model.id;
  }

  @Input() setModalDescription: Function = (row: any) => {
    return row.model.name;
  }
  @Input() setAfectedFields: Function;
  //  = (afectedFieldFunc: Function, row: any) => {

  // }

  @Input() afectFieldId: string;
  @Input() afectFieldDescription: string;
  @Input() required: boolean = false;

  constructor(
    private i18nextPipe: I18NextPipe,
    private snackBarService: SnackBarService,
    // private sharedModule: SharedModule,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() { }

  ngAfterViewInit() {
    this.inputMenuOptions = this.defaultModalMenu(this.storeName);
  }

  ngOnDestroy() {
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }

  setModal() {
    this.subs.push(this.inputStore
        .select(this.inputSelector)
        .subscribe((row: SelectedModalRow) => {
          if (row) {
            console.log(row);
            if (this.setAfectedFields) {
              this.setAfectedFields(row);
            } else {
              if (this.afectFieldId) {
                this.affectField(`${this.afectFieldId}`, this.setModalId(row));
              } else {
                this.affectField(`${row.inputName}_id`, this.setModalId(row));
              }
              if (this.afectFieldDescription) {
                this.affectField(`${this.afectFieldDescription}`, this.setModalDescription(row));
              } else {
                this.affectField(`${row.inputName}_description`, this.setModalDescription(row));
              }
            }
          }

          for (const sub of this.subs) {
            sub.unsubscribe();
          }
        })
    );
  }  

  defaultModalMenu(
    menuIdentifier: string
  ): Array<{ name: string; value: string; icon: string }> {
    const menu = [
      {
        name: this.i18nextPipe.transform('translation:action.clear'),
        value: `clear_modal`,
        icon: 'clear',
      },
      {
        name: this.i18nextPipe.transform('translation:action.view'),
        value: `view_selected`,
        icon: 'preview',
      },
    ];

    if (!this.isQuickInsertion) {
      // Avoids infinite quick insertion
      menu.push({
        name: this.i18nextPipe.transform('translation:action.quick_insertion'),
        value: `quick_insertion`,
        icon: 'add_circle_outline',
      });
    }

    return menu;
  }

  affectField(
    field: string,
    newValue: any,
    message?: string,
    emitEvent = true
  ) {
    this.form.get(field).setValue(newValue, { emitEvent });
    if (message) {
      this.snackBarService.openSnackBar(message, "this.sharedModule.WARN_COLOR");
    }
  }

  async menuClick(event: string, inputName?: string) {
    switch (event) {
      case 'quick_insertion':
        this.setModal();

        this.router.navigate([`quick-insert-${this.modalName}`], { queryParams: { isQuickInsertion: true, modalParamsQI: btoa("{}"), inputNameQI: inputName  }, relativeTo: this.route });
        break;

      case 'clear_modal':
        this.form.get(`${inputName}_id`).setValue(null, { emitEvent: true });
        this.form.get(`${inputName}_description`).setValue(null, { emitEvent: true });
        break;
        
      case 'view_selected':
        const id = this.form.get(`${inputName}_id`).value;
        this.openDetails(this.detailsModule, id);
      default:
        break;
    }
  }

  openDetails(modulePath: string, id: number, railsApp = false) {
    if (railsApp) {
      window.open(`${environment.railsAppUrl}/${modulePath}/${id}`, '_blank');
    } else {
      window.open(`${modulePath}/${id}/details`, '_blank');
    }
  }

  openSelectionModal(
    modalName: string,
    inputName?: string,
    modalTitle = ''
  ) {
    this.setModal();
    this.router.navigate([modalName], {
      queryParams: {
        modalTitle,
        inputName,
        modalParams: btoa(JSON.stringify(this.modalParams)),
        queryStringParams: btoa(JSON.stringify(this.modalParams))
      },
      relativeTo: this.route,
      queryParamsHandling: 'merge',
    });
  }
}