import React, { Component } from "react";
import {MDBBtn, MDBCol, MDBCollapse, MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import WeatherIcon from "../weatherIcons.js";
class Card extends Component {
    state = {
        hour:"",
        temp:"",
        condition:"",
    }

    render() {
        return (
            <MDBContainer className="card"> {/*although the classname is hourly, this was because originally for just hourly but was then abstracted to reuse for daily too, thats why component was renamed to just card */}
                <WeatherIcon iconName={this.props.icon} size="9vh"></WeatherIcon> {/*displays icon component passing through name of icon */}
                <h1>{this.props.time}</h1> {/*if hourly then this displays hour, if daily it will be the day */}
                <p>{this.props.condition}</p>
                <p>{this.props.wind.speed.value.toFixed(1)}{this.props.wind.speed.unit}</p>
                <h2 style={{fontWeight:"400"}}>{this.props.temp}&#176;{this.props.celsius ? "C" : "F"}</h2> {/*checks if in celcius or farenheight, displays appropriate symbol */}
            </MDBContainer>

        );
    }
}

export default Card;