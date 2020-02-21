import React, { Component} from "react";
import Events from "./Components/Evenements/Events";
import Category from "./Components/Category/Category";
import Home from "./Components/Home/Home";


class App extends Component{

  render(){
      return(
        <div className="App">
          <Home/>
        </div>
      );
  }
}

export default App;