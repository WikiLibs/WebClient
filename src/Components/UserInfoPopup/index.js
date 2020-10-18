import React, { Component } from 'react';
import { MenuItem, Menu } from '@material-ui/core';
import { ApiService } from '../../ApiService';
import { Row, Col } from 'react-bootstrap';
import CloseIcon from '@material-ui/icons/Close';

import pp from '../Header/pp.png';

export default class UserInfoPopup extends Component {
    api = new ApiService();

    state = {
        showMenu: false,
        userData: {
            pseudo: this.props.userName,
            points: 0,
            email: "",
            firstName: "",
            lastName: "",
            group: "",
            private: false
        },
        userIcon: pp
    };

    _ref = React.createRef();

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

    render() {
        return (
            <>
                <span onClick={this.openMenu} ref={this._ref}>{this.props.userName}</span>
                <Menu
                    style={{top: "64px"}}
                    getContentAnchorEl={null}
                    anchorEl={this._ref.current}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    open={this.state.showMenu}
                    onClose={this.closeMenu}
                >
                    <h3 className="text-center" style={{marginBottom: "15px"}}>User Information</h3>
                    <Row>
                        <Col>
                            <img alt="" src={this.state.userIcon} className="header-img-profile"></img>
                        </Col>
                        <Col>
                            <h5>{this.state.userData.pseudo}</h5>
                            <h5>{this.state.userData.points} point(s)</h5>
                            <h5>{this.state.userData.group}</h5>
                            {
                                !this.state.userData.private &&
                                    <h5>{this.state.userData.firstName} {this.state.userData.lastName}</h5>
                            }
                            {
                                !this.state.userData.private &&
                                    <h5>{this.state.userData.email}</h5>
                            }
                            <MenuItem><span onClick={this.closeMenu}><CloseIcon /> Close</span></MenuItem>
                        </Col>
                    </Row>
                </Menu>
            </>
        )
    }

}
