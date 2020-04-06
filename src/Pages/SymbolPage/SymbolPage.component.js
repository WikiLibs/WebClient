import React, { Component } from 'react';
import ApiService from '../../ApiService';
import { useQuery } from '../../util';
import { protoToHtml } from '../../protoParser';

import './style.css';

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
            symbols: []
        };
    }

    componentDidMount = () => {
        var q = useQuery();
        if (q.path)
            this.api.getSymbolByPath(q.path).then(response => { this.setState(response.data); });
        else if (q.id)
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
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}
