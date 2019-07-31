import { Injectable } from '@angular/core';
import { SearchDB } from './search-db.model';
import { from } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AutoLocateModel {


    constructor(private searchDB: SearchDB) { }

    autoLocate(onFindLocation, ask = false) {
        from((navigator as any).permissions.query({ name: 'geolocation' })).subscribe(
            (result: any) => {
                this.locateIfGranted(result.state, onFindLocation, ask);
            }
        );
    }

    locateIfGranted(state, onFindLocation, ask) {
        if (state === 'granted' || ask) {
            this.locate(onFindLocation);
        }
    }

    locate(onFindLocation) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const x = position.coords.longitude;
                const y = position.coords.latitude;
                onFindLocation(x, y);
                this.searchDB.updateLocation(x, y);
            }, () => { }, this.geoOptions());
        }
    }

    private geoOptions(): object {
        return {
            maximumAge: 5 * 60 * 1000
        };
    }

}
