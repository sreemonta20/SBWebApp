import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Inject,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DOCUMENT } from '@angular/common';
import { SessionStorageService, SharedService } from '@app/core/services';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy  {
  isLoggedIn: boolean = false;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private elementRef: ElementRef,
    public router: Router,
    private http: HttpClient,
    private renderer: Renderer2,
    private sharedService: SharedService,
    private sessionService: SessionStorageService,
    
  ) {
    debugger;
  }

  ngOnInit(): void {
    $('[data-widget="treeview"]').Treeview('init');
    this.sharedService.castLoggedIn.subscribe(isLoggedIn => (this.isLoggedIn = isLoggedIn));
  }

  ngAfterViewInit() {
    // this.loadScripts(['assets/js/menu.js']);
  }

  signOut(): void {
    this.sessionService.remove('loggedInUser');
    this.sessionService.remove('isLoggedIn');
    this.sharedService.editIsLoggedIn(false);
    this.router.navigate(['/login']);
  }

  loadScripts(urls: string[]) {
    for (const url of urls) {
      const script = this.renderer.createElement('script');
      script.src = url;
      script.type = 'text/javascript';
      this.renderer.appendChild(document.body, script);
    }
  }

  ngOnDestroy(): void {}
}
