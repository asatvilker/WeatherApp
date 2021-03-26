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
                        let hours = data.time.toLocaleTimeString("en-us", {hour12: !this.props.fullDay, hour: "2-digit", minute: this.props.fullDay ? "2-digit" : undefined})
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