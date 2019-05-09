import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './header/search/search.component';
import { TitleComponent } from './header/title/title.component';
import { MainComponent } from './main/main.component';
import { WeatherResumeItemComponent } from './main/weather-resume-item/weather-resume-item.component';
import { WeatherResumeListComponent } from './main/weather-resume-list/weather-resume-list.component';








@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TitleComponent,
    SearchComponent,
    MainComponent,
    FooterComponent,
    WeatherResumeListComponent,
    WeatherResumeItemComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
