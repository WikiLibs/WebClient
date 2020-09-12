import React, { Component } from 'react';
import { ApiService } from '../../ApiService';
import Button from '@material-ui/core/Button';
import { useQuery } from '../../util';
import Dropdown from 'react-dropdown';

import './style.css'

export default class SearchPage extends Component {
    api = new ApiService();

    state = {
        data: null,
        hasMorePages: false,
        page: 1,
        symbols: {},
        key: "ID#",
        langs: [],
        langsNames: [],
        types: [],
        libMap: null,
        results: [],
        langMap: {},
        libFlag: -1,
        langFlag: -1,
        typeFlag: -1,
        search: null,
        pageName: "Unknown"
    };

    defaultOption = this.state.langsNames[0];
    defaultValue = "Select a language";

    initDropdown = ({ value }) => {
        if (value === "All") {
            this.setState({ langFlag: -1 });
            this.defaultValue = "All"
            this.setState({ symbols: {}, 'page': 1 }, () => this.refrehData());
        } else {
            this.state.langs.forEach(elem => {
                if (value === elem.displayName) {
                    this.setState({ langFlag: elem.id });
                    this.defaultValue = elem.displayName;
                    this.setState({ symbols: {}, 'page': 1 }, () => this.refrehData());
                }
            });
        }
    }

    refrehData = () => {
        var q = useQuery();
        let query = {
            page: this.state.page,
            count: 10,
            lib: this.state.libFlag === -1 ? null : this.state.libFlag,
            lang: this.state.langFlag === -1 ? null : this.state.langFlag,
            type: this.state.typeFlag === -1 ? null : this.state.typeFlag,
            path: this.state.search
        };
        if (q.lib) {
            this.setState({ search: null, pageName: q.name });
            query.lib = parseInt(q.lib);
        } else if (q.path) {
            this.setState({ search: q.path, pageName: q.path });
            query.path = q.path;
        }
        this.api.searchSymbols(query).then(response => {
            this.sortResultsIntoList(response.data);
        });
    }

    handleNext = () => {
        this.setState({ symbols: {}, 'page': this.state.page + 1 }, () => this.refrehData());
    }

    handlePrev = () => {
        this.setState({ symbols: {}, 'page': this.state.page - 1 }, () => this.refrehData());
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
            symbols: symbolsState,
            hasMorePages: data.hasMorePages
        })
    }

    renderFooter = () => {
        if (Object.keys(this.state.symbols).length === 0 || (!this.state.hasMorePages && this.state.page === 1))
            return;
        if (!this.state.hasMorePages && this.state.page > 1)
            return (
                <Button variant="contained" className="search-page-previous" onClick={this.handlePrev} classes={{ root: 'button-style', label: 'button-style' }}>
                    Previous page
                </Button>
            )
        if (this.state.page > 1)
            return (
                <div>
                    <Button variant="contained" className="search-page-previous" onClick={this.handlePrev} classes={{ root: 'button-style', label: 'button-style' }}>
                        Previous page
                    </Button>
                    <Button variant="contained" className="search-page-next" onClick={this.handleNext} classes={{ root: 'button-style', label: 'button-style' }}>
                        Next page
                    </Button>
                </div>
            )
        else
            return (
                <Button variant="contained" className="search-page-next" onClick={this.handleNext} classes={{ root: 'button-style', label: 'button-style' }}>
                    Next page
                </Button>
            )
    }

    getDisplayPath(sym) {
        let upPath = sym.path.substr(sym.path.indexOf('/') + 1);
        return (sym.langName + '/' + upPath);
    }

    renderSymbolList = () => {
        return (
            <div>
                {
                    Object.keys(this.state.symbols).map((key) =>
                        <div key={this.state.key + key} className='search-page-results-container'>
                            <div className='search-page-title'>
                                {key[0].toUpperCase() + key.slice(1)}
                                <span className='search-page-title-number'>{this.state.symbols[key].length} result(s)</span>
                            </div>
                            {
                                this.state.symbols[key].map((symbol) =>
                                    <a className='search-page-result-container override-a' key={symbol.id} href={'/symbol?id=' + symbol.id}>
                                        
                                            <div className='search-page-result-title'>
                                                {this.getDisplayPath(symbol)}
                                            </div>
                                        {/* <div className='search-page-card-title'>
                                            <div className='search-page-preview-symbol'>
                                                
                                            </div>
                                        </div> */}
                                        <div className='search-page-result-description'>
                                            Description unavailable yet.
                                        </div>
                                        <div className='search-page-separator' />
                                        <div className='search-page-result-bottom-container'>
                                            <div>Last update : {(new Date(symbol.lastModificationDate)).toLocaleDateString()} (by: {symbol.userName})</div>
                                            <div>Viewed {symbol.views} times(s)</div>
                                        </div>
                                    </a>
                                )
                            }
                        </div>
                    )
                }
            </div>
        )
    }

    render = () => {
        return (
            <div className='search-page-container'>
                <div className='search-page-title'>
                    Results for : '{useQuery().lib ? useQuery().name : useQuery().path}'
                    <Dropdown className="search-page-dropdown" options={this.state.langsNames} onChange={this.initDropdown} value={this.defaultOption} placeholder={this.defaultValue} />
                </div>
                {this.renderSymbolList()}
                {this.renderFooter()}
            </div>
        );
    }

    componentDidMount = async () => {
        await this.api.getLangLibTable().then(langs => {
            let map = {};
            let tab = [];
            tab[0] = "All";
            map[-1] = [];
            langs.forEach(elem => {
                map[elem.id] = elem.libs;
                tab.push(elem.displayName);
            });
            this.setState({ langs: langs, libMap: map, langsNames: tab });
        });
        await this.api.getSymTypes().then(types => this.setState({ types: types }));
        this.refrehData();
    }
}
