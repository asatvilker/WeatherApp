import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBCollapse, MDBContainer, MDBIcon, MDBRow } from "mdbreact";
import '../DropDown/dropdown.css'
import './daily.css'
import { MDBAnimation } from "mdbreact";
import Card from '../DropDown/Card';

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

class Daily extends Component {
    state = {
    }

    componentDidMount() {


    }

    render() {
        return (
            <div id="daily">
                <p>Next 7 days</p> {/* shows forecast for 7 days*/}
                <MDBContainer className="d-flex flex-row hourlyContainer" style={{ margin: "0 0" }}> {/*bootsrap classes to make display felex and as a row */}
                    {
                        this.props.data.slice(1,8).map(data => { /* loops through each element (each day) */
                            let day = days[data.time.getDay()]; //converting date to string
                            let temp = Math.round(data.temperature); //rounding temperature so easier to read
                            return (
                                <Card time={day} temp={temp} icon={data.weatherIcon} condition={data.weatherDesc} celsius={this.props.celsius} wind={data.wind} kmh={this.props.kmh}/>
                                /*card element is reused for daily and hourly as they should look the same, only difference for each card is here we pass through the day not the hour */
                            )
                        })
                    }
                </MDBContainer>
            </ div>
        );
    }
}

export default Daily;