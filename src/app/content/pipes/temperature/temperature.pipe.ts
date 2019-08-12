import { formatNumber } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { SettingsService } from './../../services/settings/settings.service';

@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {

  constructor(private settings: SettingsService) { }

  transform(value: number, ...args: any[]): any {
    if (args[0] === 'F' || this.settings.temperatureScale === 'F') {
      return this.toFahrenheit(value);
    } else if (args[0] === 'K' || this.settings.temperatureScale === 'K') {
      return this.toKelvin(value);
    } else {
      return this.toCelsius(value);
    }
  }

  toCelsius(value: number): string {
    return this.toLocaleFormat(value) + 'ºC';
  }

  toFahrenheit(value: number): string {
    const result = (value * 9 / 5) + 32;
    return this.toLocaleFormat(result) + 'ºF';
  }

  toKelvin(value: number): string {
    const result = value + 273.15;
    return this.toLocaleFormat(result) + 'K';
  }

  toLocaleFormat(value: number): string {
    return formatNumber(value, this.settings.getLocale());
  }
}
