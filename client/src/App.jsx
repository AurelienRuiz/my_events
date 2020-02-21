import React, { Component} from "react";
import Events from "./Components/Events";
import Category from "./Components/Category";


class App extends Component{

  render(){
      return(
        <div className="App">
          <Category/>
        </div>
      );
  }
}

export default App;