import React, { Component } from 'react';
import './Footer.sass';

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="footer-content">
                    <img src="/img/logo/mooveet.png" alt="Logo"/>
                </div>
                <div className="icons-footer">
                    <a href="https://www.facebook.com/Mooveet-110828227185069" target="_blank"><i className="fab fa-facebook-square"></i></a>
                    <a href="https://twitter.com/Mooveet1" target="_blank"><i className="fab fa-twitter-square"></i></a>
                    <a href="https://www.instagram.com/mooveet_nantes/" target="_blank"><i className="fab fa-instagram"></i></a>
                </div>
                <div className="copyright">
                    <p>&copy; 2020 Created by <a href="https://alexisallais.fr/" target="_blank">Alexis Allais</a> & <a href="https://aurelienruizminano.fr/" target="_blank">Aurélien Ruiz-Minano</a></p>
                </div>
            </div>
        );
    }
}

export default Footer;