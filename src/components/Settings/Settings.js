import React, { Component } from "react";
import "./Settings.css";
import { MDBBox, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdbreact';

class Settings extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isListOpen: false,
            focus: false
        }
        this.setFocus = this.setFocus.bind(this);
        
    }
    
    setFocus(e) {
        const {focus} = this.state;
        if (focus){
            this.setState({
                focus: false,
                isListOpen: false
            });
        }
        else{
            this.setState({
                focus: true,
                isListOpen: true
            }); 
        }
    }


    render(){
        const {focus, isListOpen } = this.state;
        const addOverlay = () => {
            if (focus) {
                return <div className="address-overlay" />
            }
        }
        const addSettingsOverlay = () => {
            if (isListOpen){
                return(
                    <React.Fragment>
                    <br />
                    <MDBBox className='Container'>
                      <MDBIcon fab icon="creative-commons-by" /> Accessibility
                      <hr />
                      <MDBIcon icon="info-circle" /> Info
                      <br />
                      <br />
                      
                    </MDBBox>
                  </React.Fragment>
                )
            }
        }

        return(
            <div>
                {addOverlay()}
                <div className="settings-wrapper">
                    <div>
                        <MDBIcon icon="bars" size="3x" onClick={this.setFocus} /> 
                    </div>
                    <div className="settings-suggestions">
                        {addSettingsOverlay()}
                    </div> 
                </div>
            </div>
            )
     }
}


export default Settings;