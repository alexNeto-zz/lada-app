import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePT from '@angular/common/locales/pt';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HeaderComponent } from '@components/header/header.component';
import { SearchComponent } from '@components/search/search.component';
import { ToolPanelComponent } from '@components/tool-panel/tool-panel.component';
import { VoteComponent } from '@components/vote/vote.component';
import { WeatherCardComponent } from '@components/weather-card/weather-card.component';
import { WeatherListComponent } from '@components/weather-list/weather-list.component';
import { FontAwesomeLibraryModule } from '@modules/font-awesome-library.module';
import { TemperaturePipe } from '@pipes/temperature/temperature.pipe';
import * as Sentry from '@sentry/browser';
import { SentryService } from '@services/sentry/sentry.service';
import { SettingsService } from '@services/settings/settings.service';
import { MainComponent } from '@views/main/main.component';
import { environment } from 'environments/environment';
import { NgAutoCompleteModule } from 'ng-auto-complete';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

registerLocaleData(localePT, 'pt');

Sentry.init({
  dsn: environment.sentryDsn
});


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
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
