import React from 'react';
import { Link } from 'react-router-dom';

import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

import './style.css';
import icon from './img/icon.png'


const renderTitle = () => {
    return (
        <div className="GS-title-container">
            <div>
                <img src={icon} alt="Lib Name icon"/>
            </div>
            <div>
                <h2 className="GS-title">Getting Started</h2>
                <DoubleArrowIcon className="GS-title-separator"></DoubleArrowIcon>
                <Link to="/" className="GS-title-lib-name">Boost</Link>
                <div className="GS-title-lib-language">(C++)</div>
            </div>
        </div>
    )
}

const renderDescription = () => {
    return (
        <div className="GS-Description">
            <span>
                Boost provides free peer-reviewed portable C++ source libraries.
            </span>
            <span>
                We emphasize libraries that work well with the C++ Standard Library. Boost libraries are intended to be widely useful, and usable across a broad spectrum of applications. The <Link to="https://www.boost.org/users/license.html">Boost license</Link> encourages the use of Boost libraries for all users with minimal restrictions.
            </span>
            <span>
                We aim to establish "existing practice" and provide reference implementations so that Boost libraries are suitable for eventual standardization. Beginning with the ten Boost Libraries included in the Library Technical Report <Link to="http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1745.pdf">(TR1)</Link> and continuing with every release of the ISO standard for C++ since 2011, the <Link to="http://www.open-std.org/jtc1/sc22/wg21/">C++ Standards Committee</Link> has continued to rely on Boost as a valuable source for additions to the Standard C++ Library.
            </span>
        </div>
    )
}

const renderSummary = () => {
    return (
        <div className="GS-summary-container">
            <div className="GS-third-heading">Content</div>
            <ul>
                <li><Link to="#section1">Get Boost</Link></li>
                <ul>
                    <li><Link to="#section1_1">Download</Link></li>
                    <li><Link to="#section1_2">Install</Link></li>
                </ul>
                <li><Link to="#section2">The Boost Distribution</Link></li>
            </ul>
        </div>
    )
}

const renderContent = () => {
    return (
        <div className="GS-Content">
            <hr />
            <div className="GS-section">
                <div className="GS-first-heading" id="section1">1. Get Boost</div>
                <span>The most reliable way to get a copy of Boost is to download a distribution from <Link to="https://www.boost.org/users/history/version_1_73_0.html">SourceForge</Link>:</span>
                <div className="GS-inner-section">
                    <div className="GS-second-heading" id="section1_1">1.a. Download:</div>
                    <div className="GS-button-container">
                        <Link to="https://www.boost.org/users/history/version_1_73_0.html" className="GS-button">
                            <div className="GS-button-title">Boost download</div>
                            <div className="GS-button-description">Unix Boost 1.73.0</div>
                        </Link>
                    </div>
                </div>
                <div className="GS-inner-section">
                    <div className="GS-second-heading" id="section1_2">1.b. Install:</div>
                    <span>In the directory where you want to put the Boost installation, execute:</span>
                    <div className="GS-code-section">tar --bzip2 -xf /path/to/boost_1_73_0.tar.bz2</div>
                </div>
                <div className="GS-note-section">
                    <span className="GS-note-title">Note</span>
                    <span>Other Packages:</span>
                    <span>RedHat, Debian, and other distribution packagers supply Boost library packages, however you may need to adapt these instructions if you use third-party packages, because their creators usually choose to break Boost up into several packages, reorganize the directory structure of the Boost distribution, and/or rename the library binaries.1 If you have any trouble, we suggest using an official Boost distribution from SourceForge.</span>
                </div>  
            </div>
            <hr />
            <div className="GS-section">
                <div className="GS-first-heading" id="section2">2. The Boost Distribution</div>
                <span>This is a sketch of the resulting directory structure:</span>
                <div className="GS-code-section">
                    boost_1_73_0/ .................The “boost root directory”<br/>
                    index.htm .........A copy of www.boost.org starts here<br/>
                    boost/ .........................All Boost Header files<br/>
                    <br/>
                    libs/ ............Tests, .cpps, docs, etc., by library<br/>
                        index.html ........Library documentation starts here<br/>
                        algorithm/<br/>
                        any/<br/>
                        array/<br/>
                                        …more libraries…<br/>
                    status/ .........................Boost-wide test suite<br/>
                    tools/ ...........Utilities, e.g. Boost.Build, quickbook, bcp<br/>
                    more/ ..........................Policy documents, etc.<br/>
                    doc/ ...............A subset of all Boost library docs<br/>
                </div>
                <div className="GS-important-section">
                    <span>It's important to note the following:</span>
                    <ul>
                        <li><span>The path to the <b>boost root directory</b> <u>(often /usr/local/boost_1_73_0)</u> is sometimes referred to as <div className="GS-inline-code">$BOOST_ROOT</div> in documentation and mailing lists .</span></li>
                        <li><span>To compile anything in Boost, you need a directory containing the boost/ subdirectory in your #include path.</span></li>
                        <li><span>Since all of Boost's header files have the .hpp extension, and live in the boost/ subdirectory of the boost root, your Boost #include directives will look like</span></li>
                        <li><span>Don't be distracted by the doc/ subdirectory; it only contains a subset of the Boost documentation. Start with libs/index.html if you're looking for the whole enchilada.</span></li>
                    </ul>
                </div>
                <div className="GS-highlight-section">
                    <span>See the Linux and macOS platform docs for a troubleshooting guide and more information about building your projects for Unix-like systems.</span>
                </div>
            </div>
        </div>
    )
}

const TermsOfUse = () => {
    return (
        <div>
            <div id="Body">
                <div className="GS-content-page">
                    {renderTitle()}
                    {renderDescription()}
                    {renderSummary()}
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}

export default TermsOfUse;