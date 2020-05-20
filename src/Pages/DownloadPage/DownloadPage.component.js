import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';

import './style.css';

export default class DownloadPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getUserOs = () => {
        let os = window.navigator.platform;

        if (os.includes('Nintendo')) {
            return 'What are you even doing here ?'
        }
        return os;
    }

    getUserOsLink = () => {
        let os = this.getUserOs()

        if (os.toLowerCase().includes('linux'))
            return 'http://wikilibs-parser.azurewebsites.net/wikilibs_parser_linux'
        else if (os.toLowerCase().includes('windows'))
            return 'http://wikilibs-parser.azurewebsites.net/wikilibs_parser_windows.exe'
        else if (os.toLowerCase().includes('mac'))
            return 'http://wikilibs-parser.azurewebsites.net/wikilibs_parser_mac'
        return ''
    }

    renderDownloadContent = () => {
        return (
            <div className='download-page-download-content'>
                <div className='download-page-title'>
                    Download
                </div>
                <div className='download-page-text-container'>
                    <div className='download-page-text'>
                        Download the WikiLibs program to upload your code on the website. 
                    </div>
                    <div className='download-page-text'>
                        Please check the how to page to know how to operate the program.
                    </div>
                    <br />
                    <div className='download-page-text'>
                        Before doing it, you might want to check our code recommandations to be sure the result is as expected !
                    </div>
                    <div className='download-page-button-container'>
                        <Button 
                            style={{backgroundColor: '#7B67EE', color: '#FFFFFF', fontWeight: 'bold'}}
                            variant="contained"
                            target="_blank" href={this.getUserOsLink()} >
                            Download
                        </Button>
                    </div>
                    <div className='download-page-subtext'>
                        Detected OS: {this.getUserOs()}
                    </div>
                </div>
            </div>
        )
    }

    renderImportant = () => {
        return (
            <div className='download-page-other-downloads-content'>
                <div className='download-page-title'>
                    Important warning
                </div>
                <div className='download-page-text-container'>
                    <div className='download-page-text'>
                        Before launching the program, you should know that Doxygen is required to run it.
                    </div>
                    <div className='download-page-text'>
                        Please download it on <a href='http://www.doxygen.nl/download.html'>Doxygen's website</a>.
                    </div>
                </div>
            </div>
        )
    }

    renderOtherDownloadButton = (platform, link) => {
        return (
            <div className='download-page-other'>
                <GetAppIcon style={{color: '#7B67EE'}} />
                <a className='download-page-other-link' href={link} download>
                    {platform}
                </a>
            </div>
        )
    }

    renderOtherDownloads = () => {
        return (
            <div className='download-page-other-downloads-content'>
                <div className='download-page-title'>
                    Other downloads
                </div>
                <div className='download-page-text-container'>
                    <div className='download-page-text'>
                        Not the right OS detected ? Please check the other downloads below.
                    </div>
                    <div className='download-page-text'>
                        If it opens the file in another tab, just right click in the page and click "Save As...".
                    </div>
                    <div className='download-page-text'>
                        You may also need to apply the correct permissions to run the file.
                    </div>
                    <div className='download-page-other-container'>
                        {this.renderOtherDownloadButton('Linux - x86 and x64', 'http://wikilibs-parser.azurewebsites.net/wikilibs_parser_linux')}
                        {this.renderOtherDownloadButton('Windows - 64 bits - 7 and later', 'http://wikilibs-parser.azurewebsites.net/wikilibs_parser_windows.exe')}
                        {this.renderOtherDownloadButton('MacOS - 64 bits - Catalina and later', 'http://wikilibs-parser.azurewebsites.net/wikilibs_parser_mac')}
                    </div>
                    <div className='download-page-text'>
                        Cannot find the right platform ?
                    </div>
                    <br />
                    <div className='download-page-text'>
                        Maybe devlopment is in progress for this particular platform. You can contact us (see Contact) to check with us.
                    </div>
                </div>
            </div>
        )
    }

    render = () => {
        return (
            <div className='download-page-container'>
                {this.renderDownloadContent()}
                {this.renderImportant()}
                {this.renderOtherDownloads()}
            </div>
        )
    }
}
