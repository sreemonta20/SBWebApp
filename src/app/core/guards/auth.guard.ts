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
  //public isRefreshSuccess: boolean = false;
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
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.authService.isLoggedIn$.subscribe(
      (response) => (this.isLoggedIn = response)
    );
    this.authService.loggedInUser$.subscribe(
      (response) => (this.loggedInUser = response)
    );

    const loggedUser = JSON.parse(this.sessionService.get('loggedInUser'));
    debugger
    if (
      this.loggedInUser.access_token &&
      this.isLoggedIn &&
      !this.tokenHelper.isTokenExpired(this.loggedInUser.access_token)
    ) {
      return true;
    }
    debugger
    // this.isRefreshSuccess = this.tryRefreshToken();
    this.tryRefreshToken();
    // if (!this.isRefreshSuccess) {
    //   this.router.navigate([AuthRoutesConstants.LOGIN_USER_URL]);
    // }
    // return this.isRefreshSuccess;
    // else {
    //   // this.refreshTokenRequest = new RefreshTokenRequest(
    //   //   this.loggedInUser.access_token,
    //   //   this.loggedInUser.refresh_token
    //   // );
    //   // const credentials = { access_token: this.loggedInUser.access_token, refresh_token: this.loggedInUser.refresh_token };
    //   this.refreshTokenReq.Access_Token = this.loggedInUser.access_token;
    //   this.refreshTokenReq.Refresh_Token = this.loggedInUser.refresh_token;
    //   this.userService.refreshToken(this.refreshTokenReq).subscribe({
    //     next: (response: DataResponse) => {

    //       if (response.ResponseCode === 200) {
    //         debugger;
    //         this.isLoggedIn = true;
    //         this.loggedInUser = response.Result;
    //         this.sessionService.set(
    //           SessionConstants.LOGGED_IN_USER,
    //           JSON.stringify(this.loggedInUser)
    //         );
    //         this.sessionService.set(
    //           SessionConstants.IS_LOGGED_IN,
    //           JSON.stringify(this.isLoggedIn)
    //         );

    //         this.authService.UpdateIsLoggedIn(this.isLoggedIn);
    //         this.authService.UpdateLoggedInUser(this.loggedInUser);
    //         this.isRefreshSuccess = true;
    //       } else {
    //         debugger;
    //         this.isLoading = false;
    //         this.userService.revoke(this.loggedInUser.access_token).subscribe({
    //           next: (response: DataResponse) => {

    //             if (response.ResponseCode === 200) {
    //               this.notifyService.showWarning(
    //                 response.Message,
    //                 MessageConstants.GENERAL_WARNING_TITLE
    //               );
    //               // setTimeout(() => {
    //               //   this.router.navigateByUrl(
    //               //     AuthRoutesConstants.LOGIN_USER_URL
    //               //   );
    //               // }, 1000);
    //               this.isRefreshSuccess = false;
    //             } else {
    //               //this.router.navigateByUrl(AuthRoutesConstants.LOGIN_USER_URL);
    //               this.isRefreshSuccess = false;
    //             }
    //           },
    //           error: (error) => {
    //             //this.router.navigateByUrl(AuthRoutesConstants.LOGIN_USER_URL);
    //             this.isRefreshSuccess = false;
    //           },
    //         });
    //       }
    //     },
    //     error: (error) => {
    //       this.isRefreshSuccess = false;
    //     },
    //   });
    //   // if (
    //   //   !state.url.includes(AuthRoutesConstants.LOGIN_USER_URL) &&
    //   //   !this.isRefreshSuccess
    //   // ) {
    //   //   this.router.navigate([AuthRoutesConstants.LOGIN_USER_URL], {
    //   //     queryParams: { returnUrl: state.url },
    //   //   });
    //   // } else if (!this.isRefreshSuccess) {
    //   //   this.router.navigateByUrl(AuthRoutesConstants.LOGIN_USER_URL);
    //   // }
    //   if (!this.isRefreshSuccess) {
    //     this.router.navigate([AuthRoutesConstants.LOGIN_USER_URL]);
    //   }
    //   return this.isRefreshSuccess;
    // }
  }

  tryRefreshToken() {
    this.refreshTokenReq.Access_Token = this.loggedInUser.access_token;
    this.refreshTokenReq.Refresh_Token = this.loggedInUser.refresh_token;

    if (!this.refreshTokenReq.Access_Token || !this.refreshTokenReq.Refresh_Token) { 
      // this.isRefreshSuccess =  false;
      this.router.navigate([AuthRoutesConstants.LOGIN_USER_URL]);
    }

    this.userService.refreshToken(this.refreshTokenReq).subscribe({
      next: (response: DataResponse) => {
        if (response.ResponseCode === 200) {
          debugger;
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
          // this.isRefreshSuccess =  true;
          return true;
        } else {
          debugger;
          this.isLoading = false;
          this.userService.revoke(this.loggedInUser.access_token).subscribe({
            next: (response: DataResponse) => {
              if (response.ResponseCode === 200) {
                this.notifyService.showWarning(
                  response.Message,
                  MessageConstants.GENERAL_WARNING_TITLE
                );
                // this.isRefreshSuccess =  false;
                this.router.navigate([AuthRoutesConstants.LOGIN_USER_URL]);
              } else {
                // this.isRefreshSuccess =  false;
                this.router.navigate([AuthRoutesConstants.LOGIN_USER_URL]);
              }
            },
            error: (error) => {
              // this.isRefreshSuccess =  false;
              this.router.navigate([AuthRoutesConstants.LOGIN_USER_URL]);
            },
          });
        }
      },
      error: (error) => {
        // this.isRefreshSuccess =  false;
        this.router.navigate([AuthRoutesConstants.LOGIN_USER_URL]);
      },
    });
  }

  

}
