import React, { Component } from "react";
import "./Settings.css";
import { MDBBox, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBPopover, MDBPopoverBody, MDBPopoverHeader, MDBBtn } from 'mdbreact';

class Settings extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isListOpen: false,
            focus: false
        }
        this.setFocus = this.setFocus.bind(this);

    }

    setFocus(e) {
        const {focus,isListOpen} = this.state;
        if (focus){
            this.setState({
                focus: false,
                isListOpen: false
            });
        }
        else{
            this.setState({
                focus: true,
                isListOpen: true
            });
        }
    }


    render(){
        const {focus, isListOpen } = this.state;
        const addOverlay = () => {
            if (focus) {
                return <div className="settings-overlay" />
            }
        }
        const addSettingsOverlay = () => {
            if (isListOpen){
                return(
                    <React.Fragment>
                    <br />
                    <MDBBox className='Container'>
                      <MDBIcon fab icon="creative-commons-by" /> Accessibility
                      <hr />
                      <MDBPopover
                      placement="bottom"
                      popover
                      clickable
                      id="popper3"
                      >
                      <MDBBtn color="orange"><MDBIcon icon="info-circle" /> Info</MDBBtn>
                      <div>
                        <MDBPopoverHeader>Product Info</MDBPopoverHeader>
                          <MDBPopoverBody>
                            Sed posuere consectetur est at lobortis. Aenean eu leo quam.
                            Pellentesque ornare sem lacinia quam venenatis vestibulum.
                            </MDBPopoverBody>
                            </div>
                            </MDBPopover>
                      <br />
                      <br />

                    </MDBBox>
                  </React.Fragment>
                )
            }
        }

        return(
            //{addOverlay()} removed from first div
            <div>
                <div className="settings-wrapper">
                    <div>
                        <MDBIcon icon="bars" size="2x" onClick={this.setFocus} />
                    </div>
                    <div className="settings-suggestions">
                        {addSettingsOverlay()}
                    </div>
                </div>
            </div>
            )
     }
}


export default Settings;
