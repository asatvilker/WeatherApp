import React, { Component } from "react";
import "./Settings.css";
import { MDBBox, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBBtn } from 'mdbreact';
import AddressBar from "../AddressBar/AddressBar";
import TempSwitch  from "../TempSwitch/TempSwitch";

class Settings extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isSettingsOpen: false,

            isLightTheme:false
        }
    }

    setFocus = event => {
        const {isSettingsOpen} = this.state;
        console.log(this.state)
        if (isSettingsOpen){
            this.setState({isSettingsOpen: false} );   
        }
        else{
            this.setState({ isSettingsOpen: true}, ()=>{console.log(this.state) });
        } 
    }   

    setThemeDark = event =>{
        this.setState({isLightTheme:false})
         
    }    
    setThemeLight= event =>{
        this.setState({isLightTheme:true})
        
    }

    render(){
        const {isSettingsOpen } = this.state;
        const addSettingsOverlay = () => {
            if (isSettingsOpen){
                return(
                    <React.Fragment>
                    <br />
                    <MDBBox className='Container'>
                        <div className="settings-header">Settings</div>
                            <div calssname="settings-item">
                                Theme
                                <button class="button1" onClick={this.setThemeLight}>Light</button>
                                <button class="button1" onClick={this.setThemeDark}>Dark</button> 
                            </div>
                            <div>
                                Time Format
                                <button class="button1" >12</button>
                                <button class="button1" >24</button> 
                            </div>
                            <div>
                                Temperature
                                <button class="button1" >F</button>
                                <button class="button1" >C</button> 
                                
                            </div>
                            <div>
                                Wind Speed
                                <button class="button1" >mph</button>
                                <button class="button1" >km/h</button> 
                            </div>
                            <div>
                                Default location
                                <button>Test</button>
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
            //removed after first div
            //{this.state.isSettingsOpen? <div className="settings-overlay"/> : null }
            <div>
                
                <div className="settings-wrapper">
                    <div>
                        <MDBIcon  class="settingsicon" icon="bars" size="2x"  onClick={this.setFocus} />
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
