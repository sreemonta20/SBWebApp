import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { SessionStorageService } from '../services/session.service';
import { SessionConstants,AuthRoutesConstants } from '../constants/common.constants';
import {User, UserResponse, DataResponse} from '@app/core/class'
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private sessionService:SessionStorageService,private router: Router) {}


  public IsExpired(sourceTime: any, currentTime){
    return sourceTime < currentTime;
  }
}
