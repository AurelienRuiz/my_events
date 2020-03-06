import React, { Component } from 'react';
import axios from 'axios';
import config from '../../config.json';
import "./NavBar.sass";

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResult: []
        }
    }
    

    searchUsers(search) {
        if(search.length < 1) {
            this.setState({searchResult: []})
        }
        else {
            axios.get(`${config.server}user/search?search=${search}`)
            .then((res) => {
                this.setState({searchResult: res.data})
            })
        }
    }

    findUser() {
        this.props.changePage("publicProfil", this.state.searchResult[0].facebookId)
    }

    disconnect() {
        document.cookie = "FacebookID=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        this.props.changePage('login')
    }

    render() {
        return (
            <div className="nav-bar-container">
                <div className="nav-bar-logo">
                    <img src="/img/logo/mooveet.png" alt="Logo" onClick={() => this.props.changePage("home")}/>
                </div>
                <div className="search-members">
                    <input type="text" placeholder="Rechercher un membres..." list="search-user" onChange={(e) => this.searchUsers(e.target.value)}/>
                    <datalist id="search-user">
                        {this.state.searchResult.map((result, i) => {
                            return <option key={i} value={result.name}/>
                        })}
                    </datalist>
                    <button onClick={() => this.findUser()}><i className="fas fa-search"></i></button>
                </div>
                <div className="nav-bar-profil">
                    <img src={this.props.userInfo.picture} alt="Profil-Pic" onClick={() => this.props.changePage("publicProfil", this.props.userInfo.facebookId)}/>
                    <div className="nav-bar-update-profil">
                        <p onClick={() => this.props.changePage("publicProfil", this.props.userInfo.facebookId)}>{ this.props.userInfo.name }</p>
                        <a onClick={this.props.modal}>Modifier profil</a>
                    </div>
                    <div className="disconnect">
                        <button onClick={() => this.disconnect()}>Se Déconnecter</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default NavBar;