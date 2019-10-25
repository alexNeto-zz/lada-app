import { Component, OnInit } from '@angular/core';
import { LocationFinderService } from '@services/location/location-finder.service';
import { environment } from 'environments/environment';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  apiVersion: string;
  appVersion: string;

  constructor(private location: LocationFinderService) {
    this.apiVersion = '0.0.0';
    this.appVersion = '0.0.0';
  }

  ngOnInit() {
    this.appVersion = environment.appVersion;
    
    this.location.getAboutInfo().pipe(take(1)).subscribe(
      (res) => {
        this.apiVersion = res.api_version;
      }
    );
  }

}
