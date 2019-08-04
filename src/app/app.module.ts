import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgAutoCompleteModule } from 'ng-auto-complete';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { VoteComponent } from './components/vote/vote.component';
import { WeatherCardComponent } from './content/weather-card/weather-card.component';
import { WeatherListComponent } from './content/weather-list/weather-list.component';
import { HeaderComponent } from './header/header.component';
import { ToolPanelComponent } from './tool-panel/tool-panel.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ToolPanelComponent,
    ToggleComponent,
    SearchComponent,
    VoteComponent,
    WeatherCardComponent,
    WeatherListComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgAutoCompleteModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
