import React, { Component } from 'react';
import SyntaxHighlighter from "../../Components/SyntaxHighlighter";

import { Link } from 'react-router-dom';

import './style.css';

window.handle = 0;

export default class SymbolPreview extends Component {

    _handle = window.handle++;

    state = {
        showMenu: false,
        sytaxHighlighter: false
    };

    _ref = React.createRef();

    openMenu = () => {
        this.setState({showMenu: true});
    }

    closeMenu = () => {
        this.setState({showMenu: false});
    }

    componentDidMount() {
        if (this.props.to) {
            this.setState({sytaxHighlighter: true});
        }
        document.addEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        if (!this.state.showMenu)
            return;
        this.forceUpdate();
    }

    componentWillUnmount() {
        document.removeEventListener("scroll", this.handleScroll);
    }

    render() {
        return (
            <div className="symbol-preview-popup-menu-container">
                {this.state.sytaxHighlighter ?
                    <Link ref={this._ref} className={this.props.className}onClick={() => window.location.assign(window.location.origin + '/symbol?id=' + this.props.to)} to={'/symbol?id=' + this.props.to} onMouseEnter={this.openMenu} onMouseLeave={this.closeMenu}><SyntaxHighlighter code={this.props.displayName} lang={this.props.lang}/></Link>
                    : <div className={this.props.className}><SyntaxHighlighter code={this.props.displayName} lang={this.props.lang}/></div>}
                <div className="symbol-preview-popup-menu" style={this.state.showMenu ? {display:"block"} : {display:"none"}}>
                    <div className="symbol-preview-popup-content">
                        <span className="symbol-preview-popup-small-title">preview page:</span>
                        <div className='symbol-page-title'>{this.props.displayName}</div>
                        {this.props.type ? <div className='symbol-page-type-symbol-title'>{this.props.type}</div> : ""}
                        <SyntaxHighlighter code={this.props.prototype} lang={this.props.lang}/>
                    </div>
                    <i></i>
                </div>
            </div>
        )
    }
}
