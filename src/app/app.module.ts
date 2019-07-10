import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { HeaderComponent } from './header/header.component';
import { ToolPanelComponent } from './tool-panel/tool-panel.component';
import { VoteComponent } from './components/vote/vote.component';
import { UpVoteComponent } from './svg/up-vote/up-vote.component';
import { DownVoteComponent } from './svg/down-vote/down-vote.component';
import { WeatherCardComponent } from './content/weather-card/weather-card.component';
import { WeatherListComponent } from './content/weather-list/weather-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ToolPanelComponent,
    ToggleComponent,
    SearchComponent,
    VoteComponent,
    UpVoteComponent,
    DownVoteComponent,
    WeatherCardComponent,
    WeatherListComponent,
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
