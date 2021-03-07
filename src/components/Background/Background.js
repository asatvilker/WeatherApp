import React from 'react';
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

function TimeChange() {
  var today = new Date();
  const colors = ['248, 177, 149','255, 125, 69','246, 114, 128','192, 108, 132','53, 92, 125','192, 108, 180','246, 114, 128','248, 177, 149']
  const backgrounds = ['linear-gradient(180deg, #FF7D45 20%, rgba(248, 177, 149, 1) 100%)','linear-gradient(180deg, #F8B195 20%, rgba(255, 125, 69, 1) 100%)','linear-gradient(180deg, #F8B195 20%, rgba(246, 114, 128, 1) 100%)','linear-gradient(180deg, rgba(246, 114, 128, 0.7) 20%, rgba(192, 108, 132, 0.8) 100%)','linear-gradient(180deg, #6C5B7B 20%, rgba(53, 92, 125, 1) 100%)','linear-gradient(180deg, #6C5B7B 20%, #6C5B7B, rgba(192, 108, 180, 1) 100%)','linear-gradient(180deg, #C06CB4 20%, rgba(246, 114, 128, 1) 100%)','linear-gradient(180deg, #F67280 20%, rgba(248, 177, 149, 1) 100%)'];
  var currentColor;
  var bodyColor;
  let curTime = today.getHours();
  if(curTime>=0 && curTime<4) {
    curTime = 23;
  }

  if(curTime<15 && curTime>=10) {
    currentColor=colors[0];
    bodyColor = backgrounds[0];
  } else if(curTime<18 && curTime>=15) {
    currentColor=colors[1];
    bodyColor = backgrounds[1];
  } else if(curTime<20 && curTime>=18) {
    currentColor=colors[2];
    bodyColor = backgrounds[2];
  } else if(curTime<22 && curTime>=20) {
    currentColor=colors[3];
    bodyColor = backgrounds[3];
  } else if(curTime>=22) {
    currentColor=colors[4];
    bodyColor = backgrounds[4];
  } else if(curTime<6 && curTime>=4) {
    currentColor=colors[5];
    bodyColor = backgrounds[5];
  } else if(curTime<8 && curTime>=6) {
    currentColor=colors[6];
    bodyColor = backgrounds[6];
  } else if(curTime<10 && curTime>=8) {
    currentColor=colors[7];
    bodyColor = backgrounds[7];
  }
  
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


        .sun {
          background-color: rgb(${currentColor});
          box-shadow: 0 0 0 60px rgba(${currentColor}, 0.4),
          0 0 0 120px rgba(${currentColor}, 0.3), 0 0 0 180px rgba(${currentColor}, 0.2),
          0 0 0 240px rgba(${currentColor}, 0.1), 0 0 0 300px rgba(${currentColor}, 0),
          0 0 200px 300px rgba(${currentColor}, 0);
        }
      
        @keyframes rays {
          0% {
            box-shadow: 0 0 0 0px rgba(${currentColor}, 0.4),
              0 0 0 60px rgba(${currentColor}, 0.4), 0 0 0 120px rgba(${currentColor}, 0.3),
              0 0 0 180px rgba(${currentColor}, 0.2), 0 0 0 240px rgba(${currentColor}, 0.1),
              0 0 200px 240px rgba(${currentColor}, 0.1);
          }
          100% {
            background-color: rgb(${currentColor});
          box-shadow: 0 0 0 60px rgba(${currentColor}, 0.4),
          0 0 0 120px rgba(${currentColor}, 0.3), 0 0 0 180px rgba(${currentColor}, 0.2),
          0 0 0 240px rgba(${currentColor}, 0.1), 0 0 0 300px rgba(${currentColor}, 0),
          0 0 200px 300px rgba(${currentColor}, 0);
          }
        }
      `}</style>
      <Sun/>
      <Mountain/>
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