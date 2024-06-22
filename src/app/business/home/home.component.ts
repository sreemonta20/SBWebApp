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
import { MenuPermission } from '@app/core/class/models/menu.permission';
import { SessionConstants } from '@app/core/constants';
import {
  CommonService,
  LoaderService,
  NotificationService,
  SessionStorageService,
  ValidationFormsService
} from '@app/core/services/index';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  currentRoute: string;
  permission: MenuPermission = null;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private elementRef: ElementRef,
    public router: Router,
    private http: HttpClient,
    private renderer: Renderer2,
    private loadingService: LoaderService,
    private sessionService: SessionStorageService,
    private notifyService: NotificationService,
    private validationService: ValidationFormsService,
    private spinnerService: NgxSpinnerService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.permission = this.commonService.getMenuPermissiomn(this.sessionService.get(SessionConstants.SERIALIZED_MENU), this.router.url);
  }

  ngAfterViewInit() {
    // this.loadScripts([
    //   'assets/plugins/jquery/jquery.min.js',
    //   'assets/plugins/bootstrap/js/bootstrap.bundle.min.js',
    //   'assets/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js',
    //   'assets/js/adminlte.js',
    //   'assets/plugins/jquery-mousewheel/jquery.mousewheel.js',
    //   'assets/plugins/raphael/raphael.min.js',
    //   'assets/plugins/jquery-mapael/jquery.mapael.min.js',
    //   'assets/plugins/jquery-mapael/maps/usa_states.min.js',
    //   'assets/plugins/chart.js/Chart.min.js',
    //   'assets/js/pages/dashboard2.js',
    // ]);
    this.loadScripts(['assets/js/pages/dashboard2.js']);
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
