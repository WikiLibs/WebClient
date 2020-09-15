import React from 'react';

import './style.css';

import welcome from './img/welcome_lib_uploader.png'
import uploading from './img/uploading.png'
import uploading2 from './img/uploading2.png'
import successful from './img/upload_successful.png'
import summary from './img/summary.png'
import inputInfo from './img/input_info_complete.png'

const renderHowToUseDesc = () => {
    return (
        <div className="howto-card">
            <h2 className="howto-title">How to use the parser</h2>
            <div className="howto-content">
                <p className="howto-description">
                    To upload a new library to the website, you will need to use our program which is quite easy to use.<br />
                    Here are the steps.
                </p>
            </div>
        </div>
    )
}

const renderTuto = () => {
    return (
        <div className="howto-card">
            <h2 className="howto-title">Walkthrough</h2>
            <div className="howto-inner-content">
                <div className="howto-inner-content-card">
                    <p className="howto-secondary-title">Starting page</p>
                    <img className="howto-screenshot" src={welcome} alt=""/>
                </div>
                <div className="howto-inner-content-card">
                    <p className="howto-secondary-title">Fill in the infos</p>
                    <p className="howto-secondary-desc">In this step, you need to fill the language used in your library (the program will only look for this language), the library name (no special characters) and the location of the library (choose the root).</p>
                    <img className="howto-screenshot" src={inputInfo} alt=""/>
                </div>
                <div className="howto-inner-content-card">
                    <p className="howto-secondary-title">Summary</p>
                    <p className="howto-secondary-desc">Verify that the informations you filled are correct, then press the button.</p>
                    <img className="howto-screenshot" src={summary} alt=""/>
                </div>
                <div className="howto-inner-content-card">
                    <p className="howto-secondary-title">Processing and upload</p>
                    <p className="howto-secondary-desc">Just wait for the processing and upload to finish.</p>
                    <img className="howto-screenshot" src={uploading} alt=""/>
                    <img className="howto-screenshot" src={uploading2} alt=""/>
                </div>
                <div className="howto-inner-content-card">
                    <p className="howto-secondary-title">Finished</p>
                    <p className="howto-secondary-desc">The upload has now ended, you can finally close the window ! Some more processing time may be required on our side, so please be patient !</p>
                    <img className="howto-screenshot" src={successful} alt=""/>
                </div>
            </div>
        </div>
    )
}

const HowToUseParser = () => {
    return (
        <div>
            <div id="Body">
                <div className="howto-content-page">
                    {renderHowToUseDesc()}
                    {renderTuto()}
                </div>
            </div>
        </div>
    );
}

export default HowToUseParser;