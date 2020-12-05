import React, { Component } from 'react';
import footer from './imgs/WikiLibs_Logo_Footer.png';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import fullLogo from './imgs/WikiLibs_Logo.png'

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
                        <Popover
                            open={this.state.open}
                            anchorEl={this.state.posPop}
                            onClose={this.onChange}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            >
                                <div style={{borderWidth: "1px", borderColor: "indigo", borderStyle: "double", borderRadius: "4px"}}>
                                    <div style={{margin: "5px"}}>
                                        <img src={fullLogo} alt="" width="50" height="50" style={{margin: "5px"}}></img>
                                        <span style={{color: "#4C3DA8", margin: "5px"}}>
                                            You noticed something wrong or want to give your opinion? Go <a href="https://docs.google.com/forms/d/1QDUNpi07MoG_2Zg4Zfvl9V8Nw_85sNu9nPY_xRhrOcw/viewform?edit_requested=true">here</a><br />
                                        </span>
                                    </div>
                                </div>
                        </Popover>
                        <Button variant="contained" color="primary" onClick={this.onChange}>
                            An opinion ?
                        </Button>
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