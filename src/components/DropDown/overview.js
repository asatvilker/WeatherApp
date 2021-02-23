import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBCollapse, MDBIcon, MDBRow } from "mdbreact";
import './dropdown.css'
import Dropdown from './dropdown';

class Overview extends Component {
state = {
  
}


render() {
  return (
      <>
          <Dropdown />
          <p>Press the button!</p>
    </>
    );
  }
}

export default Overview;