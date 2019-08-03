import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { SearchDB } from './search-db.model';

@Injectable({
    providedIn: 'root'
})
export class AutoLocateModel {

    private onBlock;
    private onFindLocation;

    constructor(private searchDB: SearchDB) { }

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
            this.locate(this.onFindLocation);
        } else {
            this.onBlock();
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
