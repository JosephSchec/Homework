
import './App.css';
import React, { Component } from 'react'
import WeatherDetails, { getDetails } from './WeatherDetails';

export default class App extends Component {
  state = {
    zip: [
      '08701',
      '10314'
    ]

  }


  async componentDidMount() {
    this.setState({ weather: await getDetails('weather', this.state.zip[0]) });
    this.setState({ icon: await getDetails('icon', this.state.zip[0]) });
    this.setState({ temp: await getDetails('temp', this.state.zip[0]) });
  }

  render() {
    return (<>
      <WeatherDetails weather={this.state.weather} icon={this.state.icon} temp={this.state.temp} />
    </>
    )
  }
}




