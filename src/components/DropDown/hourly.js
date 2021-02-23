import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBCollapse, MDBContainer, MDBIcon, MDBRow } from "mdbreact";
import './dropdown.css'
import { MDBAnimation } from "mdbreact";
import HourlyComponent from './hourlyFcstComponent';
class Hourly extends Component {
state = {
  hour:"10:00",
  temp:"22",
  condition:"Cloudy",
}

componentDidMount(){
  
}

render() {
  return (
      <div id="hourly">
        <MDBContainer className="d-flex flex-row hourlyContainer">
          <HourlyComponent hour={this.state.hour} temp={this.state.temp} condition={this.state.condition}/>
          <HourlyComponent hour={this.state.hour} temp={this.state.temp} condition={this.state.condition}/>
          <HourlyComponent hour={this.state.hour} temp={this.state.temp} condition={this.state.condition}/>
          <HourlyComponent hour={this.state.hour} temp={this.state.temp} condition={this.state.condition}/>
          <HourlyComponent hour={this.state.hour} temp={this.state.temp} condition={this.state.condition}/>
          <HourlyComponent hour={this.state.hour} temp={this.state.temp} condition={this.state.condition}/>
        </MDBContainer>
    
    </ div>
    );
  }
}

export default Hourly;