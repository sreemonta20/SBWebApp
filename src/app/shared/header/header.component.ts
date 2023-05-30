import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {
  SessionStorageService,
  AuthService,
  SharedService,
} from '@app/core/services';
import {
  DataResponse,
  User
} from '@app/core/class';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  dataResponse: DataResponse = new DataResponse();
  user: User = new User();
  constructor(
    private datePipe: DatePipe,
    public router: Router,
    private authService: AuthService,
    private sharedService: SharedService,
    private sessionService: SessionStorageService
  ) {}

  ngOnInit(): void {
    this.sharedService.castLoggedIn.subscribe(
      (isLoggedIn) => (this.isLoggedIn = isLoggedIn)
    );
    // this.authService.castLoggedInUser.subscribe(
    //   (loggedInUser) => (this.loggedInUser = loggedInUser)
    // );
    debugger;
    // this.authService.castLoggedInUser.subscribe(
    //   (dataResponse) => (
    //     this.dataResponse = dataResponse
    //     )
    // );
    this.authService.castLoggedInUser.subscribe({
      next: (response: any) => {
        debugger
        this.user = response.user;
        //this.user = this.dataResponse.user;
      }
    });
  }

  signOut(): void {
    this.sessionService.remove('loggedInUser');
    this.sessionService.remove('isLoggedIn');
    this.sharedService.editIsLoggedIn(false);
    this.router.navigate(['/auth/login']);
  }
}
