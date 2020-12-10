import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';

import './style.css';
import { Link } from 'react-router-dom';

const keyTest = RegExp(
    /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
);

export default class DownloadPage extends Component {

    static REQUIRE_SESSION = true;

    constructor(props) {
        super(props);
        this.state = {
            detectedOS : null,
            selectedOS : null,
            btnDiasble : true,
            errorForm : null,
            apikey : null
        };
        this.handleChange = this.handleChange.bind(this);
    }

    getUserOs = () => {
        let os = window.navigator.platform;

        if (os.includes('Nintendo'))
            this.setState({detectedOS : 'What are you even doing here ?'});
        else if (os.toLowerCase().includes('linux'))
            this.setState({detectedOS : 'Linux', selectedOS:  'Linux'});
        else if (os.toLowerCase().includes('win'))
            this.setState({detectedOS : 'Win64', selectedOS:  'Win64'});
        else if (os.toLowerCase().includes('mac'))
            this.setState({detectedOS : 'OSX', selectedOS:  'OSX'});
    }

    componentDidMount = () => {
        this.getUserOs();
    }

    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;

        this.setState({errorForm: null});

        if (name === "apikey") {
            //check valid API KEY
            if (value.replace(keyTest, "") === "") {
                this.setState({apiKey: value, btnDiasble: false});
            } else {
                this.setState({apiKey: null, btnDiasble: true, errorForm: 'Invalid APi Key'});
            }
        } else if (name === "os") {
            this.setState({selectedOS: value});
        }
    }

    getDownLoadLink() {
        if (this.state.apiKey !== null && this.state.apiKey.replace(keyTest, "") === "") {
            window.open("https://eip.yuristudio.net/?os=" + this.state.selectedOS + "&apiKey=" + this.state.apiKey + "&userId=" + this.props.user.id);
        }
    }

    rederDonwloadForm = () => {
        return (
            <div className='download-page-form'>
                <div className='download-page-form-container' size="Normal">
                    <TextField
                            autoFocus
                            label="API Key *"
                            placeholder="xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            name="apikey"
                            onChange={this.handleChange}
                            variant="outlined"
                            className="download-page-text-field"
                        />
                    <FormControl className='download-page-selector'>
                        <InputLabel id="demo-simple-select-label">Select your OS</InputLabel>
                        <NativeSelect
                            onChange={this.handleChange}
                            label="Operating system"
                            name="os"
                            defaultValue={this.state.detectedOS}
                            >
                            { this.state.detectedOS === 'Win64' ? 
                                <>
                                    <option value='Win64'>Windows</option>
                                    <option value='Linux'>Linux</option>
                                    <option value='OSX'>Mac OS</option>
                                </>
                                :
                                <>
                                    { this.state.detectedOS === 'Linux' ?

                                        <>
                                            <option value='Linux'>Linux</option>
                                            <option value='Win64'>Windows</option>
                                            <option value='OSX'>Mac OS</option>
                                        </>
                                        :
                                        <>
                                            <option value='OSX'>Mac OS</option>
                                            <option value='Linux'>Linux</option>
                                            <option value='Win64'>Windows</option>
                                        </>
                                    }
                                </>
                            }
                        </NativeSelect>
                        <FormHelperText>Detected OS: {this.state.detectedOS}</FormHelperText>
                    </FormControl>
                </div>
                <div className={'download-page-button-container-disabled' + this.state.btnDiasble + ' download-page-button-container'}>
                    <Button 
                        style={{ padding: '8px', color: '#ffff', backgroundColor: '#7B68EE', borderRadius: '4px', margin: 'auto', height: 'auto', width: 'auto', display: 'block'}}
                        variant="contained"
                        onClick={() => this.getDownLoadLink()}
                        disabled={this.state.btnDiasble} >
                            <div className="download-page-button-title">Download</div>
                            <div className="download-page-button-description">{this.state.selectedOS}</div>
                    </Button>
                </div>
            </div>
        )
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
                        Please check the <Link to="/how-to-use-parser">how to</Link> page to know how to operate the program.
                    </div>
                    <br />
                    <div className='download-page-text'>
                        Before doing it, you might want to check our <Link to="/codere-commendations-guide">code recommandations</Link> to be sure the result is as expected !
                    </div>
                    {this.rederDonwloadForm()}
                    {this.state.errorForm && <Alert className="user-warning" severity="warning">{this.state.errorForm}</Alert>}
                </div>
            </div>
        )
    }

    renderImportant = () => {
        return (
            <div>
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
                    Not the right OS detected ? Please check the dropdown list below the API Key input.
                    </div>
                    <div className='download-page-text'>
                        If it opens the file in another tab, just right click in the page and click "Save As...".
                    </div>
                    <div className='download-page-text'>
                        You may also need to apply the correct permissions to run the file.
                    </div>
                    <div className='download-page-text'>
                        Cannot find the right platform ?
                    </div>
                    <br />
                    <div className='download-page-text'>
                        Maybe devlopment is in progress for this particular platform. You can contact us (see <Link to="/contact">Contact</Link>) to check with us.
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
