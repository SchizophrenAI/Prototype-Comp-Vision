import React, { Component} from "react";
import {Helmet} from "react-helmet"
import webgazer from 'webgazer'

class TestPage extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <Header></Header>
                <EyeTracker></EyeTracker>
            </div>
        )
    }
}

class Header extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="row" style= {{backgroundColor:"#F0F8FF"}} >
                <div className="col">
                    <div className="col d-flex justify-content-center" style={{bottom:"20%"}}>
                        <img src={require('../res/logo.png')}  width='100px' className="img-fluid" alt="banner" />
                    </div>
                </div>
            </div>
        )
    }
}
class MousePosition{
    constructor(x, y, timestamp){
        this.x = x;
        this.y = y;
        this.timestamp = timestamp;
    }
}

class EyeTracker extends React.Component{
    
    constructor(props){
        super(props)
        this.state = { count : 0, center : true,
                       right : false, left : false
                       }
        this.clicks = []
    }
    _getMouseCoordinates(e){
        var x = e.screenX;
        var y = e.screenX;
        var timeNow = Date.now()
        var coords = "X coords: " + x + ", Y coords: " + y + ", Timestamp: "+timeNow;
        this.clicks.push(new MousePosition(x,y,timeNow))
        console.log(coords)
    }
    saccadeTest(){
        if(this.state.count < 20){
           if(this.state.center){
             this.setState({center:false})
             this.setState({left:true})
           }
           else if(this.state.left){
            this.setState({center:true})
            this.setState({left:false})
           }
        }
        else if(this.state.count < 40){
          if(this.state.center){
            this.setState({center:false})
            this.setState({right:true})
          }
          else if(this.state.right){
            this.setState({center:true})
            this.setState({right:false})
          }
        }
        else{
            clearInterval(this.state.intervalId )
            this.setState({count:0})
        }
        var newcount = this.state.count +1
        this.setState( {count : newcount})
    }
    launchSaccadeTest(){
        console.log("launched saccade test")
        this.setState( {
           intervalId : setInterval(() => {this.saccadeTest()}, 500) 
        } )
    }
    render(){
        return(
            <div>
                {/* praying this can work*/}
                <Helmet>
                    <script src="../nodemodules/webgazer"></script>
                </Helmet>
                <div className="row"  >
                     <div className="col">
                         <button onClick={ ()=> this.launchSaccadeTest()}>Start Test</button>
                     </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button onClick={this.calibrate}>Calibrate</button>
                    </div>         
                </div>  
                <div className="row" style={{marginTop:"10%"}} onMouseDown= {this._getMouseCoordinates.bind(this)}>
                    <div className="col d-flex justify-content-center"  >
                        <img src= {require('../res/red.png')} width='30px' className="img-fluid" alt = "right-red" style={ {display : this.state.left  ? 'inline' : 'none' } }></img>
                    </div>    
                    <div className="col d-flex justify-content-center" >
                        <img src= {require('../res/red.png')} width='30px' className="img-fluid" alt = "right-red" style={ {display : this.state.center ? 'inline' : 'none' } }></img>
                    </div>      
                    <div className="col d-flex justify-content-center" >
                        <img src= {require('../res/red.png')} width='30px' className="img-fluid" alt = "right-red" style={ {display : this.state.right  ? 'inline' : 'none' } }></img>
                    </div>   
                </div>  
                        
            </div>
        )
    }
}



export default TestPage