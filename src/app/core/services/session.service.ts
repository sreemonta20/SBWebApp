import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { securityApiUrl } from 'src/environments/environment';
import { environment } from 'src/environments/environment';
import { User, SpecificUser, LoginRequest, SaveUpdateRequest, DataResponse } from '@app/core/class/index';
@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  constructor() {}

  public set(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }
  get(key: string): string {
    return sessionStorage.getItem(key) as string;
  }
  remove(key: string) {
    // this.sessionStorgaeModel[key]=null;
    sessionStorage.removeItem(key);
  }
  clear() {
    // this.sessionStorgaeModel=new SessionStorageModel();
    sessionStorage.clear();
  }
}
