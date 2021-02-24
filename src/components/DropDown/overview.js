import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBCollapse, MDBContainer, MDBIcon, MDBRow } from "mdbreact";
import './dropdown.css'
import Dropdown from './dropdown';
import codes from '../codes.json';
class Overview extends Component {
state = {
  
}



render() {
  return (
      <>  
         <MDBRow className="pt-4">
            <MDBCol size="6" className="d-flex flex-column justify-content-center">
              <h1 style={{fontSize:"8vh",fontWeight:"400"}}>{Math.round(this.props.data.hourly[0].temperature)}</h1>
              <h1 style={{fontSize:"8vh",fontWeight:"400"}}>&#8451;</h1>
              <p>{`${this.props.address}, ${this.props.date.toString().split(" ")[0]}, ${this.props.date.toString().split(" ")[2]}`}</p>
            </MDBCol>
            <MDBCol size="6" className="d-flex flex-column justify-content-center" >
              <MDBIcon icon={codes[this.props.data.hourly[0].weatherDesc]} size="8x" className="weatherIcon"/>
            </MDBCol>
           
         </MDBRow> 
          <Dropdown data={this.props.data.hourly}/> {/* passing hourly info to dropdown for hourly forecast*/}
          <p>Press the button!</p>
    </>
    );
  }
}

export default Overview;