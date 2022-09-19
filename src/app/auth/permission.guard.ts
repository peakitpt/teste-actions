import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { PermissionsService } from '@peakitpt/ui-kyrios-api';

@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {
  constructor(
    private router: Router,
    private permissionsService: PermissionsService
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const viewName = route.data.view as string;
    const userId = localStorage.getItem('userId');

    return await this.permissionsService
      .checkUserPermission(userId, viewName)
      .toPromise()
      .then((r) => {
        if (r.has_module_permission) {
          return r.has_module_permission;
        } else {
          this.router.navigate(['']);
          return false;
        }
      });
  }
}
