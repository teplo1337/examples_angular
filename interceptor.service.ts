import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { switchMap, map, catchError, first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()

export class SomeInterceptor implements HttpInterceptor {
  constructor(
    public authService: AuthService,
    private router: Router ) {}

  get apiBaseHref(): string {
    return environment.apiBaseHref;
  }

  get accessToken(): Observable<string> {
    return this.authService.authData$.pipe(map(aData => aData.accessToken));
  }

  urlWithAuthList: string[] = [
    'someUsers',
    'someData',
  ];

  private createHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const urlParts = req.url.split('/');
    const withoutAuthReq = urlParts.includes('login');

    const withAuthReq = this.urlWithAuthList
        .some(reqAlias =>
          urlParts.includes(reqAlias)
        );


    if (withAuthReq) {
      return this.withAuthReqHandler(req, next);
    }

    if (withoutAuthReq) {
      return this.withoutAuthReqHandler(req, next);
    }

    return next.handle(req);
  }

  private withoutAuthReqHandler(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const url = this.apiBaseHref + req.url;
    const params = {
      headers: this.createHeader(),
      url
    };

    const clonedRequest = req.clone(params);
    return next.handle(clonedRequest);
  }

  private withAuthReqHandler(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return this.accessToken.pipe(first(), switchMap(token => {
      const url = this.apiBaseHref + req.url;
      const headers = this.createHeader()
        .append('authorization', 'Bearer ' + token);

      const params = req.params || new HttpParams();

      const update = {
            headers,
            url,
            params
          };

      const clonedRequest = req.clone(update);
      return next.handle(clonedRequest)
        .pipe(
          catchError((res: HttpErrorResponse) => {
            if (res.status === 401) {
              this.router.navigate(['auth']);
            }
            return throwError(res);
        }));
    }));
  }
}
