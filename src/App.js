import logo from './logo.svg';
import './App.css';
import Overview from './components/DropDown/overview';
import AddressBar from "./components/AddressBar/AddressBar";
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
            minutely: [{temperature: 0}],
            daily: []
        }
    }

    setSettings(newSettings) {
        console.log("hello");
        this.setState(newSettings);
        //refresh data
        if (newSettings.hasOwnProperty("lat")) {
            console.log("Ran update");
            getHourForecastClimaCell(this.state, this.setSettings.bind(this));
            getMinuteData(this.state, this.setSettings.bind(this));
            getDayForecastClimaCell(this.state, this.setSettings.bind(this));
        }
    }
    
    render() {
        return (
            <div className="App">
                <Overview />
                <AddressBar setSettings={this.setSettings.bind(this)}/>
            </div>
        )
    }
}

export default App;
