import React, { Component } from "react";
import "./Settings.css";
import { MDBBox, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBBtn } from 'mdbreact';
import AddressBar from "../AddressBar/AddressBar";
import { Spin as Hamburger } from 'hamburger-react';

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
            document.getElementById('settingslist').style.animation = 'appear 0.7s linear';
        } else {
            document.getElementById('settingslist').style.animation = '';
        }
        this.setState({isSettingsOpen: !isSettingsOpen} );

    }

    //whenever a switch is switched, this method is called with respective fieldname, that willb then be passed in setSetting method in app.js
    handleChange = (event, fieldName)=> {
        this.props.setSettings({[fieldName]:!event.target.checked})
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
                                <input type="checkbox" id="togBtn" checked={!this.props.data.fullDay} onChange={(event) =>this.handleChange(event,"fullDay")}/>
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
                                <input type="checkbox" id="togBtn" checked={!this.props.data.celsius} onChange={(event) =>this.handleChange(event,"celsius")}/>
                                <div className="slider round b">
                                    <span className="on">F</span>
                                    <span className="off">C</span>
                                </div>
                            </label>
                            <div>F</div>
                        </div>

                        <div className="switchContainer">
                            <div id="windLeftDiv">km/h</div>
                            <label className="switch">
                                <input type="checkbox" id="togBtn" checked={!this.props.data.kmh} onChange={(event) =>this.handleChange(event,"kmh")}/>
                                <div className="slider round b">
                                    <span className="on">m/h</span>
                                    <span className="off">km/h</span>
                                </div>
                            </label>
                            <div>m/h</div>
                        </div>

                        <div className="switchContainer">
                            <div id="iconToText">text</div> {/*initial value*/}
                            <label className="switch">{/*Toggles settings button*/}
                                <input type="checkbox" id="togBtn" checked={!this.props.data.text} onChange={(event) =>this.handleChange(event,"text")}/>
                                <div className="slider round b">
                                    <span className="on">Icon</span> {/*Toggled value*/}
                                    <span className="off">Text</span> {/*initial value*/}
                                </div>
                            </label>
                            <div>icon</div> {/*Toggled value*/}
                        </div>

                        <div>
                            <MDBIcon far icon="thumbs-up" className="feedback"> Send Feedback </MDBIcon>
                        </div>
                        <div className="settings-header">Credits</div>
                        <div className="switchContainer">
                            Adam Satvilker,
                            Jay Patel,
                            Lian Arthofer,
                            Max Jayatillake,
                            Tarikh Mukhtar
                        </div>
                    </MDBBox>
                    </React.Fragment>
                )
            }
        }

        return(

            <div>
                {/*div settigns overlay used as filter when settings is open*/}
                {this.state.isSettingsOpen? <div className="settings-overlay" onClick={this.removeFocus} /> : null }
                <div className="settings-wrapper">
                    <div>
                        <Hamburger id="settingsIcon" toggled={this.state.isSettingsOpen} toggle={this.displaySettings} duration={0.8} rounded/>
                    </div>
                    <div id="settingslist" >
                        {/*addSettings is only displaying if issettingsOpen is true */}
                        {addSettings()}
                    </div>
                </div>
            </div>
            )
     }
}


export default Settings;
