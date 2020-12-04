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
import {parseMarkdown, Statement, Token} from '../../MiniMarkdown'

import './style.css';

import pp from '../../Components/Header/pp.png'

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
            loading: false,
            markdown : []
        }
    }

    componentDidMount = async () => {
        var q = useQuery();
        this.api.getInfoLib(q.lib).catch(err => {
            this.props.history.replace(this.props.history.pathname,{statusCode: err.response.status, errorObj: err.response.data});
        }).then(response => {
            if (response !== undefined && response !== null) {
                let tmpData = response.data 
                this.setState({name : q.name, NewDisplayName : tmpData.displayName, NewDescription : tmpData.description, NewCopyright : tmpData.copyright});

                this.setState(tmpData);
                if (tmpData.description !== undefined && tmpData.description !== null && tmpData.description !== "")
                    this.setState({markdown : parseMarkdown(tmpData.description)});

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
        });

        this.api.getIconLib(q.lib).then(response => {
            if (response !== undefined && response !== null)
                this.setState({icon: response});
        }).catch(err => {
            if (err.response.status === 500)
                this.props.history.replace(this.props.history.pathname,{statusCode: err.response.status, errorObj: err.response.data});
        });
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

    renderMdSubTitle = (data, id) => {
        return(
            <div key={data + id}>
                <div className="GS-second-heading">{data}</div>
            </div>
        );
    }

    renderMdTitle = (data, id) => {
        return(
            <div key={data + id}>
                <div className="GS-first-heading">{data}</div>
            </div>
        );
    }

    renderMdTerminal = (data, id) => {
        return(
            <div key={data + id}>
                <div className="GS-code-section">{data}</div>
            </div>
        );
    }

    renderMdButton = (data, id) => {
        return(
            <div key={data + id}>
                <div className="GS-button-container">
                    <Link to={""} onClick={() => window.location.href = data.link} className="GS-button">
                        <div className="GS-button-title">{data.title}</div>
                        <div className="GS-button-description">{data.description}</div>
                    </Link>
                </div>
            </div>
        );
    }

    renderMdButtonNoDesc = (data, id) => {
        return(
            <div key={data + id}>
                <div className="GS-button-container">
                    <Link to={""} onClick={() => window.location.href = data.link} className="GS-button">
                        <div className="GS-button-title">{data.title}</div>
                    </Link>
                </div>
            </div>
        );
    }

    renderMdSmallNote = (data, id) => {
        let spanText = [];
        let newid = 0;
        data.forEach(elem => {
            if (elem.type === Token.Text) {
                spanText.push(elem.data);
            } else if (elem.type === Token.Url) {
                spanText.push(this.renderMdLink(elem, newid));
            } else {
                console.log('Statement not handled yet', elem);
            }
            newid++;
        });
        return(
            <div key={data + id}>
                <div className="GS-highlight-section">
                    <span>{spanText}</span>
                </div>
            </div>
        );
    }

    renderMdNote = (data, title, id) => {
        let spanText = [];
        let newid = 0;
        data.forEach(elem => {
            if (elem.type === Token.Text) {
                spanText.push(elem.data);
            } else if (elem.type === Token.Url) {
                spanText.push(this.renderMdLink(elem, newid));
            } else {
                console.log('Statement not handled yet', elem);
            }
            newid++;
        });
        return(
            <div key={data + id}>
                <div className="GS-note-section">
                    <span className="GS-note-title">{title}</span>
                    <span>{spanText}</span>
                </div>
            </div>
        );
    }

    renderMdTextBody = (data, id) => {
        let spanText = [];
        let newid = 0;
        data.forEach(elem => {
            if (elem.type === Token.Text) {
                spanText.push(elem.data);
            } else if (elem.type === Token.Url) {
                spanText.push(this.renderMdLink(elem, newid));
            } else {
                console.log('Statement not handled yet', elem);
            }
            newid++;
        });
        return(
            <div key={data + id}>
                <span>{spanText}</span>
            </div>
        );
    }

    renderMdLink = (data, id) => {
        return (
            <Link key={id * 2 + data} to={""} onClick={() => window.location.href = data.link}>{data.title}</Link>
        )
    }

    renderMiniMarkDown = () => {
        if (this.state.markdown.length === 0) {
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
        let Markdown = [];
        let id = 0
        console.log(this.state.markdown)
        this.state.markdown.forEach(elem => {
            switch (elem.type) {
                case Statement.SubTitle:
                    Markdown.push(this.renderMdSubTitle(elem.data, id));
                    break;
                case Statement.Title:
                    Markdown.push(this.renderMdTitle(elem.data, id));
                    break;
                case Statement.Terminal:
                    Markdown.push(this.renderMdTerminal(elem.data, id));
                    break;
                case Statement.ButtonWithDesc:
                    Markdown.push(this.renderMdButton(elem, id));
                    break;
                case Statement.ButtonWithoutDesc:
                    Markdown.push(this.renderMdButtonNoDesc(elem, id));
                    break;
                case Statement.SmallNote:
                    Markdown.push(this.renderMdSmallNote(elem.tokens, id));
                    break;
                case Statement.Note:
                    Markdown.push(this.renderMdNote(elem.tokens, elem.title, id));
                    break;
                case Statement.TextBody:
                    Markdown.push(this.renderMdTextBody(elem.tokens, id));
                    break;
                default:
                    console.log('Statement not handled yet', elem);
                    break;
            }
            id++;
        });
        return (
            <div className="GS-Content">
                {Markdown}
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
                    </div>
                    <div className="lib-page-form-title">Need help ?</div>
                    <span><Link to={"/mini-markdown-cheat-sheet"} target="_blank">Visit our MiniMarkdown guide</Link></span>
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
                    copyright : this.state.NewCopyright
                });
                if (this.state.NewDescription !== undefined && this.state.NewDescription !== null && this.state.NewDescription !== "")
                    this.setState({markdown : parseMarkdown(this.state.NewDescription)});
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
                                            {this.state.displayName}'s' information
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