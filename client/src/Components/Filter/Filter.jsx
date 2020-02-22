import React, { Component } from 'react';
import "./Filter.sass";

class Filter extends Component {
    render() {
        return (
            <div className="filter-container">
                <div className="filter-search-bar">
                    <input type="text" placeholder="City..."/>
                    <button>search</button>
                </div>
                <div className="filter-icon">
                    <button>list</button>
                    <button>map</button>
                </div>
            </div>
        );
    }
}

export default Filter;