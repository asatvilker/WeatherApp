import React, { Component } from "react";
import "./TempSwitch.css";

class TempSwitch extends Component{
    constructor(props){
        super(props);
        this.state = {
            isToggled:false
        }
    }

    //Updates the temperature by listening to the checkbox and send the respective info the parent class where temeperature state is stored
    handleChange = event => {
        const{isToggled} = this.state;
        this.setState({isToggled : event.target.checked});
        this.props.setSettings({celsius: isToggled})
    };

    
    render(){
        return(
            <div>
                <div id="switch-wrapper">
                    <div>C</div>
                    <div>
                        <label class="switch">
                            <input type="checkbox" check={this.state.isToggled} onChange={this.handleChange} ></input>
                            <span class="slider round"></span>
                        </label>
                    </div>  
                    <div>F</div>
                </div>
            </div>
        )
    }
}


export default TempSwitch;