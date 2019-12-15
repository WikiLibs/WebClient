import React, { Component } from 'react';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@material-ui/icons/ArrowDropUpRounded';

import './index.css';

import footer from './imgs/WikiLibs_Logo_Footer.png'

class SearchResultTemplate extends Component {
    render() {
        return (
            <div>
                <div id="Body">
                    <div className="content_search_results">
                        <div className="results_info">
                            <h2 className="results_name">Search results for :[BLANK]</h2>
                            <span className="results_number">([NB] résults)</span>
                        </div>
                        <hr className="separator"/>
                        <div href="#nav" data-toggle="collapse" className="select_title">
                            <span className="title_results_part">[RESULTS TITLE TEMPLATE]</span>
                            <span className="title_results_number">([NB] résults)</span>
                            <ArrowDropDownRoundedIcon className="grower"/>
                        </div>
                        <div className="content_part collapse" id="nav">
                            <div className="list_elem">
                                <div className="content_elem">
                                    <span className="title_elem">[TEMPLATE TITLE]</span>
                                    <span className="description_elem">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Amet consectetur adipiscing elit ut. Integer enim neque volutpat ac tincidunt vitae semper quis lectus. Dictum sit amet justo donec enim diam vulputate.</span>
                                </div>
                                <hr className="separator_elem" />
                                <div className="info_elem">
                                    <span className="last_update">Last update:[DATE] (by:[NAME])</span>
                                    <span className="nb_view">Viewed [NB VIEW] times</span>
                                </div>
                            </div>
                            <div className="list_elem">
                                <div className="content_elem">
                                    <span className="title_elem">[TEMPLATE TITLE]</span>
                                    <span className="description_elem">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Amet consectetur adipiscing elit ut. Integer enim neque volutpat ac tincidunt vitae semper quis lectus. Dictum sit amet justo donec enim diam vulputate.</span>
                                </div>
                                <hr className="separator_elem" />
                                <div className="info_elem">
                                    <span className="last_update">Last update:[DATE] (by:[NAME])</span>
                                    <span className="nb_view">Viewed [NB VIEW] times</span>
                                </div>
                            </div>
                        </div>
                        <hr className="separator" />
                        <div href="#nav2" data-toggle="collapse" className="select_title">
                            <span className="title_results_part">[RESULTS TITLE TEMPLATE]</span>
                            <span className="title_results_number">([NB] résults)</span>
                            <ArrowDropDownRoundedIcon className="grower"/>
                        </div>
                        <div className="content_part collapse" id="nav2">
                            <div className="list_elem">
                                <div className="content_elem">
                                    <span className="title_elem">[TEMPLATE TITLE]</span>
                                    <span className="description_elem">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Amet consectetur adipiscing elit ut. Integer enim neque volutpat ac tincidunt vitae semper quis lectus. Dictum sit amet justo donec enim diam vulputate.</span>
                                </div>
                                <hr className="separator_elem" />
                                <div className="info_elem">
                                    <span className="last_update">Last update:[DATE] (by:[NAME])</span>
                                    <span className="nb_view">Viewed [NB VIEW] times</span>
                                </div>
                            </div>
                            <div className="list_elem">
                                <div className="content_elem">
                                    <span className="title_elem">[TEMPLATE TITLE]</span>
                                    <span className="description_elem">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Amet consectetur adipiscing elit ut. Integer enim neque volutpat ac tincidunt vitae semper quis lectus. Dictum sit amet justo donec enim diam vulputate.</span>
                                </div>
                                <hr className="separator_elem" />
                                <div className="info_elem">
                                    <span className="last_update">Last update:[DATE] (by:[NAME])</span>
                                    <span className="nb_view">Viewed [NB VIEW] times</span>
                                </div>
                            </div>
                        </div>
                        <hr className="separator" />
                        <div href="#nav3" data-toggle="collapse" className="select_title">
                            <span className="title_results_part">[RESULTS TITLE TEMPLATE]</span>
                            <span className="title_results_number">([NB] résults)</span>
                            <ArrowDropDownRoundedIcon className="grower" />
                        </div>
                        <div className="content_part collapse" id="nav3">
                            <div className="list_elem">
                                <div className="content_elem">
                                    <span className="title_elem">[TEMPLATE TITLE]</span>
                                    <span className="description_elem">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Amet consectetur adipiscing elit ut. Integer enim neque volutpat ac tincidunt vitae semper quis lectus. Dictum sit amet justo donec enim diam vulputate.</span>
                                </div>
                                <hr className="separator_elem" />
                                <div className="info_elem">
                                    <span className="last_update">Last update:[DATE] (by:[NAME])</span>
                                    <span className="nb_view">Viewed [NB VIEW] times</span>
                                </div>
                            </div>
                            <div className="list_elem">
                                <div className="content_elem">
                                    <span className="title_elem">[TEMPLATE TITLE]</span>
                                    <span className="description_elem">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Amet consectetur adipiscing elit ut. Integer enim neque volutpat ac tincidunt vitae semper quis lectus. Dictum sit amet justo donec enim diam vulputate.</span>
                                </div>
                                <hr className="separator_elem" />
                                <div className="info_elem">
                                    <span className="last_update">Last update:[DATE] (by:[NAME])</span>
                                    <span className="nb_view">Viewed [NB VIEW] times</span>
                                </div>
                            </div>
                        </div>
                        <hr className="separator" />
                        <div href="#nav4" data-toggle="collapse" className="select_title">
                            <span className="title_results_part">[RESULTS TITLE TEMPLATE]</span>
                            <span className="title_results_number">([NB] résults)</span>
                            <ArrowDropDownRoundedIcon className="grower" />
                        </div>
                        <div className="content_part collapse" id="nav4">
                            <div className="list_elem">
                                <div className="content_elem">
                                    <span className="title_elem">[TEMPLATE TITLE]</span>
                                    <span className="description_elem">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Amet consectetur adipiscing elit ut. Integer enim neque volutpat ac tincidunt vitae semper quis lectus. Dictum sit amet justo donec enim diam vulputate.</span>
                                </div>
                                <hr className="separator_elem" />
                                <div className="info_elem">
                                    <span className="last_update">Last update:[DATE] (by:[NAME])</span>
                                    <span className="nb_view">Viewed [NB VIEW] times</span>
                                </div>
                            </div>
                            <div className="list_elem">
                                <div className="content_elem">
                                    <span className="title_elem">[TEMPLATE TITLE]</span>
                                    <span className="description_elem">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Amet consectetur adipiscing elit ut. Integer enim neque volutpat ac tincidunt vitae semper quis lectus. Dictum sit amet justo donec enim diam vulputate.</span>
                                </div>
                                <hr className="separator_elem" />
                                <div className="info_elem">
                                    <span className="last_update">Last update:[DATE] (by:[NAME])</span>
                                    <span className="nb_view">Viewed [NB VIEW] times</span>
                                </div>
                            </div>
                        </div>
                        <hr className="separator" />
                        <div href="#nav5" data-toggle="collapse" className="select_title">
                            <span className="title_results_part">[RESULTS TITLE TEMPLATE]</span>
                            <span className="title_results_number">([NB] résults)</span>
                            <ArrowDropDownRoundedIcon className="grower" />
                        </div>
                        <div className="content_part collapse" id="nav5">
                            <div className="list_elem">
                                <div className="content_elem">
                                    <span className="title_elem">[TEMPLATE TITLE]</span>
                                    <span className="description_elem">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Amet consectetur adipiscing elit ut. Integer enim neque volutpat ac tincidunt vitae semper quis lectus. Dictum sit amet justo donec enim diam vulputate.</span>
                                </div>
                                <hr className="separator_elem" />
                                <div className="info_elem">
                                    <span className="last_update">Last update:[DATE] (by:[NAME])</span>
                                    <span className="nb_view">Viewed [NB VIEW] times</span>
                                </div>
                            </div>
                            <div className="list_elem">
                                <div className="content_elem">
                                    <span className="title_elem">[TEMPLATE TITLE]</span>
                                    <span className="description_elem">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Amet consectetur adipiscing elit ut. Integer enim neque volutpat ac tincidunt vitae semper quis lectus. Dictum sit amet justo donec enim diam vulputate.</span>
                                </div>
                                <hr className="separator_elem" />
                                <div className="info_elem">
                                    <span className="last_update">Last update:[DATE] (by:[NAME])</span>
                                    <span className="nb_view">Viewed [NB VIEW] times</span>
                                </div>
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

export default SearchResultTemplate;