import { ErrorHandler, Injectable } from '@angular/core';
import * as Sentry from '@sentry/browser';
import { environment } from 'environments/environment.prod';


Sentry.init({
  dsn: environment.sentryDsn,
  release: `lada-app@${environment.appVersion}`
});

@Injectable({
  providedIn: 'root'
})
export class SentryService implements ErrorHandler {
  constructor() { }
  handleError(error) {
    Sentry.captureException(error.originalError || error);
  }
}
