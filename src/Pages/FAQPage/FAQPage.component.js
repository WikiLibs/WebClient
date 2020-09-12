import React from 'react';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';

import './style.css';

const renderList = () => {
    return (
        <div>
            <div href="#faq1" data-toggle="collapse" className="faq-select-question">
                <ArrowDropDownRoundedIcon className="faq-grower"/>
                <span className="faq-title-question-part">What is WikiLibs ?</span>
            </div>
            <div className="collapse" id="faq1">
                <div className="faq-answer-content">
                    <p className="faq-description">WikiLibs is a website regrouping programming library from different languages, with a unified design to enhance your learning.</p>
                </div>
            </div>
            <div href="#faq2" data-toggle="collapse" className="faq-select-question">
                <ArrowDropDownRoundedIcon className="faq-grower" />
                <span className="faq-title-question-part">How does the website work ?</span>
            </div>
            <div className="collapse" id="faq2">
                <div className="faq-answer-content">
                    <p className="faq-description">For a quickstart, just type the library you want in the search bar. You can also look for it in the sidebar in case you just want a look.</p>
                    <p className="faq-description">Also, you can contribute to the site in two ways. First, you can upload your own example for a symbol (like a function) to help other people. Second, you can upload a whole library to the site, using the Parsing Tool (see below). You should own the library and/or have the necessary permissions to do so. </p>
                </div>
            </div>
            <div href="#faq3" data-toggle="collapse" className="faq-select-question">
                <ArrowDropDownRoundedIcon className="faq-grower" />
                <span className="faq-title-question-part">How to contact us ?</span>
            </div>
            <div className="collapse" id="faq3">
                <div className="faq-answer-content">
                    <p className="faq-description">You have a question ? A feedback ? Just go to our <a className='faq-colored-text' href='/contact'>contact page</a> and check the different ways to contact us !</p>
                </div>
            </div>
            <div href="#faq4" data-toggle="collapse" className="faq-select-question">
                <ArrowDropDownRoundedIcon className="faq-grower" />
                <span className="faq-title-question-part">How to upload a library to the website ?</span>
            </div>
            <div className="collapse" id="faq4">
                <div className="faq-answer-content">
                    <p className="faq-description">In order to upload the library to the website, open a terminal the folder of the downloaded parser. If you have not downloaded the parser yet, click this <a className="faq-colored-text" href="/download">link</a> to download it. If it is already done, please do the following steps: </p>
                    <ul className="faq-ul">
                        <li>
                            <p className="faq-li">Execute the command line:</p>
                            <div className="faq-code_example_background">
                                ./wikilibs_parser -k 819b9934-e8bd-49dc-ace5-888806218117 -v -g C  Lib
                            </div>
                        </li>
                        <li>
                            <p className="faq-li">A PyQt window will appear and display :</p>
                            <div className="faq-code_example_background">
                                Welcome to the WikiLis library uploader
                            </div>
                        </li>
                        <li>
                            <p className="faq-li">Hit Next and fill the different information.</p>
                            <dl>
                                <dd className="faq-dl"><p className="faq-colored-text">&rarr;</p><p className="faq-dd">“Language” is the library’s code language.</p></dd>
                                <dd className="faq-dl"><p className="faq-colored-text">&rarr;</p><p className="faq-dd">“Library Name” is the name you want to display you library in the website. </p></dd>
                                <dd className="faq-dl"><p className="faq-colored-text">&rarr;</p><p className="faq-dd">“Library Location” is the path to the root of you Library folder </p></dd>
                            </dl>
                        </li>
                        <li><p className="faq-li">Click on Next.</p></li>
                        <li><p className="faq-li">Read the recap and verify that everything is fine.</p></li>
                        <li><p className="faq-li">If everything is correct, click on “Process & Upload”</p></li>
                        <li><p className="faq-li">Wait until the progress bar hits 100% and that’s it, your library has been uploaded to the website</p></li>
                    </ul>
                </div>
            </div>
            <div href="#faq5" data-toggle="collapse" className="faq-select-question">
                <ArrowDropDownRoundedIcon className="faq-grower" />
                <span className="faq-title-question-part">How to upload an example to a symbol ?</span>
            </div>
            <div className="collapse" id="faq5">
                <div className="faq-answer-content">
                    <p className="faq-description">You just need to download our parser. And please, check if you already have a Python 3 runtime installed on your computer. If not, you can follow this <a className="faq-colored-text" href="/download">link</a>.</p>
                </div>
            </div>
            <div href="#faq6" data-toggle="collapse" className="faq-select-question">
                <ArrowDropDownRoundedIcon className="faq-grower" />
                <span className="faq-title-question-part">I lost my password.</span>
            </div>
            <div className="collapse" id="faq6">
                <div className="faq-answer-content">
                    <p className="faq-description">Please check the login page and follow the links. </p>
                </div>
            </div>
            <div href="#faq7" data-toggle="collapse" className="faq-select-question">
                <ArrowDropDownRoundedIcon className="faq-grower" />
                <span className="faq-title-question-part">I lost my email address.</span>
            </div>
            <div className="collapse" id="faq7">
                <div className="faq-answer-content">
                    <p className="faq-description">Please check the login page and follow the links. </p>
                </div>
            </div>
        </div>
    )
}

const renderFaqDesc = () => {
    return (
        <div>
            <div className="faq-description-card">
                <h2 className="faq-title">Help and FAQ</h2>
                <div className="faq-content">
                    <p className="faq-description">The right place to find answers to common answers !</p>
                </div>
            </div>
        </div>
    )
}


const FAQPage = () => {
    return (
        <div>
            <div id="Body">
                <div className="faq-content-page">
                    {renderFaqDesc()}
                    {renderList()}
                </div>
            </div>
        </div>
    );
}

export default FAQPage;