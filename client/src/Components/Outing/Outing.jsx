import React, { Component } from 'react';
import './Outing.sass';
import Axios from 'axios';
import config from '../../config.json'

class Outing extends Component {

    isInvited(num) {
        if(this.props.infoEvent.sorties[num].invited.indexOf(this.props.userInfo.facebookId) != -1)
            return true
        return false
    }
    isCreator(num){
        if(this.props.infoEvent.sorties[num].creator.id === this.props.userInfo.facebookId)
            return true
        return false
    }
    buttonText(num)
    {
        if(this.isCreator(num))
            return "Manager la sortie"
        if(this.isInvited(num))
            return "Voir la sortie"
        return "Rejoindre la sortie"
    }
    joinSortie(sortieID) {
        Axios.post(`${config.server}join?facebookID=${this.props.userInfo.facebookId}&sortieID=${sortieID}`)
        .then((res) => {
            this.props.changePage("sortie", sortieID)
        })
    }
    
    render() {
        return (
            <div className="outing-event">
                <h4>Sorties :</h4>
                <div className="outing-public">
                    {this.props.infoEvent.sorties.map((sortie,i) => {
                        return <div className="sortie" key={sortie["_id"]}>
                            <div className="sortie-user-part">
                                <div className="img-sortie-profil">
                                    <img src={sortie.creator.picture}/>
                                </div>
                                <div className="name-user-sortie">
                                    <h6>{sortie.creator.name}</h6>
                                </div>
                            </div>
                            <div className="join-sortie">
                                <button onClick={() => this.joinSortie(sortie["_id"])}>{this.buttonText(i)}</button>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        );
    }
}

export default Outing;