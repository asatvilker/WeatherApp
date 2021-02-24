import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBCollapse, MDBContainer, MDBIcon, MDBRow } from "mdbreact";
import './dropdown.css'
import { MDBAnimation } from "mdbreact";
import HourlyComponent from './hourlyFcstComponent';
class Hourly extends Component {
state = {
  
}

componentDidMount(){
  
  
}

render() {
  return (
      <div id="hourly">
        <MDBContainer className="d-flex flex-row hourlyContainer">
            {
                this.props.data.map(data => {
                    var date = data.time.toString()
                    date= date.split(" ")[4]
                    var hour=date.split(":")[0]
                    hour=hour.concat(":00")
                    var temp=Math.round(data.temperature)
                    return(
                        <HourlyComponent hour={hour} temp={temp} condition={data.weatherDesc} celsius={this.props.celsius}/>
                    )
                    
                })
            }
        
        </MDBContainer>
    </ div>
    );
  }
}

export default Hourly;