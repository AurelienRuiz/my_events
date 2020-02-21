import React, { Component} from "react";
import config from "./config.json";
import axios from "axios";


class App extends Component{

  componentDidMount() {
    axios.get(`${config.server}home`)
    .then(response => {
      console.log(response.data);
    })
  }
  render(){
    return(
      <div className="App">
        <h1> Hello, World! </h1>
      </div>
    );
  }
}

export default App;