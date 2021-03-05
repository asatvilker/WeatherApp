import React, { Component } from "react";


class TempSwitch extends Component{

    render(){
        return(
            <div>
                <div>
                    <button onClick={()=> {this.props.setSettings({celsius: false})}}>Farensomething</button>
                    <button onClick={()=> {this.props.setSettings({celsius: true})}}>Celsius</button>
                </div>
            </div>
        )
    }
}


export default TempSwitch;