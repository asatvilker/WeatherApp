import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBCollapse, MDBIcon, MDBRow } from "mdbreact";
import './dropdown.css'
import Hourly from './hourly';
import { MDBAnimation } from "mdbreact";


class Dropdown extends Component {
    state = {
        open: false
    }

    toggleCollapse = () => () => { //function to toggle the state of the dropdown
        console.log(this.state);
        this.setState(prevState => ({
            open: !prevState.open
        })); //switches the state of the dropdown in state, causing the bootstrap dropdown to open and close (alternates between height:0 and height:100%)
        // var element = document.getElementsByClassName("dropButton")[0] //gets the button elelment for the dropdown
        // element.classList.contains("turn")? element.classList.remove("turn"): element.classList.add("turn") //adding class to spin button when selected
    }

    render() {
        return (
            <div id="dropdown">
                <MDBRow>
                    <MDBCollapse id="basicCollapse" isOpen={this.state.open} style={{marginBottom:"5vh", width:"100%"}}> {/*the bootstrap dropdown component, passes through the state value which indicates to the component whether to open drop down or not */}
                        <Hourly data={this.props.data} celsius={this.props.celsius}/> {/* within the dropdown, we have the hourly component, shows data for next few hours, we pass through the data as props */}
                    </MDBCollapse>
                    <MDBCol className="line column" size="5"></MDBCol>{/*this if for design, create the lines either side of button */}
                    <MDBCol size="2"  className="d-flex p-0 justify-content-center column">
                        <MDBAnimation type="bounce" count={2} reveal> {/*animation which makes button jump when loaded to get users attention */}
                            <MDBBtn
                                onClick={this.toggleCollapse()} /*button for triggering open/close of dropdown */
                                style={{ marginBottom: "1rem", height: "45px", width:"45px"}}
                                className="dropButton">
                                <MDBIcon icon="angle-down" id="dropIcon" size="2x" className={this.state.open ? "rotated" : ""}/> {/*icon to make button obvious in purpose*/}
                            </MDBBtn>
                        </MDBAnimation>
                    </MDBCol>
                    <MDBCol className="line column" size="5"></MDBCol>  
                </MDBRow>
            </div>
        );
    }
}

export default Dropdown;