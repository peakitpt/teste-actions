import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Baptism, BaptismsAttachment } from '../../baptism.model';

@Component({
  selector: 'kyr-baptisms-details-attachments-tab',
  templateUrl: './baptisms-details-attachments-tab.component.html',
})
export class BaptismsDetailsAttachmentsTabComponent {
  @Input() modulePath: string;
  @Input() model: Baptism;

  getAttachmentUrl(attachment: BaptismsAttachment): string {
    if (attachment.attachment && attachment.attachment_name) {
      return `${environment.railsAppUrl}/filemanagers/download?f=${attachment.attachment}&fn=${attachment.attachment_name}`;
    }
    return '';
  }
}
