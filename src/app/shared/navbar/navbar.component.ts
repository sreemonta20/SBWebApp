import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthRoutesConstants, Common, SessionConstants } from '@app/core/constants';
import { MenuItem } from '@app/core/interface';
import { AuthService, SessionStorageService } from '@app/core/services';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy  {
  menuList: MenuItem[];
  isLoggedIn: boolean = false;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private elementRef: ElementRef,
    public router: Router,
    private http: HttpClient,
    private renderer: Renderer2,
    private authService: AuthService,
    private sessionService: SessionStorageService,
    
  ) {
    
  }

  ngOnInit(): void {
    $('[data-widget="treeview"]').Treeview('init');
    this.authService.isLoggedIn$.subscribe(response => (this.isLoggedIn = response));
    debugger
    this.menuList = Common.Menu;
  }

  ngAfterViewInit() {
    // this.loadScripts(['assets/js/menu.js']);
  }

  signOut(): void {
    this.sessionService.remove(SessionConstants.LOGGED_IN_USER);
    this.sessionService.remove(SessionConstants.IS_LOGGED_IN);
    this.authService.UpdateIsLoggedIn(false);
    // this.router.navigate(['/login']);
    this.router.navigate([AuthRoutesConstants.LOGIN_USER_URL]);
  }

  loadScripts(urls: string[]) {
    for (const url of urls) {
      const script = this.renderer.createElement('script');
      script.src = url;
      script.type = 'text/javascript';
      this.renderer.appendChild(document.body, script);
    }
  }

  TestClick() {
    this.router.navigate(['/business/home']);
  } 

  ngOnDestroy(): void {}
}
