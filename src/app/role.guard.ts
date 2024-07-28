import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const expectedRole = next.data['expectedRole'];
    if (this.authService.isAuthenticated() && this.authService.hasRole(expectedRole)) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
