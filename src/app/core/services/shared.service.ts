import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { SessionStorageService } from '../services/session.service';
import { SessionConstants,AuthRoutesConstants } from '../constants/common.constants';
import { AuthService } from '../services/auth.service';
import {User, UserResponse, DataResponse} from '@app/core/class'
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
    this.authService.UpdateIsLoggedIn(false);
    this.authService.UpdateLoggedInUser(null);
    this.router.navigate([AuthRoutesConstants.LOGIN_USER_URL]);
  }
}
