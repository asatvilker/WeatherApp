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

    setSettings(newSettings) { //will adjust weather data when location is changed
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
        //new settings are put into state and then the api is called again to update the weather data stored in state
        this.setState(newSettings, function() {
            console.log("APP SETTINGS NOW: ", this.state);
            if (newSettings.hasOwnProperty("lat")) {
                console.log("APP: FETCHING NEW DATA");
                this.fetchData();
            }
        });
    }

    fetchData() { //fetches api data
        console.log("fetching");
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

    render() {
        return (
            <div className="App"> {/* Here we display the different components and pass through the required api data */}
                <Background date={this.state.date} timeZone={this.state.timezone}/>
                <Settings parentCallback={this.handleCallback} data={this.state.data} />
                <AddressBar setSettings={this.setSettings.bind(this)}/>{/* this function passed as props to address will cause the method in this class to run (setSettings()) and this will update location data and refresh the api weather data */}
                <Overview data={this.state}/>
                <Suggest hourly={this.state.hourly}/> 
                <Clothes hourly={this.state.hourly}/>
                <Daily data={this.state.daily} celsius={this.state.celsius}/>{/* celcius will tell us what unit of measure we need to use */}

            </div>
        )
    }
}


export default App;
