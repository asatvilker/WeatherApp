import React, { Component } from "react";
import {getHourForecastClimaCell, getMinuteData, getDayForecastClimaCell } from '../WeatherAPI'
import { MDBIcon } from 'mdbreact';
import BookMark from "./BookMark/BookMark";
import Settings from './Settings/Settings';
import AddressBar from "./AddressBar/AddressBar";
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
                    <BookMark setSettings={this.props.setSettings} data={this.props.data}  removeBookmark={this.props.removeBookmark} />
                </div>
                <div class="topbar-spacing2">
                    <AddressBar setSettings={this.props.setSettings} setBookmark={this.props.setBookmark} data={this.props.data} removeBookmark={this.props.removeBookmark} />
                </div>
                <div class="topbar-spacing1">
                    <Settings setSettings={this.props.setSettings} data={this.props.data}/>
                </div> 
            </div>
        )
    }
}
export default TopBar