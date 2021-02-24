import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBCollapse, MDBContainer, MDBIcon, MDBRow } from "mdbreact";
import codes from '../codes.json';

class HourlyComponent extends Component {
    state = {
        hour:"",
        temp:"",
        condition:"",
    }

    componentDidMount(){
        this.setState({
            hour:this.props.hour,
            temp:this.props.temp,
            condition:this.props.condition
        })
    }

    render() {
        return (
            <div id="hourlyComponent">
                <MDBContainer className="d-flex flex-column justify-content-between">
                    <h1>{this.props.hour}</h1>
                    <MDBIcon icon={codes[this.props.condition]} size="3x" className="weatherIcon"/>
                    <p>{this.props.condition}</p>
                    <h2 style={{fontWeight:"400"}}>{this.props.temp} &#8451;</h2>
                </MDBContainer>
            </div>
        );
    }
}

export default HourlyComponent;