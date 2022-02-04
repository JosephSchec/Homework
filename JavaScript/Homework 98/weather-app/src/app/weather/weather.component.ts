import { Component, EventEmitter, Input, Output } from '@angular/core';
import Weather from '../shared/Weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  @Input() zipCode?: number;
  @Input() weather!: Weather;
  @Output() zipcodeChosen = new EventEmitter<Number>();

  gotSelectedZip() {
    this.zipCode = Number(this.zipCode)
    this.zipcodeChosen.emit(this.zipCode)
  }
}
