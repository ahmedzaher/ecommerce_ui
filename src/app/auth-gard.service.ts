import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGardService implements CanActivate  {

  constructor(
    private auth: AuthenticationService, 
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requestedUrl = route.url[0].path;
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['authenticate'], {queryParams: {'redirect-url': requestedUrl}});
      return false;
    }
    return true;
  }
}
