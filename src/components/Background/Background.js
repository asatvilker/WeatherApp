import React from 'react';
import ReactDOM from 'react-dom';
import './Background.css';

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

function Sun(props) {
  return(
    <div className="sun-wrap">
      <div className="sun" style={{backgroundColor: props.style}}></div>
    </div>
  );
}

function Time() {
  var today = new Date();
  let background = "rgb(248, 177, 149)";
  var today = new Date();
  
  if(today.getHours()<14) {
    background = "red";
  } else if(today.getHours()<15) {
    background = "blue";
  }
  return <Sun style={background}/>
}


function Birds() {
  return(
    <div className="bird-wrap">
      <div className="birdA"></div>
      <div className="birdB"></div>
      <div className="birdC"></div>
      <div className="birdD"></div>
    </div>
  );
}

function Background() {
  return (
    <>
      {Time()}
      <Birds />
      <Mountain />
    </>
  );
}

export default Background;