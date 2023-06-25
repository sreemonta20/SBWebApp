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
  private loggedInUser = new BehaviorSubject<UserResponse>(new UserResponse());
  public loggedInUser$: Observable<UserResponse> = this.loggedInUser.asObservable();
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedIn.asObservable();
  constructor(
    private sessionService: SessionStorageService,
    private router: Router
  ) {}
  
  

  UpdateLoggedInUser(userResponse: UserResponse) {
    this.loggedInUser.next(userResponse);
  }

  UpdateIsLoggedIn(newIsLoggedInValue: boolean) {
    this.isLoggedIn.next(newIsLoggedInValue);
  }

  GetLoggedInUser(): UserResponse{
    return this.loggedInUser.value;
  }

  GetIsUserLoggedIn(): boolean {
    return this.isLoggedIn.value;
  }
}
