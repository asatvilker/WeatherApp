import './App.css';
import {getHourForecastClimaCell, getMinuteData, getDayForecastClimaCell } from './WeatherAPI'
import Overview from './components/DropDown/overview';
import TopBar from './components/TopBar'
import Daily from './components/daily/daily';
import Clothes from './components/clothes/clothes';
import React, { Component } from "react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 51.5073509,
            lon: -0.1277583,
            address: "London, UK",
            celsius: true,
            date: new Date(),
            hourly: [],
            minutely: [],
            daily: [],
        }
    }

    setSettings(newSettings) {
        console.log("APP: NEW SETTINGS: ", newSettings);
        if (newSettings.hasOwnProperty("celsius")) {
            if (newSettings.celsius != this.state.celsius) {
                if (newSettings.celsius) {
                    //convert to celsius
                    newSettings["hourly"] = this.state.hourly.map((item) => {
                        item.temperature = 5/9*(item.temperature-32);
                        return (item)
                    });
                    newSettings["daily"] = this.state.hourly.map((item) => {
                        item.temperature = 5/9*(item.temperature-32);
                        return (item)
                    });
                } else {
                    //convert to faren
                    newSettings["hourly"] = this.state.hourly.map((item) => {
                        item.temperature = (9/5*item.temperature)+32;
                        return (item)
                    });
                    newSettings["daily"] = this.state.hourly.map((item) => {
                        item.temperature =  (9/5*item.temperature)+32;
                        return (item)
                    });
                }
            }
        }
        this.setState(newSettings);
        //refresh data
        if (newSettings.hasOwnProperty("lat")) {
            console.log("APP: FETCHING NEW DATA");
            getHourForecastClimaCell(this.state, this.setSettings.bind(this));
            getMinuteData(this.state, this.setSettings.bind(this));
            getDayForecastClimaCell(this.state, this.setSettings.bind(this));
        }
    }

    componentDidMount(){
        getHourForecastClimaCell(this.state, this.setSettings.bind(this));
        getMinuteData(this.state, this.setSettings.bind(this));
        getDayForecastClimaCell(this.state, this.setSettings.bind(this));
    }
    
    render() {
        return (
            <div className="App">
                <TopBar setSettings={this.setSettings.bind(this)}/>
                <Overview data={this.state} date={this.state.date} address={this.state.address}/>
                <Clothes data={this.state} hourly={this.state.hourly}/>
                <Daily data={this.state.daily} celsius={this.state.celsius}/>
            </div>
        )
    }
}

export default App;
