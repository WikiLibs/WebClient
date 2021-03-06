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
                        <Link ref={this._ref} target='_blank' className={this.props.className} to={'/symbol?id=' + this.props.to} onMouseEnter={this.openMenu} onMouseLeave={this.closeMenu}>
                            {
                                this.props.mode ? 
                                <div>{this.props.displayName}</div>                                    
                                    :
                                <SyntaxHighlighter code={this.props.displayName} lang={this.props.lang}/>

                            }
                        </Link>
                    : <div className={this.props.className}>
                        <SyntaxHighlighter code={this.props.displayName} lang={this.props.lang}/>
                    </div>}
                    {
                        this.state.showMenu ?
                        <div className="symbol-preview-popup-menu">
                            <div className="symbol-preview-popup-content">
                                <span className="symbol-preview-popup-small-title">preview page:</span>
                                <div className='symbol-page-title'>{this.props.displayName}</div>
                                {this.props.type ? <div className='symbol-page-type-symbol-title'>{this.props.type}</div> : ""}
                                {this.props.prototype ? <SyntaxHighlighter code={this.props.prototype} lang={this.props.lang}/> : ""}
                            </div>
                            <i></i>
                        </div>
                        :
                        null
                    }
                
            </div>
        )
    }
}
