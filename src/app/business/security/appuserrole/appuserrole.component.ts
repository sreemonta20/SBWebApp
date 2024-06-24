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
  ValidationFormsService,
} from '@app/core/services';
declare var $: any;

@Component({
  selector: 'app-appuserrole',
  templateUrl: './appuserrole.component.html',
  styleUrls: ['./appuserrole.component.css'],
})
export class AppUserRoleComponent implements OnInit, AfterViewInit, OnDestroy {
  //Pagination
  public pageNumber: number = 0;
  public pageSize: number = 5;
  public startPage: number = 0;
  public endPage: number = 0;
  public totalRows: number = 0;

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

  ngOnInit(): void {}

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

  getAllAppUserRolesPagination(pageNumber: number, pageSize: number) {}

  setPageSize(page: number, isPaging: boolean) {
    debugger;
    // this.pager = this.pagerService.getPager(this.totalRows, page, this.pageSize);
    // if (isPaging) {
    //     this.getbyPage(page, false);
    // }
    // else {
    //     this.pagedItems = this.listBillCloudUserInvoice;
    // }
    let totalPages = Math.ceil(7 / 5);
    console.log(this.pageSize);
  }

  ngOnDestroy(): void {}
}
