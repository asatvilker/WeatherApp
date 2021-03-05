import React from 'react';
import './Background.css';

function Mountain(props) {
  return (
    <div className="mountains">
      <div className="leftWrap">
        <div className='mountainLeft' style={{backgroundColor : props.color}}></div>
      </div>
      <div className="rightWrap">
        <div className='mountainRight' style={{backgroundColor : props.color}}></div>
      </div>
      <div className="midWrap">
        <div className='mountainMid' style={{backgroundColor : props.color}}></div>
      </div>
    </div>
  );
}

function Sun(props) {
  return(
    <div className="sun-wrap">
      <div className="sun" id={props.idName}></div>
    </div>
  );
}

function TimeChange() {
  var today = new Date();
  const ids = ['time10-14','time14-18','time18-21','time21-23','time23-4','time4-6','time6-8','time8-10'];
  const colors = ['rgb(255, 125, 69)','rgb(248, 177, 149)','rgb(246, 114, 128)','rgb(192, 108, 132)','rgb(53, 92, 125)','rgb(192, 108, 180)','rgb(246, 114, 128)','rgb(248, 177, 149)']
  const backgrounds = ['linear-gradient(180deg, #F8B195 0%, rgba(255, 125, 69, 0.3) 100%)','linear-gradient(180deg, #FF7D45 0%, rgba(248, 177, 149, 0.3) 100%)','linear-gradient(180deg, #F8B195 0%, rgba(246, 114, 128, 0) 100%)','linear-gradient(180deg, #F67280 0%, rgba(192, 108, 132, 0.3) 100%)','linear-gradient(180deg, #6C5B7B 0%, rgba(53, 92, 125, 0.3) 100%)','linear-gradient(180deg, #6C5B7B 0%, #6C5B7B 0.01%, rgba(192, 108, 180, 0.3) 100%)','linear-gradient(180deg, #C06CB4 0%, rgba(246, 114, 128, 0.3) 100%)','linear-gradient(180deg, #F67280 0%, rgba(248, 177, 149, 0) 100%)'];
  var currentId;
  var currentColor;
  var bodyColor;

  if(today.getHours()<14 && today.getHours()>=10) {
    currentId=ids[0];
    currentColor=colors[0];
    bodyColor = backgrounds[0];
  } else if(today.getHours()<18 && today.getHours()>=14) {
    currentId=ids[1];
    currentColor=colors[1];
    bodyColor = backgrounds[1];
  } else if(today.getHours()<21 && today.getHours()>=18) {
    currentId=ids[2];
    currentColor=colors[2];
    bodyColor = backgrounds[2];
  } else if(today.getHours()<23 && today.getHours()>=21) {
    currentId=ids[3];
    currentColor=colors[3];
    bodyColor = backgrounds[3];
  } else if(today.getHours()<4 && today.getHours()>=23) {
    currentId=ids[4];
    currentColor=colors[4];
    bodyColor = backgrounds[4];
  } else if(today.getHours()<6 && today.getHours()>=4) {
    currentId=ids[5];
    currentColor=colors[5];
    bodyColor = backgrounds[5];
  } else if(today.getHours()<8 && today.getHours()>=6) {
    currentId=ids[6];
    currentColor=colors[6];
    bodyColor = backgrounds[6];
  } else {
    currentId=ids[7];
    currentColor=colors[7];
    bodyColor = backgrounds[7];
  }
  
  return (
    <>
      <style>{`body {background: ${bodyColor};}`}</style>
      <Sun idName={currentId} />
      <Mountain color={currentColor}/>
    </>
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
      <TimeChange />
      <Birds />
      <Mountain />
    </>
  );
}

export default Background;