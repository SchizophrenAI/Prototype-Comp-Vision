import React, { Component } from "react"

class TestPage extends React.Component {
  render() {
    return (
      <div>
        <Header></Header>
        <EyeTracker></EyeTracker>
      </div>
    )
  }
}
class Header extends React.Component {
  render() {
    return (
      <div className="row" style={{ backgroundColor: "#F0F8FF" }}>
        <div className="col">
          <div
            className="col d-flex justify-content-center"
            style={{ bottom: "20%" }}
          >
            <img
              src={require("../res/logo.png")}
              width="100px"
              className="img-fluid"
              alt="banner"
            />
          </div>
        </div>
      </div>
    )
  }
}

class EyeTracker extends React.Component {
  calibrate() {
    const webgazer = require("webgazer")
    var prediction = webgazer.getCurrentPrediction()
    if (prediction) {
      var x = prediction.x
      var y = prediction.y
    }
    console.log(x, y)
  }

  antiSaccadeTest() {
    function update() {}
    var intervalID = setInterval(update, 1000)
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col">
            <button onClick={this.antiSaccadeTest}>Start Test</button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button onClick={this.calibrate}>Calibrate</button>
          </div>
        </div>
      </div>
    )
  }
}

export default TestPage
