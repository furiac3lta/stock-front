import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const isBrowser = typeof window !== 'undefined';

  if (!isBrowser) {
    return next(req);
  }

  // Ignorar prefetch internos de Vite/Angular
  if (req.url.includes('vite') || req.headers.has('Sec-Fetch-Mode')) {
    return next(req);
  }

  const token = localStorage.getItem('token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
