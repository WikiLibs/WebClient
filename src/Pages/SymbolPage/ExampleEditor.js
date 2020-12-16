import React, { Component } from 'react';
import { highlight } from 'prismjs/components/prism-core';
import Editor from 'react-simple-code-editor';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default class ExampleEditor extends Component {
    state = {
        description: "",
        message: "",
        code: "Write an example..."
    }

    renderBox = () => {
        if (!this.props.user) {
            return (<div></div>);
        } else if (this.props.user.hasPermission("example.create")) {
            return (
                <div className="symbol-page-example-form">
                    <div>
                        <p>You're an administrator so your example will be push without any verification</p>
                        <input type="text" placeholder="Description" value={this.state.description} onChange={(e) => this.setState({description: e.target.value})} />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="symbol-page-example-form">
                    <div>
                        <p>The message will be for the administrator who will check your example</p>
                        <input type="text" placeholder="Message" value={this.state.message} onChange={(e) => this.setState({message: e.target.value})} />
                    </div>
                    <div>
                        <p>The description will be for users who will read your example</p>
                        <input type="text" placeholder="Description" value={this.state.description} onChange={(e) => this.setState({description: e.target.value})} />
                    </div>
                    <div>
                        <p>You can push your own example here. It will be check by our team and validate in 2 days maximum</p>
                        <p>You can write your code and if you want to add some comments for help the community you can add them after a "//"</p>
                    </div>
                </div>
            );
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const splitExample = this.state.code.split("\n");
        const code = [];
        splitExample.forEach(elem => {
            var first = true;
            if (elem.trim().startsWith("//")) {
                code.push({
                    "data": elem.trim(),
                    "comment": ""
                });
                return;
            }
            var tabSplit = elem.split("//");
            var cleanElem = tabSplit.filter(n => n);
            var final = {
                "data": "",
                "comment": ""
            };
            cleanElem.forEach(elem2 => {
                if (first) {
                    final.data = elem2.trimEnd();
                    first = false;
                } else {
                    final.comment += elem2.replace(/\s+/g,' ').trim();
                }
            });
            code.push(final);
        });
        const data = {
            code: code,
            description: this.state.description,
            message: this.state.message
        }
        this.props.handleSubmit(data);
        this.setState({
            code: "Write an example...",
            description: "",
            message: ""
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {
                    this.props.user ? 
                        <>
                            {this.renderBox()}
                            <div className="symbol-page-code-example">
                                <Editor
                                    value={this.state.code}
                                    onValueChange={code => this.setState({code})}
                                    highlight={code => highlight(code, this.props.lang)}
                                    padding={10}
                                    style={{
                                        fontFamily: '"Fira code", "Fira Mono", monospace',
                                        fontSize: 12,
                                    }}
                                />
                            </div>
                            <Button className="symbol-page-send-example" variant="outline-success" type="submit">Send</Button>
                        </>
                        :
                        <div className="symbol-page-connect">
                            <Link to='/login'>You should login to post examples</Link>
                        </div>
                }
            </form>
        )
    }
}
