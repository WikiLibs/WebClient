import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div className="Header">
                <header>
                    <nav className="navbar navbar-default header-bar" style={{ backgroundColor: '#8560a8' }}>
                        <button className="btn btn-default" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation" style={{ color: 'white', backgroundColor: 'transparent' }} id="menu-toggle">
                            <i className="fas fa-bars"></i>
                        </button>
                        <a className="navbar-brand fontBold" href="/" style={{ color: 'white', paddingLeft: '15px', marginRightboxShadow: '-1px -2px 10px black' }}>WikiLibs</a>
                        <div className="inner-addon right-addon" style={{ width: '50%', position: 'relative', alignSelf: 'auto' }}>
                            <i className="fas fa-search glyphicon"></i>
                            <input type="search" className="form-control fontRegular" placeholder="Search" style={{ borderRadius: '100px !important', outline: 'none' }} />
                        </div>
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <div className="inset">
                                    <img src="imgs/pp.png" alt="" />
                                </div>
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
        )
    }
}

export default Header;
