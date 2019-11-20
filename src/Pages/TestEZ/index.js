import React, { Component } from 'react';
//import { Row, Col, Container, Card } from 'react-bootstrap';
import ApiService from '../../ApiService';


export default class TestEZ extends Component {
    api = new ApiService();

    submitFormHandler = event => {
        event.preventDefault();
    
        console.dir(this.refs.name.value, this.refs.email.value, this.refs.psw.value); //will give us the name value
    }
  
    render() {
        return (
            <div>
                <form onSubmit={this.submitFormHandler}>
                    <div>
                        <h1>Register</h1>
                        <p>Please fill in this form to create an account.</p>
                        <br/>

                        <label><b>Name </b></label>
                        <input type="text" placeholder="Enter Name" name="name" ref="name" /><br/>

                        <label><b>Email </b></label>
                        <input type="text" placeholder="Enter Email" name="email" ref="email" /><br/>

                        <label><b>Password </b></label>
                        <input type="text" placeholder="Enter Password" name="psw" ref="psw" /><br/>

                        <p>By creating an account you agree to our <a href="#here">Terms & Privacy</a>.</p>
                        <button type="submit">Register</button>
                    </div>

                    <div className="container signin">
                        <p>Already have an account? <a href="#here">Sign in</a>.</p>
                    </div>

                </form>
            </div>
        )
    }
}