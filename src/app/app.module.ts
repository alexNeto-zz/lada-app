import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePT from '@angular/common/locales/pt';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import * as Sentry from '@sentry/browser';
import { NgAutoCompleteModule } from 'ng-auto-complete';
import { ToolPanelComponent } from 'src/app/components/tool-panel/tool-panel.component';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { VoteComponent } from './components/vote/vote.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { WeatherListComponent } from './components/weather-list/weather-list.component';
import { TemperaturePipe } from './content/pipes/temperature/temperature.pipe';
import { SentryService } from './content/services/sentry/sentry.service';
import { SettingsService } from './content/services/settings/settings.service';
import { FontAwesomeLibraryModule } from './modules/font-awesome-library.module';
import { MainComponent } from './views/main/main.component';

registerLocaleData(localePT, 'pt');

Sentry.init({
  dsn: environment.sentryDsn
});


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ToggleComponent,
    TemperaturePipe,
    MainComponent,
    SearchComponent,
    VoteComponent,
    ToolPanelComponent,
    WeatherCardComponent,
    WeatherListComponent,
  ],
  imports: [
    FontAwesomeLibraryModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgAutoCompleteModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    SettingsService,
    {
      provide: LOCALE_ID,
      deps: [SettingsService],
      useFactory: (settingsService) => settingsService.getLocale()
    },
    { provide: ErrorHandler, useClass: SentryService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
