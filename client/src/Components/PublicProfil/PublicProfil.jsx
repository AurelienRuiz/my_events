import React, { Component } from 'react';
import axios from 'axios';
import config from '../../config.json';
import Loading from '../Loading/Loading';
import './PublicProfil.sass';

class PublicProfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mySortiesCreate: [],
            mySortiesInvited: [],
            userInfo: [],
            isLoaded: false
        }
    }
    componentDidMount() {
        this.findData()
    }
    findData() {
        this.setState({isLoaded: false})
        axios.get(`${config.server}mySorties?facebookId=${this.props.id}`)
        .then((res) => {
            axios.get(`${config.server}user?facebookID=${this.props.id}`)
            .then(result => {
                if(this.props.id == document.cookie.replace(/(?:(?:^|.*;\s*)FacebookID\s*\=\s*([^;]*).*$)|^.*$/, "$1")) {
                    this.setState({mySortiesCreate: res.data.created, mySortiesInvited: res.data.invited, userInfo: result.data[0], isLoaded: true})
                }
                else {
                    var publicSortieCreate = []
                    var publicSortieInvited = []
                    for(let i = 0; i < res.data.created.length; i++) {
                        if(res.data.created[i].privacy == "public") {
                            publicSortieCreate.push(res.data.created[i])
                        }
                    }
                    for(let i = 0; i < res.data.invited.length; i++) {
                        if(res.data.invited[i].privacy == "public") {
                            publicSortieInvited.push(res.data.invited[i])
                        }
                    }
                    this.setState({mySortiesCreate: publicSortieCreate, mySortiesInvited: publicSortieInvited, userInfo: result.data[0], isLoaded: true})
                }
            })
        })
    }
    componentDidUpdate(prevProp) {
        if(prevProp.id != this.props.id && this.props.id != null)
            this.findData()
    }

    joinSortie(sortieID) {
        axios.post(`${config.server}join?facebookID=${document.cookie.replace(/(?:(?:^|.*;\s*)FacebookID\s*\=\s*([^;]*).*$)|^.*$/, "$1")}&sortieID=${sortieID}`)
        .then((res) => {
            this.props.changePage("sortie", sortieID)
        })
    }
    actionButton(pos, idSortie, type) {
        if(!this.isCreator(type, pos) && !this.isInvited(type, pos))
            return <button onClick={() => this.joinSortie(idSortie)}>Rejoindre</button>
        else if(this.isCreator(type, pos))
            return <button onClick={() => this.props.changePage("sortie", idSortie)}>Manager</button>
        else
            return <button onClick={() => this.props.changePage("sortie", idSortie)}>Voir</button>
    }
    isCreator(type, pos) {
        if(type === "created")
            return this.state.mySortiesCreate[pos].creator === document.cookie.replace(/(?:(?:^|.*;\s*)FacebookID\s*\=\s*([^;]*).*$)|^.*$/, "$1") ? true : false;
        return this.state.mySortiesInvited[pos].creator === document.cookie.replace(/(?:(?:^|.*;\s*)FacebookID\s*\=\s*([^;]*).*$)|^.*$/, "$1") ? true : false;
    }
    isInvited(type, pos) {
        if(type === "created")
        {
            if(this.state.mySortiesCreate[pos].invited.indexOf(document.cookie.replace(/(?:(?:^|.*;\s*)FacebookID\s*\=\s*([^;]*).*$)|^.*$/, "$1")) === -1)
                return false;
            return true;
        }
        else
        {
            if(this.state.mySortiesInvited[pos].invited.indexOf(document.cookie.replace(/(?:(?:^|.*;\s*)FacebookID\s*\=\s*([^;]*).*$)|^.*$/, "$1")) === -1)
                return false;
            return true;
        }
    }

    displayEvent(events, type) {
        if(events.length < 1) {
            return <div className="no-result">
                    <h3>Aucune sortie trouvée...</h3>
                    <img src="https://media.giphy.com/media/d2lcHJTG5Tscg/giphy.gif" alt="gif"/>
                </div>
        }
        else {
            return events.map((event, i) => {
                return  <div className="sortie" key={i}>
                            <div className="info-sortie">
                                <div className="img-info">
                                    <img src={this.state.userInfo.picture} alt="img-sortie"/>
                                </div>
                                <div className="title-nbr">
                                    <h4>{event.event.title}</h4>
                                    <p>Nombre de participant : {event.invited.length + 1}</p>
                                </div>
                            </div>
                            <div className="right">
                                {this.actionButton(i, event["_id"], type)}
                            </div>
                        </div>
            })
        }
    }

    render() {
        const {mySortiesCreate, mySortiesInvited, userInfo, isLoaded} = this.state;
        if(!isLoaded)
            return <Loading/>
        return (
            <div className="public-profil-container">
                <div className="card-public-profil">
                    <div className="card-header-public-profil">
                        <div className="avatar-profil-public">
                            <img src={userInfo.picture} alt="avatarr"/>
                        </div>
                        <div className="info-user-profil-public">
                            <div className="name">
                                <h3>{userInfo.name}</h3>
                            </div>
                            <div className="biography">
                                <p>{userInfo.biography}</p>
                            </div>
                        </div>
                    </div>
                    <div className="card-body-profil-public">
                        <h2>Liste des sorties</h2>
                        <h4>Mes sorties crées :</h4>
                        {this.displayEvent(mySortiesCreate, "created")}
                        <h4>Mes sorties :</h4>
                        {this.displayEvent(mySortiesInvited, "invited")}
                    </div>
                </div>
            </div>
        );
    }
}

export default PublicProfil;