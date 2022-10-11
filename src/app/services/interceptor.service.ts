import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UsersService } from './users.service';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  token: string;
  interceptCalls = ['https://xue2n1beqj.execute-api.ap-southeast-1.amazonaws.com/nussmp/feedbacks'];
  skipInterceptor = true;
  constructor(private router: Router, private facadeService: UsersService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.interceptCalls.forEach(api => {
      if (req.url.includes(api)) {
        this.skipInterceptor = false;
      }
    });
    this.token = this.facadeService.getUserToken();
    if (this.token || this.skipInterceptor) {
      const tokenizedReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.token) });
      return next.handle(tokenizedReq).pipe(map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.status === 401) {
            this.facadeService.userLoggedOut();
            this.router.navigateByUrl('core/login');
          }
        }
        return event;
      }));
    } else {
      this.facadeService.userLoggedOut();
    }
    return next.handle(req);
  }
}