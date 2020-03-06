import React, { Component } from 'react';
import Axios from 'axios';
import config from '../../config.json';
import Map from '../Map/Map';
import Loading from '../Loading/Loading';
import InvitedUsers from '../InvitedUsers/InvitedUsers';
import './DescOuting.sass';
import io from "socket.io-client";
const socket = io(config.socket);

class DescOuting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            infoSortie: null,
            displayModal: false,
            chatMessage: [],
            inputValue: ""
        }
    }
    
    componentDidMount() {
        Axios.get(`${config.server}sortie?sortieID=${this.props.idSortie}`)
        .then((res) => {
            this.setState({infoSortie: res.data})
            this.setState({isLoaded: true})
            socket.emit("getMessages", this.props.idSortie)
        })

        socket.on("newMessage", messages => {
            this.setState({chatMessage: messages})
        })
    }

    componentDidUpdate(prevProps, prevState)
    {
        if(prevState.chatMessage != this.state.chatMessage)
        {
            let chatContainer = document.querySelector(".chat_container")
            chatContainer.scrollTop = chatContainer.scrollHeight
        }
    }

    leaveOuting() {
        Axios.put(`${config.server}leave?sortieID=${this.props.idSortie}&facebookID=${this.props.userInfo.facebookId}`)
        .then((res) => {
            this.props.changePage('home')
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

    isCreator(){
        if(this.state.infoSortie.creator.id === this.props.userInfo.facebookId)
            return true
        return false
    }
    buttonText()
    {
        if(this.isCreator())
            return "Supprimer la sortie"
        return "Quitter la sortie"
    }

    showModal() {
        this.setState({displayModal: true})
    }

    closeModal() {
        this.setState({displayModal: false})
        Axios.get(`${config.server}sortie?sortieID=${this.props.idSortie}`)
        .then((res) => {
            this.setState({infoSortie: res.data})
        })
    }
    sendMessage() {
        socket.emit("message", this.props.idSortie, this.state.inputValue, this.props.userInfo.facebookId)
        this.setState({inputValue: ""})
    }
    
    render() {
        if(this.state.isLoaded == false)
            return <Loading/>
        else {
            var invitedFriends;
            if(this.state.infoSortie.privacy == "private") {
                invitedFriends = (
                    <div className="leave-outing">
                        <button onClick={() => this.showModal()}>Inviter des amis</button>
                    </div>
                )
            }
            else
                invitedFriends =  <div></div>
            var modal
            if(this.state.displayModal)
                modal = <InvitedUsers modal={() => this.closeModal()} facebookId={this.props.userInfo.facebookId} sortieId={this.state.infoSortie['_id']} listInvited={this.state.infoSortie.invited}/>
            
            return (
                <React.Fragment>
                    {modal}
                    <div className="desc-outing-container">
                        <div className="desc-outing-card">
                            <div className="header-card-outing">
                                <div className="header-card-left">
                                    <div className="title-detail-outing">
                                        <h2>{this.state.infoSortie.event.title}</h2>
                                    </div>
                                    <div className="date-outing">
                                        <p><i className="fas fa-calendar-alt"></i>{this.parseDate(this.state.infoSortie.event.start_time)}</p>
                                    </div>
                                    <div className="place-outing">
                                        <p><i className="fas fa-map-marker-alt"></i>{this.state.infoSortie.event.city}, {this.state.infoSortie.event.country}</p>
                                    </div>
                                </div>
                                <div className="leave-outing">
                                    <button onClick={() => this.leaveOuting()}>{this.buttonText()}</button>
                                </div>
                                {invitedFriends}
                            </div>
                            <div className="map">
                                <Map lat={this.state.infoSortie.event.latitude} long={this.state.infoSortie.event.longitude}/> 
                            </div>
                            <div className="card-outing-body">
                                <div className="all-participant">
                                    <div className="participant">
                                        <i className="fas fa-crown"></i>
                                        <img src={this.state.infoSortie.creator.picture} alt="profil-pic"/>
                                        <h6>{this.state.infoSortie.creator.name}</h6>
                                    </div>
                                    {this.state.infoSortie.invited.map((invited, i) => {
                                        return (<div className="participant" key={i} onClick={() => this.props.changePage("publicProfil", invited.id)}>
                                            <img src={invited.picture} alt="profil-pic"/>
                                            <h6>{invited.name}</h6>
                                        </div>)
                                    })}
                                </div>
                                <div className="chat">
                                    <div className="chat_container">
                                        {this.state.chatMessage.map((message, i) => {
                                            return <React.Fragment>
                                                <div key={i} className={`chat_message${(message.facebookId == this.props.userInfo.facebookId) ? "_right" : ""}`}>
                                                    <img src={message.picture} className="chat_picture"/>
                                                    <p>{message.content}</p>
                                                </div>
                                                <div className="clear"></div>
                                            </React.Fragment>
                                        })} 
                                    </div>
                                    <div className="chat_form">
                                        <input onChange={(e) => this.setState({inputValue: e.target.value})} type="text" value={this.state.inputValue} placeholder="Votre message..."/>
                                        <button onClick={() => this.sendMessage()}>Send !</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
    }
}

export default DescOuting;