import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBCollapse, MDBContainer, MDBIcon, MDBRow } from "mdbreact";
import './dropdown.css'
import Dropdown from './dropdown';
import codes from '../codes.json';

class Overview extends Component {
    state = {
    
    }
    componentDidMount(){
       
    }

    render() {
        return (
            <>  
                <MDBRow className="pt-4">
                    <MDBCol size="6" className="d-flex flex-column justify-content-center">
                        {
                            this.props.data.hourly[0] == undefined? 
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span>         {/*load a spinner until data is fully loaded, revents error */}
                                </div>
                                
                                :   /* OR - depending on statement either code above will show or code below*/
                                
                                <>
                                    <div style={{display: "flex"}}>
                                        <h1 style={{fontSize:"8vh",fontWeight:"400"}}>{Math.round(this.props.data.hourly[0].temperature)}</h1>
                                        <h1 style={{fontSize:"8vh",fontWeight:"400"}}>&#176;{this.props.data.celsius ? "C" : "F"}</h1>
                                    </div>
                                    <p>{`${this.props.address}, ${this.props.date.toString().split(" ")[0]}, ${this.props.date.toString().split(" ")[2]}`}</p>
                                </>
                        }
                        
                    </MDBCol>
                    <MDBCol size="6" className="d-flex flex-column justify-content-center" >
                        {
                            this.props.data.hourly[0] == undefined? 
                                <div>
                                </div>
                                
                                :

                                <>
                                    <MDBIcon icon={codes[this.props.data.hourly[0].weatherDesc]} size="8x" className="weatherIcon"/>
                                </>
                        }
                        
                    </MDBCol>
                </MDBRow> 
                <Dropdown data={this.props.data.hourly} celsius={this.props.data.celsius}/> {/* passing hourly info to dropdown for hourly forecast*/}
               
            </>
        );
    }
}

export default Overview;