import React from 'react';

import './style.css';

import DiscordIco from './imgs/discord_icon.png'
import LinkedinIco from './imgs/linkedin_icon.png'
import TwitterIco from './imgs/twitter_icon.png'

const renderContactDescription = () => {
    return (
        <div className="contact-card">
            <h2 className="contact-title">Contact</h2>
            <div className="contact-content">
                <p className="contact-description">
                    Do you have any question that you can’t find answer in the <a className="contact-colored-text" href='/faq'>FAQ</a> ?<br/>
                    Want to give some feedback on the website or suggest anything ?<br/>
                </p>
                <p>You are at the right place !</p>
            </div>
        </div>
    )
}

const renderContactEmail = () => {
    return (
        <div>
            <div className="contact-secondary-title-component">
                <span className="contact-secondary-title">Questions</span>
                <p className="contact-secondary-title-description contact-colored-text">help@wikilibs.com</p>
            </div>
            <div className="contact-secondary-title-component">
                <span className="contact-secondary-title">Feedback and suggestion</span>
                <p className="contact-secondary-title-description contact-colored-text">feedback@wikilibs.com</p>
            </div>
        </div>
    )
}

const renderContactOther = () => {
    return (
        <div className="contact-card">
            <div className="contact-big-title">
                <h2 className="contact-title">Stay in touch!</h2>
            </div>
            <div className="contact-content">
                <div className='contact-social'>
                    <img src={DiscordIco} alt="Discord"/>
                    <div><a className="contact-colored-text" target="_blank" rel="noopener noreferrer" href='https://discord.gg/3PG9tpNPzq' >Discord</a></div>
                </div>
                <div className='contact-social'>
                    <img src={TwitterIco} alt="Twitter"/>
                    <div><a className="contact-colored-text" target="_blank" rel="noopener noreferrer" href='https://twitter.com/WikiLibs_/' >Twitter</a></div>
                </div>
                <div className='contact-social'>
                    <img src={LinkedinIco} alt="Linkedin"/>
                    <div><a className="contact-colored-text" target="_blank" rel="noopener noreferrer" href='https://www.linkedin.com/in/wikilibs-eip-48a5851b9/' >Linkedin</a></div>
                </div>
            </div>
        </div>
    )
}

const ContactPage = () => {
    return (
        <div>
            <div id="Body">
                <div className="contact-content-page">
                    {renderContactDescription()}
                    {renderContactEmail()}
                    {renderContactOther()}
                </div>
            </div>
        </div>
    );
}

export default ContactPage;