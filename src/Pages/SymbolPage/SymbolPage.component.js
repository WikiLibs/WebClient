import React, { Component } from 'react';
import { ApiService } from '../../ApiService';
import { useQuery } from '../../util';
import { protoToHtml } from '../../protoParser';
import Editor from 'react-simple-code-editor';
import Button from 'react-bootstrap/Button';
import queryString from 'query-string'
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';


import './style.css';


// const temp = `int main() { // name of the function
//     int i, j = 0, 10; //init vars
//     while (i != j) {//condition in loop
//       printf("Yoooosh")//print the result each loop
//       i++;//incremental
//     }
//   }`

export default class SymbolPage extends Component {
    api = new ApiService();

    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            date: null,
            lang: null,
            type: null,
            path: null,
            prototypes: [],
            symbols: [],
            code: "Write an example...",
            listExample: [],
            symbolId: 0
        };
    }

    HandleExample = () => {
        var splitExample = this.state.code.split("\n");
        var example = {
            "symbolId": this.state.symbolId,
            "code": [],
            "description": "test"
          }
        
        splitExample.forEach(elem => {
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
                    final.comment += elem2.replace(/\s+/g,' ').trim();
                }
            });
            example.code.push(final);
        });

        this.api.pushNewExample(example).then(response => { console.log(response)});

        this.setState({code: "Write an example..."})
    }

    componentDidMount = async () => {
        var q = useQuery();
        const values = queryString.parse(this.props.location.search)
        var listExample = await this.api.getExamples(values.id)
        this.setState({symbolId: values.id});

        this.setState({listExample: listExample.data});
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

    renderExample = () => {
        var footer = [];
        var lines = [];
        var examples = [];
        var active = " active";

        if (this.state.listExample.length !== 0) {
            this.state.listExample.forEach(elem => {
                elem.code.forEach(elem2 => {
                    lines.push(
                        <center title={elem2.comment} key={elem2.data} className="center" >{elem2.data}</center>
                    );
                    lines.push(<br key={elem2.data + elem.id} />);
                });
                examples.push(
                    <div className={"carousel-item" + active} key={elem.id} >
                        {lines}
                    </div>
                );
                if (active.length > 1) {
                    footer.push(
                        <p key={elem.id + elem.creationDate} >This example was pushed by {elem.userId} the {elem.creationDate}</p>
                    );
                }
                active = "";
                lines = [];
            });
        } else {
            return (
                <center key="No-Example"><h3>There is no example for the moment, come back later</h3></center>
            );
        }
        return(
        <div>
            <div id="carouselExampleControls" className="carousel slide container_editor_area" data-ride="carousel">
                <div className="carousel-inner">
                    {examples}
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            {footer}
        </div>
        );
    }

    renderUpload = () => {
        return (
            <div>
                <p>You can push your own example here. It will be check by our team and validate in 2 days maximum</p>
                <p>You can write your code and if you want to add some comments for help the community you can add them after a "//"</p>
                <div className="container_editor_area">
                    <Editor
                        value={this.state.code}
                        onValueChange={code => this.setState({ code })}
                        highlight={code => highlight(code, languages.js)}
                        padding={10}
                        style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                        }}
                    />
                </div>
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
                                <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Examples
                                </button>
                            </h5>
                            </div>
                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                            <div className="card-body">
                                {this.renderExample()}
                            </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header" id="headingTwo">
                            <h5 className="mb-0">
                                <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Create your own example
                                </button>
                            </h5>
                            </div>
                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                            <div className="card-body">
                                {this.renderUpload()}
                                <Button variant="outline-success" onClick={this.HandleExample}>Send</Button>{' '}
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
