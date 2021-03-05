import React, { Component } from "react";
import {getHourForecastClimaCell, getMinuteData, getDayForecastClimaCell } from '../WeatherAPI'
import Settings from './Settings/Settings';
import AddressBar from "./AddressBar/AddressBar";
import TempSwitch from './TempSwitch/TempSwitch';
import './TopBar.css';

class TopBar extends Component{

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log("TOPBAR: ", this.state);
    }

    render(){
        return(
            <div className="topbar-parent">
                <TempSwitch setSettings={this.props.setSettings}/>
                <AddressBar setSettings={this.props.setSettings}/>
                <Settings/>
            </div>
        )
    }
}
export default TopBar