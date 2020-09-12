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
            <div id="Title" className="welcome-title">
                <img src={back} className="welcome-back-img welcome-overlay" alt=""></img>
                <div id="welcome-headline">
                    <img src={fullLogo}  className="welcome-logo-title" alt=""></img>
                    <div id="welcome-description">
                        <span className="welcome-big-title">WikiLibs,</span>
                        <span className="welcome-big-title welcome-italic">Our passion, for your time</span><br/><br/>
                        <span className="welcome-small-title welcome-italic">Coding libraries won't be a problem anymore.</span><br/>
                        <span className="welcome-small-title welcome-italic">Start saving time now</span><br/>
                    </div>
                </div>
            </div>
        </div>
    )
}

const renderWhatCard = () => {
    return (
        <div className="welcome-home-card">
            <span className="welcome-card-title">What is WikiLibs ?</span>
            <div className="welcome-tiles-container">
                <div className="welcome-tile">
                    <img src={at} className="welcome-logo-tile" alt=""></img>
                    <span className="welcome-description-tile">
                        WikiLibs regroups the documentation of coding libraries, with a unified presentation
                    </span>
                </div>
                <div className="welcome-tile">
                    <img src={people} className="welcome-logo-tile" alt=""></img>
                    <span className="welcome-description-tile">
                        You can see and add custom example to any symbol, for quicker undestanding
                    </span>
                </div>
                <div className="welcome-tile">
                    <img src={tools} className="welcome-logo-tile" alt=""></img>
                    <span className="welcome-description-tile">
                        You can also access ressources like tutorials or installation guides
                    </span>
                </div>
            </div>
        </div>
    )
}

const renderHowCard = () => {
    return (
        <div className="welcome-home-card welcome-gray-card">
            <span className="welcome-card-title">How to use ?</span>
            <div className="welcome-tiles-container">
                <div className="welcome-tile">
                    <img src={mouse} className="welcome-logo-tile" alt=""></img>
                    <span className="welcome-description-tile">
                        Look for a library by clicking on the top-left drawer
                    </span>
                </div>
                <div className="welcome-tile">
                    <img src={search} className="welcome-logo-tile" alt=""></img>
                    <span className="welcome-description-tile">
                        Or just search directly for a library or symbol using the search bar
                    </span>
                </div>
                <div className="welcome-tile">
                    <img src={think} className="welcome-logo-tile" alt=""></img>
                    <span className="welcome-description-tile">
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