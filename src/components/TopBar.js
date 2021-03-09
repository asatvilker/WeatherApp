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
                <div class="topbar-spacing1">
                    <TempSwitch setSettings={this.props.setSettings}/>
                </div>
                <div class="topbar-spacing2">
                    <AddressBar setSettings={this.props.setSettings}/>
                </div>
                <div class="topbar-spacing1">
                    <Settings setSettings={this.props.setSettings}/>
                </div> 
            </div>
        )
    }
}
export default TopBar