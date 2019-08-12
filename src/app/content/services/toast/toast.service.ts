import { toast } from 'bulma-toast';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

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
