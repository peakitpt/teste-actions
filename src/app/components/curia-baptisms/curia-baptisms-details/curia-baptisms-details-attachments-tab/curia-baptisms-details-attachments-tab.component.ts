import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  CuriaBaptism,
  CuriaBaptismsAttachment,
} from '../../curia-baptism.model';

@Component({
  selector: 'kyr-curia-baptisms-details-attachments-tab',
  templateUrl: './curia-baptisms-details-attachments-tab.component.html',
})
export class CuriaBaptismsDetailsAttachmentsTabComponent {
  @Input() modulePath: string;
  @Input() model: CuriaBaptism;

  getAttachmentUrl(attachment: CuriaBaptismsAttachment): string {
    if (attachment.attachment && attachment.attachment_name) {
      return `${environment.railsAppUrl}/filemanagers/download?f=${attachment.attachment}&fn=${attachment.attachment_name}`;
    }
    return '';
  }
}
