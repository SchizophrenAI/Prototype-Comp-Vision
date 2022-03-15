import React from "react";
import TestPage from "./components/testpage";

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {apiResponse:""}
  }
  callAPI(){
    fetch("http://localhost:8000/eyetest")
    .then(res => res.text())
    .then(res => this.setState({apiResponse:res}))
  }
  componentWillMount(){
     this.callAPI();
  }

  render() {
    return (
      <div className="App">
        <TestPage apiResponse = {this.state.apiResponse}></TestPage>
        
      </div>
    );
  }

}
export default App;
