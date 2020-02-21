import React, { Component } from 'react';
import axios from 'axios';
import config from '../config.json';

class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            isLoaded: false,
            contents: []
        }
    }
    
    componentDidMount() {
        axios.get(`${config.server}home`)
        .then(response => {
            this.setState({"contents": response.data.events.event, "isLoaded": true});
        })
    }

    render(){
        const { error, isLoaded, contents } = this.state;
        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Chargement…</div>;
        } else {
            console.log(contents)
            return(
                <div>
                    <ul>
                        {contents.map(events => {
                        return <li key={events.title}>
                            {events.title}
                        </li>
                        })}
                    </ul>
                </div>
            );
        }
    }
}

export default Events;