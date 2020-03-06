import React, { Component} from "react";
import axios from 'axios';
import config from './config.json';
import Page from "./Components/Page/Page";
import Login from "./Components/Login/Login";
import Loading from "./Components/Loading/Loading"
import "./App.sass"

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "",
      IdEvent: null,
      userInfo: {}
    }
    this.setCurrentPage = this.setCurrentPage.bind(this)
    this.setUserInfo = this.setUserInfo.bind(this)
  }
  
  componentDidMount() {
    if(document.cookie.replace(/(?:(?:^|.*;\s*)FacebookID\s*\=\s*([^;]*).*$)|^.*$/, "$1")) {
      var facebookID = document.cookie.replace(/(?:(?:^|.*;\s*)FacebookID\s*\=\s*([^;]*).*$)|^.*$/, "$1")
      axios.get(`${config.server}user?facebookID=${facebookID}`)
      .then((res) => {
        this.setUserInfo(res.data[0])
        this.setCurrentPage("home")
      })
    }
    else
      this.setCurrentPage("login")
  }

  setCurrentPage(page, IdEvent = null) {
    if(page === "home" && this.state.currentPage === "login")
    {
      var facebookID = document.cookie.replace(/(?:(?:^|.*;\s*)FacebookID\s*\=\s*([^;]*).*$)|^.*$/, "$1")
      axios.get(`${config.server}user?facebookID=${facebookID}`)
      .then((res) => {
        this.setUserInfo(res.data[0])
        this.setState({
          currentPage: page
        })
      })
    }
    else
    {  
      if(IdEvent)
        this.setState({
          IdEvent: IdEvent
        })
      
      this.setState({
        currentPage: page
      })
    }
  }

  setUserInfo(infos) {
    this.setState({
      userInfo: infos
    })
  }

  render(){
    let component = "";
    switch (this.state.currentPage) {
      case "login":
          component = <Login onClick={ this.setCurrentPage } setUserInfo={ this.setUserInfo }/>
        break;
      case "detailsEvents":
      case "home":
      case "sortie":
      case "publicProfil":
          component = <Page userInfo={ this.state.userInfo } setUserInfo={ this.setUserInfo } changePage={ this.setCurrentPage } currentPage={this.state.currentPage} idEvents={this.state.IdEvent}/>
        break;
      default:
          component = <Loading />
    }
      return(
        <div className="App">
          { component }
        </div>
      );
  }
}

export default App;