import React, { Component } from "react";
import { MDBBtn, MDBCol, MDBCollapse, MDBIcon, MDBRow } from "mdbreact";
import './dropdown.css'
import Hourly from './hourly';
import { MDBAnimation } from "mdbreact";


class Dropdown extends Component {
    state = {
        collapseID: ""
    }

    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
    }

    render() {
        return (
            <div id="dropdown">
                <MDBRow>
                    <MDBCol className="line" size="5"></MDBCol>
                    <MDBCol size="2"  className="d-flex p-0 justify-content-center">
                        <MDBAnimation type="bounce" count={2} reveal>
                            <MDBBtn
                                onClick={this.toggleCollapse("basicCollapse")} 
                                style={{ marginBottom: "1rem" }}
                                className="dropButton">
                                <MDBIcon icon="angle-down" id="dropIcon" size="2x"/>
                            </MDBBtn>
                        </MDBAnimation>
                    </MDBCol>
                    <MDBCol className="line" size="5"></MDBCol>
                    <MDBCollapse id="basicCollapse" isOpen={this.state.collapseID} style={{overflowX:"scroll"}}>
                        <Hourly />
                    </MDBCollapse>
                </MDBRow>
            </div>
        );
    }
}

export default Dropdown;