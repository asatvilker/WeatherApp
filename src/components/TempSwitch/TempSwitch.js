import React, { Component } from "react";
import "./TempSwitch.css";

class TempSwitch extends Component{
    constructor(props){
        super(props);
        this.state = {  
             
        }
    }

    //Updates the temperature by listening to the checkbox and send the respective info the parent class where temeperature state is stored
    handleChange = event => {
        this.props.setSettings({darkMode: event.target.checked})
        console.log("isToggled1223", this.props.data.darkMode);
    };

    
    render(){
        return(
            <div id="test12" class="custom-control custom-switch">
                <div>Light</div>
                <input type="checkbox" class="custom-control-input" id="customSwitch1" checked={this.props.data.darkMode} onChange={this.handleChange}></input>    
                <label class="custom-control-label" for="customSwitch1"> Dark</label>
            </div>
        )
    }
}


export default TempSwitch;