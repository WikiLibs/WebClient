import React from 'react';

import './style.css';

import back from './imgs/back.jpg'
import fullLogo from './imgs/WikiLibs_Logo.png'
import at from './imgs/at.png'
import people from './imgs/people.png'
import tools from './imgs/tools.png'
import mouse from './imgs/mouse.png'
import search from './imgs/search.png'
import think from './imgs/think.png'

const renderBanner = () => {
    return (
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
    )
}

const renderWhatCard = () => {
    return (
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
    )
}

const renderHowCard = () => {
    return (
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
    )
}

const WelcomePage = () => {
    return (
        <div>
            {renderBanner()}
            <div id="Body">
                {renderWhatCard()}
                {renderHowCard()}
            </div>
        </div>
    );
}

export default WelcomePage;