import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBCollapse, MDBIcon, MDBRow } from "mdbreact";
import './dropdown.css'
import Dropdown from './dropdown';

class Overview extends Component {
state = {
  
}
componentDidMount(){
  console.log("helloooo")
  console.log(this.props.data.hourly[0].time)
  var date = this.props.data.hourly[0].time
  date = date.toString()
  this.setState({
    address:this.props.data.address,
    date:date
  })
}


render() {
  return (
      <>  
          <h1>{this.state.address}</h1>
          <p>{this.state.date}</p>
          <Dropdown data={this.props.data.hourly}/>
          <p>Press the button!</p>
    </>
    );
  }
}

export default Overview;