import React, { Component } from 'react';
import ApiService from '../../ApiService';
import Button from '@material-ui/core/Button'

import './style.css'

export default class Search extends Component {
    api = new ApiService();

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            hasMorePages: false,
            page: 1,
            symbols: {}
        };
    }


    componentDidMount = () => {
        this.refrehData();
    }

    refrehData = () => {
        this.api.searchSymbols(this.props.match.params.path, this.state.page).then(response => {
            this.sortResultsIntoList(response.data)
        });
    }

    handleNext = () => {
        this.setState({'page': this.state.page + 1})
        this.refrehData();
    }

    handlePrev = () => {
        this.setState({'page': this.state.page - 1})
        this.refrehData();
    }

    sortResultsIntoList = (data) => {
        let symbolsTemp = data.data
        let symbolsState = this.state.symbols

        symbolsTemp.forEach((sym) => {
            if (!(sym.type in symbolsState))
                symbolsState[sym.type] = []
            symbolsState[sym.type].push(sym)
        })

        this.setState({
            'symbols': symbolsState,
            'hasMorePages': data.hasMorePages
        })
    }

    renderFooter = () => {
        if (Object.keys(this.state.symbols).length === 0)
            return;
        if (!this.state.hasMorePages && this.page > 1)
            return (
                <Button variant="contained" onClick={this.handlePrev} classes={{root: 'button-style', label:'button-style'}}>
                    Previous page
                </Button>
            )
        if (this.page > 1)
            return (
                <div>
                    <Button variant="contained" onClick={this.handlePrev} classes={{root: 'button-style', label:'button-style'}}>
                        Previous page
                    </Button>
                    <Button variant="contained" onClick={this.handleNext} classes={{root: 'button-style', label:'button-style'}}>
                        Next page
                    </Button>
                </div>
            )
        else
            return (
                <Button variant="contained" onClick={this.handleNext} classes={{root: 'button-style', label:'button-style'}}>
                    Next page
                </Button>
            )
    }

    renderSymbolList = () => {
        return (
            <div>
                {Object.keys(this.state.symbols).map((key) =>
                    <div className='search-page-results-container'>
                        <div className='search-page-title'>
                            {key[0].toUpperCase() + key.slice(1)}
                            <span className='search-page-title-number'>{this.state.symbols[key].length} result(s)</span>
                        </div>
                        {this.state.symbols[key].map((symbol) =>
                            <a className='override-a' href={'/symbol/' + symbol.id}>
                                <div className='search-page-result-container'>
                                    <div className='search-page-result-title'>
                                        {symbol.path}
                                    </div>
                                    <div className='search-page-result-description'>
                                        Description unavailable yet.
                                    </div>
                                    <div className='search-page-separator'/>
                                    <div className='search-page-result-bottom-container'>
                                        <div>Last update : {(new Date(symbol.lastModificationDate)).toLocaleDateString} (by: {symbol.userName})</div>
                                        <div>Viewed {symbol.views} times(s)</div>
                                    </div>
                                </div>
                            </a>
                        )}
                    </div>
                )}
            </div>
        )
    }

    render = () => {
        return (
            <div className='search-page-container'>
                <div className='search-page-title'>
                    Results for : '{this.props.match.params.path}'
                </div>
                {this.renderSymbolList()}
                {this.renderFooter()}
            </div>
        );
    }
}
