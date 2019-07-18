import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AutoLocateModel {


    public autoLocate(onFindLocation) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                onFindLocation(position.coords.longitude, position.coords.latitude);
            }, () => { }, this.geoOptions());
        }
    }

    private geoOptions(): object {
        return {
            maximumAge: 5 * 60 * 1000
        };
    }

}
