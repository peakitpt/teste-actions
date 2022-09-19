import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Wedding, WeddingsAttachment } from '../../wedding.model';

@Component({
  selector: 'kyr-weddings-details-attachments-tab',
  templateUrl: './weddings-details-attachments-tab.component.html',
})
export class WeddingsDetailsAttachmentsTabComponent {
  @Input() modulePath: string;
  @Input() model: Wedding;

  getAttachmentUrl(attachment: WeddingsAttachment): string {
    if (attachment.attachment && attachment.attachment_name) {
      return `${environment.railsAppUrl}/filemanagers/download?f=${attachment.attachment}&fn=${attachment.attachment_name}`;
    }
    return '';
  }
}
