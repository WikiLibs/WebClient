import React from 'react';

import './style.css';


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
        <div className="contact-card">
            <div className="contact-big-title">
                <h2 className="contact-title">Via email</h2>
                <span>(suited for long questions or formatted feedback)</span>
            </div>
            <div className="contact-content">
                <div className="contact-secondary-title-component">
                    <span className="contact-secondary-title">Questions</span>
                    <p className="contact-secondary-title-description contact-colored-text">help@wikilibs.com</p>
                </div>
                <div className="contact-secondary-title-component">
                    <span className="contact-secondary-title">Feedback and suggestion</span>
                    <p className="contact-secondary-title-description contact-colored-text">feedback@wikilibs.com</p>
                </div>
            </div>
        </div>
    )
}

const renderContactOther = () => {
    return (
        <div className="contact-card">
            <div className="contact-big-title">
                <h2 className="contact-title">Via Social Links</h2>
            </div>
            <div className="contact-content">
                <div className="contact-secondary-title-component">
                    <span className="contact-secondary-title">Jobs and more about</span>
                    <p className="contact-secondary-title-description contact-colored-text"><a className="contact-colored-text" target="_blank" href='https://www.linkedin.com/in/wikilibs-eip-48a5851b9/' >Linkedin</a></p>
                </div>
                <div className="contact-secondary-title-component">
                    <span className="contact-secondary-title">Community area</span>
                    <p className="contact-secondary-title-description contact-colored-text"><a className="contact-colored-text" target="_blank" href='https://discord.gg/3PG9tpNPzq' >Discord</a></p>
                </div>
                <div className="contact-secondary-title-component">
                    <span className="contact-secondary-title">News and requests</span>
                    <p className="contact-secondary-title-description contact-colored-text"><a className="contact-colored-text" target="_blank" href='https://twitter.com/LibsWiki' >Twitter</a></p>
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