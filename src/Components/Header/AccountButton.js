import { Menu, Button } from '@material-ui/core';
import React, { Component } from 'react';
import { ApiService } from '../../ApiService';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { Link } from 'react-router-dom';
// import { Row, Col } from 'react-bootstrap';

import pp from './pp.png'

const AdminTestPerms = [
    "symbol.lang.create",
    "symbol.lang.update",
    "symbol.lang.delete",
    "symbol.type.create",
    "symbol.type.update",
    "symbol.type.delete"
];

export default class AccountButton extends Component {
    api = new ApiService();

    state = {
        showMenu: false,
        profileImg: pp
    };

    closeMenu = () => this.setState({ showMenu: false });

    isAdmin() {
        for (const v of AdminTestPerms) {
            if (this.props.user.hasPermission(v))
                return (true);
        }
        return (false);
    }

    componentDidMount() {
        this.api.getUserIcon(this.props.user.id).then(response => this.setState({profileImg: response}))
    }

    render() {
        return (
            <>
                <Button
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    variant="contained"
                    color="primary"
                    onClick={() => this.setState({ showMenu: !this.state.showMenu })}
                    className="header-profile-btn"
                >
                    <img alt="" src={this.state.profileImg} className="header-img-profile"></img>
                </Button>
                <Menu
                    className="account-btn-menu"
                    style={{top: "70px"}}
                    getContentAnchorEl={null}
                    anchorEl={document.getElementById("root") /* Holy hack, thank you MUI you're a peace of shit */}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    open={this.state.showMenu}
                    onClose={this.closeMenu}
                >
                    <div className="account-btn-title">My account</div>
                    <div className="account-btn-infos">
                        <div className="account-btn-profile-picture">
                            <img alt="" src={this.state.profileImg} className="header-img-profile"></img>
                        </div>
                        <div className="account-btn-profile-useful">
                            <div className="account-btn-name">{this.props.user.firstName} {this.props.user.lastName}</div>
                            <div className="account-btn-email">{this.props.user.email}</div>
                            <div className="account-btn-pts">{this.props.user.points > 1 ? this.props.user.points + " points" : this.props.user.points + " point"}</div>
                            <div className="account-btn-links">
                                {
                                    this.props.user.hasPermission("user.me.update") &&
                                        <Link onClick={this.closeMenu} to="/profile"><AccountCircleIcon /> Profile</Link>
                                }
                                {
                                    this.isAdmin() &&
                                        <Link onClick={this.closeMenu} to="/admin"><SupervisorAccountIcon /> Administration</Link>
                                }
                                <Link onClick={() => this.api.disconnect()} to='/'><ExitToAppIcon /> Disconnect</Link>
                            </div>
                        </div>
                    </div>
                </Menu>
            </>
        );
    }
}