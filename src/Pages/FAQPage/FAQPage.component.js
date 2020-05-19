import React from 'react';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';

import './style.css';

const renderList = () => {
    return (
        <div>
            <div href="#faq1" data-toggle="collapse" className="select_question">
                <ArrowDropDownRoundedIcon className="grower_faq"/>
                <span className="title_question_part">What is WikiLibs ?</span>
            </div>
            <div className="answer_part collapse" id="faq1">
                <div className="answer_content">
                    <p className="description">WikiLibs is a website regrouping programming library from different languages, with a unified design to enhance your learning.</p>
                </div>
            </div>
            <div href="#faq2" data-toggle="collapse" className="select_question">
                <ArrowDropDownRoundedIcon className="grower_faq" />
                <span className="title_question_part">How does the website work ?</span>
            </div>
            <div className="answer_part collapse" id="faq2">
                <div className="answer_content">
                    <p className="description">For a quickstart, just type the library you want in the search bar. You can also look for it in the sidebar in case you just want a look.</p>
                    <p className="description">Also, you can contribute to the site in two ways. First, you can upload your own example for a symbol (like a function) to help other people. Second, you can upload a whole library to the site, using the Parsing Tool (see below). You should own the library and/or have the necessary permissions to do so. </p>
                </div>
            </div>
            <div href="#faq3" data-toggle="collapse" className="select_question">
                <ArrowDropDownRoundedIcon className="grower_faq" />
                <span className="title_question_part">How to contact us ?</span>
            </div>
            <div className="answer_part collapse" id="faq3">
                <div className="answer_content">
                    <p className="description">You have a question ? A feedback ? Just go to our <a className='colored_text' href='/ContactPage'>contact page</a> and check the different ways to contact us !</p>
                </div>
            </div>
            <div href="#faq4" data-toggle="collapse" className="select_question">
                <ArrowDropDownRoundedIcon className="grower_faq" />
                <span className="title_question_part">How to upload a library to the website ?</span>
            </div>
            <div className="answer_part collapse" id="faq4">
                <div className="answer_content">
                    <p className="description">In order to upload the library to the website, open a terminal the folder of the downloaded parser. If you have not downloaded the parser yet, click this <a className="colored_text" href="#downloadparser">link</a> to download it. If it is already done, please do the following steps: </p>
                    <ul className="ul_faq">
                        <li>
                            <p className="li_faq">Execute the command line:</p>
                            <div className="code_example_background_faq">
                                ./wikilibs_parser -k 819b9934-e8bd-49dc-ace5-888806218117 -v -g C  Lib
                            </div>
                        </li>
                        <li>
                            <p className="li_faq">A PyQt window will appear and display :</p>
                            <div className="code_example_background_faq">
                                Welcome to the WikiLis library uploader
                            </div>
                        </li>
                        <li>
                            <p className="li_faq">Hit Next and fill the different information.</p>
                            <dl>
                                <dd className="dl_faq"><p className="colored_text">&rarr;</p><p className="dd_faq">“Language” is the library’s code language.</p></dd>
                                <dd className="dl_faq"><p className="colored_text">&rarr;</p><p className="dd_faq">“Library Name” is the name you want to display you library in the website. </p></dd>
                                <dd className="dl_faq"><p className="colored_text">&rarr;</p><p className="dd_faq">“Library Location” is the path to the root of you Library folder </p></dd>
                            </dl>
                        </li>
                        <li><p className="li_faq">Click on Next.</p></li>
                        <li><p className="li_faq">Read the recap and verify that everything is fine.</p></li>
                        <li><p className="li_faq">If everything is correct, click on “Process & Upload”</p></li>
                        <li><p className="li_faq">Wait until the progress bar hits 100% and that’s it, your library has been uploaded to the website</p></li>
                    </ul>
                </div>
            </div>
            <div href="#faq5" data-toggle="collapse" className="select_question">
                <ArrowDropDownRoundedIcon className="grower_faq" />
                <span className="title_question_part">How to upload an example to a symbol ?</span>
            </div>
            <div className="answer_part collapse" id="faq5">
                <div className="answer_content">
                    <p className="description">You just need to download our parser. And please, check if you already have a Python 3 runtime installed on your computer. If not, you can follow this <a className="colored_text" href="#downloadparser">link</a>.</p>
                </div>
            </div>
            <div href="#faq6" data-toggle="collapse" className="select_question">
                <ArrowDropDownRoundedIcon className="grower_faq" />
                <span className="title_question_part">I lost my password.</span>
            </div>
            <div className="answer_part collapse" id="faq6">
                <div className="answer_content">
                    <p className="description">Please check the login page and follow the links. </p>
                </div>
            </div>
            <div href="#faq7" data-toggle="collapse" className="select_question">
                <ArrowDropDownRoundedIcon className="grower_faq" />
                <span className="title_question_part">I lost my email address.</span>
            </div>
            <div className="answer_part collapse" id="faq7">
                <div className="answer_content">
                    <p className="description">Please check the login page and follow the links. </p>
                </div>
            </div>
        </div>
    )
}

const renderFaqDesc = () => {
    return (
        <div>
            <div className="faq_description_card">
                <h2 className="faq_title">Help and FAQ</h2>
                <div className="faq_content">
                    <p className="description">The right place to find answers to common answers !</p>
                </div>
            </div>
        </div>
    )
}


const FAQPage = () => {
    return (
        <div>
            <div id="Body">
                <div className="content_faq_page">
                    {renderFaqDesc()}
                    {renderList()}
                </div>
            </div>
        </div>
    );
}

export default FAQPage;