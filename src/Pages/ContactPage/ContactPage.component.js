import React from 'react';

import './style.css';


const renderContactDescription = () => {
    return (
        <div className="contact_card">
            <h2 className="contact_title">Contact</h2>
            <div className="contact_content">
                <p className="description">
                    Do you have any question that you can’t find answer in the <a className="colored_text" href='/faq'>FAQ</a> ?<br/>
                    Want to give some feedback on the website or suggest anything ?<br/>
                </p>
                <p>You are at the right place !</p>
            </div>
        </div>
    )
}

const renderContactEmail = () => {
    return (
        <div className="contact_card">
            <div className="big_title">
                <h2 className="contact_title">Via email</h2>
                <span>(suited for long questions or formatted feedback)</span>
            </div>
            <div className="contact_content">
                <div className="secondary_title_component">
                    <span className="secondary_title">Questions</span>
                    <p className="secondary_title_description colored_text">help@wikilibs.com</p>
                </div>
                <div className="secondary_title_component">
                    <span className="secondary_title">Feedback and suggestion</span>
                    <p className="secondary_title_description colored_text">feedback@wikilibs.com</p>
                </div>
            </div>
        </div>
    )
}

const renderContactOther = () => {
    return (
        <div className="contact_card">
            <h2 className="contact_title">Other ways</h2>
            <div className="contact_content">
                <p className="description">To be announced...</p>
            </div>
        </div>
    )
}

const ContactPage = () => {
    return (
        <div>
            <div id="Body">
                <div className="content_contact_page">
                    {renderContactDescription()}
                    {renderContactEmail()}
                    {renderContactOther()}
                </div>
            </div>
        </div>
    );
}

export default ContactPage;