import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import Home from "../Home/Home";
import DetailsEvents from "../DetailsEvents/DetailsEvents"
import UpdateProfil from '../UpdateProfil/UpdateProfil';
import DescOuting from '../DescOuting/DescOuting';
import PublicProfil from '../PublicProfil/PublicProfil';
import Loading from '../Loading/Loading.jsx';
import "./../Home/Home.sass"

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    changePage(pageNumber) {
        this.setState({currentPage: pageNumber})
        this.lookingForEvents(this.state.currentCategory, this.state.currentPosition, pageNumber)
    }

    showModal() {
        this.setState({show: true})
    }

    closeModal() {
        this.setState({show: false})
    }

    render() {
        if(this.state.show) {
            var modal = <UpdateProfil userInfo={this.props.userInfo} modal={this.state.show} modal={() => this.closeModal()} setUserInfo={this.props.setUserInfo}/>
        }
        var page = <div></div>
        switch(this.props.currentPage)
        {
            case "home":
                page = <Home userInfo={ this.props.userInfo } changePage={ this.props.changePage }/>
                break;
            case "detailsEvents":
                page = <DetailsEvents idEvents={this.props.idEvents} userInfo={this.props.userInfo} changePage={ this.props.changePage }/>
                break;
            case "sortie":
                page = <DescOuting idSortie={this.props.idEvents} userInfo={this.props.userInfo} changePage={ this.props.changePage }/>
                break;
            case "publicProfil":
                page = <PublicProfil id={this.props.idEvents} changePage={ this.props.changePage }/>
                break;
            default:
                page = <div className="height"><Loading /></div>
        }
        return (
            <React.Fragment>
                <NavBar userInfo={this.props.userInfo} changePage={this.props.changePage} modal={() => this.showModal()}/>
                {modal}
                {page}
                <Footer/>
            </React.Fragment>
        );
    }
}

export default Page;