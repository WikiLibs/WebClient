import { MenuItem, Menu, Button } from '@material-ui/core';
import React, { Component } from 'react';
import { ApiService } from '../../ApiService';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

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
        showMenu: false
    };

    closeMenu = () => this.setState({ showMenu: false });

    isAdmin() {
        for (const v of AdminTestPerms) {
            if (this.props.user.hasPermission(v))
                return (true);
        }
        return (false);
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
                >
                    <img alt="" src={pp} className="header-img-profile"></img>
                </Button>
                <Menu
                    style={{top: "64px"}}
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
                    <h3 className="text-center" style={{marginBottom: "15px"}}>My Account</h3>
                    <Row>
                        <Col>
                            <img alt="" src={pp} className="header-img-profile"></img>
                        </Col>
                        <Col>
                            <h5>{this.props.user.firstName} {this.props.user.lastName}</h5>
                            <h5>{this.props.user.pseudo}</h5>
                            <h5>{this.props.user.points} point(s)</h5>
                            {
                                this.props.user.hasPermission("user.me.update") &&
                                    <MenuItem><Link onClick={this.closeMenu} to="/profile"><AccountCircleIcon /> Profile</Link></MenuItem>
                            }
                            {
                                this.isAdmin() &&
                                    <MenuItem><Link onClick={this.closeMenu} to="/admin"><SupervisorAccountIcon /> Administration</Link></MenuItem>
                            }
                            <MenuItem><Link onClick={() => this.api.disconnect()} to='/'><ExitToAppIcon /> Disconnect</Link></MenuItem>
                        </Col>
                    </Row>
                </Menu>
            </>
        );
    }
}