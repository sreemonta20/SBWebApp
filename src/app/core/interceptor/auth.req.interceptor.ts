import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionStorageService } from '../services/session.service';
import { SessionConstants } from '../constants/common.constants';

@Injectable()
export class AuthReqInterceptor implements HttpInterceptor {
  constructor(public sessionService: SessionStorageService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    try {
      debugger
      // const accessToken = JSON.parse(localStorage['loggedInUser']).access_token;
      const accessToken = JSON.parse(this.sessionService.get(SessionConstants.LOGGED_IN_USER)).access_token;
      return next.handle(req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } }));
    } catch (err) {
      return next.handle(req);
    }
  }
}
