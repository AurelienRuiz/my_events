import React, { Component } from 'react';
import axios from 'axios';
import config from '../../config.json';

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
                <div className="events">
                    <ul>
                        {contents.map(events => {
                        return <li key={events.title}>
                            <p>{events.title}</p>
                            <p>{events.venue_name}</p>
                            {events.image ? <img src={events.image.url}/> : <></>}
                        </li>
                        })}
                    </ul>
                </div>
            );
        }
    }
}

export default Events;