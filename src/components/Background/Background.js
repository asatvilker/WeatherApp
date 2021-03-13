import React from "react";
import './Background.css';
import { convertTZ } from "../../WeatherAPI";

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

const colors = ['248, 177, 149', '255, 125, 69', '246, 114, 128', '192, 108, 132', '53, 92, 125', '192, 108, 180', '246, 114, 128', '248, 177, 149']
const backgrounds = [
    'linear-gradient(180deg, #FF7D45 20%, rgba(248, 177, 149, 1) 100%)', 
    'linear-gradient(180deg, #F8B195 20%, rgba(255, 125, 69, 1) 100%)', 
    'linear-gradient(180deg, #F8B195 20%, rgba(246, 114, 128, 1) 100%)', 
    'linear-gradient(180deg, rgba(246, 114, 128, 0.7) 20%, rgba(192, 108, 132, 0.8) 100%)', 
    'linear-gradient(180deg, #6C5B7B 20%, rgba(53, 92, 125, 1) 100%)', 
    'linear-gradient(180deg, #6C5B7B 20%, #6C5B7B, rgba(192, 108, 180, 1) 100%)', 
    'linear-gradient(180deg, #C06CB4 20%, rgba(246, 114, 128, 1) 100%)', 
    'linear-gradient(180deg, #F67280 20%, rgba(248, 177, 149, 1) 100%)'
];
// Colour chosen changes based on time and is stored inside variables that are used to change the colour of the sun and the background.
// The colours and backgrounds are stored in arrays and the right element is stored in the variables based on the time.
function TimeChange(date) {
    let hour = date.getHours(); //Get current hours
    //colors and backgrounds store the required colours for the background set and is used to change the colours based on the time
    //currentColor and bodyColor store the appropriate colours from the variables colors and backgrounds (respectively) which is then used to set the colour for the background divs
    let currentColor;
    let bodyColor;
    /*
        22 -> 3 = 4
        4 -> 5 = 5
        6 -> 7 = 6
        8 -> 9 = 7
        10 -> 14 = 0
        15 -> 17 = 1
        18 -> 19 = 2
        20 -> 21 = 3
    */

    if (hour >= 22 || hour <= 3) {
        currentColor = colors[4];
        bodyColor = backgrounds[4];
    } else if (hour == 4 || hour == 5) {
        currentColor = colors[5];
        bodyColor = backgrounds[5];
    } else if (hour == 6 || hour == 7) {
        currentColor = colors[6];
        bodyColor = backgrounds[6];
    } else if (hour == 8 || hour == 9) {
        currentColor = colors[7];
        bodyColor = backgrounds[7];
    } else if (hour >= 10 && hour <= 14) {
        currentColor = colors[0];
        bodyColor = backgrounds[0];
    } else if (hour >= 15 && hour <= 17) {
        currentColor = colors[1];
        bodyColor = backgrounds[1];
    } else if (hour == 18 || hour == 19) {
        currentColor = colors[2];
        bodyColor = backgrounds[2];
    } else if (hour == 20 || hour == 21) {
        currentColor = colors[3];
        bodyColor = backgrounds[3];
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
            {TimeChange(convertTZ(props.date, props.timeZone))}
            {Birds()}
            {Mountain()}
        </>
    );
}


export default Background;