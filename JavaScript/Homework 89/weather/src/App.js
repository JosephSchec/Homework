
import './App.css';
import React, { Component } from 'react'
import WeatherDetails, { getWeather, getIcon, getTemp } from './WeatherDetails';

export default class App extends Component {
  state = {
    zip: '08701',
    zip2: '10314'
  }


  async componentDidMount() {
    this.setState({ weather: await getWeather(this.state.zip) });
    this.setState({ icon: await getIcon(this.state.zip) });
    this.setState({ temp: await getTemp(this.state.zip) });
  }

  render() {
    return (<>
      <WeatherDetails weather={this.state.weather} icon={this.state.icon} temp={this.state.temp} />
    </>
    )
  }
}




