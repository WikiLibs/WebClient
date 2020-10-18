import React, { Component } from 'react';
import {  Menu } from '@material-ui/core';
import { ApiService } from '../../ApiService';
import CloseIcon from '@material-ui/icons/Close';

import pp from '../Header/pp.png';

import './style.css';

export default class UserInfoPopup extends Component {
    api = new ApiService();

    state = {
        showMenu: false,
        userData: {
            pseudo: this.props.userName ? this.props.userName : "",
            points: 0,
            email: "",
            firstName: "",
            lastName: "",
            group: "",
            private: false
        },
        userIcon: pp
    };

    openMenu = (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        this.setState({showMenu: true});
        this.api.getUser(this.props.userId).then(response => this.setState({userData: response.data}));
        this.api.getUserIcon(this.props.userId).then(response => this.setState({userIcon: response}));
    }

    closeMenu = () => {
        this.setState({showMenu: false});
    }

    componentDidMount() {
        if (!this.props.userName) {
            this.api.getUser(this.props.userId).then(response => this.setState({userData: response.data}));
        }
    }

    render() {
        return (
            <>
                <span className={"user-info-popup-link " + this.props.className} onClick={this.openMenu}>{this.props.userName ? this.props.userName : this.state.userData.pseudo}</span>
                <Menu
                    className="user-info-popup-menu"
                    getContentAnchorEl={null}
                    anchorEl={document.getElementById("root")}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    keepMounted
                    open={this.state.showMenu}
                    onClose={this.closeMenu}
                >
                    <div className="user-info-popup-title-container">
                        <div className="user-info-popup-title">User Information</div>
                        <span onClick={this.closeMenu}><CloseIcon /></span>
                    </div>
                    <div className="user-info-popup-infos">
                        <div className="user-info-popup-profile-picture">
                            <img alt="" src={this.state.userIcon} className="header-img-profile"></img>
                        </div>
                        <div className="user-info-popup-profile-useful">
                            <div className="user-info-popup-pseudo">{this.state.userData.pseudo}</div>
                            <div className="user-info-popup-pts">{this.state.userData.points} point(s)</div>
                            <div className="user-info-popup-group">Group: {this.state.userData.group}</div>
                            {
                                !this.state.userData.private &&
                                    <div className="user-info-popup-private">{this.state.userData.firstName} {this.state.userData.lastName}</div>
                            }
                            {
                                !this.state.userData.private &&
                                    <div className="user-info-popup-private">{this.state.userData.email}</div>
                            }
                            {this.state.userData.private && <div className="user-info-popup-danger">This profile is private</div>}
                        </div>
                    </div>
                </Menu>
            </>
        )
    }

}
