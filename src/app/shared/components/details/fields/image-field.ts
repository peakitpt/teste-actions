import { VisibleField } from './visible-field';
import { EnvironmentImpl } from 'src/environments/environment';
import { environment } from 'src/environments/environment';

export class ImageField extends VisibleField {
  label: string;
  type: string = 'image';
  model: any;

  public constructor(init?: Partial<ImageField>) {
    super();
    Object.assign(this, init);
  }

  getUploadFileLink(path: string): string {
    return this._getUploadFileLink(environment, path);
  }

  _getUploadFileLink(environment: EnvironmentImpl, path: string): string {
    if (!path) {
      return 'assets/image-placeholder-350x350.png';
    } else if (path.startsWith('/files') || path.startsWith('/uploads')) {
      return `${environment.railsAppUrl}${path}`;
    } else if (path.startsWith('/var/www')) {
      return `${environment.railsAppUrl}${path.split('public')[1]}`;
    } else if (path.startsWith('/filemanagers')) {
      try {
        return this._getUploadFileLink(
          environment,
          atob(path.split('?f=')[1].split('&fn=')[0])
        );
      } catch {
        return this._getUploadFileLink(
          environment,
          `${path.split('?f=')[1].split('&fn=')[0]}`
        );
      }
    } else if (path.startsWith("/app/public/uploads/RackMultipart")) {
      return `${environment.railsAppUrl}${path.split('public')[1]}`;
    }  else if (path.startsWith('public/uploads/tmp/')) {
      return `${environment.apiUploaderUrl}${path.split('uploads')[1]}`;
    } else {
      return `${environment.apiUploaderUrl}/${path}`;
    }
  }
}
