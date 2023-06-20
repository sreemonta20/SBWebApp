import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map,lastValueFrom } from 'rxjs';
////--------------------API method access pattern one start------------------------------------
// import { url } from 'src/environments/environment';
////--------------------API method access pattern one end------------------------------------
import { securityApiUrl } from 'src/environments/environment';
import { environment } from 'src/environments/environment';
import { LoginRequest, RefreshTokenRequest, SaveUpdateRequest, DataResponse } from '@app/core/class/index';
import { ApiService } from './api.service';
// import { promises } from 'dns';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  ////--------------------API method access pattern one start------------------------------------
  // getUserByIdUrl: string = `${url}/api/User/getUserbyId`;
  // getAllUsersUrl: string = `${url}/api/User/getAllUsers`;
  // userLoginUrl: string = `${url}/api/User/login`;
  // registerUserUrl: string = `${url}/api/User/registerUser`;
  // deleteUserUrl: string = `${url}/api/User/deleteUser`;

  // constructor(private http: HttpClient) {}

  // getUserById(id:string): Observable<DataResponse> {
  //   const params = new HttpParams().set('id', id);
  //   return this.http.get<DataResponse>(this.getUserByIdUrl,{params})
  // }

  // getAllUsers(pageNumber:number, pageSize: number): Observable<DataResponse> {
  //   const params = new HttpParams().set('pageNumber', pageNumber).set('pageSize', pageSize);
  //   return this.http.get<DataResponse>(this.getAllUsersUrl,{params})
  // }

  // login(user: LoginUserRequest): Observable<DataResponse> {
  //   return this.http.post<DataResponse>(this.userLoginUrl, user);
  // }

  // registerUser(user: SaveUpdateRequest): Observable<DataResponse> {
  //   return this.http.post<DataResponse>(this.registerUserUrl, user);
  // }

  // deleteUser(id:string): Observable<DataResponse> {
  //   const params = new HttpParams().set('id', id);
  //   return this.http.delete<DataResponse>(this.deleteUserUrl,{params})
  // }

  ////--------------------API method access pattern one ends------------------------------------

  ////--------------------API method access pattern two start------------------------------------
  getUserByIdUrl: string = '/api/User/getUserbyId';
  getAllUsersUrl: string = '/api/User/getAllUsers';
  userLoginUrl: string = '/api/User/login';
  refreshTokenUrl: string = '/api/User/refreshtoken';
  revokeUrl: string = '/api/User/revoke';
  registerUserUrl: string = '/api/User/registerUser';
  deleteUserUrl: string = '/api/User/deleteUser';

  constructor(private http: HttpClient, private apiService: ApiService<DataResponse>) {
    this.apiService.initializeBaseURL(securityApiUrl);
  }

  getUserById(id:string): Observable<DataResponse|undefined> {
    const params = new HttpParams().set('id', id);
    return this.apiService
      .getById(this.getUserByIdUrl,params)
      .pipe(
        map((response: DataResponse) => {
          if (response) {
            return response
          }
        })
      );
  }

  getAllUsers(pageNumber:number, pageSize: number): Observable<DataResponse|undefined> {
    const params = new HttpParams().set('pageNumber', pageNumber).set('pageSize', pageSize);
    return this.apiService
    .getAll(this.getAllUsersUrl,params)
    .pipe(
      map((response: DataResponse) => {
        if (response) {
          return response
        }
      })
    );
  }

  login(user: LoginRequest): Observable<DataResponse|undefined> {
    
    return this.apiService
    .post(this.userLoginUrl,user)
    .pipe(
      map((response: DataResponse) => {
        if (response) {
          return response
        }
      })
    );
  }

  refreshToken(refreshTokenRequest: RefreshTokenRequest): Observable<DataResponse> {
    
    return this.apiService
    .post(this.refreshTokenUrl,refreshTokenRequest)
    .pipe(
      map((response: DataResponse) => {
        if (response) {
          return response
        }
      })
    );
  }

 

  // async renewToken(refreshTokenRequest: RefreshTokenRequest){
    
  //   try {
  //     const result = await this.apiService.postAsync<RefreshTokenRequest>(this.refreshTokenUrl, refreshTokenRequest);
  //     console.log('Post successful:', result);
  //   } catch (error) {
  //     console.error('Post failed:', error);
  //   }
  // }

  async renewToken(refreshTokenRequest: RefreshTokenRequest): Promise<any>  {
    
    const result$ = await this.apiService.postAsync(this.refreshTokenUrl, refreshTokenRequest);
      return lastValueFrom(result$);
  }

  revoke(userToken: string): Observable<DataResponse> {
    
    const params = new HttpParams().set('userToken', userToken);
    return this.apiService
    .post(this.revokeUrl,{params})
    .pipe(
      map((response: DataResponse) => {
        if (response) {
          return response
        }
      })
    );
  }

  registerUser(user: SaveUpdateRequest): Observable<DataResponse> {
    return this.http.post<DataResponse>(this.registerUserUrl, user);
  }

  deleteUser(id:string): Observable<DataResponse> {
    const params = new HttpParams().set('id', id);
    return this.http.delete<DataResponse>(this.deleteUserUrl,{params})
  }

  ////--------------------API method access pattern two start------------------------------------
}
