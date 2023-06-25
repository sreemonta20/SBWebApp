import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
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
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
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
    private notifyService: NotificationService
  ) { }
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree
  > {
    
    this.authService.isLoggedIn$.subscribe((response) => {
      this.isLoggedIn = response;
    });
    this.authService.loggedInUser$.subscribe((response) => {
      this.loggedInUser = response;
    });
    
    
    this.isLoggedIn = JSON.parse(
      this.sessionService.get(SessionConstants.IS_LOGGED_IN)
    ) as boolean;
    this.loggedInUser = JSON.parse(
      this.sessionService.get(SessionConstants.LOGGED_IN_USER)
    ) as UserResponse;

    if (this.loggedInUser === null &&
      state.url.includes(AuthRoutesConstants.LOGIN_USER_URL)) {
      this.router.navigateByUrl(AuthRoutesConstants.LOGIN_USER_URL);
    } else if (this.loggedInUser === null &&
      !state.url.includes(AuthRoutesConstants.LOGIN_USER_URL)) {

      this.router.navigate([AuthRoutesConstants.LOGIN_USER_URL], {
        queryParams: { returnUrl: state.url },
      });
    } else {
      if (this.loggedInUser !== null &&
        this.isLoggedIn &&
        !this.tokenHelper.isTokenExpired(this.loggedInUser.access_token) &&
        !state.url.includes(AuthRoutesConstants.LOGIN_USER_URL)) {
        return true;
      } else if (this.loggedInUser !== null &&
        this.isLoggedIn &&
        !this.tokenHelper.isTokenExpired(this.loggedInUser.access_token) &&
        state.url.includes(AuthRoutesConstants.LOGIN_USER_URL)) {
        return false
      }else {
        
        this.refreshTokenReq.Access_Token = this.loggedInUser.access_token;
        this.refreshTokenReq.Refresh_Token = this.loggedInUser.refresh_token;

        if (
          !this.refreshTokenReq.Access_Token ||
          !this.refreshTokenReq.Refresh_Token
        ) {
          return false;
        }

        this.userService
          .refreshToken(this.refreshTokenReq)
          .subscribe((response) => {
            console.log(response);
            if (response.ResponseCode === 200) {
              
              this.isLoggedIn = true;
              this.loggedInUser = response.Result;
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
              return true;
            } else {
              
              this.isLoading = false;
              this.userService
                .revoke(this.loggedInUser.access_token)
                .subscribe({
                  next: (response: DataResponse) => {
                    if (response.ResponseCode === 200) {
                      this.notifyService.showWarning(
                        response.Message,
                        MessageConstants.GENERAL_WARNING_TITLE
                      );
                      return false;
                    } else {
                      return false;
                    }
                  },
                  error: (error) => {
                    return false;
                  },
                });
            }
          });
      }
    }

  }

  async renewToken() {
    
    const loggedUser = JSON.parse(this.sessionService.get('loggedInUser'));
    this.refreshTokenReq.Access_Token = loggedUser.access_token;
    this.refreshTokenReq.Refresh_Token = loggedUser.refresh_token;
    if (
      !this.refreshTokenReq.Access_Token ||
      !this.refreshTokenReq.Refresh_Token
    ) {
      return false;
    }
    try {
      const result = await this.userService.renewToken(this.refreshTokenReq);
      if (result.ResponseCode === 200) {
        
        this.isLoggedIn = true;
        this.loggedInUser = result.Result;
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
        return true;
      } else {
        
        this.isLoading = false;
        this.userService.revoke(this.loggedInUser.access_token).subscribe({
          next: (response: DataResponse) => {
            if (response.ResponseCode === 200) {
              this.notifyService.showWarning(
                response.Message,
                MessageConstants.GENERAL_WARNING_TITLE
              );
              return false;
            } else {
              return false;
            }
          },
          error: (error) => {
            return false;
          },
        });
      }
    } catch (error) {
      return false;
    }
  }

  tryRefreshToken() {
    const loggedUser = JSON.parse(this.sessionService.get('loggedInUser'));
    this.refreshTokenReq.Access_Token = loggedUser.access_token;
    this.refreshTokenReq.Refresh_Token = loggedUser.refresh_token;

    if (
      !this.refreshTokenReq.Access_Token ||
      !this.refreshTokenReq.Refresh_Token
    ) {
      return false;
    }

    this.userService
      .refreshToken(this.refreshTokenReq)
      .subscribe((response) => {
        console.log(response);
        if (response.ResponseCode === 200) {
          
          this.isLoggedIn = true;
          this.loggedInUser = response.Result;
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
          return true;
        } else {
          
          this.isLoading = false;
          this.userService.revoke(this.loggedInUser.access_token).subscribe({
            next: (response: DataResponse) => {
              if (response.ResponseCode === 200) {
                this.notifyService.showWarning(
                  response.Message,
                  MessageConstants.GENERAL_WARNING_TITLE
                );
                return false;
              } else {
                return false;
              }
            },
            error: (error) => {
              return false;
            },
          });
        }
      });
  }
}
