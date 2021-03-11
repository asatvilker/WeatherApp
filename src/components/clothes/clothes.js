import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBCollapse, MDBContainer, MDBIcon, MDBRow } from "mdbreact";
import './clothes.css';
import codes from './clothes.json'
import ClothesIcon from "./clothesIcons";




class Clothes extends Component {
    
state = {
    selection:[], //where we will store the selection of clothese determined by the logic
    rainOption:["Drizzle","Rain","Light Rain","Heavy Rain","Flurries","Light Snow","Heavy Snow","Freezing Drizzle","Freezing Rain","Light Freezing Rain","Heavy Freezing Rain"],
    //these are the descriptions which correspond to rain so we will use these to determine if its raining as this part of our logic for deciding clothes
    hourly:[]
}
componentDidUpdate(prevProps){ //this function is called whenever props or state update and so when the api data if passed through, once it is all there, props will update and this function is invoked
    if (this.props.hourly[0] !== prevProps.hourly[0]) //this ensure there is an actual change, otherwise we get stuck in an infinite loop and it crashes
    {
        if (Math.round(this.props.hourly[0].temperature) <= 15 ) //checks if it is cold or very cold
        {
            if (Math.round(this.props.hourly[0].temperature) <= 5 ) //very cold (doesnt check for rain as it will suggest a coat anyway)
            {
                this.setState({selection:["coat","hoodie","jeans","gloves"]})
            }
            else
            {
                if (this.state.rainOption.includes(this.props.hourly[0].weatherDesc) ) // just cold but not very cold AND raining
                {
                    this.setState({selection:["raincoat","hoodie","jeans","trainers"]})
                }
                else //just cold AND not raining
                {
                    this.setState({selection:["hoodie","jeans","scarf"]}) 
                }
            }
        }
        else
        {
            if (this.state.rainOption.includes(this.props.hourly[0].weatherDesc))//warm or hot (else of first statement) AND raining
            {
                if ( Math.round(this.props.hourly[0].temperature) >= 26 ) // hot and raining
                {
                    this.setState({selection:["umbrella","T-shirt","shorts/skirt","trainers"]})
                }
                else // warm and raining
                {
                    this.setState({selection:["raincoat","T-shirt","joggers","trainers"]}) 
                }
            }
            
            else //warm or hot AND NOT raining
            {
                if ( Math.round(this.props.hourly[0].temperature) >= 26 ) //hot and not raining
                {
                    this.setState({selection:["T-shirt","shorts/skirt","sunglasses"]})
                }
                else //warm and not raining
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
        <MDBRow id="clothes" className="z-depth-1"> {/* a bootstrap layout component that breaks the layout up into responsive rows and columns */}
            

         {
             this.state.selection.map((item)=>{//map function loops through our selection array (each item of clothing)
                 
                
                 return(
                        <MDBCol size="6" className="flex-center flex-column">
                           
                             <ClothesIcon iconName={codes[item]} size="10vh"/> {/*for each item we have a icon component, we first map the selection name to the icon name which is stored as in a json file */}
                            
                            <p>{item.toUpperCase()}</p>{/* displays the name of the clothing in capital letters */}
                        </MDBCol>
             )})
         }
            
        </MDBRow>
    </>
    );
  }
}

export default Clothes;