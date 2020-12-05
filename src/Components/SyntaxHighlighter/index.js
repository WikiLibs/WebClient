import React, { Component } from 'react';
import {default as SH} from 'react-syntax-highlighter';

import './style.css'
import {docco} from "react-syntax-highlighter/dist/cjs/styles/hljs";

const LNG_TBL = {
    "PYTHON3": "js",
    "PYTHON2": "js",
    "CPP": "clike",
    "JAVA": "clike",
    "C": "clike"
};

//Give it the name NEVER ever the displayName
function getSyntaxHighlighterLanguage(langName) {
    if (langName in LNG_TBL)
        return LNG_TBL[langName];
    return langName.toLowerCase();
}

export default class SyntaxHighlighter extends Component {
    render() {
        let code = ""
        let simple = false;
        if (typeof(this.props.code) == "string") {
            code = this.props.code;
            simple = true;
        } else {
            this.props.code.forEach(elem => {
                code += elem.data + "\n";
            });
            code = code.substring(0, code.length - 1);
        }
        let lang = "javascript";
        if (this.props.lang) {
            if (typeof(this.props.lang) == "string")
                lang = getSyntaxHighlighterLanguage(this.props.lang);
            else
                lang = getSyntaxHighlighterLanguage(this.props.lang.name);
        }
        if (simple) {
            return (
                <SH
                    className={"code-block " + (this.props.className ? this.props.className : "")}
                    language={lang}
                    style={docco}
                >
                    {code}
                </SH>
            )
        } else {
            return (
                <SH
                    className={"code-block " + (this.props.className ? this.props.className : "")}
                    language={lang}
                    style={docco}
                    wrapLines={true}
                    lineProps={(lineId) => {
                        if (lineId >= this.props.code.length) {
                            console.warn("react-syntax-highlighter has fucked up (lineId is defective), attempting bypass...")
                            lineId -= 1;
                            if (lineId >= this.props.code.length) {
                                console.error("Bypass has failed; skipping comment block")
                                return {};
                            }
                        }
                        const block = this.props.code[lineId];
                        return {title: block.comment};
                    }}
                    showLineNumbers
                >
                    {code}
                </SH>
            )
        }
    }
}
