import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import ApiService from '../../ApiService';
 
// Imagine you have a list of languages that you'd like to autosuggest.
var languages = []

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
 
  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.path.toLowerCase().slice(0, inputLength) === inputValue
  );
};
 
// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.path;
 
// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.path}
  </div>
);
 
export default class Subscribe extends Component {
    api = new ApiService();
    constructor() {
        super();
 
        // Autosuggest is a controlled component.
        // This means that you need to provide an input value
        // and an onChange handler that updates this value (see below).
        // Suggestions also need to be provided to the Autosuggest,
        // and they are initially empty because the Autosuggest is closed.
        this.state = {
        value: '',
        suggestions: []
        };
    }
 
    onChange = (event, { newValue }) => {
        this.setState({
        value: newValue
        });
    };
 
    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          suggestions: getSuggestions(value)
        });
    };
 
    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
    };
 
    render() {
        const { value, suggestions } = this.state;
 
        // Autosuggest will pass through all these props to the input.
        const inputProps = {
        placeholder: 'Type something bro',
        value,
        onChange: this.onChange
        };
        
        // Finally, render it!
        return (
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
        />
        );
    }

    componentDidMount() {
        this.api.getLibsPath("C/").then(langs => languages = langs.data.data);
    }
}














// import React, { Component } from 'react';
// //import { Row, Col, Container, Card } from 'react-bootstrap';
// import ApiService from '../../ApiService';


// export default class Subscribe extends Component {
//     api = new ApiService();

//     submitFormHandler = event => {
//         event.preventDefault();
    
//         console.dir(this.refs.name.value, this.refs.email.value, this.refs.psw.value); //will give us the name value
//     }
  
//     render() {
//         return (
//             <div>
//                 <form onSubmit={this.submitFormHandler}>
//                     <div>
//                         <h1>Register</h1>
//                         <p>Please fill in this form to create an account.</p>
//                         <br/>

//                         <label><b>Name </b></label>
//                         <input type="text" placeholder="Enter Name" name="name" ref="name" /><br/>

//                         <label><b>Email </b></label>
//                         <input type="text" placeholder="Enter Email" name="email" ref="email" /><br/>

//                         <label><b>Password </b></label>
//                         <input type="text" placeholder="Enter Password" name="psw" ref="psw" /><br/>

//                         <p>By creating an account you agree to our <a href="#here">Terms & Privacy</a>.</p>
//                         <button type="submit">Register</button>
//                     </div>

//                     <div className="container signin">
//                         <p>Already have an account? <a href="#here">Sign in</a>.</p>
//                     </div>

//                 </form>
//             </div>
//         )
//     }
// }