import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRoutesConstants, SessionConstants } from '../constants/common.constants';
import { AuthService } from '../services/auth.service';
import { SessionStorageService } from '../services/session.service';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private authService: AuthService,private sessionService:SessionStorageService,private router: Router) {}


  public IsExpired(sourceTime: any, currentTime){
    return sourceTime < currentTime;
  }

  public RevokeSession(){
    this.sessionService.remove(SessionConstants.LOGGED_IN_USER);
    this.sessionService.remove(SessionConstants.IS_LOGGED_IN);
    this.sessionService.remove(SessionConstants.USER_MENU);
    this.authService.UpdateIsLoggedIn(false);
    this.authService.UpdateLoggedInUser(null);
    this.authService.UpdateUserMenus(null);
    this.router.navigate([AuthRoutesConstants.LOGIN_USER_URL]);
  }
}
