import React, { Component } from 'react';

import './index.css';

import back from './imgs/back.jpg'
import fullLogo from './imgs/WikiLibs_Logo.png'
import at from './imgs/at.png'
import people from './imgs/people.png'
import tools from './imgs/tools.png'
import mouse from './imgs/mouse.png'
import search from './imgs/search.png'
import think from './imgs/think.png'
import footer from './imgs/WikiLibs_Logo_Footer.png'

class Welcome extends Component {
    render() {
        return (
            <div>
                <div id="Head">
                    <div id="Title" className="title">
                        <img src={back} className="back_img overlay" alt=""></img>
                        <div id="headline">
                            <img src={fullLogo}  className="logo_title" alt=""></img>
                            <div id="description">
                                <span className="big_title">WikiLibs,</span><br/>
                                <span className="big_title italic">Our passion, for your time</span><br/><br/>
                                <span className="small_title italic">Coding libraries won't be a problem anymore.</span><br/>
                                <span className="small_title italic">Start saving time now</span><br/>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="Body">
                    <div className="home_card">
                        <span className="card_title">What is WikiLibs ?</span>
                        <div className="tiles_container">
                            <div className="tile">
                                <img src={at} className="logo_tile" alt=""></img>
                                <span className="description_tile">
                                    WikiLibs regroups the documentation of coding libraries, with a unified presentation
                                </span>
                            </div>
                            <div className="tile">
                                <img src={people} className="logo_tile" alt=""></img>
                                <span className="description_tile">
                                    You can see and add custom example to any symbol, for quicker undestanding
                                </span>
                            </div>
                            <div className="tile">
                                <img src={tools} className="logo_tile" alt=""></img>
                                <span className="description_tile">
                                    You can also access ressources like tutorials or installation guides
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="home_card gray_card">
                        <span className="card_title">How to use ?</span>
                        <div className="tiles_container">
                            <div className="tile">
                                <img src={mouse} className="logo_tile" alt=""></img>
                                <span className="description_tile">
                                    Look for a library by clicking on the top-left drawer
                                </span>
                            </div>
                            <div className="tile">
                                <img src={search} className="logo_tile" alt=""></img>
                                <span className="description_tile">
                                    Or just search directly for a library or symbol using the search bar
                                </span>
                            </div>
                            <div className="tile">
                                <img src={think} className="logo_tile" alt=""></img>
                                <span className="description_tile">
                                    You can also add your own examples on a symbol page !
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
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
            </div>
        );
    }
}

export default Welcome;