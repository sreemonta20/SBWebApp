import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
////--------------------API method access pattern one start------------------------------------
// import { url } from 'src/environments/environment';
////--------------------API method access pattern one end------------------------------------
import {
  DataResponse,
  LoginRequest,
  RefreshTokenRequest,
  SaveUpdateRequest,
  UserResponse,
} from '@app/core/class/index';
import { MenuItem } from '@app/core/interface';
import { securityApiUrl } from 'src/environments/environment';
import { APIConstants, SessionConstants } from '../constants/common.constants';
import { AuthService } from '../services/auth.service';
import { SessionStorageService } from '../services/session.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public loggedInUser: UserResponse = new UserResponse();
  userMenus: MenuItem[];
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private apiService: ApiService<DataResponse>,
    private sessionService: SessionStorageService
  ) {
    this.apiService.initializeBaseURL(securityApiUrl);
  }

  login(user: LoginRequest): Observable<DataResponse | undefined> {
    return this.apiService.post(APIConstants.API_USER_LOGIN_URL, user).pipe(
      map((response: DataResponse) => {
        if (response) {
          return response;
        }
      })
    );
  }

  renewToken(
    refreshTokenRequest: RefreshTokenRequest
  ): Observable<DataResponse> {
    return this.apiService
      .post(APIConstants.API_REFRESH_TOKEN_URL, refreshTokenRequest)
      .pipe(
        map((response: DataResponse) => {
          if (response) {
            return response;
          }
        })
      );
  }

  async refreshToken<DataResponse>(
    refreshTokenRequest: RefreshTokenRequest
  ): Promise<DataResponse> {
    const result = await this.apiService.postDataAsync<DataResponse>(
      APIConstants.API_REFRESH_TOKEN_URL,
      refreshTokenRequest
    );
    return result;
  }

  async refreshTokenAsync(
    refreshTokenModelReq: RefreshTokenRequest
  ): Promise<boolean> {
    if (
      !refreshTokenModelReq.Access_Token ||
      !refreshTokenModelReq.Refresh_Token
    ) {
      return false;
    }
    let isRefreshSuccess: boolean;

    try {
      const result = await this.apiService.postAsync(
        APIConstants.API_REFRESH_TOKEN_URL,
        refreshTokenModelReq
      );
      if (result.ResponseCode === 200) {
        this.loggedInUser = result.Result;
        this.userMenus = JSON.parse(this.loggedInUser.userMenus);
        this.sessionService.set(
          SessionConstants.LOGGED_IN_USER,
          this.loggedInUser
        );
        this.sessionService.set(SessionConstants.IS_LOGGED_IN, true);
        this.sessionService.set(SessionConstants.USER_MENU, this.userMenus);

        this.authService.UpdateIsLoggedIn(true);
        this.authService.UpdateLoggedInUser(this.loggedInUser);
        this.authService.UpdateUserMenus(this.userMenus);
        isRefreshSuccess = true;
      } else if (result.ResponseCode === 400 || result.ResponseCode === 500) {
        isRefreshSuccess = false;
      }
    } catch (error) {
      console.error('An error occurred during refresh token:', error);
      isRefreshSuccess = false;
    }
    return isRefreshSuccess;
  }

  revoke(userToken: string): Observable<DataResponse> {
    const params = new HttpParams().set('userToken', userToken);
    return this.apiService.get(APIConstants.API_REVOKE_URL, params).pipe(
      map((response: DataResponse) => {
        if (response) {
          return response;
        }
      })
    );
  }

  async revokeAsync(userToken: string): Promise<DataResponse> {
    const params = new HttpParams().set('userToken', userToken);
    const result = await this.apiService.postAsync(
      APIConstants.API_REVOKE_URL,
      { params }
    );
    return result;
  }

  getAllUsers(
    pageNumber: number,
    pageSize: number
  ): Observable<DataResponse | undefined> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
    return this.apiService
      .getAll(APIConstants.API_GET_ALL_USERS_URL, params)
      .pipe(
        map((response: DataResponse) => {
          if (response) {
            return response;
          }
        })
      );
  }

  getUserById(id: string): Observable<DataResponse | undefined> {
    const params = new HttpParams().set('id', id);
    return this.apiService
      .getById(APIConstants.API_GET_USER_BY_ID_URL, params)
      .pipe(
        map((response: DataResponse) => {
          if (response) {
            return response;
          }
        })
      );
  }

  registerUser(user: SaveUpdateRequest): Observable<DataResponse> {
    return this.http.post<DataResponse>(
      APIConstants.API_REGISTER_USER_URL,
      user
    );
  }

  deleteUser(id: string): Observable<DataResponse> {
    const params = new HttpParams().set('id', id);
    return this.http.delete<DataResponse>(APIConstants.API_DELETE_USER_URL, {
      params,
    });
  }
}
