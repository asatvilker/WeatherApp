import './App.css';
import Background from './components/Background/Background';
import {getHourForecastClimaCell, getMinuteData, getMinuteDataMicrosoft, getDailyDataMicrosoft,getHourDataMicrosoft, convertTZ, getDayForecastClimaCell, getOpenWeatherData } from './WeatherAPI'
import Overview from './components/DropDown/overview';
import AddressBar from "./components/AddressBar/AddressBar";
import Daily from './components/daily/daily';
import Clothes from './components/clothes/clothes';
import Settings from './components/Settings/Settings';
import Suggest from './components/suggestions/suggestion';
import React, { Component } from "react";
import Chart from "./components/Chart/Chart";

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
            api: "microsoft",
            timezone: "Europe/London",
            data: ""
        }
    }

    setSettings(newSettings) {
        console.log("APP: NEW SETTINGS: ", newSettings);
        if (newSettings.hasOwnProperty("celsius")) {
            if (newSettings.celsius != this.state.celsius) {
                if (newSettings.celsius) {
                    newSettings["hourly"] = this.state.hourly.map((item) => {
                        item.temperature = 5/9*(item.temperature-32);
                        return (item)
                    });
                    newSettings["daily"] = this.state.daily.map((item) => {
                        item.temperature = 5/9*(item.temperature-32);
                        return (item)
                    });
                } else {
                    newSettings["hourly"] = this.state.hourly.map((item) => {
                        item.temperature = (9/5*item.temperature)+32;
                        return (item)
                    });
                    newSettings["daily"] = this.state.daily.map((item) => {
                        item.temperature =  (9/5*item.temperature)+32;
                        return (item)
                    });
                }
            }
        }
        this.setState(newSettings);
        if (newSettings.hasOwnProperty("lat")) {
            console.log("APP: FETCHING NEW DATA");
            this.fetchData();
        }
    }

    fetchData() {
        console.log("fetching");
        if (this.state.api == "openweather") {
            getOpenWeatherData(this.state, this.setSettings.bind(this));
        } else if (this.state.api == "climacell") {
            getHourForecastClimaCell(this.state, this.setSettings.bind(this));
            getMinuteData(this.state, this.setSettings.bind(this));
            getDayForecastClimaCell(this.state, this.setSettings.bind(this));
        } else if (this.state.api == "microsoft") {
            getMinuteDataMicrosoft(this.state, this.setSettings.bind(this)); 
            getHourDataMicrosoft(this.state, this.setSettings.bind(this)); 
            getDailyDataMicrosoft(this.state, this.setSettings.bind(this));
        }
    }

    componentDidMount(){
        this.fetchData();
    }

    componentWillUnmount() {
        clearInterval(this.timerIntervalID);
    }

    componentWillUnmount() {
        console.log("APP: UPDATED");
    }

    handleCallback = (childData) =>{
      this.setState({data: childData})
    }

    render() {
        return (
            <div className="App">
                <Chart data={this.state.minutely.map((item) => item.intensity)}/>
                {<Background date={this.state.date}/>}
                <Settings parentCallback={this.handleCallback} data={this.state.data} />
                <AddressBar setSettings={this.setSettings.bind(this)}/>
                <Overview data={this.state} address={this.state.address} timeZone={this.state.timezone}/>
                <Suggest data={this.state} hourly={this.state.hourly}/>
                <Clothes data={this.state} hourly={this.state.hourly}/>
                <Daily data={this.state.daily} celsius={this.state.celsius}/>
            </div>
        )
    }
}


export default App;
