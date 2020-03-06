import React, { Component } from 'react';
import axios from 'axios';
import config from '../../config.json';
import Loading from '../Loading/Loading';
import './Category.sass';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bestCategory: [
                {
                    name: "Concert",
                    class: "concert"
                },
                {
                    name: "Sport",
                    class: "sport"
                },
                {
                    name: "Festivals",
                    class: "festival"
                },
                {
                    name:"NightLife",
                    class: 'night'
                },
                {
                    name: "Comedy",
                    class: "comedy"
                },
                {
                    name: "Performing Arts",
                    class: "arts"
                }
            ]
        }
    }

    render(){
        const { error, isLoaded, bestCategory } = this.state;
        const {category} = this.props
        return(
            <div className="container-category">
                <div className="title-category">
                    <h2>Top Categories</h2>
                </div>
                <div className="container-cards-category">
                    {bestCategory.map(category => {
                    return <div className={`cards-category ${category.class}`} key={category.name}>
                        <h4>{category.name}</h4>
                    </div>
                    })}
                </div>
            </div>
        );
    }
}

export default Category;