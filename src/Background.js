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

function Sun() {
  return(
    <div className="sun-wrap">
      <div className="sun"></div>
    </div>
  );
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
      <Sun />
      <Birds />
      <Mountain />
    </>
  );
}

export default Background;