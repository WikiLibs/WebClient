import React, { Component } from 'react';
import { ApiService } from '../../ApiService';
import { useQuery } from '../../util';
import Button from 'react-bootstrap/Button';
import queryString from 'query-string'
import { languages } from 'prismjs/components/prism-core';
import { Link } from 'react-router-dom';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import './style.css';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import UserInfoPopup from '../../Components/UserInfoPopup';
import SymbolPreview from '../../Components/SymbolPreview';
import SyntaxHighlighter from '../../Components/SyntaxHighlighter';
import ExampleEditor from './ExampleEditor';

const EDITOR_LNG_TBL = {
    "CPP": languages.clike,
    "JAVA": languages.clike,
    "C": languages.clike
};

//Give it the name NEVER ever the displayName
function getSyntaxHighlighterLanguage(langName) {
    if (langName in EDITOR_LNG_TBL)
        return EDITOR_LNG_TBL[langName];
    return languages.js;
}

export default class SymbolPage extends Component {
    api = new ApiService();

    constructor(props) {
        super(props);
        this.handleDescription = this.handleDescription.bind(this);
        this.state = {
            userId: null,
            date: null,
            lang: null,
            type: null,
            path: null,
            lastModificationDate: null,
            prototypes: [],
            symbols: [],
            code: "Write an example...", 
            description: "", 
            message: "" ,
            listExample: [],
            symbolId: 0,
            pseudoExample: "",
            mapIdPseudo: {},
            mapComments: {},
            comment: {},
            exampleId: 0,
            commentId: 0,
        };
    }

    handleSubmit = (data) => {
        var example = {
            "symbolId": this.state.symbolId,
            "code": data.code,
            "description": data.description
        };
        var request = {
            "message": data.message,
            "method": "POST",
            "data": {},
            "applyTo": null
        };
        request.data = example;

        if (this.props.user) {
            if (this.props.user.hasPermission("example.create")) {
                this.api.pushNewExample(example).catch(err => {
                    this.props.history.replace(this.props.history.pathname,{statusCode: err.response.status, errorObj: err.response.data});
                }).then(response => { 
                    //alert("Your example was sent, it's actually online");
                });
            } else {
                this.api.pushNewRequestExample(request).catch(err => {
                    this.props.history.replace(this.props.history.pathname,{statusCode: err.response.status, errorObj: err.response.data});
                }).then(response => {
                    //alert('Your example was sent, it will be check by an administrator');
                });
            }
        }
    }

    handleMessage = (event) => {
        this.setState({message: event.target.value});
    }

    handleDescription = (event) => {
        this.setState({description: event.target.value});
    }

    handleVote = (id, vote) => {
        this.api.vote(id, vote);
        let tmp = this.state.listExample

        tmp.forEach(elem => {
            if (elem.id === id) {
                vote === "upvote" ? elem.voteCount += 1 : elem.voteCount -= 1
                elem.hasVoted = true
            }
        })
        this.setState({listExample: tmp});
    }

    handleComment = (message, id) => {
        let tmp = this.state.comment;
        tmp[id] = message;
        this.setState({comment: tmp});
    }

    componentDidMount = async () => {
        var q = useQuery();
        const values = queryString.parse(this.props.location.search)
        let apiError = "";
        let isConnect = false;

        this.props.user === undefined ? isConnect = true : isConnect = false;
        var listExample = await this.api.getExamples(values.id, isConnect).catch(err => {
            this.props.history.replace(this.props.history.pathname,{statusCode: err.response.status, errorObj: err.response.data});
            apiError = this.api.translateErrorMessage(err);
        });

        if (apiError === "") {

            this.setState({symbolId: values.id});

            let mapIdPseudo = {};
            let mapComments = {};
            let comments = {};
            listExample.data.forEach(elem => {
                this.api.getUser(elem.userId).then(response => {mapIdPseudo[elem.userId] = response.data.pseudo});
                this.api.getComments(elem.id, 1).catch(err => {
                    this.props.history.replace(this.props.history.pathname,{statusCode: err.response.status, errorObj: err.response.data});
                }).then(response => {
                    mapComments[elem.id] = response.data
                    response.data.data.forEach(comment => {
                        this.api.getUser(comment.userId).then(resp => {mapComments[resp.id] = resp.data.pseudo})
                    })
                });
                comments[elem.id] = "";
            })

            this.setState({mapIdPseudo: mapIdPseudo});
            this.setState({listExample: listExample.data});
            this.setState({mapComments: mapComments});
            this.setState({comment: comments});

            this.api.getSymbolById(q.id).catch(err => {
                this.props.history.replace(this.props.history.pathname,{statusCode: err.response.status, errorObj: err});
            }).then(response => { this.setState(response.data); });
        }
    }

    getName = () => {
        var str = this.state.path;
        if (!str)
            return (null);
        var arr = str.split('/');
        if (arr.length <= 0)
            return (null);
        return (arr[arr.length - 1]);
    }

    getTypeSymbol = () => {
        var str = this.state.type;
        if (!str)
            return ("");
        return (str.displayName);
    }

    searchStringInParameters = (string, array) => {
        for (let i = 0; i < array.parameters.length; i++) {
            if (array.parameters[i].prototype === string)
                return true
        }
        return false
    }

    getDisplayPath() {
        if (!this.state.path)
            return ("");
        let upPath = this.state.path.substr(this.state.path.indexOf('/') + 1);
        return (this.state.lang.displayName + '/' + upPath);
    }

    getDateLastUpdate() {
        if (!this.state.lastModificationDate)
            return ("");
        return ((new Date(this.state.lastModificationDate)).toLocaleDateString());
    }

    renderTitle = () => {
        return (
            <div className='symbol-page-section-container symbol-page-section-title-container'>
                <div className='symbol-page-title'>
                    {this.getName()}
                </div>
                <div className='symbol-page-title'>
                    <div className='symbol-page-type-symbol-title'>
                        {this.getTypeSymbol()}
                    </div>
                </div>
                <div className='symbol-page-infos-path'>
                    {this.getDisplayPath()}
                </div>
                {
                    this.state.import &&
                    <div className='symbol-page-infos-path'>
                        {this.state.import}
                    </div>
                }
                <div className='symbol-page-infos-path'>
                    last updated: {this.getDateLastUpdate()}
                </div>
            </div>
        )
    }

    renderPrototype = (prototype) => {
        return (
            <div className='symbol-page-section-container'>
                <div className='symbol-page-title'>
                    Prototype
                </div>
                <SyntaxHighlighter  code={prototype.prototype} lang={this.state.lang}/>
            </div>
        )
    }

    renderDescription = (prototype) => {
        if (!prototype.description)
            return null
        return (
            <div className='symbol-page-section-container'>
                <div className='symbol-page-title'>
                    Description
                </div>
                <div className='symbol-page-description'>
                    {prototype.description}
                </div>
            </div>
        )
    }

    renderParameters = (prototype) => {
        if ((!this.searchStringInParameters('return', prototype) && prototype.parameters.length === 0) || (prototype.parameters[0].prototype === 'return' && prototype.parameters.length === 1))
            return null
        return (
            <div className='symbol-page-section-container'>
                <div className='symbol-page-title'>
                    Parameter(s)
                </div>
                <div className='symbol-page-parameters-container'>
                    {
                        prototype.parameters.map((parameter, index) =>
                            <div key={index}>
                                {parameter.prototype !== 'return'
                                    ? <div>
                                        <div className='symbol-page-parameter-name'>
                                            <SymbolPreview className='symbol-page-parameter-name'
                                                displayName={parameter.prototype}
                                                to={parameter.ref ? parameter.ref.id : false}
                                                lang={this.state.lang.name}
                                                prototype={parameter.ref && parameter.ref.firstPrototype ? parameter.ref.firstPrototype : ""}
                                                type={parameter.ref ? parameter.ref.type : false}
                                            />
                                        </div>
                                        {parameter.description !== "" ? <div className='symbol-page-parameter-description'>{parameter.description}</div> : ""}
                                    </div>
                                    : null
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }

    renderReturns = (prototype) => {
        if (!this.searchStringInParameters('return', prototype))
            return null
        return (
            <div className='symbol-page-section-container'>
                <div className='symbol-page-title'>
                    Return value(s)
                </div>
                <div className='symbol-page-parameters-container'>
                    {prototype.parameters.map((parameter, index) =>
                        <div key={index}>
                            {parameter.prototype === 'return'
                                ? <div>
                                    <div className='symbol-page-parameter-name'><SyntaxHighlighter  code={parameter.prototype} lang={this.state.lang}/></div>
                                    {parameter.description !== "" ? <div className='symbol-page-parameter-description'>{parameter.description}</div> : ""}
                                </div>
                                : null
                            }
                        </div>
                    )}
                </div>
            </div>
        )
    } 

    renderExceptions = (prototype) => {
        if (prototype.exceptions.length === 0)
            return null
        return (
            <div className='symbol-page-section-container'>
                <div className='symbol-page-title'>
                    Exception(s)
                </div>
                <div className='symbol-page-parameters-container'>
                    {prototype.exceptions.map((exception, index) =>
                        <div key={index * 2} className="symbol-page-inner-tooltip">
                            <div>
                                <SymbolPreview className='symbol-page-parameter-name'
                                    displayName={this.getPathDisplayName(exception.ref.path)}
                                    to={exception.ref ? exception.ref.id : false}
                                    lang={this.state.lang.name}
                                    prototype={exception.ref && exception.ref.firstPrototype ? exception.ref.firstPrototype : ""}
                                    type={exception.ref ? exception.ref.type : false}
                                />
                                <div className='symbol-page-parameter-description'>
                                    {exception.description}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    getSymbolArray(symbols) {
        var dict = {};
        symbols.forEach(e => {
            if (dict[e.type] === undefined)
                dict[e.type] = [];
            dict[e.type].push(e);
        });
        return dict;
    }

    getPathDisplayName(fullName) {
        var arr = fullName.split('/');
        if (arr.length <= 0)
            return (null);
        return (arr[arr.length - 1]);
    }

    renderMember = (symbols) => {
        if (symbols.length === 0)
            return null
        var html = [];
        var dict = this.getSymbolArray(symbols);
        for (const elem in dict) {
            if (dict.hasOwnProperty(elem)) {
                let innerHtml = [];
                const symbolsCluster = dict[elem];
                innerHtml.push(
                    <div key={elem} className='symbol-page-title'>{elem.charAt(0).toUpperCase() + elem.slice(1)}</div>
                );
                symbolsCluster.forEach(e => {
                    innerHtml.push(
                        <div key={e.id} className="symbol-page-parameters-container">
                            {/* <Link to={"/symbol?id=" + e.id} onClick={() => window.location.assign(window.location.origin + '/symbol?id=' + e.id)} className="symbol-page-parameter-name"><SyntaxHighlighter  code={e.firstPrototype} lang={this.state.lang.name}/></Link> */}
                            <SymbolPreview className='symbol-page-parameter-name'
                                displayName={this.getPathDisplayName(e.path)}
                                to={e.id}
                                lang={this.state.lang.name}
                                prototype={e.firstPrototype}
                                type={e.type}
                            />
                        </div>
                    )
                });
                html.push(
                    <div key={elem + dict[elem]} className="symbol-page-section-container">
                        {innerHtml}
                    </div>
                );
            }
        }
        return (
            <div>
                {html}
            </div>
        )
    }

    handleDelete = (event) => {
        event.preventDefault();
        this.api.destroyComment(this.state.commentId).catch(err => {
            this.props.history.replace(this.props.history.pathname,{statusCode: err.response.status, errorObj: err.response.data});
        }).then(response => { 
            //alert("Your comment is destroyed");
        });
        document.getElementById("comment-" + this.state.commentId).style.display = "none";
    }

    handleSubmitComment = (event) => {
        event.preventDefault();
        this.api.postComment(this.state.exampleId, this.state.comment[this.state.exampleId]).catch(err => {
            this.props.history.replace(this.props.history.pathname,{statusCode: err.response.status, errorObj: err.response.data});
        }).then(response => { 
            //alert("Your comment is sent, it's actually online");
        });
        let tmp = this.state.comment;
        tmp[this.state.exampleId] = "";
        this.setState({comment: tmp});
        //window.location.reload();
    }

    renderDeleteButton = (userId, commentId) => {
        if (this.props.user) {
            if (this.props.user.id === userId) {
                return (
                    <form onSubmit={this.handleDelete}>
                        <Button className="symbol-page-comment-delete" variant="outline-danger" type="submit" onClick={() => this.setState({commentId: commentId})}><DeleteIcon></DeleteIcon></Button>
                    </form>
                );
            }
        } else return;
    }

    renderComment = (id) => {
        let list = [];
        let comments = [];
        this.state.mapComments[id].data.forEach(elem => {
            if (elem.data !== "" && this.state.mapIdPseudo[elem.userId] !== undefined) {
                comments.push(
                    <div key={elem.id} id={"comment-" + elem.id}>
                        <hr className="symbol-page-spe-comment" />
                        <div className="symbol-page-comment-warp">
                            <div className="symbol-page-comment-data">
                                <span>
                                    {elem.data}
                                </span>
                                <div>
                                    <b><UserInfoPopup userName={this.state.mapIdPseudo[elem.userId]} userId={elem.userId} /></b> - <span>{(new Date(elem.creationDate)).toLocaleDateString()}</span>
                                </div>
                            </div>
                            {this.renderDeleteButton(elem.userId, elem.id)}
                        </div>
                    </div>
                )
            }
        })
        list.push(
            <div key={comments} id={"comment-holder-" + id}> {comments} </div>
        )
        return (
            <div className="symbol-page-comment-holder">
                {list}
                <hr className="symbol-page-spe-comment" />
                <form onSubmit={this.handleSubmitComment}>
                    {this.props.user ? 
                        <div className="symbol-page-new-comment">
                            <input type="text" placeholder="Add a comment..." value={this.state.comment[id]} onChange={(event) => this.handleComment(event.target.value, id)} />
                            {this.state.comment[id].length !== 0
                                ? <Button variant="outline-success" type="submit" onClick={() => this.setState({exampleId: id})}><SendIcon></SendIcon></Button>
                                : <Button disabled className="symbol-page-new-comment-disabled"><SendIcon></SendIcon></Button>
                            }
                        </div>:
                        <div className="symbol-page-connect">
                            <Link to='/login'>You should login to post comments</Link>
                        </div>
                    }
                </form>
            </div>
        );
    }

    renderVote = (vote, id, hasVoted) => {
        if (this.props.user && !hasVoted) {
                return (
                    <div className="symbol-page-vote-example">
                        <Button className="symbol-page-upvote" onClick={() => {this.handleVote(id, 'upvote')}}><KeyboardArrowUpIcon></KeyboardArrowUpIcon></Button>{/* disable button if not connected + class symbol-page-new-comment-disabled ||||| activate class symbol-page-vote-example-up or symbol-page-vote-example-down if already voted*/}
                        <div id="symbol-page-vote-value">{vote}</div>
                        <Button className="symbol-page-downvote" onClick={() => {this.handleVote(id, 'downvote')}}><KeyboardArrowDownIcon></KeyboardArrowDownIcon></Button>
                    </div>
                );
        } else return (
            <div className="symbol-page-vote-example">
                <Button className="symbol-page-new-comment-disabled" disabled><KeyboardArrowUpIcon></KeyboardArrowUpIcon></Button>{/* disable button if not connected + class symbol-page-new-comment-disabled ||||| activate class symbol-page-vote-example-up or symbol-page-vote-example-down if already voted*/}
                <div id="symbol-page-vote-value">{vote}</div>
                <Button className="symbol-page-new-comment-disabled" disabled><KeyboardArrowDownIcon></KeyboardArrowDownIcon></Button>
            </div>
        );
    }

    renderExample = () => {
        const examples = [];

        if (this.state.listExample.length !== 0) {
            this.state.listExample.forEach((elem, i) => {
                const lines = [];

                elem.code.forEach((elem2, i) => {
                    lines.push(
                        <span key={i} className="symbol-page-code-lines" title={elem2.comment}><SyntaxHighlighter  code={elem2.data} lang={this.state.lang}/></span>
                    );
                });
                examples.push(
                    <div key={elem.id}>
                        <div className="symbol-example-card">
                            <div className="symbol-example-fst-block-card">
                                {this.renderVote(elem.voteCount, elem.id, elem.hasVoted)}
                                <div className="symbol-page-inner-example">
                                    <div className="symbol-example-desc">
                                        {elem.description}
                                    </div>
                                    <div className={"symbol-page-code-example"}>
                                        {lines}
                                    </div>
                                    <div className='symbol-page-example-sign' key={elem.id + elem.userId + elem.creationDate}>
                                        Last modification : <b><UserInfoPopup userName={this.state.mapIdPseudo[elem.userId]} userId={elem.userId} /></b> - <b>{(new Date(elem.creationDate)).toLocaleDateString()}</b>
                                    </div>
                                </div>
                            </div>
                            <span className="symbol-page-comment-title">Comments</span>
                            {this.renderComment(elem.id)}
                        </div>
                        {(i !== this.state.listExample.length - 1) ? (<hr />) : ('')}
                    </div>
                );
            });
        } else {
            return (
                <center key="No-Example"><h3>There is no example for the moment, come back later</h3></center>
            );
        }
        return(
            <div>
                {examples}
            </div>
        );
    }

    renderUploadExample = () => {
        if (this.state.type) {
            return(
                <div id="accordion">
                    <div className="card">
                        <div className="card-header" id="headingOne">
                            <h5 className="mb-0">
                                <button className="symbol-page-title btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Examples
                                </button>
                            </h5>
                        </div>
                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                            <div className="symbol-card-body">
                                {this.renderExample()}
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingTwo">
                            <h5 className="mb-0">
                                <button className="symbol-page-title btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Create your own example
                                </button>
                            </h5>
                        </div>
                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                            <div className="symbol-card-body">
                                <ExampleEditor lang={getSyntaxHighlighterLanguage(this.state.lang.name)} user={this.props.user} handleSubmit={this.handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    render = () => {
        return (
            <div className='symbol-page-container'>
                {this.renderTitle()}
                <div>
                    {
                        this.state.prototypes.map((prototype, index) =>
                            <div key={index}>
                                {this.renderPrototype(prototype)}
                                {this.renderDescription(prototype)}
                                {this.renderParameters(prototype)}
                                {this.renderReturns(prototype)}
                                {this.renderExceptions(prototype)}
                                {
                                    (index !== (this.state.prototypes.length - 1))
                                    ? <hr />
                                    : null
                                }
                            </div>
                        )
                    }
                    {this.renderMember(this.state.symbols)}
                </div>
                <div>
                    {this.renderUploadExample()}
                </div>
            </div>
        )
    }
}
