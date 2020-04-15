import React, { Component } from 'react';
import { Navbar, Button, Nav } from 'react-bootstrap';
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

import './index.css'
import 'react-dropdown/style.css';

import pp from './pp.png'

var suggestions = [];

function onSuggestionSelected(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) {
    window.location = "/search?name=" + suggestion;
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

        let query = {
            page: 1,
            count: 5,
            lib: this.state.libFlag === -1 ? null : this.state.libFlag,
            lang: this.state.langFlag === -1 ? null : this.state.langFlag,
            type: this.state.typeFlag === "TYPE_NULL" ? null : this.state.typeFlag,
            path: this.state.search
        };

        var result = await this.api.SearchSymbols(query);
        for (var id in result.data.data) {
            suggestions.push(result.data.data[id].path)
        }

        this.setState({
            suggestions: getSuggestions(value),
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    handleChange = name => (event, { newValue }) => {
        this.setState({
            [name]: newValue,
        });
    };

    handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            window.location = "/search?path=" + this.state.single;
        }
    }

    ////////////////////////////////////////////////////////////////////////

    checkConnect() {
        if (this.props.user) {
            return (<div>
                {this.props.user.hasPermission("user.me.update") && <Link style={{ color: "white", padding: "24px" }} to='/profile'>My Profile</Link>}
                <Link style={{ color: "white", padding: "24px" }} to='/admin'>Administration</Link>
                <Link style={{ color: "white", padding: "24px" }} onClick={() => this.api.disconnect()} to='/'>Disconnect</Link>
            </div>);
        } else {
            return (<div>
                <Link style={{ color: "white", padding: "24px" }} to='/usercreation'>Create account</Link>
                <Link style={{ color: "white", padding: "24px" }} to='/userconnection'>Connect</Link>
            </div>);
        }
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
                    <Navbar className="header-bar" variant="default" style={{ backgroundColor: '#8560a8' }}>
                        <Button
                            variant="default"
                            onClick={() => typeof (this.props.openNavBar) === "function" ? this.props.openNavBar() : null}
                            style={{ color: 'white', backgroundColor: 'transparent' }}
                            data-toggle="collapse"
                            data-target="#navbarText"
                            aria-controls="navbarText"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <i className="fas fa-bars"></i>
                        </Button>
                        <Navbar.Brand className="fontBold" href="/" style={{ color: 'white', paddingLeft: '15px', marginRightboxShadow: '-1px -2px 10px black' }}>
                            WikiLibs
                        </Navbar.Brand>
                        <div className="inner-addon right-addon" style={{ width: '50%', position: 'relative', alignSelf: 'auto' }}>
                            <i className="fas fa-search glyphicon"></i>
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
                        </div>
                        <span>
                            {this.checkConnect()}
                        </span>
                        <Nav className="navbar-nav navbar-right">
                            <li>
                                <div className="inset">
                                    <img src={pp} alt="" />
                                </div>
                            </li>
                        </Nav>
                    </Navbar>
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
            this.setState({ langs: langs, libMap: map});
        });
        this.api.getSymTypes().then(types => this.setState({ types: types }));
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);