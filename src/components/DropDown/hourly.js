import React, { Component } from "react";
import { MDBContainer } from "mdbreact";
import './dropdown.css'
import { MDBAnimation } from "mdbreact";
import Card from './FcstComponent';

class Hourly extends Component {
    state = {

    }

    componentDidMount() {


    }

    render() {
        return (
            <MDBContainer className="d-flex flex-row hourlyContainer" style={{ margin: "0 0" }}> {/*same idea as daily component (see daily.js) but not title and passing throught hour not day */}
                {
                    this.props.data.map(data => {
                        var date = data.time.toString()
                        date = date.split(" ")[4]//gives us the part of the date with the time
                        var hour = date.split(":")[0]//this specifically gets the hour
                        hour = hour.concat(":00")//we add on the 00 to make it easier to understand this is a time not just a number
                        var temp = Math.round(data.temperature)
                        return (
                            <Card hour={hour} temp={temp} icon={data.weatherIcon} condition={data.weatherDesc} celsius={this.props.celsius} />/*explained more in daily.js, here we are passing through the hour */
                        )
                    })
                }
            </MDBContainer>
        );
    }
}

export default Hourly;