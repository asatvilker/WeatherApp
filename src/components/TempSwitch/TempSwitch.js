import React, { Component } from "react";
import "./TempSwitch.css";

class TempSwitch extends Component{
    constructor(props){
        super(props);
        this.state = {
            isToggled:true
        }
        this.checktoggled = this.checktoggled.bind(this);
    }
    checktoggled(e){
        const{isToggled} = this.state;
        if (isToggled){
            this.props.setSettings({celsius: false})
            this.setState({
                isToggled:false
            });
        }
        else{
            this.props.setSettings({celsius: true})
            this.setState({
                isToggled: true
            });
        }

    }
    render(){
        return(
            <div>
                <div id="switch-wrapper">
                <div>C</div>
                <label class="switch">
                    <input type="checkbox" onClick={this.checktoggled}></input>
                    <span class="slider round"></span>
                </label>  
                <div>F</div>
                </div>
                
            </div>
        )
    }
}


export default TempSwitch;