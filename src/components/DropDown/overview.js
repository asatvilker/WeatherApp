import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBCollapse, MDBContainer, MDBIcon, MDBRow } from "mdbreact";
import { convertTZ } from "../../WeatherAPI";
import './dropdown.css'
import Dropdown from './dropdown';
import WeatherIcon from "../weatherIcons.js";

class Overview extends Component {
    state = {
        date: new Date(),
        open: false
    }

    toggleCollapse = () => () => { //function to toggle the state of the dropdown
        console.log(this.state);
        this.setState(prevState => ({
            open: !prevState.open
        })); //switches the state of the dropdown in state, causing the bootstrap dropdown to open and close (alternates between height:0 and height:100%)
        // var element = document.getElementsByClassName("dropButton")[0] //gets the button elelment for the dropdown
        // element.classList.contains("turn")? element.classList.remove("turn"): element.classList.add("turn") //adding class to spin button when selected
    }

    componentDidMount() {
        this.timerIntervalID = setInterval(
            () => this.setState({date: convertTZ(new Date(), this.props.data.timeZone)}), 1000
        );   
    }

    componentWillUnmount() {
        clearInterval(this.timerIntervalID);
    }

    render() {
        return (
            <>
                <MDBRow className="pt-4 overview" onClick={this.toggleCollapse()}> {/*This component is for the overview section which consists of current time, weather, then also the dropdown component, which then contains the hourly sections (see dropdown.js) */}
                    <MDBCol size="6">{/*splitting overview into 2 columns, one for the data, one for the icon of current temperature */}
                        {
                            this.props.data.hourly[0] == undefined ? //important- has to check data has been passed through or on initital load it will be undefined and cause an error, this waits for props to update and only displays when data is available
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>         {/*load a spinner until data is fully loaded- bootstrap spinner */}
                                </div>

                                :   /* OR - depending on statement either code above will show or code below*/

                                <>
                                    <div className="overviewHeaderContainer">
                                        <h1 className="overviewHeader" >{Math.round(this.props.data.hourly[0].temperature)}</h1>{/*shows temperature of first hour in array as this would be now */}
                                        <h1 className="overviewHeader" >&#176;{this.props.data.celsius ? "C" : "F"}</h1>{/*conditional display of correct symbol */}
                                    </div>
                                    <p>{`${this.props.data.address}, ${this.state.date.toLocaleTimeString("en-US", {timeZone: this.props.data.timezone})}, ${this.state.date.getDate()}`}</p> {/*extra information on location, time */}
                                </>
                        }

                    </MDBCol>
                    <MDBCol size="6"  >
                        {
                            this.props.data.hourly[0] == undefined ? /*same as above, waits for data to be passed through, prevent crash  */
                                <div>
                                </div>

                                :

                                <>
                                    <WeatherIcon iconName={this.props.data.hourly[0].weatherIcon} size="20vh"></WeatherIcon> {/*displaying icon using the icon component defined in weatherIcons.js */}
                                </>
                        }

                    </MDBCol>
                </MDBRow>
                <Dropdown data={this.props.data.hourly} celsius={this.props.data.celsius} open={this.state.open} toggleCollapse={this.toggleCollapse}/> {/* passing hourly info to dropdown for hourly forecast*/}

            </>
        );
    }
}

export default Overview;