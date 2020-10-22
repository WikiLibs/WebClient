import React, { Component } from 'react';
import { ApiService } from '../../ApiService';

import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import { Typography, Button } from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

import './index.css'
import 'react-dropdown/style.css';

import AccountButton from './AccountButton';

var suggestions = [];
var suggestionsId = [];

function sendToSymbolPage(query) {
    if (query.id !== -1) {
        window.location = query.url + query.id;    
    } else {
        var i = 0
        suggestions.forEach(elem => {
            if (elem === query.path) {
                window.location = "/symbol?id=" + suggestionsId[i];
                return;
            }
            i += 1;
        });
    }
    if (i === suggestions.length) {
        window.location = query.url + query.path;
    }
}

function onSuggestionSelected(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) {
    let query = {url:"/symbol?id=", id: suggestionsId[suggestionIndex], path:""}
    sendToSymbolPage(query);
}

function renderInputComponent(inputProps) {
    const { classes, inputRef = () => { }, ref, ...other } = inputProps;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: node => {
                    ref(node);
                    inputRef(node);
                },
                classes: {
                    input: classes.input,
                },
            }}
            {...other}
        />
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion, query);
    const parts = parse(suggestion, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map((part, index) =>
                    part.highlight ? (
                        <span key={String(index)} style={{ fontWeight: 500 }}>
                            {part.text}
                        </span>
                    ) : (
                            <strong key={String(index)} style={{ fontWeight: 300 }}>
                                {part.text}
                            </strong>
                        ),
                )}
            </div>
        </MenuItem>
    );
}

function getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const keep =
                count < 5

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

function getSuggestionValue(suggestion) {
    return suggestion;
}

const styles = theme => ({
    root: {
        height: 40,
        flexGrow: 1,
        marginTop: 6,
    },
    container: {
        position: 'relative',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(),
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    divider: {
        height: theme.spacing(2),
    },
});

class Header extends Component {
    api = new ApiService();

    state = {
        single: '',
        popper: '',
        suggestions: [],
        langs: [],
        types: [],
        libMap: null,
        results: [],
        langMap: {},
        libFlag: -1,
        langFlag: -1,
        typeFlag: "TYPE_NULL",
        search: ""
    };

    ///////////////////////////////////////////////////////////

    handleSuggestionsFetchRequested = async ({ value }) => {
        this.state.search = value;
        suggestions = [];
        suggestionsId = [];

        let query = {
            page: 1,
            count: 5,
            lib: this.state.libFlag === -1 ? null : this.state.libFlag,
            lang: this.state.langFlag === -1 ? null : this.state.langFlag,
            type: this.state.typeFlag === "TYPE_NULL" ? null : this.state.typeFlag,
            path: this.state.search
        };

        var result = await this.api.searchSymbols(query);
        for (var id in result.data.data) {
            if (suggestions.length === 5) { 
                suggestions = []; 
            }
            suggestions.push(result.data.data[id].path)
            if (suggestionsId.length === 5) { 
                suggestionsId = []; 
            }
            suggestionsId.push(result.data.data[id].id)
        }

        this.setState({
            suggestions: getSuggestions(value),
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
            suggestionsId: [],
        });
    };

    handleChange = name => (event, { newValue }) => {
        this.setState({
            [name]: newValue,
        });
    };

    handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            let query = {url:"/search?path=", id: -1, path: this.state.single}
            sendToSymbolPage(query);
        }
    }

    ////////////////////////////////////////////////////////////////////////

    checkConnect() {
        return (
            <>
                {
                    this.props.user ?
                        <AccountButton user={this.props.user} />
                    :
                        <div className="header-right">
                            <Link to='/userconnection'>LOGIN</Link>
                            <Link to="/faq">FAQ</Link>
                            <Link to="/contact">CONTACT</Link>
                        </div>
                }
            </>
        )
    }

    render() {
        const { classes } = this.props;

        const autosuggestProps = {
            renderInputComponent,
            suggestions: this.state.suggestions,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            getSuggestionValue,
            renderSuggestion,
            onSuggestionSelected,
        };
        return (
            <div className="Header">
                <header>
                    <div className="header-appbar">
                        <div className="header-left">
                            <button className="header-button" onClick={() => typeof (this.props.openNavBar) === "function" ? this.props.openNavBar() : null}>
                                <MenuIcon className="header-menu-icon" />
                            </button>
                            <Button className="header-button-logo" href="/">
                                <Typography className="header-header-title">
                                    WikiLibs
                                </Typography>
                            </Button>
                        </div>
                        <div className="header-inner-addon header-right-addon">
                            <div className={classes.root}>
                                <Autosuggest
                                    {...autosuggestProps}
                                    inputProps={{
                                        classes,
                                        placeholder: 'Search a function',
                                        value: this.state.single,
                                        onChange: this.handleChange('single'),
                                        onKeyDown: this.handleKeyDown
                                    }}
                                    theme={{
                                        container: classes.container,
                                        suggestionsContainerOpen: classes.suggestionsContainerOpen,
                                        suggestionsList: classes.suggestionsList,
                                        suggestion: classes.suggestion,
                                    }}
                                    renderSuggestionsContainer={options => (
                                        <Paper {...options.containerProps} square>
                                            {options.children}
                                        </Paper>
                                    )}
                                />
                            </div>
                            <SearchIcon className="header-search_icon" />
                        </div>
                        {this.checkConnect()}
                    </div>
                </header>
            </div>
        )
    }
    componentDidMount() {
        this.api.getLangLibTable().then(langs => {
            let map = {};
            map[-1] = [];
            langs.forEach(elem => {
                map[elem.id] = elem.libs;
            });
            this.setState({ langs: langs, libMap: map });
        });
        this.api.getSymTypes().then(types => this.setState({ types: types }));
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);