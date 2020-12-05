import React from 'react';

import './style.css';
import '../Template/GettingStartedPage/style.css';

import step1 from './img/step_1.png'
import step2 from './img/step_2.png'
import step3 from './img/step_3.png'
import step4 from './img/step_4.png'


const renderTuto = () => {
    return (
        <div className="howto-card">
            <h2 className="howto-title">How to install</h2>
            <div className="howto-inner-content">
                <div className="howto-inner-content-card">
                    <p className="howto-secondary-title">Download the app</p>
                    <p className="howto-secondary-desc">Download the .apk file using the button above on your phone.</p>
                </div>
                <div className="note">
                    <span style={{fontSize: 15}}>Please note that you might not have the same visuals, depending on your phone. The process should remain similar.</span>
                </div>
                <div className="howto-inner-content-card">
                    <p className="howto-secondary-title">Search the file</p>
                    <p className="howto-secondary-desc">Open the file explorer app on your phone and find the app file. It should be in the Downloads folder.</p>
                    <img className="howto-screenshot" src={step1} alt=""/>
                </div>
                <div className="howto-inner-content-card">
                    <p className="howto-secondary-title">Install the app</p>
                    <p className="howto-secondary-desc">Click on the file to start installing the app.</p>
                    <img className="howto-screenshot" src={step2} alt=""/>
                    <img className="howto-screenshot" src={step3} alt=""/>
                </div>
                <div className="note">
                    <span style={{fontSize: 15}}>As the app is unsigned (not validated by Google) it might show you a warning about unauthorized apps.</span>
                </div>
                
                <div className="note">
                    <span style={{fontSize: 15}}>If it happens, please check how to enable unsigned app installs on your phone.</span>
                </div>
                <div className="howto-inner-content-card">
                    <p className="howto-secondary-title">Launch the app</p>
                    <p className="howto-secondary-desc">When the app has successfully installed, it should be in your application under the name WikiLibs !</p>
                    <img className="howto-screenshot" src={step4} alt=""/>
                </div>
            </div>
        </div>
    )
}

const DownloadAppPage = () => {
    return (
        <div>
            <div id="Body">
                <div className="howto-content-page">
                    <div className="howto-card">
                        <h2 className="howto-title">Get the app</h2>
                        <div className="howto-content">
                            <p className="howto-description">
                                Want to use WikiLibs on your Android phone ? You can use our official WikiLibs application !
                            </p>
                        </div>
                    </div>
                    <a className="button" href="https://wikilibs.yuristudio.net/cdn/WikiLibs-1.1.apk" download>
                        <div className="button-title">WikiLibs.apk</div>
                        <div className="button-description">Version 1.1</div>
                    </a>
                    {renderTuto()}
                </div>
            </div>
        </div>
    );
}

export default DownloadAppPage;