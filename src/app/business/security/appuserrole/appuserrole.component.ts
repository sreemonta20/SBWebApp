// import { AppUserRole } from './../../../core/class/models/app.user.role';
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
import { HttpParams } from '@angular/common/http';
import { CommonModule, DOCUMENT, DatePipe } from '@angular/common';
import {
  SecurityService,
  CommonService,
  LoaderService,
  NotificationService,
  SessionStorageService,
  ValidationFormsService,
} from '@app/core/services';
import {AppUserRole, DataResponse, RoleSaveUpdateRequest,AppUserRoleResponse} from '@app/core/class'
import { MessageConstants } from '@app/core/constants';
declare var $: any;

@Component({
  selector: 'app-appuserrole',
  templateUrl: './appuserrole.component.html',
  styleUrls: ['./appuserrole.component.css'],
  providers: [DatePipe]
})
export class AppUserRoleComponent implements OnInit, AfterViewInit, OnDestroy {
  //Pagination
  public totalRows: number = 0;
  public currentPage: number = 1;
  public pageSize: number = 5;
  public pageCount: number = 0;
  public startPage: number = 0;
  public endPage: number = 0;
  
  public pageSizeList: number[] = this.commonService.pageSize();
  // Response related
  public appUserRoleList: AppUserRoleResponse[] = [];
  error_message: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private elementRef: ElementRef,
    public router: Router,
    private renderer: Renderer2,
    private loadingService: LoaderService,
    private notifyService: NotificationService,
    private commonService: CommonService,
    private securityService: SecurityService
  ) {
    // this.pageSizeList = this.commonService.pageSize();
  }

  ngOnInit(): void {
    this.getAllAppUserRolesPagination(this.currentPage, this.pageSize);
  }

  ngAfterViewInit() {
    // this.loadScripts(['assets/js/adminlte.js']);
  }

  getAllAppUserRolesPagination(pageNumber: number, pageSize: number) {
    debugger
    this.loadingService.setLoading(true);
    this.securityService.getAllAppUserRolesPagination(pageNumber, pageSize).subscribe({
      next: (response: DataResponse) => {
        debugger
        if (response.ResponseCode === 200) {
         this.loadingService.setLoading(false);
         this.appUserRoleList = response.Result.items;
         this.currentPage = response.Result.currentPage;
         this.pageCount = response.Result.pageCount;
         this.totalRows = response.Result.rowCount;
         this.updatePageIndices();
        } else {
          this.loadingService.setLoading(false);
          this.notifyService.showError(
            MessageConstants.APP_USER_ROLE_NOT_FOUND_MEG,
            MessageConstants.GENERAL_ERROR_TITLE
          );
          return;
        }
      },
      error: (error) => {
        this.loadingService.setLoading(false);
        this.error_message = error.error;
        this.notifyService.showError(
          MessageConstants.INTERNAL_ERROR_MEG,
          MessageConstants.GENERAL_ERROR_TITLE
        );
        return;
      },
    });
  }

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

  changePageSize(event: any): void {
    // this.pageSize = +event.target.value;
    this.currentPage = 1; // Reset to first page whenever page size changes
    this.getAllAppUserRolesPagination(this.currentPage, this.pageSize);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.pageCount) {
      this.getAllAppUserRolesPagination(page, this.pageSize);
    }
  }

  updatePageIndices(): void {
    this.startPage = (this.currentPage - 1) * this.pageSize + 1;
    this.endPage = Math.min(this.startPage + this.pageSize - 1, this.totalRows);
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
