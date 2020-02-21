import React, { Component } from 'react';
import Events from "../Evenements/Events"
import Filter from "../Filter/Filter";

class Home extends Component {
    render() {
        return (
            <div className="container-home">
                <Filter/>
                <Events/>
            </div>
        );
    }
}

export default Home;