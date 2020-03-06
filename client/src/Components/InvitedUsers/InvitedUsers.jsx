import React, { Component } from 'react';
import axios from 'axios';
import config from '../../config.json'
import './InvitedUsers.sass';

class InvitedUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listUsers: []
        }
    }

    componentDidMount() {
        axios.get(`${config.server}allUsers`)
        .then((res) => {
            var sortListusers = []
            var invitedIds = this.props.listInvited.map(invited => {
                return invited.id
            })
            for(let i = 0; i < res.data.length; i++) {
                if(!invitedIds.includes(res.data[i].facebookId) && res.data[i].facebookId != this.props.facebookId) {
                    sortListusers.push(res.data[i])
                }
            }
            this.setState({listUsers: sortListusers})
        })
    }

    invite(invitedId) {
        let button = document.getElementById(`bt_invite_${invitedId}`)
        axios.post(`${config.server}invite?sortieId=${this.props.sortieId}&facebookId=${this.props.facebookId}&invited=${invitedId}`)
        .then((res) => {
            console.log(res.data)
            if(!res.data.error)
            {
                button.innerText = "Ajouté"
                button.setAttribute("disabled", "true")
            }
        })
    }

    checkInvited() {
        if(this.state.listUsers.length < 1) {
            return <div className="no-result-friends">
                    <h3>Aucun ami à inviter...</h3>
                    <img src="https://media.giphy.com/media/VfyC5j7sR4cso/giphy.gif" alt="gif"/>
                </div>
        }
        else {
            return this.state.listUsers.map((users, i) => {
                return <div key={i} className="invited-friends-cards">
                        <div className="left">
                            <img src={users.picture} alt="pic" className="img-modal"/>
                            <h6>{users.name}</h6>
                        </div>
                        <div className="btn-invited">
                            <button onClick={() => this.invite(users.facebookId)} id={`bt_invite_${users.facebookId}`}>Inviter</button>
                        </div>
                    </div>
            })
        }
    }
    
    render() {
        return (
            <div id="modal">
                <div className="modal-content-invited">
                    <div className="modal-header">
                        <h2>Inviter des amis</h2>
                        <i onClick={() => this.props.modal()} className="far fa-times-circle"></i>
                    </div>
                    <div className="modal-body-friends">
                        {this.checkInvited()}
                    </div>
                </div>
            </div>
        );
    }
}

export default InvitedUsers;