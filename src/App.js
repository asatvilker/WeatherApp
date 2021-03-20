import './App.css';
import Background from './components/Background/Background';
import {getHourForecastClimaCell, getMinuteData, getMinuteDataMicrosoft, getDailyDataMicrosoft,getHourDataMicrosoft, convertTZ, getDayForecastClimaCell, getOpenWeatherData } from './WeatherAPI'
import Overview from './components/DropDown/overview';
import TopBar from './components/TopBar'
import Daily from './components/daily/daily';
import Clothes from './components/clothes/clothes';
import Suggest from './components/suggestions/suggestion';
import React, { Component } from "react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 51.5073509,
            lon: -0.1277583,
            address: "London, UK",
            date: new Date(),
            hourly: [],
            minutely: [],
            daily: [],
            //settings variables
            bookmark:{},
            darkMode:false,
            timePm:false,
            celsius: true,
            kmh: false,
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
                        console.log("Bruh look at me",item)
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
        this.setState(newSettings, function() {
            console.log("APP SETTINGS NOW: ", this.state);
            if (newSettings.hasOwnProperty("lat")) {
                console.log("APP: FETCHING NEW DATA");
                this.fetchData();
            }
        });
    }

    //stores all bookmarks
    setBookmark=()=>{
        let currentBookmark = this.state.bookmark;
        currentBookmark[this.state.address]={"lat":this.state.lat, "lon":this.state.lon, "timezone": this.state.timezone};
        this.setState({Bookmark:currentBookmark});
    }

    fetchData() {
        console.log("fetching");
        console.log(this.state.hourly);
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
        console.log(this.state.hourly);
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

    //Reuse existing method pls
    handleCallback = (childData) =>{
      this.setState({data: childData})
    }

    render() {
        return (
            <div className="App">
                <Background date={this.state.date} timeZone={this.state.timezone}/>
                <TopBar setSettings={this.setSettings.bind(this)} data={this.state} setBookmark={this.setBookmark.bind(this)}/>
                <Overview data={this.state}/>
                <Suggest hourly={this.state.hourly}/> 
                <Clothes hourly={this.state.hourly}/>
                <Daily data={this.state.daily} celsius={this.state.celsius}/>
            </div>
        )
    }
}

export default App;
