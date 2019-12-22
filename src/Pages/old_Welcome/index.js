import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import './index.css';

import back from './imgs/back.png'
import at from './imgs/at.png'
import people from './imgs/people.png'
import tools from './imgs/tools.png'
import mouse from './imgs/mouse.png'
import search from './imgs/search.png'
import think from './imgs/think.png'

export default class Welcome extends Component {
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
                            <a href="/subscribe"><button type="button" className="btn btn-primary btn-lg button_welcome fontRegular">Join the community !</button></a>
                        </div>
                        <img className="resize" src={back} alt="" />
                    </div>
                </div>
                <div className="welcome_border"></div>
                <div className="fullsizeScreen padding_welcome">
                    <div className="padding_middle">
                        <span className="title_middle fontBold">
                            What is WikiLibs ?
                    </span>
                    </div>
                    <Row className="text_middle padding_middle_row">
                        <Col className="text-center black" xs="4">
                            <img className="padding_images_welcome_middle" src={at} alt="" />
                            <p className="clearMargin">WikiLibs regroups the documentation</p>
                            <p className="clearMargin">of multiples libraries from</p>
                            <p className="clearMargin">different languages.</p>
                        </Col>
                        <Col className="text-center black" xs="4">
                            <img className="padding_images_welcome_middle" src={people} alt="" />
                            <p className="clearMargin">Your contribution is also important !</p>
                            <p className="clearMargin">You can add your own example for</p>
                            <p className="clearMargin">each function, to help other people.</p>
                        </Col>
                        <Col className="text-center black" xs="4">
                            <img className="padding_images_welcome_middle" src={tools} alt="" />
                            <p className="clearMargin">Wikilibs also gives you access to</p>
                            <p className="clearMargin">resources like download links</p>
                            <p className="clearMargin">and tutorial</p>
                        </Col>
                    </Row>
                </div>
                <div className="fullsizeScreen padding_welcome">
                    <div className="padding_middle">
                        <span className="title_middle1 fontBold">
                            How to use it ?
                        </span>
                    </div>
                    <Row className="text_middle padding_middle_row">
                        <Col className="text-center black" xs="4">
                            <img className="padding_images_welcome_middle" src={mouse} alt="" />
                            <p className="clearMargin">Click on the top left button to</p>
                            <p className="clearMargin">to make the drawer appear, and choose</p>
                            <p className="clearMargin">a library (either the most used ones,</p>
                            <p className="clearMargin">or from the list.</p>
                        </Col>
                        <Col className="text-center black" xs="4">
                            <img className="padding_images_welcome_middle" src={search} alt="" />
                            <p className="clearMargin">Or you can directly search for your</p>
                            <p className="clearMargin">desired library in the search bar</p>
                            <p className="clearMargin">(located in the top side of the site)</p>
                        </Col>
                        <Col className="text-center black" xs="4">
                            <img className="padding_images_welcome_middle" src={think} alt="" />
                            <p className="clearMargin">If you are connected, you can add your</p>
                            <p className="clearMargin">example on a function page. If it's</p>
                            <p className="clearMargin">approuved by the moderator, it will be visible</p>
                            <p className="clearMargin">to the other users !</p>
                        </Col>
                    </Row>
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
