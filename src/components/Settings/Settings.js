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
        this.setState({isSettingsOpen: !isSettingsOpen} );   
    }   
    handleChange = (event, fieldName)=> {
        this.props.setSettings({[fieldName]:event.target.checked})
        if (fieldName ===("darkMode")){
            if (this.props.data.darkMode){
                document.getElementById("settings-colour").classList.remove('item-white');
                document.getElementById("settingslist").classList.remove('settings-suggestions-black');
            }
            else{
                document.getElementById("settings-colour").classList.add('item-white');
                document.getElementById("settingslist").classList.add('settings-suggestions-black');
            }
        }
    }

    removeFocus = event => {
        this.setState({
            isSettingsOpen: false
        });
    }

    render(){
        const {isSettingsOpen } = this.state;
        const addSettingsOverlay = () => {
            if (isSettingsOpen){
                return(
                    <React.Fragment>
                    <br />
                    <MDBBox id="settings-colour">
                            <div className="settings-header">Settings</div>
                            <div  class="custom-control custom-switch">
                                <input type="checkbox" class="custom-control-input" className="custom_switches" id="customSwitch1" checked={this.props.data.darkMode} onChange={ (event)=>this.handleChange(event,"darkMode")}></input>    
                                <label class="custom-control-label" for="customSwitch1"> Dark</label>
                                <label class="test12" > White</label> 
                            </div>

                            <div  class="custom-control custom-switch">
                                <input type="checkbox" class="custom-control-input" className="custom_switches" id="customSwitch2" checked={this.props.data.timePm} onChange={(event) =>this.handleChange(event,"timePm")}></input>    
                                <label class="custom-control-label" for="customSwitch2"> 12</label>
                                <label class="test12" >24</label> 
                            </div>
                            <div class="custom-control custom-switch">
                                <input type="checkbox" class="custom-control-input" className="custom_switches" id="customSwitch3" checked={this.props.data.celsius} onChange={(event) =>this.handleChange(event,"celsius")}></input>    
                                <label class="custom-control-label" for="customSwitch3">F</label>
                                <label class="test12" >C</label> 
                            </div>
                            <div class="custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" className="custom_switches" id="customSwitch4" checked={this.props.data.kmh} onChange={(event) =>this.handleChange(event,"kmh")}></input>    
                                <label class="custom-control-label" for="customSwitch4">km/h</label>
                                <label class="test12" >mph</label> 
                            </div>
                            <div className="switchContainer">
                                <div>White</div>
                                <label class="switch">
                                    <input type="checkbox" id="togBtn" checked={this.props.data.darkMode} onChange={ (event)=>this.handleChange(event,"darkMode")}/>
                                    <div class="slider round">
                                        <span class="on">Black</span>
                                        <span class="off">White</span>
                                    </div>
                                </label>
                                <div>Dark</div>
                            </div>
                            <div>
                                <MDBIcon far icon="thumbs-up" /> Send Feedback
                            </div>
                    </MDBBox>
                    </React.Fragment>
                )
            }
        }

        return(
            //div used as filter when settings is open
            <div>
                {this.state.isSettingsOpen? <div className="settings-overlay" onClick={this.removeFocus} /> : null }
                
                <div className="settings-wrapper">
                    <div>
                        <MDBIcon  class="settingsicon" icon="bars" size="2x"  onClick={this.displaySettings} />
                    </div>
                    <div id="settingslist" >
                        {addSettingsOverlay()}
                    </div>
                </div>
            </div>
            )
     }
}


export default Settings;
