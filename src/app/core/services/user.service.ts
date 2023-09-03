import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
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
import { CommonService } from '../services/common.service';
import { SessionStorageService } from '../services/session.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public loggedInUser: UserResponse = new UserResponse();
  userMenus: MenuItem[];
  constructor(
    private commonService: CommonService,
    private http: HttpClient,
    private apiService: ApiService<DataResponse>,
    private sessionService: SessionStorageService
  ) {
    this.apiService.initializeBaseURL(securityApiUrl);
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
