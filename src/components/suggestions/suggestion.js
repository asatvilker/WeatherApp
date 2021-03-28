import React, { Component } from "react";
import './suggestion.css';
import { MDBIcon } from 'mdbreact';

class Suggest extends Component{
  constructor(props){
    super(props);
    this.state = {
      selection:"", //the selection variable holds the clothing suggestion related to a certain tempreature
      hourly:[],
      addRain:"",
      rainOption:["Drizzle","Rain","Light Rain","Heavy Rain","Flurries","Light Snow","Heavy Snow","Freezing Drizzle","Freezing Rain","Light Freezing Rain","Heavy Freezing Rain","Showers", "Mostly cloudy w/ showers", "Partly sunny w/ showers", "Rain and snow", "Partly cloudy w/ showers"],
      // rainOption includes all weather conditions that will require an umbrella (based on API weather description)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.hourly[0] !== prevProps.hourly[0])// checks if their has been a change in conditions
    {
      const temp=this.props.celsius? this.props.hourly[0].temperature: (this.props.hourly[0].temperature - 32)* 5/9 //ensures temperate is in celsius (consistent format which logic below is based on)
      const isRaining= this.state.rainOption.includes(this.props.hourly[0].weatherDesc) // checks if it has rained
      if (temp >= 30) { // suggestions are based on tempreature
        this.setState({selection:"Bring some sunglasses"}); // used to set tempreature
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
      if (isRaining){// checks if its raining if it is addRain is set to bring an umbrella if not nothing id
        this.setState({addRain:"and bring an umbrella"});
      } else {
        this.setState({addRain:""});
      }
    }
    }

  render(){
    return(
      <div id='main'>
        <div id='text'>
          {/* This displays the clothing suggestions, the state selection holds the suggestion based on tempreature */}
          {/* And addRain will suggest bring an umbrella if it's raining */}
          {/* the value text will not show the any suggestion if text has been toggled in settings */}
        <strong>{this.state.selection} {this.state.addRain}</strong>
        </div>
      </div>
    )
  }
}

export default Suggest;
