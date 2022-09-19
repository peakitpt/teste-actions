import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  CuriaWedding,
  CuriaWeddingsAttachment,
} from '../../curia-wedding.model';

@Component({
  selector: 'kyr-curia-weddings-details-attachments-tab',
  templateUrl: './curia-weddings-details-attachments-tab.component.html',
})
export class CuriaWeddingsDetailsAttachmentsTabComponent {
  @Input() modulePath: string;
  @Input() model: CuriaWedding;

  getAttachmentUrl(attachment: CuriaWeddingsAttachment): string {
    if (attachment.attachment && attachment.attachment_name) {
      return `${environment.railsAppUrl}/filemanagers/download?f=${attachment.attachment}&fn=${attachment.attachment_name}`;
    }
    return '';
  }
}
