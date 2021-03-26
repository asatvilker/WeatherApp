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
            celsius:true,
            kmh: true,
            api: "microsoft",
            timezone: "Europe/London",
            data: "",
            fullDay: true,
        }
    }


    setSettings(newSettings) {
        console.log("APP: NEW SETTINGS: ", newSettings);
        if (newSettings.hasOwnProperty("daily")) {
            this.applyConversions(newSettings["daily"]);
        }
        if (newSettings.hasOwnProperty("hourly")) {
            this.applyConversions(newSettings["hourly"]);
        }
        this.setState(newSettings, function() {
            if (newSettings.hasOwnProperty("lat")) {
                this.fetchData();
            }
            if (newSettings.hasOwnProperty("celsius")) {
                this.convertTemperatureToggle();
            }
            if (newSettings.hasOwnProperty("kmh")) {
                this.convertWindToggle();
            }
        });
    }

    applyConversions(array) {
        array.map((item) => {
            item.temperature = this.state.celsius ? item.temperature : (9/5*item.temperature)+32;
            item.wind.speed.value = this.state.kmh ? item.wind.speed.value : item.wind.speed.value/1.609;
            item.wind.speed.unit = this.state.kmh ? "km/h" : "m/h";
            return (item)
        })
    }

    convertTemperatureToggle() {
        this.setState({hourly: this.state.hourly.map((item) => {
            item.temperature = this.state.celsius ? 5/9*(item.temperature-32) : (9/5*item.temperature)+32;
            return (item)
        })});
        this.setState({daily: this.state.daily.map((item) => {
            item.temperature = this.state.celsius ? 5/9*(item.temperature-32) : (9/5*item.temperature)+32;
            return (item)
        })});
    }
    
    convertWindToggle() {
        this.setState({hourly: this.state.hourly.map((item) => {
            item.wind.speed.value = this.state.kmh ? item.wind.speed.value*1.609 : item.wind.speed.value/1.609;
            item.wind.speed.unit = this.state.kmh ? "km/h" : "m/h";
            return item;
        })});
        this.setState({daily: this.state.daily.map((item) => {
            item.wind.speed.value = this.state.kmh ? item.wind.speed.value*1.609 : item.wind.speed.value/1.609;
            item.wind.speed.unit = this.state.kmh ? "km/h" : "m/h";
            return item;
        })});
    }

    fetchData() { //fetches api data
        console.log("APP: FETCHING NEW DATA");
        if (this.state.api == "openweather") { //checks which api provider is selected in state and uses that to get the relevant weather data
            getOpenWeatherData(this.state, this.setSettings.bind(this)); //gets all data required and as it is binded, it will update the state of this component with the new data
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

    componentDidMount(){//when components first loads it will fetch the weather data
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

    setBookmark=()=>{
        let currentBookmark = this.state.bookmark;
        currentBookmark[this.state.address]={"lat":this.state.lat, "lon":this.state.lon, "timezone": this.state.timezone};
        this.setState({Bookmark:currentBookmark});
    }

    removeBookmark=(name)=>{
        let newBookmark = this.state.bookmark;
        delete newBookmark[name]
        this.setState({Bookmark:newBookmark})
    }
   
    render() {
        return (
            <div className="App"> {/* Here we display the different components and pass through the required api data */}
                <Background date={this.state.date} timeZone={this.state.timezone}/>
                <TopBar setSettings={this.setSettings.bind(this)} data={this.state} setBookmark={this.setBookmark.bind(this)} removeBookmark={this.removeBookmark.bind(this)}/>
                <Overview data={this.state} />
                <Suggest hourly={this.state.hourly} celsius={this.state.celsius}/> 
                <Clothes hourly={this.state.hourly} timeZone={this.state.timezone} celsius={this.state.celsius}/>
                <Daily data={this.state.daily} celsius={this.state.celsius}/>{/* celcius will tell us what unit of measure we need to use */}
            </div>
        )
    }
}

export default App;
