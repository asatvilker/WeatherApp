import React, { Component } from "react";
import './suggestion.css';
import { MDBIcon } from 'mdbreact';

class Suggest extends Component{
  constructor(props){
    super(props);
    this.state = {
      selection:[],
      hourly:[],
      addRain:""
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.hourly[0] !== prevProps.hourly[0])
    {
      if (Math.round(this.props.hourly[0].temperature) >= 30) {
        this.setState({selection:["bring some sunglasses"]});
      } else if (Math.round(this.props.hourly[0].temperature) >= 25) {
        this.setState({selection:["wear a sun hat"]});
      } else if (Math.round(this.props.hourly[0].temperature) >= 20) {
        this.setState({selection:["wear a T-shirt"]});
      } else if (Math.round(this.props.hourly[0].temperature) >= 15) {
        this.setState({selection:["wear a jacket"]});
      } else if (Math.round(this.props.hourly[0].temperature) >= 10) {
        this.setState({selection:["wear a jumper"]});
      } else if (Math.round(this.props.hourly[0].temperature) >= 5) {
        this.setState({selection:["wear a scarf"]});
      } else if (Math.round(this.props.hourly[0].temperature) >= 0) {
        this.setState({selection:["wear a wooly hat"]});
      } else if (Math.round(this.props.hourly[0].temperature) >= -5) {
        this.setState({selection:["wear a coat"]});
      } else if (Math.round(this.props.hourly[0].temperature) < -5) {
        this.setState({selection:["wear a snowsuit"]});
      } else {
        this.setState({selection:["wear a hoody"]});
      }
      if (this.props.hourly[0].weatherDesc.includes("rain")){
        this.setState({addRain:"and bring an umbrella"});
      } else {
        this.setState({addRain:""});
      }
    }
    }

  render(){
    return(
      <div id='main'>
        <div id='swap'> 
          <button id='flip'><MDBIcon icon="exchange-alt" size="lg" /></button>
        </div>
        <div id='text'>
          Suggestion: {this.state.selection} {this.state.addRain}
        </div>
        <hr />
      </div>
    )
  }
}

export default Suggest;
