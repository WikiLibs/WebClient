import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import footer from './imgs/WikiLibs_Logo_Footer.png';
import Tooltip from '@material-ui/core/Tooltip';

import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';

import './style.css';

const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: '0 1px 9px rgba(0,0,0,0.5)',
      fontSize: 15,
      fontFamily: 'Open Sans',
      color: '#202020'
    },
    arrow: {
        color: theme.palette.common.white,
    }
  }))(Tooltip);

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
                        <LightTooltip title="You noticed something wrong or want to give your opinion?" placement="left" arrow>
                            <div className="footer-opinion" onClick={() => window.open("https://docs.google.com/forms/d/1QDUNpi07MoG_2Zg4Zfvl9V8Nw_85sNu9nPY_xRhrOcw/viewform?edit_requested=true", "_blank") } >
                            <EmojiObjectsIcon/>
                            </div>
                        </LightTooltip>
                        <a href="/download-app">GET THE APP</a>
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