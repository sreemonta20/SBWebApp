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
import {
  SecurityService,
  CommonService,
  LoaderService,
  NotificationService,
  SessionStorageService,
  ValidationFormsService
} from '@app/core/services';
declare var $: any;

@Component({
  selector: 'app-appuserrole',
  templateUrl: './appuserrole.component.html',
  styleUrls: ['./appuserrole.component.css'],
})
export class AppUserRoleComponent implements OnInit, AfterViewInit, OnDestroy {
  public pageSizeList: number[] = [];
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private elementRef: ElementRef,
    public router: Router,
    private http: HttpClient,
    private renderer: Renderer2,
    private commonService: CommonService
  ) {
    this.pageSizeList = this.commonService.pageSize();
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    // this.loadScripts(['assets/js/adminlte.js']);
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
