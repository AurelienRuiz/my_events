import React, { Component } from 'react';
import './updateProfil.sass';
import Axios from 'axios';
import config from '../../config.json';
import InformativeMessage from "../InformativeMessage/InformativeMessage"

class UpdateProfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picturePic: this.props.userInfo.picture,
            message: null
        }
    }
    
    changePic(input) {
        var files = input.files[0]
        var reader = new FileReader()
        reader.readAsDataURL(files)
        reader.onload = () => {
            this.setState({picturePic: reader.result})
            Axios.put(`${config.server}user/picture`, {
                data: reader.result
            })
            .then(res => {
                this.setState({message: "Changement enregistré"})
                this.props.userInfo.picture = reader.result
                this.setUserInfo(this.props.userInfo)
            })
        }
    }

    clearMessage()
    {
        this.setState({message: null})
    }

    changeBio() {
        var bio = document.getElementById('bio').value
        Axios.put(`${config.server}user/biography`, {
            data: bio
        })
        .then(res => {
            this.setState({message: "Changement enregistré"})
            this.props.userInfo.biography = bio
            this.setUserInfo(this.props.userInfo)
        })
    }

    render() {
        return (
            <div id="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3>Modifier le profil</h3>
                        <i onClick={this.props.modal} className="far fa-times-circle"></i>
                    </div>
                    <InformativeMessage message={this.state.message} duration={2000} color="success" end={() => this.clearMessage()}/>
                    <div className="modal-body">
                        <h4>Photo de profil</h4>
                        <input type="file" id="updatePic" onChange={(e) => this.changePic(e.target)}/>
                        <label htmlFor="updatePic">
                            <p>modifier</p>
                        </label>
                    </div>
                    <div className="image-update-profile">
                        <img src={this.state.picturePic} alt="profil-pic"/>
                    </div>
                    <div className="modal-body">
                        <h4>Nom</h4>
                    </div>
                    <div className="center">
                        <h6>{this.props.userInfo.name}</h6>
                    </div>
                    <div className="modal-body">
                        <h4>Email</h4>
                    </div>
                    <div className="center">
                    <a>{this.props.userInfo.email}</a>
                    </div>
                    <div className="modal-body">
                        <h4>Bio</h4>
                        <p onClick={() => this.changeBio()}>modifier</p>
                    </div>
                    <div className="center">
                        <textarea cols="50" rows="8" id="bio" placeholder="Ajouter une description..." defaultValue={this.props.userInfo.biography}></textarea>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateProfil;