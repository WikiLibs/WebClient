import React, { Component } from 'react';
import { useQuery} from '../../util';
import { ApiService } from '../../ApiService';

import { Link } from 'react-router-dom';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import EditIcon from '@material-ui/icons/Edit';
import PublishIcon from '@material-ui/icons/Publish';
import CancelIcon from '@material-ui/icons/Cancel';
import CircularProgress from '@material-ui/core/CircularProgress';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from '@material-ui/core/TextField';

import TreeView from '../TreeView'

import './style.css';

import pp from '../../Components/Header/pp.png'

const data = `
Boost provides free peer-reviewed portable C++ source libraries.

We emphasize libraries that work well with the C++ Standard Library. Boost libraries are intended to be widely useful, and usable across a broad spectrum of applications. The [Boost license](https://whatever) encourages the use of Boost libraries for all users with minimal restrictions.

We aim to establish "existing practice" and provide reference implementations so that Boost libraries are suitable for eventual standardization. Beginning with the ten Boost Libraries included in the Library Technical Report (TR1) and continuing with every release of the ISO standard for C++ since 2011, the C++ Standards Committee has continued to rely on Boost as a valuable source for additions to the Standard C++ Library.

text [my link](link)

# Get Boost

## Download

[my button](link)

[my button](link "Unix Boost 1.0")

## Install

\`my terminal command\`

# The boost distribution

<note>
Note title

Other Packages:RedHat, Debian, and other distribution packagers supply Boost library packages, however you may need to adapt these instructions if you use third-party packages, because their creators usually choose to break Boost up into several packages, reorganize the directory structure of the Boost distribution, and/or rename the library binaries.1 If you have any trouble, we suggest using an official Boost distribution from SourceForge.
</note>

<note>
See the Linux and macOS platform [docs](link_to_docs) for a troubleshooting guide and more information about building your projects for Unix-like systems.
Test
1234567
</note>
`

export default class LibPage extends Component {
    api = new ApiService();

    constructor(props) {
        super(props);
        this.state = {
            id : null,
            name : null,
            displayName : null,
            langName : null,
            description : null,
            copyright : null,
            userId : null,
            isAutor : false,
            icon : pp,
            expandedTreeView : false,
            expandedDescription : true,
            isEdit : false,
            loading: false
        }
    }

    componentDidMount = async () => {
        var q = useQuery();
        let apiError = false;
        /*this.api.getInfoLib(q.lib).catch(err => {
            this.props.history.replace(this.props.history.pathname,{statusCode: err.response.status, errorObj: err.response.data});
            apiError = true;
        }).then(response => {
            this.setState(response.data);
        });*/

        this.api.getIconLib(q.lib).then(response => {
            this.setState({icon: response});
        }).catch(err => {
            /*this.props.history.replace(this.props.history.pathname,{statusCode: err.response.status, errorObj: err.response.data});
            apiError = true;*/
        });

        if (!apiError) {
            let tmpData = {
                id :  q.lib,
                name : q.name,
                displayName : undefined,
                langName : "C++",
                description : data,
                copyright : "mylibcopyright",
                userId : "a5070f52-1b13-41b9-bba2-2227f77aec72",
                NewDisplayName : "My lib",
                NewDescription : data,
                NewCopyright : "mylibcopyright"
            }

            this.setState(tmpData);
            if (tmpData.description === undefined || tmpData.description === "") {
                this.setState({description : "", NewDescription : "", expandedTreeView : true, expandedDescription : false});
            }
            if (tmpData.copyright === undefined) {
                this.setState({copyright : "", NewCopyright : ""});
            }
            if (tmpData.displayName === undefined) {
                this.setState({displayName : tmpData.name, NewDisplayName : tmpData.name});
            }
        }
    }

    renderTitle = () => {
        return (
            <div className="GS-title-container">
                {this.state.icon !== null && this.state.icon !== undefined ?
                    <div>
                        <img src={this.state.icon} alt="Lib Name icon"/>
                    </div>
                    : <></>
                }
                <div>
                    <DoubleArrowIcon className="GS-title-separator"></DoubleArrowIcon>
                    <div to="/" className="GS-title-lib-name">{this.state.displayName}</div>
                    <div className="GS-title-lib-language">({this.state.langName})</div>
                </div>
            </div>
        )
    }

    renderMiniMarkDown = () => {
        if (this.state.description === null || this.state.description === "") {
            return (
                <div className="lib-page-no-info">
                    <span>No information given for this page yet</span>
                    <div className='lib-page-edit-btn' onClick={() => this.handleEdit()}>
                        <span>add information</span>
                        <EditIcon/>
                    </div>
                </div>
            );
        }
        return (
            <div className="GS-Content">
                {/* TODO: get minimarkdown display format => diplay it correctly */}
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

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        console.log(name)
        this.setState({[name]: value });
    }

    renderEditPageForm = () => {
        return (
            <>
                <div className="lib-page-form">
                    <div className="lib-page-form-title">Edition mode:</div>
                    <div className="lib-page-form-upper">
                        <div>
                            <TextField
                                name="NewDisplayName"
                                label="Library name"
                                className="lib-page-form-input"
                                value={this.state.NewDisplayName}
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleChange}
                            />
                            <TextField
                                name="NewCopyright"
                                label="Library copyright"
                                className="lib-page-form-input"
                                value={this.state.NewCopyright}
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="lib-page-form-upper-right">
                            <span>Library icon</span>
                            <Card className="lib-page-icon-card" label='icon'>
                                <input type="file" id="file" name="file" className="lib-page-icon-input" onChange={this.profileImgUpdate} />
                                <label htmlFor="file">
                                    <CardMedia
                                        className="lib-page-icon-card-img"
                                        image={this.state.icon}
                                        title=""
                                    />
                                </label>
                            </Card>
                        </div>
                    </div>
                    
                    <div className="lib-page-form-lower">
                        <span>Description</span>
                        <textarea
                            name="NewDescription"
                            label="Description"
                            value={this.state.NewDescription}
                            onChange={this.handleChange}
                            rows={15}
                        />
                        {/* Doc mini markdown btn */}
                    </div>
                </div>
            </>
        )
    }

    profileImgUpdate = event => {
        this.setState({ loading: true, icon: URL.createObjectURL(event.target.files[0])});
        this.api.setIconLib(this.state.id, event.target.files[0])
        .then(() => this.setState({loading: false}))
        .catch(err => {
            this.setState({loading: false, icon : pp})
            console.log("error uploading image");
            //error popup
            if (err.response.status === 500) {
                this.props.history.replace(this.props.history.pathname,{statusCode: err.response.status, errorObj: err.response.data});
            }
        });
    }

    renderLoadingDialog() {
        return (
            <Dialog open={this.state.loading}>
                <DialogContent className="dialog-upload-img">
                    <CircularProgress />
                    <span>Uploading new image</span>
                </DialogContent>
            </Dialog>
        );
    }

    handleEdit = () => {
        console.log("switching to edit mode");
        this.setState({isEdit: true});
    }

    handleSave = () => {
        console.log("switching to viewer mode and saving data");
        this.setState({isEdit: false, expandedDescription : true});
        if (this.state.NewCopyright !== null && this.state.NewCopyright !== undefined && this.state.NewDescription !== null && this.state.NewDescription !== undefined && this.state.NewDisplayName !== null && this.state.NewDisplayName !== undefined) {
            this.api.patchLib(this.state.id, {
                displayName: this.state.NewDisplayName,
                description: this.state.NewDescription,
                copyright: this.state.NewCopyright
            }).then(_=> {
                console.log("success"); 
                this.setState({isEdit: false,
                    displayName : this.state.NewDisplayName,
                    description : this.state.NewDescription,
                    copyright : this.state.NewCopyright});
                /* TODO reload Markdown */
            }).catch(err => {
                console.log("failed to save data");
                if (err.response.status === 500) {
                    this.props.history.replace(this.props.history.pathname,{statusCode: err.response.status, errorObj: err.response.data});
                }
                this.handelCancel();
            });
        } else {
            console.log("Error in data sent");
        }
    }

    handelCancel = () => {
        this.setState({isEdit: false,
            NewDisplayName : this.state.displayName,
            NewDescription : this.state.description,
            NewCopyright : this.state.copyright});
    }

    renderButtonSwitch = () => {
        if (this.props.user !== null && this.props.user !== undefined && this.props.user.id !== undefined && this.props.user.id === this.state.userId) {
            return (
                <>
                    {this.state.isEdit ? 
                        <>
                            <div className="lib-page-edit-btn lib-page-save-btn" onClick={() => this.handleSave()}>
                                <span>save modification</span>
                                <PublishIcon/>
                            </div>
                            <div className="lib-page-edit-btn lib-page-cancel-btn" onClick={() => this.handelCancel()}>
                                <span>cancel</span>
                                <CancelIcon/>
                            </div>
                        </>
                        :
                        <div className="lib-page-edit-btn" onClick={() => this.handleEdit()}>
                            <span>edit this page</span>
                            <EditIcon/>
                        </div>

                    }
                </>
            )
        }
        else {
            return (
                <></>
            )
        }
    }

    renderCopyright = () => {
        return(
            <>
                <div className="lib-page-copyright">{this.state.copyright !== undefined ? this.state.copyright : ""}</div>
            </>
        )
    }

    render = () => {
        return (
            <div>
                <div id="Body">
                    <div className="GS-content-page">
                        {this.renderTitle()}
                        <div className="lib-page-accordion" id="accordion">
                        {((this.state.description !== null && this.state.description !== undefined && this.state.description !== "") || (this.props.user !== null && this.props.user !== undefined && this.props.user.id !== undefined && this.props.user.id === this.state.userId)) ?
                            <div className="card">
                                <div className="card-header" id="headingOne">
                                    <h5 className="mb-0 lib-page-btn-collapse">
                                        <button className="symbol-page-title btn" data-toggle="collapse" data-target="#collapseOne" aria-expanded={this.state.expandedDescription ? "true" : "false"} aria-controls="collapseOne">
                                            Library information
                                        </button>
                                        {this.renderButtonSwitch()}
                                        
                                    </h5>
                                </div>
                                <div id="collapseOne" className={this.state.expandedDescription ? "collapse show" : "collapse"} aria-labelledby="headingOne" data-parent="#accordion">
                                    <div className="symbol-card-body">
                                        {this.state.isEdit ? this.renderEditPageForm() : this.renderMiniMarkDown()}
                                    </div>
                                </div>
                            </div>
                        : 
                            <></>
                        }
                            <div className="card">
                                <div className="card-header" id="headingTwo">
                                    <h5 className="mb-0 lib-page-btn-collapse">
                                        <button className="symbol-page-title btn" data-toggle="collapse" data-target="#collapseTwo" aria-expanded={this.state.expandedTreeView ? "true" : "false"} aria-controls="collapseTwo">
                                            TreeView
                                        </button>
                                    </h5>
                                </div>
                                <div id="collapseTwo" className={this.state.expandedTreeView ? "collapse show" : "collapse"} aria-labelledby="headingTwo" data-parent="#accordion">
                                    <div className="symbol-card-body">
                                        <TreeView />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {this.renderCopyright()}
                        {console.log(this.state)}
                    </div>
                </div>
                {this.renderLoadingDialog()}
            </div>
        );
    }
}