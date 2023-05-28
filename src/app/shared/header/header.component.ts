import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SessionStorageService, AuthService ,SharedService } from '@app/core/services';
import {
  User,
  LoginRequest,
  DataResponse,
} from '@app/core/class';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  loggedInUser: DataResponse = new DataResponse();
  constructor(
    public router: Router,
    private authService: AuthService, 
    private sharedService: SharedService, 
    private sessionService: SessionStorageService) {

   }

  ngOnInit(): void {
    this.sharedService.castLoggedIn.subscribe(isLoggedIn => (this.isLoggedIn = isLoggedIn));
    this.authService.castLoggedInUser.subscribe(loggedInUser => (this.loggedInUser = loggedInUser));
  }

  signOut(): void {
    this.sessionService.remove('loggedInUser');
    this.sessionService.remove('isLoggedIn');
    this.sharedService.editIsLoggedIn(false);
    this.router.navigate(['/login']);
  }

}
