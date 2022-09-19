import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getModuleDocumentationLink,
  getSelectedModuleDocumentationLinks,
} from '../reducers/module-documentation-links.selectors';
import * as actions from '../reducers/module-documentation-links.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { ModuleDocumentationLink } from '../module-documentation-link.model';

@Component({
  selector: 'kyr-module-documentation-links-delete',
  templateUrl: './module-documentation-links-delete.component.html',
})
export class ModuleDocumentationLinksDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  modelList$: Observable<ModuleDocumentationLink[]>;
  modelList: ModuleDocumentationLink[] = [];
  returnUrl = ['/module-documentation-links'];
  modulePath = 'module-documentation-links';

  selectorGetModel = getModuleDocumentationLink;
  selectorGetSelected = getSelectedModuleDocumentationLinks;
  actionRequestFail = actions.ModuleDocumentationLinksActionTypes.RequestFail;
  actionRequestGetAll = actions.RequestGetAll;
  actionRequestGetOne = actions.RequestGet;
  actionRequestDelete = actions.RequestDelete;
  actionSuccessDelete =
    actions.ModuleDocumentationLinksActionTypes.SuccessDelete;
  actionSetSelected = actions.SetSelected;
}
