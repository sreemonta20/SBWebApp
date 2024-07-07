import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionConstants } from '../constants/common.constants';
import { SessionStorageService } from '../services/session.service';
import { DataResponse, User, UserResponse } from '@app/core/class';
import { CommonService } from '../services';

@Injectable()
export class AuthReqInterceptor implements HttpInterceptor {
  public accessToken: any = null;
  public loggedInUser: UserResponse = new UserResponse();
  constructor(
    public sessionService: SessionStorageService,
    public commonService: CommonService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    try {
      
      const hasAuthorizationHeader = req.headers.has('Authorization');
      if (!hasAuthorizationHeader) {
        this.commonService.loggedInUser$.subscribe((loggedInUser) => {
          this.loggedInUser = loggedInUser;
        });

        if (this.commonService.isValid(this.loggedInUser)) {
          this.accessToken = this.loggedInUser.access_token;
          if (this.commonService.isValid(this.accessToken)) {
            return next.handle(
              req.clone({
                setHeaders: { Authorization: `Bearer ${this.accessToken}` },
              })
            );
          } else {
            return next.handle(req);
          }
        } else {
          return next.handle(req);
        }
      }
    } catch (err) {
      return next.handle(req);
    }
  }
}
