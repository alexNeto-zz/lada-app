import { Injectable } from '@angular/core';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {

  private onBlock;
  private onFindLocation;

  constructor() { }

  autoLocate(onFindLocation, onBlock, ask = false) {
    this.onBlock = onBlock;
    this.onFindLocation = onFindLocation;
    from((navigator as any).permissions.query({ name: 'geolocation' })).subscribe(
      (result: any) => {
        this.locateIfGranted(result.state, ask);
      }
    );
  }

  locateIfGranted(state, ask) {
    if (state === 'denied') {
      this.onBlock();
    } else if (state === 'granted' || ask) {
      this.locate();
    } else {
      this.onBlock();
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
