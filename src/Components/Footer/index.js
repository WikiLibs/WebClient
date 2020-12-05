import React, { Component } from 'react';
import footer from './imgs/WikiLibs_Logo_Footer.png';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import fullLogo from './imgs/WikiLibs_Logo.png'

import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';

import './style.css';

export default class Footer extends Component {
    state = {
        open: false,
        posPop: null
    }

    onChange = (event) => {
        this.setState({open: !this.state.open});
        this.setState({posPop: event.currentTarget})
    }

    render() {
        return (
            <div id="Footer">
                <div className="footer-container">
                    <div className="footer-copyright">
                        <img className="footer-logo" src={footer} alt=""></img>
                        <span className="footer-copyright-txt">WikiLibs &copy; 2020</span>
                    </div>
                    <div className="footer-useful">
                        <div className="footer-opinion" title="You noticed something wrong or want to give your opinion?" onClick={() => window.open("https://docs.google.com/forms/d/1QDUNpi07MoG_2Zg4Zfvl9V8Nw_85sNu9nPY_xRhrOcw/viewform?edit_requested=true", "_blank") } >
                           <EmojiObjectsIcon/>
                        </div>
                        <a href="/contact">CONTACT</a>
                        <a href="/FAQ">HELP AND FAQ</a>
                        <a href="/terms-of-use">TERMS OF USE</a>
                        <a href="/privacy-policy">PRIVACY POLICY</a>
                    </div>
                </div>
            </div>
        );
    }
}