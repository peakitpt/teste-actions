import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import {
  getContent,
  getSelectedContents,
} from '../reducers/contents.selectors';
import * as actions from '../reducers/contents.actions';
import { BaseDeleteComponent } from 'src/app/shared/components/base-delete-component';
import { Content } from '../content.model';

@Component({
  selector: 'kyr-contents-delete',
  templateUrl: './contents-delete.component.html',
})
export class ContentsDeleteComponent
  extends BaseDeleteComponent
  implements OnInit, AfterViewInit, OnDestroy {
  modelList$: Observable<Content[]>;
  modelList: Content[] = [];
  returnUrl = ['/contents'];
  modulePath = 'contents';

  selectorGetModel = getContent;
  selectorGetSelected = getSelectedContents;
  actionRequestFail = actions.ContentsActionTypes.RequestFailContents;
  actionRequestGetAll = actions.RequestGetAllContents;
  actionRequestGetOne = actions.RequestGetContent;
  actionRequestDelete = actions.RequestDeleteContent;
  actionSuccessDelete = actions.ContentsActionTypes.SuccessDeleteContent;
  actionSetSelected = actions.SetSelectedContents;
}
