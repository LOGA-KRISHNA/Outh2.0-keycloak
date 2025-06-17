import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { switchMap } from 'rxjs/operators';
import { from } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(OidcSecurityService);
  const isApiUrl = req.url.startsWith('http://localhost:8080/api/v1'); // Adjust as needed


  return from(authService.getAccessToken()).pipe(
    switchMap(token => {
      
      if (token && isApiUrl) {
        const headers = req.headers
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .set('x-uer-agent', 'Angular-OAuth-App');
        const clonedReq = req.clone({ headers });
        return next(clonedReq);
      }
      return next(req);
    })
  );
};
