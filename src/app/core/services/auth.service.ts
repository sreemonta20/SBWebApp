import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { SessionStorageService } from '../services/session.service';
import {
  SessionConstants,
  AuthRoutesConstants,
} from '../constants/common.constants';
import { User, UserResponse, DataResponse } from '@app/core/class';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // dataResponse = new DataResponse();
  constructor(
    private sessionService: SessionStorageService,
    private router: Router
  ) {}
  // private loggedInUser = new BehaviorSubject<DataResponse>(this.dataResponse);
  // castLoggedInUser = this.loggedInUser.asObservable();
  // private isLoggedIn = new BehaviorSubject<boolean>(false);
  // castLoggedIn = this.isLoggedIn.asObservable();

  // UpdateIsLoggedIn(newIsLoggedInValue: boolean) {
  //   this.isLoggedIn.next(newIsLoggedInValue);
  // }

  // UpdateLoggedInUser(dataRes: DataResponse){
  //   this.loggedInUser.next(dataRes);
  // }

  // getLoggedInUser(): DataResponse{
  //   return this.loggedInUser.value;
  // }

  // isUserLoggedIn(): boolean {
  //   return this.isLoggedIn.value;
  // }
  private loggedInUser = new BehaviorSubject<UserResponse>(new UserResponse());
  public loggedInUser$: Observable<UserResponse> =
    this.loggedInUser.asObservable();
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public isLoggedIn$: Observable<boolean> = this.isLoggedIn.asObservable();

  UpdateLoggedInUser(userResponse: UserResponse) {
    this.loggedInUser.next(userResponse);
  }

  UpdateIsLoggedIn(newIsLoggedInValue: boolean) {
    this.isLoggedIn.next(newIsLoggedInValue);
  }

  logout() {
    this.sessionService.remove(SessionConstants.LOGGED_IN_USER);
    this.sessionService.remove(SessionConstants.IS_LOGGED_IN);
    this.router.navigateByUrl(AuthRoutesConstants.LOGIN_USER_URL);
    this.isLoggedIn.next(false);
  }
}
