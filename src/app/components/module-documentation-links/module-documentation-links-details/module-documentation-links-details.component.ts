import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
} from '@angular/core';
import * as actions from '../reducers/module-documentation-links.actions';
import { getModuleDocumentationLink } from '../reducers/module-documentation-links.selectors';
import { Observable } from 'rxjs';
import { ModuleDocumentationLink } from '../module-documentation-link.model';
import { BaseDetailsComponent } from 'src/app/shared/components/base-details-component';

@Component({
  selector: 'kyr-module-documentation-links-details',
  templateUrl: './module-documentation-links-details.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ModuleDocumentationLinksDetailsComponent
  extends BaseDetailsComponent
  implements OnInit, AfterViewInit
{
  model$: Observable<ModuleDocumentationLink>;
  returnUrl = '/module-documentation-links';
  modulePath = 'module-documentation-links';
  viewName = 'ModuleDocumentationLink';

  selectorGetModel = getModuleDocumentationLink;
  actionRequestFail = actions.ModuleDocumentationLinksActionTypes.RequestFail;
  actionRequestGetOne = actions.RequestGet;

  origin: string = window.location.origin;
}
