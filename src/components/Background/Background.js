import React, { Component } from "react";
import './Background.css';

class Background extends Component {
  state={
    today : new Date(),
    colors: ['248, 177, 149','255, 125, 69','246, 114, 128','192, 108, 132','53, 92, 125','192, 108, 180','246, 114, 128','248, 177, 149'],
    backgrounds: ['linear-gradient(180deg, #FF7D45 20%, rgba(248, 177, 149, 1) 100%)','linear-gradient(180deg, #F8B195 20%, rgba(255, 125, 69, 1) 100%)','linear-gradient(180deg, #F8B195 20%, rgba(246, 114, 128, 1) 100%)','linear-gradient(180deg, rgba(246, 114, 128, 0.7) 20%, rgba(192, 108, 132, 0.8) 100%)','linear-gradient(180deg, #6C5B7B 20%, rgba(53, 92, 125, 1) 100%)','linear-gradient(180deg, #6C5B7B 20%, #6C5B7B, rgba(192, 108, 180, 1) 100%)','linear-gradient(180deg, #C06CB4 20%, rgba(246, 114, 128, 1) 100%)','linear-gradient(180deg, #F67280 20%, rgba(248, 177, 149, 1) 100%)'],
    currentColor: '',
    bodyColor: '',

    // The night background lasts from 10pm to 4am so all times that are 12am to 4am are set as 11pm within curTime so that it is true for curTime >=22 branch.
    curTime: this.props.date
  }

  // Time=()=>{
  //   if(curTime<15 && curTime>=10) {
  //     this.setState({currentColor=this.state.colors[0]});
  //     this.setState({bodyColor = this.state.backgrounds[0]});
  //   } else if(curTime<18 && curTime>=15) {
  //     this.setState({currentColor=colors[0]});
  //     this.setState({bodyColor = backgrounds[0]});
  //   } else if(curTime<20 && curTime>=18) {
  //     this.setState({currentColor=colors[0]});
  //     this.setState({bodyColor = backgrounds[0]});
  //   } else if(curTime<22 && curTime>=20) {
  //     this.setState({currentColor=colors[0]});
  //     this.setState({bodyColor = backgrounds[0]});
  //   } else if(curTime>=22) {
  //     this.setState({currentColor=colors[0]});
  //     this.setState({bodyColor = backgrounds[0]});
  //   } else if(curTime<6 && curTime>=4) {
  //     this.setState({currentColor=colors[0]});
  //     this.setState({bodyColor = backgrounds[0]});
  //   } else if(curTime<8 && curTime>=6) {
  //     this.setState({currentColor=colors[0]});
  //     this.setState({bodyColor = backgrounds[0]});
  //   } else if(curTime<10 && curTime>=8) {
  //     this.setState({currentColor=colors[0]});
  //     this.setState({bodyColor = backgrounds[0]});
  //   }
  // }

  


  render() {
    return(
      <>
        {console.log(this.state.curTime.toString().split(" ")[4])}
        
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

        <div className="sun-wrap">
          <div className="sun"></div>
        </div>

        <div className="bird-wrap">
          <div className="birdA"></div>
          <div className="birdB"></div>
          <div className="birdC"></div>
          <div className="birdD"></div>
        </div>

        <style>{
        `
          body {
            background: ${this.state.bodyColor};
          }

          .mountainMid,
          .mountainRight,
          .mountainLeft {
            background-color: rgb(${this.state.currentColor});
          }


          .sun {
            background-color: rgb(${this.state.currentColor});
            box-shadow: 0 0 0 60px rgba(${this.state.currentColo}, 0.4),
            0 0 0 120px rgba(${this.state.currentColo}, 0.3), 0 0 0 180px rgba(${this.state.currentColor}, 0.2),
            0 0 0 240px rgba(${this.state.currentColor}, 0.1), 0 0 0 300px rgba(${this.state.currentColor}, 0),
            0 0 200px 300px rgba(${this.state.currentColo}, 0);
          }
        
          @keyframes rays {
            0% {
              box-shadow: 0 0 0 0px rgba(${this.state.currentColo}, 0.4),
                0 0 0 60px rgba(${this.state.currentColo}, 0.4), 0 0 0 120px rgba(${this.state.currentColo}, 0.3),
                0 0 0 180px rgba(${this.state.currentColo}, 0.2), 0 0 0 240px rgba(${this.state.currentColo}, 0.1),
                0 0 200px 240px rgba(${this.state.currentColo}, 0.1);
            }
            100% {
              background-color: rgb(${this.state.currentColo});
            box-shadow: 0 0 0 60px rgba(${this.state.currentColo}, 0.4),
            0 0 0 120px rgba(${this.state.currentColo}, 0.3), 0 0 0 180px rgba(${this.state.currentColo}, 0.2),
            0 0 0 240px rgba(${this.state.currentColo}, 0.1), 0 0 0 300px rgba(${this.state.currentColo}, 0),
            0 0 200px 300px rgba(${this.state.currentColo}, 0);
            }
          }
        `}</style>
      </>
    );
  }
}

// function Mountain() {
//   return (
//     <div className="mountains">
//       <div className="leftWrap">
//         <div className='mountainLeft'></div>
//       </div>
//       <div className="rightWrap">
//         <div className='mountainRight'></div>
//       </div>
//       <div className="midWrap">
//         <div className='mountainMid'></div>
//       </div>
//     </div>
//   );
// }

// function Sun() {
//   return(
//     <div className="sun-wrap">
//       <div className="sun"></div>
//     </div>
//   );
// }


// Colour chosen changes based on time and is stored inside variables that are used to change the colour of the sun and the background.
// The colours and backgrounds are stored in arrays and the right element is stored in the variables based on the time.
// function TimeChange() {
//   var today = new Date();
//   const colors = ['248, 177, 149','255, 125, 69','246, 114, 128','192, 108, 132','53, 92, 125','192, 108, 180','246, 114, 128','248, 177, 149']
//   const backgrounds = ['linear-gradient(180deg, #FF7D45 20%, rgba(248, 177, 149, 1) 100%)','linear-gradient(180deg, #F8B195 20%, rgba(255, 125, 69, 1) 100%)','linear-gradient(180deg, #F8B195 20%, rgba(246, 114, 128, 1) 100%)','linear-gradient(180deg, rgba(246, 114, 128, 0.7) 20%, rgba(192, 108, 132, 0.8) 100%)','linear-gradient(180deg, #6C5B7B 20%, rgba(53, 92, 125, 1) 100%)','linear-gradient(180deg, #6C5B7B 20%, #6C5B7B, rgba(192, 108, 180, 1) 100%)','linear-gradient(180deg, #C06CB4 20%, rgba(246, 114, 128, 1) 100%)','linear-gradient(180deg, #F67280 20%, rgba(248, 177, 149, 1) 100%)'];
//   var currentColor;
//   var bodyColor;

//   // The night background lasts from 10pm to 4am so all times that are 12am to 4am are set as 11pm within curTime so that it is true for curTime >=22 branch.
//   let curTime = today.getHours();
//   if(curTime>=0 && curTime<4) {
//     curTime = 23;
//   }

//   if(curTime<15 && curTime>=10) {
//     currentColor=colors[0];
//     bodyColor = backgrounds[0];
//   } else if(curTime<18 && curTime>=15) {
//     currentColor=colors[1];
//     bodyColor = backgrounds[1];
//   } else if(curTime<20 && curTime>=18) {
//     currentColor=colors[2];
//     bodyColor = backgrounds[2];
//   } else if(curTime<22 && curTime>=20) {
//     currentColor=colors[3];
//     bodyColor = backgrounds[3];
//   } else if(curTime>=22) {
//     currentColor=colors[4];
//     bodyColor = backgrounds[4];
//   } else if(curTime<6 && curTime>=4) {
//     currentColor=colors[5];
//     bodyColor = backgrounds[5];
//   } else if(curTime<8 && curTime>=6) {
//     currentColor=colors[6];
//     bodyColor = backgrounds[6];
//   } else if(curTime<10 && curTime>=8) {
//     currentColor=colors[7];
//     bodyColor = backgrounds[7];
//   }
  
//   // Styles based on the set variables for the sun and mountain colours
//   return (
//     <>
//       <style>{
//       `
//         body {
//           background: ${bodyColor};
//         }

//         .mountainMid,
//         .mountainRight,
//         .mountainLeft {
//           background-color: rgb(${currentColor});
//         }


//         .sun {
//           background-color: rgb(${currentColor});
//           box-shadow: 0 0 0 60px rgba(${currentColor}, 0.4),
//           0 0 0 120px rgba(${currentColor}, 0.3), 0 0 0 180px rgba(${currentColor}, 0.2),
//           0 0 0 240px rgba(${currentColor}, 0.1), 0 0 0 300px rgba(${currentColor}, 0),
//           0 0 200px 300px rgba(${currentColor}, 0);
//         }
      
//         @keyframes rays {
//           0% {
//             box-shadow: 0 0 0 0px rgba(${currentColor}, 0.4),
//               0 0 0 60px rgba(${currentColor}, 0.4), 0 0 0 120px rgba(${currentColor}, 0.3),
//               0 0 0 180px rgba(${currentColor}, 0.2), 0 0 0 240px rgba(${currentColor}, 0.1),
//               0 0 200px 240px rgba(${currentColor}, 0.1);
//           }
//           100% {
//             background-color: rgb(${currentColor});
//           box-shadow: 0 0 0 60px rgba(${currentColor}, 0.4),
//           0 0 0 120px rgba(${currentColor}, 0.3), 0 0 0 180px rgba(${currentColor}, 0.2),
//           0 0 0 240px rgba(${currentColor}, 0.1), 0 0 0 300px rgba(${currentColor}, 0),
//           0 0 200px 300px rgba(${currentColor}, 0);
//           }
//         }
//       `}</style>
//       <Sun/>
//       <Mountain/>
//     </>
//   );
// }

// function Birds() {
//   return(
//     <div className="bird-wrap">
//       <div className="birdA"></div>
//       <div className="birdB"></div>
//       <div className="birdC"></div>
//       <div className="birdD"></div>
//     </div>
//   );
// }

// function Background() {
//   return (
//     <>
//       <TimeChange />
//       <Birds />
//       <Mountain />
//     </>
//   );
// }

export default Background;