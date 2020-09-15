import React, { Component } from 'react';
import footer from './imgs/WikiLibs_Logo_Footer.png';

import './style.css';

export default class Footer extends Component {
    render() {
        return (
            <div id="Footer">
                <div className="footer-container">
                    <div className="footer-copyright">
                        <img className="footer-logo" src={footer} alt=""></img>
                        <span className="footer-copyright-txt">WikiLibs &copy; 2020</span>
                    </div>
                    <div className="footer-useful">
                        <a href="/contact">CONTACT</a>
                        <a href="/faq">HELP AND FAQ</a>
                        <a href="/tou">TERMS OF USE</a>
                        <a href="/privacypolicy">PRIVACY POLICY</a>
                    </div>
                </div>
            </div>
        );
    }
}