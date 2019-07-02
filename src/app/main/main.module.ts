import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { MainComponent } from './main.component';
import { WeatherResumeItemComponent } from './weather-resume-item/weather-resume-item.component';
import { WeatherResumeListComponent } from './weather-resume-list/weather-resume-list.component';

const mainModules = [
  MainComponent,
  WeatherResumeListComponent,
  WeatherResumeItemComponent,
];

@NgModule({
  declarations: [mainModules],
  exports: [mainModules],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class MainModule { }
