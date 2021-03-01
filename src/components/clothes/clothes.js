import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBCollapse, MDBContainer, MDBIcon, MDBRow } from "mdbreact";
import './clothes.css';

class Clothes extends Component {
    
state = {
    selection:[],
    rainOption:["Drizzle","Rain","Light Rain","Heavy Rain","Flurries","Light Snow","Heavy Snow","Freezing Drizzle","Freezing Rain","Light Freezing Rain","Heavy Freezing Rain"],
    hourly:[]
}
async componentDidMount(){
    
    if (this.props.hourly[0] != undefined){
        if (Math.round(this.props.hourly[0].temperature) <= 15 ){
            if (Math.round(this.props.hourly[0].temperature) <= 5 ){
                this.setState({selection:["coat","hoodie","jeans","gloves"]})
            }
            else{
                if (this.state.rainOption.includes(this.props.hourly[0].weatherDesc) ){
                    this.setState({selection:["raincoat","hoodie","jeans","trainers"]})
                }
                else{
                    this.setState({selection:["hoodie","jeans","scarf"]})
                }
            }
        }
        else{
            if (this.state.rainOption.includes(this.props.hourly[0].weatherDesc)){
                if ( Math.round(this.props.hourly[0].temperature) >= 26 ){
                    this.setState({selection:["umbrella","T-shirt","shorts/skirt","trainers"]})
                }
                else{
                    this.setState({selection:["raincoat","T-shirt","joggers","trainers"]})
                }
            }
            
            else{
                if ( Math.round(this.props.hourly[0].temperature) >= 26 ){
                    this.setState({selection:["T-shirt","shorts/skirt","sunglasses"]})
                }
                else{
                    this.setState({selection:["hoodie","joggers","cap"]})
                }
            }


        }
    }
    else{
        console.log("error")
    }
    
}
check(){
    console.log("updating...")
    this.setState({selection:["hoodie","jeans","scarf"]})
}

render() {
  return (
      <>
        <h1 id="clothesHead">Suggestion for the day</h1>
        <MDBRow id="clothes" className="z-depth-1">
            

           {
               this.props.hourly[0] != undefined? 
                Math.round(this.props.hourly[0].temperature) <= 15?
                    Math.round(this.props.hourly[0].temperature) <= 5 ?
                        <>
                            <MDBCol size="6" className="flex-center">
                                <p>Coat</p>
                            </MDBCol>
                            <MDBCol size="6" className="flex-center">
                                <p>Hoodie</p>
                            </MDBCol>
                            <MDBCol size="6" className="flex-center">
                                <p>Jeans</p>
                            </MDBCol>
                            <MDBCol size="6" className="flex-center">
                                <p>Gloves</p>
                            </MDBCol>
                        </>
                    :
                        this.state.rainOption.includes(this.props.hourly[0].weatherDesc)?
                            <>
                                <MDBCol size="6" className="flex-center">
                                    <p>Riancoat</p>
                                </MDBCol>
                                <MDBCol size="6" className="flex-center">
                                    <p>Hoodie</p>
                                </MDBCol>
                                <MDBCol size="6" className="flex-center">
                                    <p>Jeans</p>
                                </MDBCol>
                                <MDBCol size="6" className="flex-center">
                                    <p>Trainers</p>
                                </MDBCol>
                            </>
                        :
                            <>
                                <MDBCol size="6" className="flex-center">
                                    <p>Hoodie</p>
                                </MDBCol>
                                <MDBCol size="6" className="flex-center">
                                    <p>Jeans</p>
                                </MDBCol>
                                <MDBCol size="6" className="flex-center">
                                    <p>Scarf</p>
                                </MDBCol>
                            </>
                :
                this.state.rainOption.includes(this.props.hourly[0].weatherDesc)?
                        Math.round(this.props.hourly[0].temperature) >= 26?
                            <>
                                <MDBCol size="6" className="flex-center">
                                    <p>Umbrella</p>
                                </MDBCol>
                                <MDBCol size="6" className="flex-center">
                                    <p>T-shirt</p>
                                </MDBCol>
                                <MDBCol size="6" className="flex-center">
                                    <p>Shorts/Skirt</p>
                                </MDBCol>
                                <MDBCol size="6" className="flex-center">
                                    <p>Trainers</p>
                                </MDBCol>
                            </>
                            
                        :
                            <>
                                <MDBCol size="6" className="flex-center">
                                    <p>Raincoat</p>
                                </MDBCol>
                                <MDBCol size="6" className="flex-center">
                                    <p>T-shirt</p>
                                </MDBCol>
                                <MDBCol size="6" className="flex-center">
                                    <p>Joggers</p>
                                </MDBCol>
                                <MDBCol size="6" className="flex-center">
                                    <p>Trainers</p>
                                </MDBCol>
                            </>
                    :
                        Math.round(this.props.hourly[0].temperature) >= 26?
                            <>
                                <MDBCol size="6" className="flex-center">
                                    <p>T-shirt</p>
                                </MDBCol>
                                <MDBCol size="6" className="flex-center">
                                    <p>Shorts/Skirt</p>
                                </MDBCol>
                                <MDBCol size="6" className="flex-center">
                                    <p>Sunglasses</p>
                                </MDBCol>
                            </>
                        :
                                <>
                                <MDBCol size="6" className="flex-center">
                                    <p>Hoodie</p>
                                </MDBCol>
                                <MDBCol size="6" className="flex-center">
                                    <p>Joggers</p>
                                </MDBCol>
                                <MDBCol size="6" className="flex-center">
                                    <p>Cap</p>
                                </MDBCol>
                            </>
                            

               :
               <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>         {/*load a spinner until data is fully loaded, revents error */}
                </div>

           }
            
        </MDBRow>
    </>
    );
  }
}

export default Clothes;