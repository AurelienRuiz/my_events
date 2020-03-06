import React, { Component } from 'react';
import axios from 'axios';
import config from '../../config.json';
import Map from '../Map/Map';
import './DetailsEvents.sass';
import Loading from '../Loading/Loading';
import Outing from '../Outing/Outing';
import InformativeMessage from "../InformativeMessage/InformativeMessage"
import io from "socket.io-client";
const socket = io(config.socket);


class DetailsEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoEvent: {},
            isLoaded: false,
            errorMessage: null
        }
    }

    componentDidMount() {
        axios.get(`${config.server}event?id=${this.props.idEvents}`)
        .then((res) => {
            this.setState({infoEvent: res.data})
            this.setState({isLoaded: true})
        })
    }

    createSortie(privacy) {
        axios.post(`${config.server}event?facebookId=${this.props.userInfo.facebookId}&eventId=${this.state.infoEvent.id}&privacy=${privacy}`)
        .then((res) => {
            if(!res.data.error)
            {
                socket.emit("new", res.data.insertedId)
                this.props.changePage("sortie", res.data.insertedId)
            }
            else
                this.setState({errorMessage: res.data.message})
        })
    }

    dateFormat(nbr) {
        if(nbr <= 9)
            return "0" + nbr
        return nbr
    }

    parseDate(date) {
        var objDate = new Date(date);
        return this.dateFormat(objDate.getDate()) + "/" + this.dateFormat(objDate.getMonth()+1) + "/" + objDate.getFullYear();
    }

    parsetext(text) {
        var parser = new DOMParser;
        var dom = parser.parseFromString(text, "text/html");
        return dom.body.textContent.toString();
    }

    render() {
        if(this.state.isLoaded == false)
            return <Loading/>
        else {
            var outing = null
            if(this.state.infoEvent.sorties.length > 0)
                outing = <Outing infoEvent={this.state.infoEvent} changePage={ this.props.changePage} userInfo={this.props.userInfo}/>
            else
                outing =  (
                    <div className="no-result">
                        <h4>Hummm, aucune sortie trouvé...</h4>
                        <img src="https://media.giphy.com/media/8UGoOaR1lA1uaAN892/giphy.gif" alt="gif-no-result"/>
                    </div>
                )
            return (
                <div className="details-event-container">
                    <div className="card-detail-event">
                        <InformativeMessage message={this.state.errorMessage} duration={4000} color="error" end={() => this.setState({errorMessage: null})}/>
                        <div className="header-card-detail-event">
                            <div className="header-card-left">
                                <div className="img-detail-event"></div>
                                <div className="info-detail-event">
                                    <div className="title-detail-event">
                                        <h2>{this.state.infoEvent.title}</h2>
                                    </div>
                                    <div className="date-event">
                                        <p><i className="fas fa-calendar-alt"></i>{this.parseDate(this.state.infoEvent.start_time)}</p>
                                    </div>
                                    <div className="place-event">
                                        <p><i className="fas fa-map-marker-alt"></i>{this.state.infoEvent.city}, {this.state.infoEvent.country}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="join-event">
                                <button onClick={() => this.createSortie("public")}>Créer une sortie publique</button>
                            </div>
                            <div className="join-event">
                                <button onClick={() => this.createSortie("private")}>Créer une sortie privée</button>
                            </div>
                        </div>
                        <div className="map">
                            <Map lat={this.state.infoEvent.latitude} long={this.state.infoEvent.longitude}/>
                        </div>
                        <div className="desc-event">
                            <h4>Description de l'évennement :</h4>
                            <p>{this.parsetext(this.state.infoEvent.description)}</p>
                        </div>
                        {outing}
                    </div>
                </div>
            );
        }
    }
}

export default DetailsEvents;