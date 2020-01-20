import React, { Component } from 'react';
import { Navbar, Button, Nav } from 'react-bootstrap';
import ApiService from '../../ApiService';

import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

import './index.css'

import pp from './pp.png'

var suggestions = [];
  
function onSuggestionSelected(event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) {
    window.location.pathname = "/search/" + suggestion;
}

  function renderInputComponent(inputProps) {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;
  
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
            count < 5 && suggestion.slice(0, inputLength).toLowerCase() === inputValue;
  
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
        userConnect: false
    };

    handleSuggestionsFetchRequested = ({ value }) => {
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

    handleSubbmit = ({ value }) => {
        console.log(value);
    }

    disconnect() {
        localStorage.removeItem('userToken');
        window.location.pathname = "/";
    }

    checkConnect() {
        if(this.state.userConnect) {
            return (<div>
                <Link to='/profile'>My Profile</Link>
                <button onClick={this.disconnect}>Disconnect</button>
            </div>);
        } else {
            return (<div>
                <Link to='/usercreation'>Create account</Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to='/userconnection'>Connect</Link>
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

    async onLangsReceived(langs) {
        for (var v in langs.data) {
            var libs = await this.api.getLibsPath(langs.data[v].name + "/");
            for (var name in libs.data.data) {
                suggestions.push(libs.data.data[name].path)
            }
            console.log("segment", suggestions)
        }
    }

    componentDidMount() {
        if(localStorage.getItem('userToken') != null) {
            this.setState({userConnect: true});
        } else {
            this.setState({userConnect: false});
        }
        this.api.getLangs().then(langs => this.onLangsReceived(langs));
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Header);