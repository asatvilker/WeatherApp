import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBCollapse, MDBContainer, MDBIcon, MDBRow } from "mdbreact";
import './clothes.css';

import jeans from '../../images/jeans.png';
import trainers from '../../images/trainer.png';
import hoodie from '../../images/hoodie.png';
import shirt from '../../images/shirt.png';
import skirt from '../../images/skirt.png';
import cap from '../../images/cap.png';
import sunglass from '../../images/sunglass.png';
import umbrella from '../../images/umbrella.png';
import gloves from '../../images/gloves.png';
import coat from '../../images/coat.png';


const codes={
    "hoodie":hoodie,
    "joggers":jeans,
    "cap":cap,
    "T-shirt":shirt,
    "shorts/skirt":skirt,
    "sunglasses":sunglass,
    "raincoat":coat,
    "trainers":trainers,
    "umbrella":umbrella,
    "jeans":jeans,
    "scarf":"",
    "coat":coat,
    "gloves":gloves

}

class Clothes extends Component {
    
state = {
    selection:[],
    rainOption:["Drizzle","Rain","Light Rain","Heavy Rain","Flurries","Light Snow","Heavy Snow","Freezing Drizzle","Freezing Rain","Light Freezing Rain","Heavy Freezing Rain"],
    hourly:[]
}
componentDidUpdate(prevProps){
    if (this.props.hourly[0] !== prevProps.hourly[0])
    {
        if (Math.round(this.props.hourly[0].temperature) <= 15 )
        {
            if (Math.round(this.props.hourly[0].temperature) <= 5 )
            {
                this.setState({selection:["coat","hoodie","jeans","gloves"]})
            }
            else
            {
                if (this.state.rainOption.includes(this.props.hourly[0].weatherDesc) )
                {
                    this.setState({selection:["raincoat","hoodie","jeans","trainers"]})
                }
                else
                {
                    this.setState({selection:["hoodie","jeans","scarf"]})
                }
            }
        }
        else
        {
            if (this.state.rainOption.includes(this.props.hourly[0].weatherDesc))
            {
                if ( Math.round(this.props.hourly[0].temperature) >= 26 )
                {
                    this.setState({selection:["umbrella","T-shirt","shorts/skirt","trainers"]})
                }
                else
                {
                    this.setState({selection:["raincoat","T-shirt","joggers","trainers"]})
                }
            }
            
            else
            {
                if ( Math.round(this.props.hourly[0].temperature) >= 26 )
                {
                    this.setState({selection:["T-shirt","shorts/skirt","sunglasses"]})
                }
                else
                {
                    this.setState({selection:["hoodie","joggers","cap"]})
                }
            }
        } 
    }
    
}

render() {
  return (
      <>
        <h1 id="clothesHead">Suggestion for the day</h1>
        <MDBRow id="clothes" className="z-depth-1">
            

         {
             this.state.selection.map((item)=>{
                 return(
                        <MDBCol size="6">
                            <img src={codes[item]} width="50px" height="50px" alt=" "/>
                            <p>{item}</p>
                        </MDBCol>
             )})
         }
            
        </MDBRow>
    </>
    );
  }
}

export default Clothes;