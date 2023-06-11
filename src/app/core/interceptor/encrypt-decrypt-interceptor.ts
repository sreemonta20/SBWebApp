import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { EncryptDecryptService } from '../services/encrypt-decrypt.service';
import { Observable, map } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable()
export class EncryptDecryptAuthInterceptor implements HttpInterceptor {
    constructor(private encryptDecryptService: EncryptDecryptService, ) {}
    ExcludeURLList = [
        '/api/User/getUserbyId',
        '/api/User/getAllUsers',
        '/api/User/login',
        '/api/User/refreshtoken',
        '/api/User/revoke',
        '/api/User/registerUser',
        '/api/User/deleteUser'
    ];
    intercept(req: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {
        let exludeFound = this.ExcludeURLList.filter(element => {
            return req.url.includes(element)
        });
        if (!(exludeFound && exludeFound.length > 0)) {
            if (req.method == "GET") {
                if (req.url.indexOf("?") > 0) {
                    let encriptURL = req.url.slice(0, req.url.indexOf("?") + 1) + this.encryptDecryptService.encryptUsingAES256(req.url.slice(req.url.indexOf("?") + 1, req.url.length));
                    const cloneReq = req.clone({
                        url: encriptURL
                    });
                    return next.handle(cloneReq);
                }
                return next.handle(req);
            } else if (req.method == "POST") {
                
                if (req.body || req.body.length > 0) {
                    const cloneReq = req.clone({
                        body: this.encryptDecryptService.encryptUsingAES256(req.body)
                    });
                    //return next.handle(cloneReq);
                    return next.handle(cloneReq).pipe(
                        // Decrypt the response body
                        map((event) => {
                          if (event instanceof HttpResponse) {
                            event = event.clone({
                              body: this.encryptDecryptService.decryptUsingAES256(event),
                            });
                          }
                          return event;
                        })
                      );
                }
                let data = req.body as FormData;
                return next.handle(req);
            }
        }
        return next.handle(req);
    }
}