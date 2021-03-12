import React from "react";
import './Background.css';

//Displays the mountains for the background
function Mountain() {
    return (
        <div className="mountains">
            <div className="leftWrap">
                <div className='mountainLeft'></div>
            </div>
            <div className="rightWrap">
                <div className='mountainRight'></div>
            </div>
            <div className="midWrap">
                <div className='mountainMid'></div>
            </div>
        </div>
    );
}

//Displays the sun for the background
function Sun() {
    return (
        <div className="sun-wrap">
            <div className="sun">
                <div className="rays"></div>
            </div>
        </div>
    );
}


// Colour chosen changes based on time and is stored inside variables that are used to change the colour of the sun and the background.
// The colours and backgrounds are stored in arrays and the right element is stored in the variables based on the time.
function TimeChange(props) {
    const time=new Date(props.date).toLocaleString("en-US", {timeZone: props.timeZone}) //gets the current local time using the timezone data passed through
    let meridiem = time.toString().split(" ")[2]; //gets the am or pm from the time
    let curTime = parseInt(time.toString().split(",")[1].split(":")[0], 10); //gets the current hour from the time 

    //colors and backgrounds store the required colours for the background set and is used to change the colours based on the time
    const colors = ['248, 177, 149', '255, 125, 69', '246, 114, 128', '192, 108, 132', '53, 92, 125', '192, 108, 180', '246, 114, 128', '248, 177, 149']
    const backgrounds = ['linear-gradient(180deg, #FF7D45 20%, rgba(248, 177, 149, 1) 100%)', 'linear-gradient(180deg, #F8B195 20%, rgba(255, 125, 69, 1) 100%)', 'linear-gradient(180deg, #F8B195 20%, rgba(246, 114, 128, 1) 100%)', 'linear-gradient(180deg, rgba(246, 114, 128, 0.7) 20%, rgba(192, 108, 132, 0.8) 100%)', 'linear-gradient(180deg, #6C5B7B 20%, rgba(53, 92, 125, 1) 100%)', 'linear-gradient(180deg, #6C5B7B 20%, #6C5B7B, rgba(192, 108, 180, 1) 100%)', 'linear-gradient(180deg, #C06CB4 20%, rgba(246, 114, 128, 1) 100%)', 'linear-gradient(180deg, #F67280 20%, rgba(248, 177, 149, 1) 100%)'];
    
    //currentColor and bodyColor store the appropriate colours from the variables colors and backgrounds (respectively) which is then used to set the colour for the background divs
    let currentColor;
    let bodyColor;
    
    //The if statements check the current hour at the location being displayed on screen using the variable curTime
    //meridiem is used to check if its AM or PM
    //based on the met conitions that are met, the currentColor and bodyColor as initialised to the appropriate values from the arrays colors and backgrounds 
    if (curTime < 3 && meridiem=="PM" || curTime == 12 && meridiem=="PM" || curTime >= 10 && meridiem=="AM" && curTime!=12) {
        currentColor = colors[0];
        bodyColor = backgrounds[0];
    } else if (curTime < 6 && curTime >= 3 && meridiem=="PM") {
        currentColor = colors[1];
        bodyColor = backgrounds[1];
    } else if (curTime < 8 && curTime >= 6 && meridiem=="PM") {
        currentColor = colors[2];
        bodyColor = backgrounds[2];
    } else if (curTime < 10 && curTime >= 8 && meridiem=="PM") {
        currentColor = colors[3];
        bodyColor = backgrounds[3];
    } else if (curTime >= 10 && meridiem=="PM" || curTime < 4 && meridiem=="AM" || curTime == 12 && meridiem=="AM") {
        currentColor = colors[4];
        bodyColor = backgrounds[4];
    } else if (curTime < 6 && curTime >= 4 && meridiem=="AM") {
        currentColor = colors[5];
        bodyColor = backgrounds[5];
    } else if (curTime < 8 && curTime >= 6 && meridiem=="AM") {
        currentColor = colors[6];
        bodyColor = backgrounds[6];
    } else if (curTime < 10 && curTime >= 8 && meridiem=="AM") {
        currentColor = colors[7];
        bodyColor = backgrounds[7];
    }
    

    // The variable bodyColor is used to set the colour of the background of the page
    // The variable currentColor is used to set the color of the mountains and the sun and its rays
    // If the time changes then the if statement will change the value of these 2 variables accordingly and this will then change the colours of the background, mountains and the sun.
    return (
        <>
            <style>{
                `
                    body {
                        background: ${bodyColor};
                    }
                    
                    .mountainMid,
                    .mountainRight,
                    .mountainLeft {
                        background-color: rgb(${currentColor});
                    }


                    .sun, .sun::before, .sun::after, .rays::before, .rays::after {
                        background-color: rgb(${currentColor});
                    }
                `
            }</style>
            <Sun />
            <Mountain />
        </>
    );
}

//Displays the birds on the screen
function Birds() {
    return (
        <div className="bird-wrap">
            <div className="birdA"></div>
            <div className="birdB"></div>
            <div className="birdC"></div>
            <div className="birdD"></div>
            <div className="birdE"></div>
        </div>
    );
}

function Background(props) {
    //This function recieves 2 arguments : the current time and the timezone of the location being displayed on the screen
    //These arguments are then passed onto the TimeChange function which uses the information to set the correct background colours for the body and the divs
    //Then the Bird and Mountain functions are called so they can be displayed on the screen
    //Mountain is called again here (first time is in TimeChange along with the Sun) to provide a realistic look with the shadows
    return (
        <>
            <TimeChange date={props.date} timeZone={props.timeZone}/>
            <Birds />
            <Mountain />
        </>
    );
}


export default Background;