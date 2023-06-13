import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable,lastValueFrom } from 'rxjs';
import { SessionStorageService } from '../services/session.service';
import { SessionConstants } from '../constants/common.constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService<T> {
  // private baseUrl = 'https://example.com/api';
  private baseUrl: string = '';

  constructor(private http: HttpClient,private sessionService: SessionStorageService) {}

  initializeBaseURL(inputUrl: string) {
    
    this.baseUrl = inputUrl;
  }

  // private getToken(): string {
  //   // Your logic for getting the token goes here
  //   const accessToken = JSON.parse(this.sessionService.get(SessionConstants.LOGGED_IN_USER)).access_token;
  //   return accessToken;
  // }

  // private getHeaders(): HttpHeaders {
  //   const token = this.getToken();
  //   return new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`
  //   });
  // }
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  // public getById(id: number, endpoint: string): Observable<T> {
  //   const headers = this.getHeaders();
  //   const url = `${this.baseUrl}/${endpoint}/${id}`;
  //   return this.http.get<T>(url, { headers });
  // }

  public getById(endpoint: string, params: HttpParams): Observable<T> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}${endpoint}`;
    return this.http.get<T>(url, {headers: headers, params: params});
  }

  // public getAll(endpoint: string): Observable<T> {
  //   const headers = this.getHeaders();
  //   const url = `${this.baseUrl}/${endpoint}`;
  //   return this.http.get<T>(url, { headers });
  // }

  public getAll(endpoint: string, params: HttpParams): Observable<T> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}${endpoint}`;
    return this.http.get<T>(url, {headers: headers, params: params});
  }

  public post(endpoint: string, body: any): Observable<T> {
    
    const headers = this.getHeaders();
    const url = `${this.baseUrl}${endpoint}`;
    return this.http.post<T>(url, body, { headers });
  }


  public postAsync<T>(endpoint: string, body: T): Promise<any> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}${endpoint}`;
    const request$ = this.http.post<T>(url, body, { headers });
    return lastValueFrom(request$);
  }

  public put(endpoint: string, body: any, params: HttpParams): Observable<T> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}${endpoint}`;
    return this.http.put<T>(url, body, {headers: headers, params: params});
  }

  // public delete(id: number, endpoint: string): Observable<T> {
  //   const headers = this.getHeaders();
  //   const url = `${this.baseUrl}/${endpoint}/${id}`;
  //   return this.http.delete<T>(url, { headers });
  // }

  public delete(endpoint: string, params: HttpParams): Observable<T> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}${endpoint}`;
    return this.http.delete<T>(url, {headers: headers, params: params});
  }

  public getByIdExtn(id: number, endpoint: string): Observable<T> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/${endpoint}/${id}`;
    return this.http.get<T>(url, { headers });
  }

  public getAllExtn(endpoint: string): Observable<T[]> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.get<T[]>(url, { headers });
  }

  public postByExtn(endpoint: string, body: T): Observable<T> {
    const headers = this.getHeaders();
    return this.http.post<T>(endpoint, body, { headers });
  }

  public putExtn(id: number, endpoint: string, body: T): Observable<T> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/${endpoint}/${id}`;
    return this.http.put<T>(url, body, { headers });
  }

  public deleteExtn(id: number, endpoint: string): Observable<any> {
    const headers = this.getHeaders();
    const url = `${this.baseUrl}/${endpoint}/${id}`;
    return this.http.delete(url, { headers });
  }
}
