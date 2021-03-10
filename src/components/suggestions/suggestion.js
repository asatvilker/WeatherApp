import React, { Component } from "react";
import './suggestion.css';

class Suggest extends Component{
  constructor(props){
    super(props);
    this.state = {
      selection:[],
      hourly:[]
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
        this.setState({selection:["wear a wooly hat"]});
      } else if (Math.round(this.props.hourly[0].temperature) >= 5) {
        this.setState({selection:["wear a scarf"]});
      } else if (Math.round(this.props.hourly[0].temperature) >= 0) {
        this.setState({selection:["wear a coat"]});
      } else if (Math.round(this.props.hourly[0].temperature) >= -5) {
        this.setState({selection:["wear a egg"]});
      } else if (Math.round(this.props.hourly[0].temperature) < -5) {
        this.setState({selection:["wear a snowsuit"]});
      }
    }
    }

  render(){
    return(
      <div id='main'>
        <div id='text'>
          Suggestion: {this.state.selection}
        </div>
        <hr />
      </div>
    )
  }
}

export default Suggest;
