import React, { Component } from 'react';
import "./Filter.css";

class Filter extends Component {
    render() {
        return (
            <div className="filter-container">
                <div className="filter-search-bar">
                    <input type="text" placeholder="City..."/>
                    <button>search</button>
                </div>
                <div className="filter-icon">
                    <div className="filter-list">
                        <button>list</button>
                    </div>
                    <div className="filter-map">
                        <button>map</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Filter;