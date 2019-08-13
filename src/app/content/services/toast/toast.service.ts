import { Injectable } from '@angular/core';
import { toast } from 'bulma-toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  testIfOffline() {
    if (!navigator.onLine) {
      this.error('Você está offline');
    }
  }

  warning(message: string) {
    toast({
      message: message,
      type: 'is-warning',
      position: 'top-center',
      closeOnClick: true,
    });
  }

  error(message: string) {
    toast({
      message: message,
      type: 'is-danger',
      position: 'top-center',
      closeOnClick: true,
    });
  }

}
