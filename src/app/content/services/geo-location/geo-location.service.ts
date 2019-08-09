import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { take } from 'rxjs/operators';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {

  private onBlock;
  private onFindLocation;
  private ask: boolean;

  constructor(private toast: ToastService) { }

  autoLocate(onFindLocation, onBlock, ask = false) {
    this.onBlock = onBlock;
    this.onFindLocation = onFindLocation;
    this.ask = ask;
    from((navigator as any).permissions.query({ name: 'geolocation' }))
      .pipe(take(1))
      .subscribe(
        (result: any) => {
          this.locateIfGranted(result.state);
        }
      );
  }

  locateIfGranted(state) {
    if (state === 'denied') {
      this.onBlock();
      this.locationDenied();
    } else if (state === 'granted' || this.ask) {
      this.locate();
    } else {
      this.onBlock();
      this.locationDenied();
    }
  }

  locationDenied() {
    if (this.ask) {
      this.toast.warning('A localização está bloqueada');
    }
  }

  locate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const x = position.coords.longitude;
        const y = position.coords.latitude;
        this.onFindLocation(x, y);
      }, () => { }, this.geoOptions());
    }
  }

  private geoOptions(): object {
    return {
      maximumAge: 5 * 60 * 1000
    };
  }

}
