import React, { Component } from 'react';
import footer from './imgs/WikiLibs_Logo_Footer.png';

import './style.css';

export default class Footer extends Component {
    render() {
        return (
            <div id="Footer">
                <div className="footer_container">
                    <div className="copyright">
                        <img className="logo_footer" src={footer} alt=""></img>
                        <span className="copyright_txt">WikiLibs &copy; 2019</span>
                    </div>
                    <div className="useful">
                        <a href="#CONTACT">CONTACT</a>
                        <a href="#HELP">HELP AND FAQ</a>
                        <a href="#TERMSOFUSE">TERMS OF USE</a>
                        <a href="#PRIVACY">PRIVACY POLICY</a>
                    </div>
                </div>
            </div>
        );
    }
}