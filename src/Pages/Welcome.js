import React, { Component } from 'react';

class HomePage extends Component {
    render() {
        return (
            <div>
                <div className="fullsizeScreen">
                    <div>
                        <span className="title_welcome fontBold">
                            WikiLibs: our passion, for your time
                        </span>
                        <span className="subtitle_welcome fontRegular">
                            Coding libraries will never be a problem again
                        </span>
                        <div className="welcome_container">
                            <button type="button" className="btn btn-primary btn-lg button_welcome fontRegular">Join the community !</button>
                        </div>
                        <img className="resize" src="imgs/fond.png" alt="" />
                    </div>
                </div>
                <div className="welcome_border"></div>
                <div className="fullsizeScreen padding_welcome">
                    <div className="padding_middle">
                        <span className="title_middle fontBold">
                            What is WikiLibs ?
                    </span>
                    </div>
                    <div className='row text_middle padding_middle_row'>
                        <div className='col-4 text-center black'>
                            <img className="padding_images_welcome_middle" src="imgs/At.png" alt="" />
                            <p className="clearMargin">WikiLibs regroups the documentation</p>
                            <p className="clearMargin">of multiples libraries from</p>
                            <p className="clearMargin">different languages.</p>
                        </div>
                        <div className='col-4 text-center black'>
                            <img className="padding_images_welcome_middle" src="imgs/People.png" alt="" />
                            <p className="clearMargin">Your contribution is also important !</p>
                            <p className="clearMargin">You can add your own example for</p>
                            <p className="clearMargin">each function, to help other people.</p>
                        </div>
                        <div className='col-4 text-center black'>
                            <img className="padding_images_welcome_middle" src="imgs/Tools.png" alt="" />
                            <p className="clearMargin">Wikilibs also gives you access to</p>
                            <p className="clearMargin">resources like download links</p>
                            <p className="clearMargin">and tutorial</p>
                        </div>
                    </div>
                </div>
                <div className="fullsizeScreen padding_welcome">
                    <div className="padding_middle">
                        <span className="title_middle1 fontBold">
                            How to use it ?
                        </span>
                    </div>
                    <div className='row text_middle padding_middle_row'>
                        <div className='col-4 text-center black'>
                            <img className="padding_images_welcome_middle" src="imgs/Mouse.png" alt="" />
                            <p className="clearMargin">Click on the top left button to</p>
                            <p className="clearMargin">to make the drawer appear, and choose</p>
                            <p className="clearMargin">a library (either the most used ones,</p>
                            <p className="clearMargin">or from the list.</p>
                        </div>
                        <div className='col-4 text-center black'>
                            <img className="padding_images_welcome_middle" src="imgs/Search.png" alt="" />
                            <p className="clearMargin">Or you can directly search for your</p>
                            <p className="clearMargin">desired library in the search bar</p>
                            <p className="clearMargin">(located in the top side of the site)</p>
                        </div>
                        <div className='col-4 text-center black'>
                            <img className="padding_images_welcome_middle" src="imgs/Think.png" alt="" />
                            <p className="clearMargin">If you are connected, you can add your</p>
                            <p className="clearMargin">example on a function page. If it's</p>
                            <p className="clearMargin">approuved by the moderator, it will be visible</p>
                            <p className="clearMargin">to the other users !</p>
                        </div>
                    </div>
                </div>
                <div className="contact_border"></div>
                <div className="fontRegular front text-center">
                    <a href="/" className="buttonContact">CONTACT</a>
                    <a href="/" className="buttonContact">HELP AND FAQ</a>
                    <a href="/" className="buttonContact">TERM OF USE</a>
                    <a href="/" className="buttonContact">PRIVACY POLICY</a>
                </div>
            </div>
        );
    }
}

export default HomePage;
