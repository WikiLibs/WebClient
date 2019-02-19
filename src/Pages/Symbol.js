import axios from 'axios';
import React, { Component } from 'react';

class SymbolPage extends Component {
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
    getName() {
        var str = this.state.path;
        if (str == null)
            return (null);
        var arr = str.split('/');
        if (arr.length <= 0)
            return (null);
        return (arr[arr.length - 1] + " (" + this.state.type + ")");
    }
    renderParameters(proto) {
        var vals = []

        for (var v in proto.parameters) {
            var param = proto.parameters[v];
            vals.push(
                <div key={v} className='row'>
                    <div className='col-2 black'><span className='front'>{param.prototype}</span></div>
                    <div className='col-6 black'>{param.description}</div>
                </div>
            );
        }
        return (vals);
    }
    renderPrototypes() {
        var vals = []
        for (var v in this.state.prototypes) {
            var proto = this.state.prototypes[v]
            vals.push(
                <div key={v}>
                    <div className="container">
                        <h2 className='header2'>Prototype</h2>
                        <div className='paddingWell'>
                            <div className="card card-inverse paddingCard cardbackgroundcolor">
                                <div className="card-block">
                                    <p className="card-text black p-font">{proto.prototype}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='container' >
                        <h2 className='header2'>Description</h2>
                        <div className='paddingWell'>
                            <div className='card borderless'>
                                <div className='black'>{proto.description}</div>
                            </div>
                        </div>
                    </div>

                    <div className='container' >
                        <h2 className='header2'>Parameters</h2>
                        <div className='paddingWell'>
                            <div className='card borderless'>
                                {this.renderParameters(proto)}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        return (vals);
    }
    renderSymListInner() {
        var vals = []
        for (var v in this.state.symbols) {
            vals.push(
                <div key={v} className='paddingWell'>
                    <div className="card card-inverse paddingCard" style={{ backgroundColor: 'lightgray', borderColor: 'lightgrey' }}>
                        <div className="card-block">
                            <a href={"/symbol/" + this.state.symbols[v]}><p className="card-text black"><span className='func'>{this.state.symbols[v]}</span></p></a>
                        </div>
                    </div>
                </div>
            );
        }
        return (vals);
    }
    renderSymList() {
        return (
            <div className="container">
                <h2 className='header2'>Referenced symbols</h2>
                {this.renderSymListInner()}
            </div>
        );
    }
    renderPrototypesOrSyms() {
        if (this.state.symbols.length > 0)
            return (this.renderSymList());
        else
            return (this.renderPrototypes());
    }
    render() {
        return (
            <div>
                <div className='container' >
                    <h1 className='header1'>{this.getName()}</h1>
                    <p className='minor'>({this.state.path})</p>
                </div>

                {this.renderPrototypesOrSyms()}
            </div>
        );
    }
    componentDidMount() {
        axios.get('/api/symbol/' + this.props.match.params.sympath, {
            'headers': {
                'Authorization': '7ad19ee2-db3f-4d1f-95d1-58311c3caf11'
            }
        }).then(response => { this.setState(response.data); });
    }
}

export default SymbolPage;
