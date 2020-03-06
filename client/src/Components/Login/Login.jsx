import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import './Login.sass';
import Axios from 'axios';
import config from "./../../config.json"

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            name: "",
            email: "",
            picture: ""
        }
        this.responseFacebook = this.responseFacebook.bind(this);
    }

    responseFacebook(response) {
        this.setState({
            userId: response.userID,
            name: response.name,
            email: response.email,
            picture: response.picture.data.url
        })
        Axios.post(`${config.server}connexion`, {
            facebookId: response.userID,
            name: response.name,
            email: response.email,
            picture: response.picture.data.url
        })
        .then(res => {
            this.props.setUserInfo(res.data.userInfo[0])
            document.cookie = `FacebookID=${response.userID}`
            this.props.onClick("home")
        })
    }


    render() {
        return (
            <div className="login-container">
                <img src="img/logo/mooveet.png" alt="Logo"/>
                <div className="div-button-facebook">
                    <FacebookLogin
                        appId="987735388286901"
                        autoLoad={false}
                        fields="name,email,picture"
                        size="metro"
                        callback={this.responseFacebook}
                        render={renderProps => (
                            <button onClick={renderProps.onClick} className="facebook-button"><i className="fab fa-facebook-f"></i>Connexion Facebook</button>
                        )}
                    />
                </div>
            </div>
        );
    }
}

export default Login;