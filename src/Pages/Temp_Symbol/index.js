import React, { Component } from 'react';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUpRounded';

import './index.css';

import footer from './imgs/WikiLibs_Logo_Footer.png'

class SymbolPageTemplate extends Component {
    render() {
        return (
            <div>
                <div id="Body">
                    <div className="content_symbol_page">
                        <div className="symbol_info">
                            <div className="title_format">
                                <image className="icon_lib" src="" alt="[lib name]" />
                                <h2 className="title_symbol">[SYMBOL NAME]</h2>
                            </div>
                            <div className="sub_title">
                                <span>[library_name]</span>
                                <span>Last updated : [last_modification_date]</span>
                            </div>
                        </div>
                        <div className="component_symbol">
                            <h2 className="component_title">[COMPONENT TITLE]</h2>
                            <div className="component_content">
                                <div className="code_background">
                                    [COLOR PROTOTYPE]
                                </div>
                            </div>
                        </div>
                        <div className="component_symbol">
                            <h2 className="component_title">[COMPONENT TITLE]</h2>
                            <div className="component_content">
                                <p className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Amet consectetur adipiscing elit ut. Integer enim neque volutpat ac tincidunt vitae semper quis lectus. Dictum sit amet justo donec enim diam vulputate.</p>
                            </div>
                        </div>
                        <div className="component_symbol">
                            <h2 className="component_title">[COMPONENT TITLE]</h2>
                            <div className="component_content">
                                <div className="parameter_component">
                                    <span className="parameter_name">[PARAMETER NAME]</span>
                                    <p className="parameter_description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Amet consectetur adipiscing elit ut. Integer enim neque volutpat ac tincidunt vitae semper quis lectus. Dictum sit amet justo donec enim diam vulputate.</p>
                                </div>
                                <div className="parameter_component">
                                    <span className="parameter_name">[PARAMETER NAME]</span>
                                    <p className="parameter_description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Amet consectetur adipiscing elit ut. Integer enim neque volutpat ac tincidunt vitae semper quis lectus. Dictum sit amet justo donec enim diam vulputate.</p>
                                </div>
                            </div>
                        </div>
                        <hr className="symbol_separator"/>
                        <div className="component_symbol">
                            <h2 className="component_title">Example</h2>
                            <div className="component_content">
                                <span className="example_description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                                <div className="code_example_background">
                                    [CODE EXAMPLE]
                                </div>
                                <div className="run_code">Run this code</div>
                            </div>
                        </div>
                    </div>
                    <div id="Footer">
                        <div className="footer_container">
                            <div className="copyright">
                                <img className="logo_footer" src={footer} alt=""></img>
                                <span className="copyright_txt">WikiLibs &copy; 2019</span>
                            </div>
                            <div className="useful">
                                <a href="#CONTACT">CONTACT</a>
                                <a href="#HELP">HELP AND FAQ</a>
                                <a href="#TERMSOFUSE">TERMS OF USE</a>
                                <a href="#PRIVACY">PRIVACY POLICY</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SymbolPageTemplate;