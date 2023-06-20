import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {
  SessionStorageService,
  AuthService,
  SharedService
} from '@app/core/services';
import {
  AuthRoutesConstants,
  MessageConstants,
  SessionConstants,
} from '@app/core/constants';
import { DataResponse, User, UserResponse } from '@app/core/class';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  dataResponse: DataResponse = new DataResponse();
  user: User = new User();
  public jwtHelper: JwtHelperService = new JwtHelperService();
  public loggedInUser: UserResponse = new UserResponse();
  constructor(
    private datePipe: DatePipe,
    public router: Router,
    private authService: AuthService,
    private sharedService: SharedService,
    private sessionService: SessionStorageService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(
      (isLoggedIn) => (this.isLoggedIn = isLoggedIn)
    );
    
    this.authService.loggedInUser$.subscribe({
      next: (response: UserResponse) => {
        this.user = response.user;
      },
    });
  }

  isUserAuthenticated() {
    this.loggedInUser = JSON.parse(
      this.sessionService.get(SessionConstants.LOGGED_IN_USER)
    ) as UserResponse;
    this.user = this.loggedInUser.user;
    const token: string | null = this.loggedInUser.access_token;
    const tokenPayload = jwt_decode(token) as any;
    const expirationTimestamp = tokenPayload.exp;
    const currentTimestamp = new Date().getTime() / 1000; // Convert to seconds
    if (token && !this.sharedService.IsExpired(expirationTimestamp,currentTimestamp)) {
      return true;
    } else {
      return false;
    }
  }

  signOut(): void {
    this.sessionService.remove('loggedInUser');
    this.sessionService.remove('isLoggedIn');
    this.authService.UpdateIsLoggedIn(false);
    this.router.navigate([AuthRoutesConstants.LOGIN_USER_URL]);
  }
}
