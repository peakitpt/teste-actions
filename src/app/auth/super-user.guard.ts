import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PermissionsService } from '@peakitpt/ui-kyrios-api';
import { SnackBarService } from '@peakitpt/ui-material';
import { I18NextPipe } from 'angular-i18next';
import { SharedModule } from '../shared/shared.module';

@Injectable({ providedIn: 'root' })
export class SuperUserGuard implements CanActivate {
  constructor(
    private router: Router,
    private permissionsService: PermissionsService,
    private sharedModule: SharedModule,
    public snackBarService: SnackBarService,
    public i18nextPipe: I18NextPipe
  ) {}

  async canActivate(): Promise<boolean> {
    return await this.permissionsService
      .getCurrentUserInfo()
      .toPromise()
      .then((r) => {
        let isSuperUser: boolean = false;
        if (r) {
          isSuperUser = this.sharedModule.checkIfEntityType(
            SharedModule.USER_SUPERUSERS,
            r.user.entity
          );
        }
        if (!isSuperUser) {
          this.router.navigate(['']);
          this.snackBarService.openSnackBar(
            this.i18nextPipe.transform(
              `translation:message.no_permissions_module`
            ),
            this.sharedModule.WARN_COLOR,
            3500
          );
        }
        return isSuperUser;
      });
  }
}
