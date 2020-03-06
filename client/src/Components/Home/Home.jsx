import React, { Component } from 'react';
import axios from 'axios';
import config from '../../config.json';
import Category from '../Category/Category';
import Events from '../Evenements/Events';
import Filter from '../Filter/Filter';
import Loading from '../Loading/Loading.jsx';
import SliderImg from '../SliderImg/SliderImg';
import "./Home.sass"

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [],
            currentCategory: "",
            currentPosition: "",
            events: [],
            currentPage: 1,
            totalPage: null,
            show: false,
            isLoading: true
        }
    }
    componentDidMount() {
        axios.get(`${config.server}category`)
        .then(response => {
            this.setState({"category": response.data.category});
        })
        this.lookingForEvents("", "", 1)
    }

    lookingForEvents(category, position, page) {
        this.setState({isLoading: true})
        axios.get(`${config.server}search?location=${position}&category=${category}&page=${page}`)
        .then(response => {
            this.setState({isLoading: false})
            this.setState({totalPage: response.data.total_items})
            if(response.data.total_items < 1)
                this.setState({events: []})
            else
                this.setState({events: response.data.events.event});
        })
    }

    setSearchData(category, position, page) {
        this.setState({currentCategory: category, currentPosition: position, currentPage: page})
        this.lookingForEvents(category, position, page)
    }

    changePage(pageNumber) {
        this.setState({currentPage: pageNumber})
        this.lookingForEvents(this.state.currentCategory, this.state.currentPosition, pageNumber)
    }

    render() {
        var events = null
        if(this.state.isLoading)
            events = <Loading />
        else
            events = <Events events={this.state.events} setCurrentPage={this.props.changePage} currentPage={this.state.currentPage} totalPage={this.state.totalPage} changePage={(pageNumber) => this.changePage(pageNumber)}/>
        return (
            <React.Fragment>
                <SliderImg/>
                <div className="title-events">
                    <h2>Événements</h2>
                </div>
                <Filter category={ this.state.category } setData={(category, position, page) => this.setSearchData(category, position, page)}/>
                {events}
                <Category category={ this.state.category }/>
            </React.Fragment>
        );
    }
}

export default Home;