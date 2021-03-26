import React, { Component } from "react";
import './suggestion.css';
import { MDBIcon } from 'mdbreact';

class Suggest extends Component{
  constructor(props){
    super(props);
    this.state = {
      selection:"",
      hourly:[],
      addRain:"",
      rainOption:["Drizzle","Rain","Light Rain","Heavy Rain","Flurries","Light Snow","Heavy Snow","Freezing Drizzle","Freezing Rain","Light Freezing Rain","Heavy Freezing Rain","Showers", "Mostly cloudy w/ showers", "Partly sunny w/ showers", "Rain and snow", "Partly cloudy w/ showers"],

    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.hourly[0] !== prevProps.hourly[0])
    {
      const temp=this.props.celsius? this.props.hourly[0].temperature: (this.props.hourly[0].temperature - 32)* 5/9 //ensures temperate is in celsius (consistent format which logic below is based on)
      const isRaining= this.state.rainOption.includes(this.props.hourly[0].weatherDesc)
      if (temp >= 30) {
        this.setState({selection:"Bring some sunglasses"});
      } else if (temp >= 25) {
        this.setState({selection:"Might want a sun hat"});
      } else if (temp >= 20) {
        this.setState({selection:"wear a T-shirt"});
      } else if (temp >= 15) {
        this.setState({selection:"Grab a jacket"});
      } else if (temp >= 10) {
        this.setState({selection:"Wear a jumper"});
      } else if (temp >= 5) {
        this.setState({selection:"Don't forget a scarf"});
      } else if (temp >= 0) {
        this.setState({selection:"Might want a wooly hat"});
      } else if (temp >= -5) {
        this.setState({selection:"Grab a coat"});
      } else if (temp < -5) {
        this.setState({selection:"Wear a snowsuit"});
      } else {
        this.setState({selection:"Wear a hoodie"});
      }
      if (isRaining){
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
          <strong>{this.state.selection} {this.state.addRain}</strong>
        </div>
        <hr />
      </div>
    )
  }
}

export default Suggest;
