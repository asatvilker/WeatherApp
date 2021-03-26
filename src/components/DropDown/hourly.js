import React, { Component } from "react";
import { MDBContainer } from "mdbreact";
import './dropdown.css'
import { MDBAnimation } from "mdbreact";
import Card from './Card';

class Hourly extends Component {

    state = {}

    componentDidMount() {}

    render() {
        return (
            <MDBContainer className="d-flex flex-row hourlyContainer" style={{ margin: "0 0" }}> {/*same idea as daily component (see daily.js) but not title and passing throught hour not day */}
                {
                    this.props.data.map(data => {
                        
                        let ampm=data.time.getHours() >=12?'pm':'am' //if 12hr format we decide if it is am or pm, we will add this to end of time below after conversion
                        let hours = this.props.fullDay?(data.time.getHours() + ":00").padStart(5, "0"):(data.time.getHours()%12 || 12)+ ampm //decides the format the hour will be displayed in according to whether it is 24hr or 12 selected
                        let temp = Math.round(data.temperature);
                        return (
                            <Card time={hours} temp={temp} icon={data.weatherIcon} condition={data.weatherDesc} celsius={this.props.celsius} wind={data.wind} kmh={this.props.wind}/>/*explained more in daily.js, here we are passing through the hour */
                        )
                    })
                }
            </MDBContainer>
        );
    }
}

export default Hourly;