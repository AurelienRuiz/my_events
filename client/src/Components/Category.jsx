import React, { Component } from 'react';
import axios from 'axios';
import config from '../config.json';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            isLoaded: false,
            category: []
        }
    }

    componentDidMount() {
        axios.get(`${config.server}category`)
        .then(response => {
            this.setState({"category": response.data.category, "isLoaded": true});
        })
    }
    render(){
        const { error, isLoaded, category } = this.state;
        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Chargement…</div>;
        } else {
            console.log(category)
            return(
                <div>
                    <ul>
                        {category.map(category => {
                        return <li key={category.name}>
                            {category.name}
                        </li>
                        })}
                    </ul>
                </div>
            );
        }
    }
}

export default Category;