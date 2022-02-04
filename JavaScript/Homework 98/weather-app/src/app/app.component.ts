import { Component } from '@angular/core';
import Weather from './shared/Weather';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather-app';
  gotWeatherData!: Weather;

  weathers: Weather[] = [{
    main: "Clouds",
    description: "overcast clouds",
    temp: 44.46,
    feels_like: 44.46,
    name: "Lakewood",
  }, {
    main: "Clouds",
    description: "שברי ענן",
    temp: 74.61,
    feels_like: 75.06,
    name: "Miami",
  }];

  whichWeather(zip: Number) {
    if (zip == Number('08701')) {
      this.gotWeatherData = this.weathers[0];
    } else if (zip === Number('33142')) {
      this.gotWeatherData = this.weathers[1];
    }else{
      this.gotWeatherData={main:'',description:'',name:''}
    }
  }

}
