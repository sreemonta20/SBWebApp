import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { SessionStorageService } from '../services/session.service';
import { SessionConstants,AuthRoutesConstants } from '../constants/common.constants';
import {User, DataResponse} from '@app/core/class'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  dataResponse = new DataResponse();
  constructor(private sessionService:SessionStorageService,private router: Router,) {

  }
  private loggedInUser = new BehaviorSubject<DataResponse>(this.dataResponse);
  castLoggedInUser = this.loggedInUser.asObservable();
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  castLoggedIn = this.isLoggedIn.asObservable();

  editIsLoggedIn(newIsLoggedInValue: boolean) {
    this.isLoggedIn.next(newIsLoggedInValue);
  }

  editLoggedInUser(dataRes: DataResponse){
    this.loggedInUser.next(dataRes);
  }

  getLoggedInUser(): DataResponse{
    return this.loggedInUser.value;
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedIn.value;
  }

  logout() {
    // remove user from session storage to log user out
    this.sessionService.remove(SessionConstants.LOGGED_IN_USER);
    this.sessionService.remove(SessionConstants.IS_LOGGED_IN);
    this.router.navigateByUrl(AuthRoutesConstants.LOGIN_USER_URL);
    this.isLoggedIn.next(false);
  }

}
