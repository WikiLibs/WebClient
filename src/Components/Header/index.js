import React, { Component } from 'react';
import { Navbar, Button, Nav } from 'react-bootstrap';

import './index.css'

import pp from './pp.png'

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <header>
                    <Navbar className="header-bar" variant="default" style={{ backgroundColor: '#8560a8' }}>
                        <Button
                            variant="default"
                            onClick={() => typeof (this.props.openNavBar) === "function" ? this.props.openNavBar() : null}
                            style={{ color: 'white', backgroundColor: 'transparent' }}
                            data-toggle="collapse"
                            data-target="#navbarText"
                            aria-controls="navbarText"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <i className="fas fa-bars"></i>
                        </Button>
                        <Navbar.Brand className="fontBold" href="/" style={{ color: 'white', paddingLeft: '15px', marginRightboxShadow: '-1px -2px 10px black' }}>
                            WikiLibs
                        </Navbar.Brand>
                        <div className="inner-addon right-addon" style={{ width: '50%', position: 'relative', alignSelf: 'auto' }}>
                            <i className="fas fa-search glyphicon"></i>
                            <input type="search" className="form-control fontRegular" placeholder="Search" style={{ borderRadius: '100px !important', outline: 'none' }} />
                        </div>
                        <Nav className="navbar-nav navbar-right">
                            <li>
                                <div className="inset">
                                    <img src={pp} alt="" />
                                </div>
                            </li>
                        </Nav>
                    </Navbar>
                </header>
            </div>
        )
    }
}

export default Header;
