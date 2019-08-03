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
      position: 'bottom-center',
      closeOnClick: true,
      animate: { in: 'bounceIn', out: 'slideOutDown' }
    });
  }


}
