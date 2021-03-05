import React, { Component } from "react";
import {getHourForecastClimaCell, getMinuteData, getDayForecastClimaCell } from '../WeatherAPI'
import Settings from './Settings/Settings';
import AddressBar from "./AddressBar/AddressBar";
import TempSwitch from './TempSwitch/TempSwitch';
import './TopBar.css';

class TopBar extends Component{

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
    render(){
        return(
            <div className="topbar-parent">
                <TempSwitch/>
                <AddressBar setSettings={this.setSettings.bind(this)}/>
                <Settings/>
            </div>
        )
    }
}
export default TopBar