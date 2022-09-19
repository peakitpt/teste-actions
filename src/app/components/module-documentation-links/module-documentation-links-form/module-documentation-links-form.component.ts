import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';

import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as actions from '../reducers/module-documentation-links.actions';
import { getModuleDocumentationLink } from '../reducers/module-documentation-links.selectors';
import { BaseFormComponent } from 'src/app/shared/components/base-form-component';
import { ModuleDocumentationLink } from '../module-documentation-link.model';

@Component({
  selector: 'kyr-module-documentation-links-form',
  templateUrl: './module-documentation-links-form.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ModuleDocumentationLinksFormComponent
  extends BaseFormComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  model$: Observable<ModuleDocumentationLink>;
  modulePath = 'module-documentation-links';
  preFillWithNew = true;

  selectorGetModel = getModuleDocumentationLink;
  actionRequestFail = actions.ModuleDocumentationLinksActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestPut = actions.RequestPut;
  actionSuccessPut = actions.ModuleDocumentationLinksActionTypes.SuccessPut;
  actionRequestPost = actions.RequestPost;
  actionSuccessPost = actions.ModuleDocumentationLinksActionTypes.SuccessPost;
  actionRequestGetNew = actions.RequestGetNew;

  origin: string = window.location.origin;

  initializeForm() {
    this.form = this.fb.group({
      active: [null],
      documentation_url: [null],
      id: [null],
      resource: [null, Validators.required],
    });
  }
}
