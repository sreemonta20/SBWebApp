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
import { SessionConstants } from '@app/core/constants';
import { MenuItem } from '@app/core/interface';
import { CommonService, SessionStorageService } from '@app/core/services';
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
    private commonService: CommonService,
    private sessionService: SessionStorageService,
    
  ) {
    
  }

  ngOnInit(): void {
    $('[data-widget="treeview"]').Treeview('init');
    this.commonService.isLoggedIn$.subscribe(response => (this.isLoggedIn = response));
    this.menuList = this.sessionService.get(SessionConstants.USER_MENU);
  }

  ngAfterViewInit() {
    // this.loadScripts(['assets/js/menu.js']);
  }

  signOut(): void {
    this.commonService.RevokeSession();
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
