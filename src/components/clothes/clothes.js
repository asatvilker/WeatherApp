import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBCollapse, MDBContainer, MDBIcon, MDBRow } from "mdbreact";
import './clothes.css';
import codes from './clothes.json'
import ClothesIcon from "./clothesIcons";




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
                        <MDBCol size="6" className="flex-center flex-column">
                           
                             <ClothesIcon iconName={codes[item]} size="10vh"/> 
                            
                            <p>{item.toUpperCase()}</p>
                        </MDBCol>
             )})
         }
            
        </MDBRow>
    </>
    );
  }
}

export default Clothes;