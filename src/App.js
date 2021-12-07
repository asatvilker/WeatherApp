import './App.css';
import Background from './components/Background/Background';
import {getMinuteDataMicrosoft, getDailyDataMicrosoft,getHourDataMicrosoft, convertTZ, getOpenWeatherData } from './WeatherAPI'
import Overview from './components/DropDown/overview';
import TopBar from './components/TopBar'
import Daily from './components/daily/daily';
import Clothes from './components/clothes/clothesSection';
import React, { Component } from "react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 51.5073509,    //default lat of london
            lon: -0.1277583,    //default lon of london
            address: "London, UK", //default address to london
            date: new Date(),
            hourly: [],
            minutely: [],
            daily: [],
            api: "openweather",
            timezone: "Europe/London", //set default timezone to london
            data: "",
            //settings variables
            bookmark:{},
            celsius:true,
            kmh: true,
            fullDay: true,
            text: true
        }
    }


    setSettings(newSettings) {
        console.log("APP: NEW SETTINGS: ", newSettings); // console.log new settings for debugged
        if (newSettings.hasOwnProperty("daily")) {  // if daily forecasts are set
            this.applyConversions(newSettings["daily"]);    // apply conversions before setting them
        }
        if (newSettings.hasOwnProperty("hourly")) { // if hourly is set, apply convesions before setting them
            this.applyConversions(newSettings["hourly"]);  //
        }
        this.setState(newSettings, function() { // set the new data and when done
            if (newSettings.hasOwnProperty("lat")) {  // if the lattitude has been set, new address has been set
                this.fetchData();   // fetch data
            }
            if (newSettings.hasOwnProperty("celsius")) { // if celsius has been set
                this.convertTemperatureToggle();    // convert temperature based on toggle
            }
            if (newSettings.hasOwnProperty("kmh")) {    // if kmb has been set
                this.convertWindToggle();   // convert speed based on toggle
            }
        });
    }

    applyConversions(array) {
        array.map((item) => {
            item.temperature = this.state.celsius ? item.temperature : (9/5*item.temperature)+32; // leave as celsius or convert to farenheit based on toggle
            item.wind.speed.value = this.state.kmh ? item.wind.speed.value : item.wind.speed.value/1.609;   // leave as  kmh or convert mph based on toggle
            item.wind.speed.unit = this.state.kmh ? "km/h" : "m/h"; // set the speed unti based on toggle
            return (item)
        })
    }

    convertTemperatureToggle() {
        this.setState({hourly: this.state.hourly.map((item) => {
            item.temperature = this.state.celsius ? 5/9*(item.temperature-32) : (9/5*item.temperature)+32; // convert to celsius or farenheit based on toggle
            return (item)
        })});
        this.setState({daily: this.state.daily.map((item) => {
            item.temperature = this.state.celsius ? 5/9*(item.temperature-32) : (9/5*item.temperature)+32; // convert to celsius or farenheit based on toggle
            return (item)
        })});
    }

    convertWindToggle() {
        this.setState({hourly: this.state.hourly.map((item) => {
            item.wind.speed.value = this.state.kmh ? item.wind.speed.value*1.609 : item.wind.speed.value/1.609; // convert to kmh or mph based on toggle
            item.wind.speed.unit = this.state.kmh ? "km/h" : "m/h";
            return item;
        })});
        this.setState({daily: this.state.daily.map((item) => {
            item.wind.speed.value = this.state.kmh ? item.wind.speed.value*1.609 : item.wind.speed.value/1.609; // convert to kmh or mph based on toggle
            item.wind.speed.unit = this.state.kmh ? "km/h" : "m/h";
            return item;
        })});
    }

    fetchData() { //fetches api data
        console.log("APP: FETCHING NEW DATA");
        if (this.state.api == "openweather") { //checks which api provider is selected in state and uses that to get the relevant weather data
            getOpenWeatherData(this.state, this.setSettings.bind(this)); //gets all data required and as it is binded, it will update the state of this component with the new data
        } else if (this.state.api == "microsoft") {
            getMinuteDataMicrosoft(this.state, this.setSettings.bind(this));
            getHourDataMicrosoft(this.state, this.setSettings.bind(this));
            getDailyDataMicrosoft(this.state, this.setSettings.bind(this));
        }
        console.log(this.state.hourly);
    }

    fetchMinute() {
        
    }

    componentDidMount(){//when components first loads it will fetch the weather data
        this.fetchData();
        //this.hourlyUpdate = setInterval(getHourDataMicrosoft(this.state, this.setSettings.bind(this)), 1000 * 60 * 60);
       // this.minutelyUpdate = setInterval(getMinuteDataMicrosoft(this.state, this.setSettings.bind(this)), 1000 * 60 * 5);
        //this.dailyUpdate = setInterval(getDailyDataMicrosoft(this.state, this.setSettings.bind(this)), 1000 * 60 * 60 * 24);
    }

    componentWillUnmount() {
        clearInterval(this.timerIntervalID);
        clearInterval(this.hourlyUpdate);
        clearInterval(this.minutelyUpdate);
        clearInterval(this.dailyUpdate);
    }

    //Reuse existing method pls
    handleCallback = (childData) =>{
      this.setState({data: childData})
    }
    //setting the bookmark by coping it in to a variable and changing it, so the state is not altered
    setBookmark=()=>{
        let currentBookmark = this.state.bookmark;
        currentBookmark[this.state.address]={"lat":this.state.lat, "lon":this.state.lon, "timezone": this.state.timezone};
        this.setState({Bookmark:currentBookmark});
    }
    //same logic as setbookmark, the state bookmark is copied to a variable which is then changed and used in the setState function
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
                <Clothes hourly={this.state.hourly} minutely={this.state.minutely} timeZone={this.state.timezone} celsius={this.state.celsius} text={this.state.text}/>
                <Daily data={this.state.daily} celsius={this.state.celsius} text={this.state.text}/>{/* celcius will tell us what unit of measure we need to use */}
            </div>
        )
    }
}

export default App;
