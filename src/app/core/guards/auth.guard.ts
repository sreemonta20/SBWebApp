import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { AuthRoutesConstants } from '../constants/common.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: AuthService, private toastr: ToastrService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      debugger
    
    if (this.authService.isUserLoggedIn()) {
      return true;
    }else{
      if(!state.url.includes(AuthRoutesConstants.LOGIN_USER_URL)){
        this.router.navigate([AuthRoutesConstants.LOGIN_USER_URL], { queryParams: { returnUrl: state.url } });
      }else{
        this.router.navigateByUrl(AuthRoutesConstants.LOGIN_USER_URL);
      }
      return false;
    }
  }
}