import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivate,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { SharedService } from '../services/shared.service';

import { map } from 'rxjs/operators';
import {
  AuthRoutesConstants,
  MessageConstants,
  SessionConstants,
} from '../constants/common.constants';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  RefreshTokenRequest,
  UserResponse,
  DataResponse,
} from '@app/core/class/index';
import { SessionStorageService } from '../services/session.service';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';

import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { securityApiUrl } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  public jwtHelper: JwtHelperService = new JwtHelperService();
  public isLoggedIn: boolean = false;
  public isRefreshSuccess: boolean = false;
  public loggedInUser: UserResponse = new UserResponse();
  public refreshTokenReq: RefreshTokenRequest = new RefreshTokenRequest();
  public error_message: string = '';
  public isLoading = false;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private tokenHelper: JwtHelperService,
    private sessionService: SessionStorageService,
    private userService: UserService,
    private notifyService: NotificationService,
    private http: HttpClient,
    private sharedService: SharedService
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.loggedInUser = JSON.parse(this.sessionService.get(SessionConstants.LOGGED_IN_USER)) as UserResponse;

    if (this.loggedInUser) {
      const token = this.loggedInUser.access_token;
      const tokenPayload = jwt_decode(token) as any;
      const expirationTimestamp = tokenPayload.exp;
      const currentTimestamp = new Date().getTime() / 1000; // Convert to seconds

      if (token &&
        !this.sharedService.IsExpired(expirationTimestamp, currentTimestamp) &&
        !state.url.includes(AuthRoutesConstants.LOGIN_USER_URL)) {
        return true;
      }else if (token &&
        !this.sharedService.IsExpired(expirationTimestamp, currentTimestamp) &&
        state.url.includes(AuthRoutesConstants.LOGIN_USER_URL)) {
        return false;
      }

      
      this.refreshTokenReq.Access_Token = token;
      this.refreshTokenReq.Refresh_Token = this.loggedInUser.refresh_token;
      //const isRefreshSuccess = await this.refreshingTokens(this.refreshTokenReq);
      const isRefreshSuccess = await this.renewToken(this.refreshTokenReq);
      if (!isRefreshSuccess) {
        this.router.navigate([AuthRoutesConstants.LOGIN_USER_URL]);
      }
      return isRefreshSuccess;

    } else if (!state.url.includes(AuthRoutesConstants.LOGIN_USER_URL)) {
      this.router.navigate([AuthRoutesConstants.LOGIN_USER_URL], { queryParams: { returnUrl: state.url },});
      
    }else if(state.url.includes(AuthRoutesConstants.LOGIN_USER_URL)){
      return true;
    }
  }

  private async refreshingTokens(tokenModel: any): Promise<boolean> {
    if (!tokenModel.Access_Token || !tokenModel.Refresh_Token) {
      return false;
    }

    let isRefreshSuccess: boolean;
    try {
      const response = await lastValueFrom(
        this.http.post(securityApiUrl + '/api/User/refreshtoken', tokenModel)
      );
      debugger;
      const dataResponse = <DataResponse>response;

      if (dataResponse.ResponseCode === 200) {
        this.isLoggedIn = true;
        this.loggedInUser = dataResponse.Result;
        this.sessionService.set(
          SessionConstants.LOGGED_IN_USER,
          JSON.stringify(this.loggedInUser)
        );
        this.sessionService.set(
          SessionConstants.IS_LOGGED_IN,
          JSON.stringify(this.isLoggedIn)
        );

        this.authService.UpdateIsLoggedIn(this.isLoggedIn);
        this.authService.UpdateLoggedInUser(this.loggedInUser);
        isRefreshSuccess = true;
      }else if(dataResponse.ResponseCode === 401){

      }
    } catch (ex) {
      isRefreshSuccess = false;
    }
    return isRefreshSuccess;
  }

  private async renewToken(tokenModel: RefreshTokenRequest):Promise<boolean>{
    if (!tokenModel.Access_Token || !tokenModel.Refresh_Token) {
      return false;
    }
    let isRefreshSuccess: boolean;
    try {
      debugger
      const dataResponse = await this.userService.renewToken<DataResponse>(tokenModel);
      debugger;
      // const dataResponse = <DataResponse>response;

      if (dataResponse.ResponseCode === 200) {
        this.isLoggedIn = true;
        this.loggedInUser = dataResponse.Result;
        this.sessionService.set(
          SessionConstants.LOGGED_IN_USER,
          JSON.stringify(this.loggedInUser)
        );
        this.sessionService.set(
          SessionConstants.IS_LOGGED_IN,
          JSON.stringify(this.isLoggedIn)
        );

        this.authService.UpdateIsLoggedIn(this.isLoggedIn);
        this.authService.UpdateLoggedInUser(this.loggedInUser);
        isRefreshSuccess = true;
      }else if(dataResponse.ResponseCode === 401){

      }
    } catch (ex) {
      isRefreshSuccess = false;
    }
    return isRefreshSuccess;
  }
}
