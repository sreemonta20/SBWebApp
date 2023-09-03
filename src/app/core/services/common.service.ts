import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserResponse } from '@app/core/class';
import { MenuItem } from '@app/core/interface';
import { MenuPermission } from '../class/models/menu.permission';
import { SessionStorageService } from '@app/core/services';
import { RouteConstants, SessionConstants } from '../constants/common.constants';

@Injectable({
    providedIn: 'root',
  })

export class CommonService{
    permission: MenuPermission = null;
    private loggedInUser = new BehaviorSubject<UserResponse>(new UserResponse());
    public loggedInUser$: Observable<UserResponse> = this.loggedInUser.asObservable();
    private isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public isLoggedIn$: Observable<boolean> = this.isLoggedIn.asObservable();
    private userMenus: BehaviorSubject<MenuItem[]> = new BehaviorSubject<MenuItem[]>([]);
    public userMenus$: Observable<MenuItem[]> = this.userMenus.asObservable();
    private serializedUserMenus: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    public serializedUserMenus$: Observable<any> = this.serializedUserMenus.asObservable();

    constructor(private sessionService: SessionStorageService, private router: Router) { 
    
    }

    UpdateLoggedInUser(userResponse: UserResponse) {
    this.loggedInUser.next(userResponse);
    }

    UpdateIsLoggedIn(newIsLoggedInValue: boolean) {
    this.isLoggedIn.next(newIsLoggedInValue);
    }

    GetLoggedInUser(): UserResponse {
    return this.loggedInUser.value;
    }

    GetIsUserLoggedIn(): boolean {
    return this.isLoggedIn.value;
    }

    UpdateUserMenus(userMenus: MenuItem[]) {
    this.userMenus.next(userMenus);
    }

    GetUserMenus(): MenuItem[] {
    return this.userMenus.value;
    }

    UpdateSerializedUserMenus(serializedUserMenus: any) {
    this.serializedUserMenus.next(serializedUserMenus);
    }

    GetSerializedUserMenus(): any {
    return this.serializedUserMenus.value;
    }

    public IsExpired(sourceTime: any, currentTime){
        return sourceTime < currentTime;
    }

    

    public RevokeSession(){
        this.sessionService.remove(SessionConstants.LOGGED_IN_USER);
        this.sessionService.remove(SessionConstants.IS_LOGGED_IN);
        this.sessionService.remove(SessionConstants.USER_MENU);
        this.sessionService.remove(SessionConstants.SERIALIZED_MENU);
        this.UpdateIsLoggedIn(false);
        this.UpdateLoggedInUser(null);
        this.UpdateUserMenus(null);
        this.UpdateSerializedUserMenus(null);
        this.router.navigate([RouteConstants.LOGIN_USER_URL]);
    }

    public isRouteValid(serializedUserMenus: MenuItem[], url:string){
        for (let index = 0; index < serializedUserMenus.length; index++) {
          if(serializedUserMenus[index].RouteLink.includes(url)){
            return true;
          }
        }
        return false;
        
    }

    public createSerializedUserMenus(userMenus: MenuItem[]){
        let userMenuList:any = []
        userMenus.forEach(element => {
          userMenuList.push(element);
          if(element.Children.length > 0){
            element.Children.forEach(elementChild=>{
              userMenuList.push(elementChild);
            });
          }
        });
        return userMenuList;
    }

    public getMenuPermissiomn(serializedMenus: any, url:any){
        serializedMenus.forEach((element:any) => {
          if(element.RouteLink.includes(url)){
            debugger
            this.permission = new MenuPermission(element.IsView, element.IsCreate, element.IsUpdate, element.IsDelete);
            return this.permission;
          }
        });
        return this.permission;
    }
}