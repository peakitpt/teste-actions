import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(injector: Injector) {}

  intercept(req, next) {
    const token = localStorage.getItem('token');
    const ekklesiaId = localStorage.getItem('subscriptionId');

    let tokenizedReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        EkklesiaId: ekklesiaId
      }
    });

    // For FormData
    if (req.headers.get('isFormData')) {
      tokenizedReq = req.clone({
        setHeaders: {
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
          EkklesiaId: ekklesiaId
        }
      });
    }
    // ---

    return next.handle(tokenizedReq);
  }
}
