import React, { Component } from 'react';
import { ApiService } from '../../ApiService';
import { useQuery } from '../../util';
import { protoToHtml } from '../../protoParser';
import Editor from 'react-simple-code-editor';
import Button from 'react-bootstrap/Button';
import queryString from 'query-string'
import { highlight, languages } from 'prismjs/components/prism-core';
import { Link } from 'react-router-dom';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import Prism from 'prismjs';
import './style.css';
import DeleteIcon from '@material-ui/icons/Delete';
import SendIcon from '@material-ui/icons/Send';

import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

function cleanArray(arrayToClean) {
    var clean = [];
    arrayToClean.forEach(function (elem,index) {
        elem = elem.trim()
        if (elem[0] === '/') {
            clean.push(index)
        }
    })
    var i = 0
    clean.forEach(elem => {
        arrayToClean.splice(elem - i, 1);
        i += 1
    })
    return arrayToClean;
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
            comment: "",
            exampleId: 0,
            commentId: 0,
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        var splitExample = this.state.code.split("\n");
        var example = {
            "symbolId": this.state.symbolId,
            "code": [],
            "description": this.state.description,
          }
        var request = {
            "message": this.state.message,
            "method": "POST",
            "data": {},
            "applyTo": null
        }
        var cleanLines = cleanArray(splitExample);

        cleanLines.forEach(elem => {
            var first = true;
            var tabSplit = elem.split("//");
            var cleanElem = tabSplit.filter(n => n);
            var final = {
                "data":"",
                "comment":""
            };
            cleanElem.forEach(elem2 => {
                if (first) {
                    final.data = elem2.replace(/\s+/g,' ').trim();
                    first = false;
                } else {
                    final.comment += elem2.replace(/\s+/g,' ').trim().replace('/','');
                }
            });
            if (final.data.length === 0){
                final.data = ".";
            }
            example.code.push(final);
        });
        request.data = example;

        if (this.props.user) {
            if (this.props.user.hasPermission("example.create")) {
                this.api.pushNewExample(example).then(response => { 
                    //alert("Your example was sent, it's actually online");
                });
            } else {
                this.api.pushNewRequestExample(request).then(response => {
                    //alert('Your example was sent, it will be check by an administrator');
                });
            }
        }

        this.setState({
            code: "Write an example...", 
            description: "",
            message: ""
        });
    }

    handleMessage = (event) => {
        this.setState({message: event.target.value});
    }

    handleDescription = (event) => {
        this.setState({description: event.target.value});
    }

    handleComment = (event) => {
        this.setState({comment: event.target.value});
    }

    componentDidMount = async () => {
        var q = useQuery();
        const values = queryString.parse(this.props.location.search)
        var listExample = await this.api.getExamples(values.id)
        this.setState({symbolId: values.id});

        let mapIdPseudo = {};
        let mapComments = {};
        listExample.data.forEach(elem => {
            this.api.getUser(elem.userId).then(response => {mapIdPseudo[elem.userId] = response.data.pseudo});
            this.api.getComments(elem.id, 1).then(response => {mapComments[elem.id] = response.data});
        })

        this.setState({mapIdPseudo: mapIdPseudo});
        this.setState({listExample: listExample.data});
        this.setState({mapComments: mapComments});

        this.api.getSymbolById(q.id).then(response => { this.setState(response.data); });
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

    renderTitle = () => {
        return (
            <div className='symbol-page-section-container'>
                <div className='symbol-page-title'>
                    {this.getName()}
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
            </div>
        )
    }

    renderPrototype = (prototype) => {
        return (
            <div className='symbol-page-section-container'>
                <div className='symbol-page-title'>
                    Prototype
                </div>
                <div className='symbol-page-code-container'>
                    <div dangerouslySetInnerHTML={{ __html: protoToHtml(prototype.prototype) }} />
                </div>
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
        if (!this.searchStringInParameters('return', prototype) && prototype.parameters.length === 0)
            return null
        return (
            <div className='symbol-page-section-container'>
                <div className='symbol-page-title'>
                    Parameters
                </div>
                <div className='symbol-page-parameters-container'>
                    {
                        prototype.parameters.map((parameter, index) =>
                            <div key={index}>
                                {parameter.prototype !== 'return'
                                    ? <div>
                                        <div className='symbol-page-parameter-name'>
                                            {parameter.prototype}
                                        </div>
                                        <div className='symbol-page-parameter-description'>
                                            {parameter.description}
                                        </div>
                                    </div>
                                    : null
                                }
                                {(index !== (prototype.parameters.length - 1) &&
                                    index !== 0 &&
                                    parameter.prototype !== 'return')
                                    ? <div className='symbol-page-separator'></div>
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
                                    <div className='symbol-page-parameter-name'>
                                        {parameter.prototype}
                                    </div>
                                    <div className='symbol-page-parameter-description'>
                                        {parameter.description}
                                    </div>
                                </div>
                                : null
                            }
                            {(index !== (prototype.parameters.length - 1) &&
                                index !== 0 &&
                                parameter.prototype === 'return')
                                ? <div className='symbol-page-separator'></div>
                                : null
                            }
                        </div>
                    )}
                </div>
            </div>
        )
    } 

    handleDelete = (event) => {
        event.preventDefault();
        this.api.destroyComment(this.state.commentId).then(response => { 
            //alert("Your comment is destroyed");
        });
        document.getElementById("comment-" + this.state.commentId).style.display = "none";
    }

    handleSubmitComment = (event) => {
        event.preventDefault();
        this.api.postComment(this.state.exampleId, this.state.comment).then(response => { 
            //alert("Your comment is sent, it's actually online");
        });
        this.setState({comment: ""});
        window.location.reload();
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
            comments.push(
                <div key={elem.id} id={"comment-" + elem.id}>
                    <hr className="symbol-page-spe-comment"></hr>
                    <div className="symbol-page-comment-warp">
                        <div className="symbol-page-comment-data">
                            {elem.data} – <b>{this.state.mapIdPseudo[elem.userId]}</b> <span>{(new Date(elem.creationDate)).toLocaleDateString()}</span>
                        </div>
                        {this.renderDeleteButton(elem.userId, elem.id)}
                    </div>
                </div>

            )
        })
        list.push(
            <div key={comments} id={"comment-holder-" + id}> {comments} </div>
        )
        return (
            <div className="symbol-page-comment-holder">
                {list}
                <hr className="symbol-page-spe-comment"></hr>
                <form onSubmit={this.handleSubmitComment}>
                    {this.props.user ? 
                        <div className="symbol-page-new-comment">
                            <input type="text" placeholder="Add a comment..." value={this.state.comment} onChange={this.handleComment} />
                            <Button variant="outline-success" type="submit" onClick={() => this.setState({exampleId: id})}><SendIcon></SendIcon></Button>
                        </div>:
                        <div className="symbol-page-connect">
                            <Link to='/userconnection'>You need to be connected to write a comment</Link>
                        </div>
                    }
                </form>
            </div>
        );
    }

    renderExample = () => {
        var footer = [];
        var lines = [];
        var examples = [];
        var description = [];
        var i = 0;
        // var active = " active";
        const window = (new JSDOM('')).window
        const DOMPurify = createDOMPurify(window)

        if (this.state.listExample.length !== 0) {
            this.state.listExample.forEach(elem => {
                
                elem.code.forEach(elem2 => {
                    const html = Prism.highlight(elem2.data, Prism.languages.javascript, 'javascript');
                    lines.push(
                        <span key={elem2.data + elem2.id}>
                            { <span title={elem2.comment} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} /> }
                        </span>
                    );
                    lines.push(<br key={elem.id + elem2.data + elem.id} />);
                });
                description.push(
                    <div>
                       {elem.description}
                    </div>
                )
                footer.push(
                    <div className='symbol-page-example-sign' key={elem.id + elem.userId + elem.creationDate}>
                        This example was published by <b>{this.state.mapIdPseudo[elem.userId]}</b> on the <b>{(new Date(elem.creationDate)).toLocaleDateString()}</b>
                    </div>
                );
                examples.push(
                    <div>
                        <div className="symbol-example-card" key={elem.id}>
                            <div className="symbol-exemple-desc">
                                {description}
                            </div>
                            <div className={"symbol-page-code-example"}>
                                {lines}
                            </div>
                            {footer}
                            {this.renderComment(elem.id)}
                        </div>
                        {(i !== this.state.listExample.length - 1) ? (<hr></hr>) : ('')}
                    </div>
                );
                // active = "";
                lines = [];
                footer = [];
                description = [];
                i++;
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

    renderBox = () => {
        if (!this.props.user) {
            return (<div></div>);
        } else if (this.props.user.hasPermission("example.create")) {
            return (
                <div className="symbol-page-example-form">
                    <div>
                        <p>You're an administrator so your example will be push without any verification</p>
                        <input type="text" placeholder="Description" value={this.state.description} onChange={this.handleDescription} />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="symbol-page-example-form">
                    <div>
                        <p>The message will be for the administrator who will check your example</p>
                        <input type="text" placeholder="Message" value={this.state.message} onChange={this.handleMessage} />                    
                    </div>
                    <div>
                        <p>The description will be for users who will read your example</p>
                        <input type="text" placeholder="Description" value={this.state.description} onChange={this.handleDescription} />
                    </div>
                    <div>
                        <p>You can push your own example here. It will be check by our team and validate in 2 days maximum</p>
                        <p>You can write your code and if you want to add some comments for help the community you can add them after a "//"</p>
                    </div>
                </div>
            );
        }
    }

    renderUpload = () => {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {this.renderBox()}
                    <div className="symbol-page-code-example">
                        <Editor
                            value={this.state.code}
                            onValueChange={code => this.setState({code})}
                            highlight={code => highlight(code, languages.js)}
                            padding={10}
                            style={{
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                            fontSize: 12,
                            }}
                        />
                    </div>

                    {this.props.user ? 
                        <Button className="symbol-page-send-example" variant="outline-success" type="submit">Send</Button>: 
                        <div className="symbol-page-connect">
                            <Link to='/userconnection'>You need to be connected to write an example</Link>
                        </div>
                    }
                </form>
            </div>
        );
    }

    renderUploadExample = () => {
        if (this.state.type) {
            if (this.state.type.name === "function") {
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
                                {this.renderUpload()}
                            </div>
                            </div>
                        </div>
                    </div>
                )
            }
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
                                {this.renderUploadExample()}
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}
