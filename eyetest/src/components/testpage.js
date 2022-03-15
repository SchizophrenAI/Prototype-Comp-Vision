import React, { Component } from "react"

class TestPage extends React.Component {
  constructor(props) {
    super(props)
  }
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
  constructor(props) {
    super(props)
  }
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
  constructor(props) {
    super(props)
  }

  drawCoordinates(x, y) {
    var ctx = document.getElementById("plotting_canvas").getContext("2d")
    ctx.fillStyle = "Red"
    ctx.beginPath()
    ctx.arc(x, y, 5, 0, Math.PI * 2, true)
    ctx.fill()
  }

  calibrate() {
      
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
