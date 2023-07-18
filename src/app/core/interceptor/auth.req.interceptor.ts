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

@Injectable()
export class AuthReqInterceptor implements HttpInterceptor {
  constructor(public sessionService: SessionStorageService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    try {
      
 
      const accessToken = this.sessionService.get(SessionConstants.LOGGED_IN_USER).access_token;
      if (accessToken) {
        return next.handle(
          req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
        );
      }
    } catch (err) {
      return next.handle(req);
    }
  }
}
