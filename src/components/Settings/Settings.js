import React, { Component } from "react";
import "./Settings.css";
import { MDBBox, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBBtn } from 'mdbreact';
import AddressBar from "../AddressBar/AddressBar";

class Settings extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isSettingsOpen: false,
        }
    }

   //display settings when button is clicked 
    displaySettings = event => {
        const {isSettingsOpen} = this.state;
        if(!isSettingsOpen) {
            document.getElementById('settingslist').style.animation = 'appear 1s ease';
        } 
        this.setState({isSettingsOpen: !isSettingsOpen} );
        
    }  

    handleChange = (event, fieldName)=> {
        this.props.setSettings({[fieldName]:event.target.checked})
    }

    removeFocus = event => {
        this.setState({
            isSettingsOpen: false
        });
        
    }

    render(){
        const {isSettingsOpen } = this.state;
        const addSettings= () => {
            if (isSettingsOpen){
                return(
                    <React.Fragment>
                    <br />
                    <MDBBox id="settings-colour">
                        <div className="settings-header">Settings</div>
                        <div className="switchContainer">
                            <div>24H</div>
                            <label className="switch">
                                <input type="checkbox" id="togBtn" checked={this.props.data.timePm} onChange={(event) =>this.handleChange(event,"timePm")}/>
                                <div className="slider round b">
                                    <span className="on">12H</span>
                                    <span className="off">24H</span>
                                </div>
                            </label>
                            <div>12H</div>
                        </div>

                        <div className="switchContainer">
                            <div>C</div>
                            <label className="switch">
                                <input type="checkbox" id="togBtn" checked={this.props.data.celsius} onChange={(event) =>this.handleChange(event,"celsius")}/>
                                <div className="slider round b">
                                    <span className="on">F</span>
                                    <span className="off">C</span>
                                </div>
                            </label>
                            <div>F</div>
                        </div>

                        <div className="switchContainer">
                            <div>km/h</div>
                            <label className="switch">
                                <input type="checkbox" id="togBtn" checked={this.props.data.kmh} onChange={(event) =>this.handleChange(event,"kmh")}/>
                                <div className="slider round b">
                                    <span className="on">mph</span>
                                    <span className="off">km/h</span>
                                </div>
                            </label>
                            <div>mph</div>
                        </div>
                        
                        <div>
                            <MDBIcon far icon="thumbs-up" className="feedback"> Send Feedback </MDBIcon>
                        </div>
                    </MDBBox>
                    </React.Fragment>
                )
            }
        }

        return(
            //div settigns overlay used as filter when settings is open
            <div>
                {this.state.isSettingsOpen? <div className="settings-overlay" onClick={this.removeFocus} /> : null }
                <div className="settings-wrapper">
                    <div>
                        <MDBIcon  className="settingsicon" icon="bars" size="2x"  onClick={this.displaySettings} />
                    </div>
                    <div id="settingslist" >
                        {addSettings()}
                    </div>
                </div>
            </div>
            )
     }
}


export default Settings;
