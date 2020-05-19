import React from 'react';

import './style.css';

const renderCodeRecommendations = () => {
    return (
        <div className="coderecom_card">
            <h2 className="coderecom_title">Code recommendations</h2>
            <div className="coderecom_content">
                <p className="coderecom_description">
                    In order to have the best results when uploading your library to WikiLibs using our program, you should respect some recommendations.<br />
                    This guide will tell you everything you need to know to ensure success.
                </p>
            </div>
        </div>
    )
}

const renderSomeInfo = () => {
    return (
        <div className="coderecom_card">
            <h2 className="coderecom_title">Some informations</h2>
            <div className="coderecom_content">
                <p className="coderecom_description">
                    Our program uses Doxygen to generate the base for our documentation format, you can follow their own code recommendations but as of now, we don’t support every types of Doxygen output.<br />
                </p>
                <p>
                    The program will recover all the symbols (like classes, variables, functions, ...) that it can found in your files (please check the supported langages). Then it will check for the associated comments that should be formated using the Javadoc standard.
                </p>
            </div>
        </div>
    )
}

const renderSupportedComments = () => {
    return (
        <div className="coderecom_card">
            <h2 className="coderecom_title">Supported types of comments</h2>
            <div className="coderecom_content">
                <p className="coderecom_description">
                    As stated before, our program will look for Javadoc comments in your files to associate with the symbols found. For now, we support an array of tags :
                </p>
                <ul className="ul_coderecom">
                    <li><p className="li_coderecom">Brief tag : used for brief descriptions (will be used in the search results)</p></li>
                    <li><p className="li_coderecom">Detail tag : used for detailed descriptions (will be used in the symbol page)</p></li>
                    <li><p className="li_coderecom">Param tag : used for description of a parameter</p></li>
                    <li><p className="li_coderecom">Return tag : used for the return description</p></li>
                    <li><p className="li_coderecom">Retval tag : used for the possible return values</p></li>
                </ul>
            </div>
        </div>
    )
}

const renderSupportedSymbols = () => {
    return (
        <div className="coderecom_card">
            <h2 className="coderecom_title">Supported types of comments</h2>
            <div className="coderecom_content">
                <p className="coderecom_description">
                    The following symbols should be plainly supported for comments gathering :
                </p>
                <ul className="ul_coderecom">
                    <li><p className="li_coderecom">Structures (and their members)</p></li>
                    <li><p className="li_coderecom">Functions (and their parameters)</p></li>
                    <li><p className="li_coderecom">Classes (and their members)</p></li>
                    <li><p className="li_coderecom">Variables</p></li>
                    <li><p className="li_coderecom">Unions and defines</p></li>
                </ul>
            </div>
        </div>
    )
}

const renderCodeExemples = () => {
    return (
        <div className="coderecom_card">
            <h2 className="coderecom_title">Code examples</h2>
            <div className="coderecom_content">
                <div className="coderecom_code_box">
                    <p className="coderecom_code_comment">
                        &frasl;**This is a brief description, ended by a period. Now this is the detailed description,<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;it can go on multiples lines.<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;\param integer&nbsp;&nbsp;&nbsp;&nbsp;An integer used as a parameter<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;\param string&nbsp;&nbsp;&nbsp;&nbsp;A string of characters used as a parameter<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;\return Returns&nbsp;&nbsp;&nbsp;&nbsp;the result of the function<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;\retval 0&nbsp;&nbsp;&nbsp;&nbsp;Success.<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;\retval 1&nbsp;&nbsp;&nbsp;&nbsp;Failure<br />
                        */<br />
                    </p>
                    <p>
                        <span className="coderecom_code_blue">int</span> <span className="coderecom_code_green">example_function</span>(<span className="coderecom_code_blue">int</span> integer, <span className="coderecom_code_blue">char</span> *string);
                    </p>
                </div>
                <div className="coderecom_code_box">
                    <p className="coderecom_code_comment">&frasl;**This is an example structure. This structure serves as an example..*/</p>
                    <p><span className="coderecom_code_blue">struct</span> example_structure &#123;</p>
                    <p className="coderecom_code_comment">&nbsp;&nbsp;&nbsp;&nbsp;/**This is the brief description. This is the detailed description. It continues after the period.*/</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="coderecom_code_blue">char *</span> name;</p>
                    <p className="coderecom_code_comment">&nbsp;&nbsp;&nbsp;&nbsp;/**Age of the structure. This member represents the age of the structure*/</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="coderecom_code_blue">int</span> age;<br />&#125;;</p>
                </div>
            </div>
        </div>
    )
}

const CodeRecommendations = () => {
    return (
        <div>
            <div id="Body">
                <div className="content_coderecom_page">
                    {renderCodeRecommendations()}
                    {renderSomeInfo()}
                    {renderSupportedComments()}
                    {renderSupportedSymbols()}
                    {renderCodeExemples()}
                </div>
            </div>
        </div>
    );
}

export default CodeRecommendations;