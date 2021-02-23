import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBCollapse, MDBContainer, MDBIcon, MDBRow } from "mdbreact";
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
          <p>{this.props.condition}</p>
          <h2>{this.props.temp} &#8451;</h2>
        </MDBContainer>
    
    </ div>
    );
  }
}

export default HourlyComponent;