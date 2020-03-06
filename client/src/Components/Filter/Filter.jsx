import React, { Component } from 'react';
import "./Filter.sass";
import Axios from 'axios';
import config from '../../config.json';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPosition: "",
            currentCategory: "",
            suggestion: []
        }
    }
    localisation() {
        let that = this
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function(position) {
                Axios.get(`${config.server}location?lat=${position.coords.latitude}&lon=${position.coords.longitude}`)
                .then((res) => {
                    that.changePosition(res.data.address.city)
                })
            });
        }
    }
    parsetext(text) {
        var parser = new DOMParser;
        var dom = parser.parseFromString(text, "text/html");
        return dom.body.textContent;
    }
    handleChange(value) {
        this.setState({currentCategory: value})
    }
    changePosition(position) {
        this.setState({currentPosition: position})
    }
    sendData() {
        this.props.setData(this.state.currentCategory, this.state.currentPosition, 1)
    }

    render() {
        return (
            <div className="filter-container">
                <div className="filter-bar">
                    <select onChange={(e) => this.handleChange(e.target.value)}>
                        <option>Categories</option>
                        {this.props.category.map((category, i) => {
                            return <option value={category.id} key={i}>{this.parsetext(category.name)}</option>
                        })}
                    </select>
                    <input type="text" placeholder="Ville..." id="input-search-city" list="search-list-result" value={this.state.currentPosition} onClick={() => this.localisation()} onChange={(e) => this.changePosition(e.target.value)}/>
                    <button onClick={() => this.sendData()}>
                        <i className="fas fa-search"></i>
                    </button>
                    <datalist id="search-list-result">
                        {this.state.suggestion.map((city, i) => {
                            return <option key={i}>{city}</option>
                        })}
                    </datalist>
                </div>
            </div>
        );
    }
}

export default Filter;