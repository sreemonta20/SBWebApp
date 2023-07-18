import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRoutesConstants, SessionConstants } from '../constants/common.constants';
import { MenuItem } from '../interface/menu.item';
import { AuthService } from '../services/auth.service';
import { SessionStorageService } from '../services/session.service';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private authService: AuthService,private sessionService:SessionStorageService,private router: Router) {}


  public IsExpired(sourceTime: any, currentTime){
    return sourceTime < currentTime;
  }

  public RevokeSession(){
    this.sessionService.remove(SessionConstants.LOGGED_IN_USER);
    this.sessionService.remove(SessionConstants.IS_LOGGED_IN);
    this.sessionService.remove(SessionConstants.USER_MENU);
    this.sessionService.remove(SessionConstants.SERIALIZED_MENU);
    this.authService.UpdateIsLoggedIn(false);
    this.authService.UpdateLoggedInUser(null);
    this.authService.UpdateUserMenus(null);
    this.authService.UpdateSerializedUserMenus(null);
    this.router.navigate([AuthRoutesConstants.LOGIN_USER_URL]);
  }

  public isRouteValid(serializedUserMenus: MenuItem[], url:string){
    debugger
    // let serializedMenus = this.serializedUserMenus(userMenus);
    for (let index = 0; index < serializedUserMenus.length; index++) {
      if(serializedUserMenus[index].RouteLink.includes(url)){
        return true;
      }
    }
    return false;
    
  }

  public serializedUserMenus(userMenus: MenuItem[]){
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
}
