import React from 'react';
import { Link } from 'react-router-dom';

import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

import './style.css';
import icon from '../WelcomePage/imgs/WikiLibs_Logo.png';

const renderTitle = () => {
    return (
        <div className="GS-title-container">
            <div>
                <img src={icon} alt="Lib Name icon"/>
            </div>
            <div>
                <h2 className="GS-title">Mini-Markdown Cheat Sheet</h2>
            </div>
        </div>
    )
}

const renderOverview = () => {
    return (
        <div className="GS-Content">
            <hr />
            <div className="GS-section">
                <div className="GS-first-heading">Overview</div>
                <span>This Markdown cheat sheet provides a quick overview of all the Markdown syntax elements. It can’t cover every edge case, so if you need more information about any of these elements, <Link to="/contact">Contact Us</Link></span>
            </div>
        </div>
    )
}

const renderHeadings = () => {
    return (
        <div className="GS-Content">
            <hr />
            <div className="GS-section">
                <div className="GS-first-heading">Headings</div>
                <span>To create a heading, add number signs (#) in front of a word or phrase. The number of number signs you use should correspond to the heading level. For example, to create a heading level three , use three number signs (e.g., ### My Header).</span>
                <table className='minimd-table-bordered minimd-table'>
                    <thread className="minimd-thead-light">
                        <tr>
                            <th>Mini-Mardown</th>
                            <th>HTML</th>
                            <th>Rendered Output</th>
                        </tr>
                    </thread>
                    <tbody>
                        <tr>
                            <td># Heading level 1</td>
                            <td>&lt;h1&gt;Heading level 1&lt;/h1&gt;</td>
                            <td><div className="GS-first-heading">Heading level 1</div></td>
                        </tr>
                        <tr>
                            <td>## Heading level 2</td>
                            <td>&lt;h2&gt;Heading level 2&lt;/h2&gt;</td>
                            <td><div className="GS-second-heading">Heading level 2</div></td>
                        </tr>
                    </tbody>
                </table>
                <div className="GS-second-heading">Heading Best Practices</div>
                <span>Markdown applications don’t agree on how to handle a missing space between the number signs (#) and the heading name. For compatibility, always put a space between the number signs and the heading name.</span>
                <table className='minimd-table-bordered minimd-table'>
                    <thread className="minimd-thead-light">
                        <tr>
                            <th><div><CheckIcon className="minimd-thead-icon-ok"/><div>Do this</div></div></th>
                            <th><div><CloseIcon className="minimd-thead-icon-not"/><div>Don't do this</div></div></th>
                        </tr>
                    </thread>
                    <tbody>
                        <tr>
                            <td># Here's a Heading</td>
                            <td>#Here's a Heading</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const renderParagraphs = () => {
    return (
        <div className="GS-Content">
            <hr />
            <div className="GS-section">
                <div className="GS-first-heading">Paragraphs</div>
                <span>To create paragraphs, use a blank line to separate one or more lines of text.</span>
                <table className='minimd-table-bordered minimd-table'>
                    <thread className="minimd-thead-light">
                        <tr>
                            <th>Mini-Mardown</th>
                            <th>HTML</th>
                            <th>Rendered Output</th>
                        </tr>
                    </thread>
                    <tbody>
                        <tr>
                            <td>I really like using Mini-Mardown.<br/><br/>I think I'll use it to format all of my documents from now on.</td>
                            <td>&lt;p&gt;I really like using Mini-Mardown.&lt;/p&gt;<br/><br/>&lt;p&gt;I think I'll use it to format all of my documents from now on.&lt;/p&gt;</td>
                            <td><span>I really like using Mini-Mardown.</span><span>I think I'll use it to format all of my documents from now on.</span></td>
                        </tr>
                    </tbody>
                </table>
                <div className="GS-second-heading">Paragraph Best Practices</div>
                <span>Markdown applications don’t agree on how to handle a missing space between the number signs (#) and the heading name. For compatibility, always put a space between the number signs and the heading name.</span>
                <table className='minimd-table-bordered minimd-table'>
                    <thread className="minimd-thead-light">
                        <tr>
                            <th><div><CheckIcon className="minimd-thead-icon-ok"/><div>Do this</div></div></th>
                            <th><div><CloseIcon className="minimd-thead-icon-not"/><div>Don't do this</div></div></th>
                        </tr>
                    </thread>
                    <tbody>
                        <tr>
                            <td>Don't put tabs or spaces in front of your paragraphs.<br/><br/>And keep a blank line to separate one or more lines of text.</td>
                            <td>&ensp;Don't add tabs or spaces in front of paragraphs.<br/><br/>&ensp;This can result in unexpected formatting problems.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const renderCode = () => {
    return (
        <div className="GS-Content">
            <hr />
            <div className="GS-section">
                <div className="GS-first-heading">Code</div>
                <span>To denote block of code, enclose it in backticks (`).</span>
                <table className='minimd-table-bordered minimd-table'>
                    <thread className="minimd-thead-light">
                        <tr>
                            <th>Mini-Mardown</th>
                            <th>HTML</th>
                            <th>Rendered Output</th>
                        </tr>
                    </thread>
                    <tbody>
                        <tr>
                            <td>`my terminal command`</td>
                            <td>&lt;code&gt;my terminal command&lt;/code&gt;</td>
                            <td><div className="GS-code-section">my terminal command</div></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const renderLink = () => {
    return (
        <div className="GS-Content">
            <hr />
            <div className="GS-section">
                <div className="GS-first-heading">Link</div>
                <span>To create a link, enclose the link text in brackets (e.g., [WikiLibs]) and then follow it immediately with the URL in parentheses (e.g., (https://eip.epitech.eu/2021/wikilibs/)).</span>
                <div className="GS-code-section">My favorite Website is [WikiLibs](https://eip.epitech.eu/2021/wikilibs/).</div>
                <span>The rendered output looks like this:</span>
                <span>My favorite Website is <Link to={"/"} >WikiLibs</Link>.</span>
            </div>
        </div>
    )
}

const renderBtn = () => {
    return (
        <div className="GS-Content">
            <hr />
            <div className="GS-section">
                <div className="GS-first-heading">Buttons</div>
                <span>To create a button, enclose the button title in brackets (e.g., [WikiLibs parser]) and then follow it immediately with the URL in parentheses (e.g., (https://eip.epitech.eu/2021/wikilibs/download)).</span>
                <div className="GS-code-section">[WikiLibs parser](https://eip.epitech.eu/2021/wikilibs/download)</div>
                <span>The rendered output looks like this:</span>
                <div className="GS-button-container">
                    <Link to={""} onClick={() => window.location.href = "https://eip.epitech.eu/2021/wikilibs/download"} className="GS-button">
                        <div className="GS-button-title">WikiLibs parser</div>
                    </Link>
                </div>
                <div className="GS-second-heading">Adding Descriptions</div>
                <span>You can optionally add a description for a button. This will be displayed bellow the title. To add a description, enclose it in parentheses after the URL.</span>
                <div className="GS-code-section">[WikiLibs parser](https://eip.epitech.eu/2021/wikilibs/download "last version")</div>
                <span>The rendered output looks like this:</span>
                <div className="GS-button-container">
                    <Link to={""} onClick={() => window.location.href = "https://eip.epitech.eu/2021/wikilibs/download"} className="GS-button">
                        <div className="GS-button-title">WikiLibs parser</div>
                        <div className="GS-button-description">last version</div>
                    </Link>
                </div>
                <div className="GS-note-section">
                    <span className="GS-note-title">Note:</span>
                    <span>A button has to be created in a new line.</span>
                </div>
            </div>
        </div>
    )
}

const renderNote = () => {
    return (
        <div className="GS-Content">
            <hr />
            <div className="GS-section">
                <div className="GS-first-heading">Notes</div>
                <span>To denote highlighted note, enclose it in &lt;note&gt; &lt;/note&gt; elements.</span>
                <div className="GS-code-section">&lt;note&gt;Some important note.&lt;/note&gt;</div>
                <span>The rendered output looks like this:</span>
                <div className="GS-highlight-section">
                    <span>Some important note.</span>
                </div>
                <div className="GS-second-heading">Adding Titles</div>
                <span>You can optionally add a title for a Note. This will be displayed on top of the Note. To add a title, separate the title text from the Pparagraph by a blank line.</span>
                <div className="GS-code-section">Note title:<br/><br/>&lt;note&gt;Note paragraph.&lt;/note&gt;</div>
                <span>The rendered output looks like this:</span>
                <div className="GS-note-section">
                    <span className="GS-note-title">Note title:</span>
                    <span>Note paragraph.</span>
                </div>
            </div>
        </div>
    )
}

const midiMdDoc = () => {
    return (
        <div>
            <div id="Body">
                <div className="GS-content-page">
                    {renderTitle()}
                    {renderOverview()}
                    {renderHeadings()}
                    {renderParagraphs()}
                    {renderCode()}
                    {renderLink()}
                    {renderBtn()}
                    {renderNote()}
                </div>
            </div>
        </div>
    );
}

export default midiMdDoc