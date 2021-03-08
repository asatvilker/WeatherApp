import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBCollapse, MDBContainer, MDBIcon, MDBRow } from "mdbreact";
import '../DropDown/dropdown.css'
import './daily.css'
import { MDBAnimation } from "mdbreact";
import Card from '../DropDown/FcstComponent';
class Daily extends Component {
    state = {

    }

    componentDidMount() {


    }

    render() {
        return (
            <div id="daily">
                <p>Next {this.props.data.length} days</p>
                <MDBContainer className="d-flex flex-row hourlyContainer" style={{ margin: "0 0" }}>
                    {
                        this.props.data.map(data => {
                            var date = data.time.toString()
                            var time = date.split(" ")[4]
                            var hour = time.split(":")[0]
                            hour = hour.concat(":00")
                            var temp = Math.round(data.temperature)
                            var day = date.split(" ")[0]
                            return (
                                <Card hour={day} temp={temp} icon={data.weatherIcon} condition={data.weatherDesc} celsius={this.props.celsius} />
                            )
                        })
                    }
                </MDBContainer>
            </ div>
        );
    }
}

export default Daily;