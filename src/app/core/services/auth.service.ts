import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from '@app/core/class';
import { MenuItem } from '@app/core/interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionStorageService } from '../services/session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInUser = new BehaviorSubject<UserResponse>(new UserResponse());
  public loggedInUser$: Observable<UserResponse> = this.loggedInUser.asObservable();
  private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedIn.asObservable();
  private userMenus: BehaviorSubject<MenuItem[]> = new BehaviorSubject<MenuItem[]>([]);
  public userMenus$: Observable<MenuItem[]> = this.userMenus.asObservable();
  constructor(
    private sessionService: SessionStorageService,
    private router: Router
  ) {}
  
  

  UpdateLoggedInUser(userResponse: UserResponse) {
    this.loggedInUser.next(userResponse);
  }

  UpdateIsLoggedIn(newIsLoggedInValue: boolean) {
    this.isLoggedIn.next(newIsLoggedInValue);
  }

  GetLoggedInUser(): UserResponse{
    return this.loggedInUser.value;
  }

  GetIsUserLoggedIn(): boolean {
    return this.isLoggedIn.value;
  }

  UpdateUserMenus(userMenus: MenuItem[]){
   this.userMenus.next(userMenus);
  }

  GetUserMenus(): MenuItem[]{
    return this.userMenus.value;
   }
}
