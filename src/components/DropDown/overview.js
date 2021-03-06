import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBCollapse, MDBContainer, MDBIcon, MDBRow } from "mdbreact";
import './dropdown.css'
import Dropdown from './dropdown';
import WeatherIcon from "../weatherIcons.js";

class Overview extends Component {
    state = {

    }
    componentDidMount() {

    }

    render() {
        return (
            <>
                <MDBRow className="pt-4 overview">
                    <MDBCol size="6">
                        {
                            this.props.data.hourly[0] == undefined ?
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>         {/*load a spinner until data is fully loaded, revents error */}
                                </div>

                                :   /* OR - depending on statement either code above will show or code below*/

                                <>
                                    <div className="overviewHeaderContainer">
                                        <h1 className="overviewHeader" >{Math.round(this.props.data.hourly[0].temperature)}</h1>
                                        <h1 className="overviewHeader" >&#176;{this.props.data.celsius ? "C" : "F"}</h1>
                                    </div>
                                    <p>{`${this.props.address}, ${this.props.date.toString().split(" ")[0]}, ${this.props.date.toString().split(" ")[2]}`}</p>
                                </>
                        }

                    </MDBCol>
                    <MDBCol size="6"  >
                        {
                            this.props.data.hourly[0] == undefined ?
                                <div>
                                </div>

                                :

                                <>
                                    <WeatherIcon iconName={this.props.data.hourly[0].weatherIcon} size="8x"></WeatherIcon>
                                </>
                        }

                    </MDBCol>
                </MDBRow>
                <Dropdown data={this.props.data.hourly} celsius={this.props.data.celsius} /> {/* passing hourly info to dropdown for hourly forecast*/}

            </>
        );
    }
}

export default Overview;